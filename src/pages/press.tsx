import { useState } from "react";
import { Zap, ArrowLeft, Calendar, MapPin, X } from "lucide-react";
import PageLayout from "@/components/layout/page-layout";
import { VoltButton } from "@/components/ui/volt-button";

interface PressRelease {
  id: string;
  partner: string;
  date: string;
  headline: string;
  location: string;
  logo?: string;
  graphic?: string;
  paragraphs: string[];
  quotes: { text: string; author: string; title: string }[];
  highlights?: string[];
}

const pressReleases: PressRelease[] = [
  {
    id: "rmu",
    partner: "Robert Morris University",
    date: "December 16, 2025",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
    headline:
      "RMU Athletics Integrates JABA’s AI Platform to Power Next-Generation NIL for Student-Athletes",
    location: "Moon Township, PA",
    paragraphs: [
      "Robert Morris University Athletics announced a partnership with JABA, an AI-powered platform built to streamline and optimize Name, Image, and Likeness partnerships for student-athletes.",
      "This integration strengthens RMU’s commitment to providing comprehensive NIL resources by giving every Colonial student-athlete a centralized system for managing their personal brand, ensuring compliance, and maximizing their commercial value. JABA’s technology simplifies the entire NIL lifecycle, from the initial brand pitch to post-deal tracking.",
      "RMU Athletics recognized the need for an efficient, scalable solution to manage the rapidly evolving NIL landscape, giving smaller NIL teams the ability to operate at scale without adding staff.",
    ],
    quotes: [
      {
        text: "The integration of JABA’s AI-powered platform is a significant step forward for our NIL support system. It provides efficiency, ensures compliance, and most importantly, empowers our student-athletes to professionally manage their personal brand and maximize their NIL opportunities without compromising their time.",
        author: "Chris King ’94",
        title: "VP and Director of Athletics, RMU",
      },
      {
        text: "We are proud to partner with RMU Athletics to ensure that every Colonial has a simple, powerful, and compliant way to engage with the market and unlock their full commercial potential.",
        author: "Jordon Rooney",
        title: "CEO, JABA",
      },
    ],
    highlights: [
      "AI-powered pitching automation and media kits",
      "Verified first-party athlete data for brands",
      "Automated compliance and contract management",
      "Real-time ROI tracking for all partnerships",
    ],
  },
  {
    id: "purdue",
    partner: "Purdue University",
    date: "December 10, 2025",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
    headline:
      "Purdue Athletics Partners with JABA AI to Enhance Student-Athlete Branding and NIL Opportunities",
    location: "West Lafayette, IN",
    paragraphs: [
      "Purdue Athletics partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness and revenue sharing landscape. JABA AI will assist Boilermaker student-athletes and Boilermaker BrandWorks in brand opportunity outreach, campaign metrics, and management of student-athlete deals.",
      "JABA AI’s core functions include seeking out prospective brand opportunities for Purdue’s student-athletes, personalizing pitches and proposals for each Boilermaker, and tracking and tabulating campaign performance in real-time on social media.",
      "Boiler BrandWorks, Purdue’s in-house student-athlete marketing and brand-building unit, works in collaboration with Purdue Sports Properties to identify and attract local, regional and national NIL opportunities. Those efforts will be bolstered with JABA AI’s collaborative capabilities.",
    ],
    quotes: [
      {
        text: "Partnering with JABA gives us a powerful tool to utilize in the branding and marketing space. We are excited to continue innovating within the NIL landscape to keep Purdue Athletics on the cutting edge of what lies ahead.",
        author: "Ken Halpin",
        title: "Deputy Athletics Director & COO, Purdue",
      },
    ],
    highlights: [
      "Prospective brand opportunity sourcing",
      "Personalized pitches for each Boilermaker",
      "Real-time social media campaign tracking",
      "Full deal lifecycle management",
    ],
  },
  {
    id: "athletes-unlimited",
    partner: "Athletes Unlimited",
    date: "December 1, 2025",
    logo: "https://auprosports.com/wp-content/themes/au/assets/img/logo-athletes-unlimited-white.svg",
    headline:
      "Athletes Unlimited Partners with JABA to Elevate Athlete Branding Across Pro Women’s Sports",
    location: "New York, NY",
    paragraphs: [
      "Athletes Unlimited, which owns and operates professional women’s softball, volleyball, and basketball leagues featuring world-class competition and fan experience, is partnering with JABA, an AI platform built to make life easier for athletes and the teams behind them.",
      "JABA helps organizations support athletes in building their brands, project-managing their deliverables, and staying organized with everything outside their sport. JABA functions as a digital assistant for athletes and staff, simplifying everything from brand outreach to workflow management.",
      "This collaboration builds on Athletes Unlimited’s commitment to elevating athlete empowerment and brand development. Since launching its innovative player-driven pro leagues in 2020, AU has redefined the athlete experience.",
    ],
    quotes: [
      {
        text: "JABA helps fill a void in the athlete community by working with AI-driven technology to deliver individual, tailored feedback to help athletes strengthen their social presence.",
        author: "James Zehren",
        title: "Sr. Manager, Athlete & Content Marketing, Athletes Unlimited",
      },
    ],
    highlights: [
      "Brand management across three pro women’s leagues",
      "AI-driven individual athlete feedback",
      "Streamlined workflow and deliverable management",
      "Social presence optimization for athletes",
    ],
  },
  {
    id: "baylor",
    partner: "Baylor University",
    date: "August 12, 2025",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
    headline:
      "Baylor University Partners with JABA to Power Athlete NIL in the Revenue Sharing Era",
    location: "Waco, TX",
    paragraphs: [
      "Baylor Athletics is teaming up with JABA, the AI assistant built to support student-athletes and the team behind them in managing their brands and bringing them opportunities.",
      "As the college athletics landscape enters the era of revenue sharing, Baylor is taking a proactive step to ensure its student-athletes are equipped to succeed by adopting JABA’s AI technology to streamline its NIL operations.",
      "This partnership is established in collaboration with Baylor’s multimedia rights partner, Playfly Sports, which helps schools generate value through commercial innovation. At the center of this initiative is Playfly Max, an advanced revenue engine designed to leverage the evolving NIL landscape.",
    ],
    quotes: [
      {
        text: "Partnering with Playfly and JABA’s AI technology allows us to elevate how our student-athletes engage with their personal brands and navigate opportunities in this dynamic NIL era. This collaboration reflects our continued investment in their growth, empowerment and long-term success.",
        author: "David Kaye",
        title: "Athletics General Manager, Baylor",
      },
    ],
    highlights: [
      "Smart, scalable brand outreach",
      "Real-time social media and campaign metrics",
      "Deal management from negotiation to execution",
      "Integration with Playfly Max revenue platform",
    ],
  },
  {
    id: "cincinnati",
    partner: "University of Cincinnati",
    date: "2025",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png",
    headline:
      "University of Cincinnati Partners with JABA AI for NIL Brand Outreach and Campaign Management",
    location: "Cincinnati, OH",
    paragraphs: [
      "The University of Cincinnati athletics department partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness. JABA AI will assist Cincy Connect NIL in brand opportunity outreach, campaign metrics, and management of student-athlete deals.",
      "JABA AI’s core functions include seeking out prospective brand opportunities for Cincinnati’s student-athletes, personalizing pitches and proposals for each Bearcat, and tracking and tabulating campaign performance in real-time on social media.",
      "Cincy Connect NIL, the University of Cincinnati’s comprehensive student-athlete marketing and brand-building unit, works to identify and attract local, regional and national NIL opportunities for Cincinnati’s student-athlete population.",
    ],
    quotes: [
      {
        text: "JABA AI will empower our student-athletes to manage the complexities of deal execution and performance tracking alongside our department. We’re excited to bring this advanced capability to Cincinnati and ensure our athletes have every advantage in the competitive NIL marketplace.",
        author: "Eddie Taylor",
        title: "Director of Athlete Influence, Cincinnati",
      },
    ],
    highlights: [
      "Brand opportunity sourcing for all Bearcats",
      "Personalized pitch and proposal generation",
      "Real-time campaign performance tracking",
      "Full deal lifecycle management",
    ],
  },
];

