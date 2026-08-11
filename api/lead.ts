import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";

/**
 * Captures signups from the hero email field and the contact form.
 *
 * Writes to its own collection rather than anything under the CRM: this is a
 * public, unauthenticated endpoint, so whatever spam reaches it must not land
 * in the sales pipeline.
 */
const DB = "leads";
const COLLECTION = "website_signups";

const MAX = { email: 254, name: 120, message: 4000, source: 40 };
// Deliberately loose. The point is to reject obvious junk, not to adjudicate
// what a valid address looks like.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Serverless invocations reuse the process, so the client (and its pool) is
// cached across warm calls instead of reconnecting per request.
let clientPromise: Promise<MongoClient> | null = null;
function getClient(uri: string) {
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    }).connect();
  }
  return clientPromise;
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("lead: MONGODB_URI is not set");
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  const body = (typeof req.body === "string" ? safeParse(req.body) : req.body) ?? {};

  // Bots fill in every field they find; a real browser leaves this one empty.
  if (str(body.company_website, 200)) return res.status(200).json({ ok: true });

  const email = str(body.email, MAX.email).toLowerCase();
  if (!EMAIL.test(email)) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  const doc = {
    email,
    name: str(body.name, MAX.name) || null,
    message: str(body.message, MAX.message) || null,
    source: str(body.source, MAX.source) || "unknown",
    createdAt: new Date(),
    userAgent: str(req.headers["user-agent"], 400) || null,
    // Vercel puts the client IP here; the socket address is the edge, not them.
    ip: str(req.headers["x-forwarded-for"], 80).split(",")[0].trim() || null,
  };

  try {
    const client = await getClient(uri);
    await client.db(DB).collection(COLLECTION).insertOne(doc);
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Never surface driver internals to the browser.
    console.error("lead: insert failed", err);
    return res.status(500).json({ ok: false, error: "store_failed" });
  }
}

function safeParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
