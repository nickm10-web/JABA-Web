import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Dependency-free probe: separates function-runtime issues from mongodb ones. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, node: process.version });
}