function ArticleModal({
  release,
  onClose,
}: {
  release: PressRelease;
  onClose: () => void;
}) {
  return (
    <div className="press-modal-backdrop" onClick={onClose}>
      <div className="press-modal" onClick={(e) => e.stopPropagation()}>
        <button className="press-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="press-modal-header">
          <div className="press-article-meta">
            <span className="press-article-date">
              <Calendar className="press-article-meta-icon" />
              {release.date}
            </span>
            <span className="press-article-location">
              <MapPin className="press-article-meta-icon" />
              {release.location}
            </span>
          </div>
          <span className="press-article-partner">{release.partner}</span>
          <h2 className="press-modal-headline">{release.headline}</h2>
        </div>

        <div className="press-modal-body">
          {release.paragraphs.map((p, i) => (
            <p key={i} className="press-article-paragraph">{p}</p>
          ))}
        </div>

        <div className="press-article-quotes">
          {release.quotes.map((q, i) => (
            <blockquote key={i} className="press-article-quote">
              <p className="press-article-quote-text">&ldquo;{q.text}&rdquo;</p>
              <footer className="press-article-quote-attr">
                <span className="press-article-quote-author">{q.author}</span>
                <span className="press-article-quote-title">{q.title}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {release.highlights && (
          <div className="press-article-highlights">
            <p className="press-article-highlights-label">Key capabilities:</p>
            <div className="press-article-highlights-grid">
              {release.highlights.map((h, i) => (
                <div key={i} className="press-article-highlight">
                  <span className="press-article-highlight-dot" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ThumbnailCard({
  release,
  onClick,
}: {
  release: PressRelease;
  onClick: () => void;
}) {
  return (
    <button className="press-thumb" onClick={onClick}>
      {/* Graphic placeholder + logo */}
      <div className="press-thumb-graphic">
        {release.graphic
          ? <img src={release.graphic} alt="" className="press-thumb-graphic-img" />
          : <div className="press-thumb-graphic-placeholder"><span>Graphic</span></div>
        }
        {release.logo && (
          <div className="press-thumb-logo-badge">
            <img src={release.logo} alt={release.partner} className="press-thumb-logo-img" />
          </div>
        )}
      </div>
      <span className="press-thumb-partner">{release.partner}</span>
      <h3 className="press-thumb-headline">{release.headline}</h3>
      <div className="press-thumb-meta">
        <span className="press-article-date">
          <Calendar className="press-article-meta-icon" />
          {release.date}
        </span>
        <span className="press-thumb-cta">Read more →</span>
      </div>
    </button>
  );
}

export default function PressPage() {
  const [selected, setSelected] = useState<PressRelease | null>(null);
  const featured = pressReleases[0];
  const rest = pressReleases.slice(1);

  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="press-page-hero">
        <div className="press-page-hero-inner">
          <span className="audience-page-chip">Press</span>
          <h1 className="audience-page-h1">
            Who's using{" "}
            <span className="audience-page-h1-accent">JABA.</span>
          </h1>
          <p className="audience-page-subtitle">
            From Power Five programs to professional leagues, here's what
            they're saying about the intelligence layer for NIL.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="press-featured-section">
        <div className="press-featured-inner">
          <p className="press-featured-label">Latest announcement</p>
          <div className="press-featured-card">
            {/* Announcement graphic + logo overlay */}
            <div className="press-featured-graphic">
              {featured.graphic
                ? <img src={featured.graphic} alt="" className="press-featured-graphic-img" />
                : <div className="press-featured-graphic-placeholder">
                    <span>Announcement graphic</span>
                  </div>
              }
              {featured.logo && (
                <div className="press-featured-logo-badge">
                  <img src={featured.logo} alt={featured.partner} className="press-featured-logo-img" />
                </div>
              )}
            </div>
            <div className="press-featured-card-header">
              <div className="press-article-meta">
                <span className="press-article-date">
                  <Calendar className="press-article-meta-icon" />
                  {featured.date}
                </span>
                <span className="press-article-location">
                  <MapPin className="press-article-meta-icon" />
                  {featured.location}
                </span>
              </div>
              <span className="press-article-partner">{featured.partner}</span>
              <h2 className="press-featured-headline">{featured.headline}</h2>
              <p className="press-featured-excerpt">{featured.paragraphs[0]}</p>
            </div>
            <div className="press-featured-quote">
              <p className="press-article-quote-text">
                &ldquo;{featured.quotes[0].text}&rdquo;
              </p>
              <div className="press-article-quote-attr">
                <span className="press-article-quote-author">{featured.quotes[0].author}</span>
                <span className="press-article-quote-title">{featured.quotes[0].title}</span>
              </div>
            </div>
            <div className="press-featured-footer">
              <button
                className="press-featured-read-btn"
                onClick={() => setSelected(featured)}
              >
                Read full release →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Thumbnail Grid */}
      <section className="press-grid-section">
        <div className="press-grid-inner">
          <p className="press-featured-label">More announcements</p>
          <div className="press-grid">
            {rest.map((r) => (
              <ThumbnailCard key={r.id} release={r} onClick={() => setSelected(r)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="audience-page-cta">
        <div className="audience-page-cta-inner">
          <h2 className="audience-page-cta-h2">
            Want to be{" "}
            <span className="cta-headline-accent">next?</span>
          </h2>
          <p className="audience-page-cta-sub">
            See why Purdue, Baylor, Athletes Unlimited, and more chose JABA
            to power their NIL operations.
          </p>
          <VoltButton icon={<Zap className="h-4 w-4" />}>
            Book a demo
          </VoltButton>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <ArticleModal release={selected} onClose={() => setSelected(null)} />
      )}
    </PageLayout>
  );
}
