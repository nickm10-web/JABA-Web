// Shared press release data — used by the press page (src/pages/press.tsx)
// and the homepage press preview (src/components/sections/press-preview-section.tsx).

export interface PressRelease {
  id: string;
  partner: string;
  tag: string;
  date: string;
  wireDate: string;
  plateDate: string;
  headline: string;
  location: string;
  logo?: string;
  graphic?: string;
  paragraphs: string[];
  quotes: { text: string; author: string; title: string }[];
}

export const pressReleases: PressRelease[] = [
  {
    id: "cincinnati",
    partner: "University of Cincinnati",
    tag: "NCAA D-I · Big 12",
    date: "February 18, 2026",
    wireDate: "FEB 18 2026 · CINCINNATI, OH",
    plateDate: "FEB 18",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png",
    graphic: "/press/jabaxcincinnati.png",
    headline:
      "Cincinnati Athletics enters NIL partnership with JABA AI.",
    location: "Cincinnati, OH",
    paragraphs: [
      "The University of Cincinnati athletics department has partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness (NIL). JABA AI will assist Cincy Connect NIL in brand opportunity outreach, campaign metrics and management of student-athlete deals.",
      "JABA AI's core functions include seeking out prospective brand opportunities for Cincinnati's student-athletes, personalizing pitches and proposals for each Bearcat and then tracking and tabulating campaign performance in real-time on social media.",
      "Cincy Connect NIL, the University of Cincinnati's comprehensive student-athlete marketing and brand-building unit, works to identify and attract local, regional and national NIL opportunities for Cincinnati's student-athlete population. Those efforts will be bolstered with the added collaborative capabilities of JABA AI.",
      "JABA's platform will also assist Cincinnati's student-athletes with backend management of their respective NIL deals as they move from start to finish throughout their years of eligibility. The partnership represents the University of Cincinnati's ongoing commitment to providing student-athletes with innovative resources and support.",
    ],
    quotes: [
      {
        text: "JABA AI will empower our student-athletes to manage the complexities of deal execution and performance tracking alongside our department. We're excited to bring this advanced capability to Cincinnati and ensure our athletes have every advantage in the competitive NIL marketplace.",
        author: "Eddie Taylor",
        title: "Director of Athlete Influence, Cincinnati",
      },
    ],
  },
  {
    id: "rmu",
    partner: "Robert Morris University",
    tag: "NCAA D-I · Horizon League",
    date: "December 16, 2025",
    wireDate: "DEC 16 2025 · MOON TOWNSHIP, PA",
    plateDate: "DEC 16",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
    graphic: "/press/jabaxrmu.png",
    headline:
      "RMU Athletics integrates JABA's AI platform to power next-generation NIL for student-athletes.",
    location: "Moon Township, PA",
    paragraphs: [
      "Robert Morris University Athletics announced a partnership with JABA, an AI-powered platform built to streamline and optimize Name, Image, and Likeness partnerships for student-athletes.",
      "This integration strengthens RMU's commitment to providing comprehensive NIL resources by giving every Colonial student-athlete a centralized system for managing their personal brand, ensuring compliance, and maximizing their commercial value. JABA's technology simplifies the entire NIL lifecycle, from the initial brand pitch to post-deal tracking.",
      "RMU Athletics recognized the need for an efficient, scalable solution to manage the rapidly evolving NIL landscape, giving smaller NIL teams the ability to operate at scale without adding staff.",
    ],
    quotes: [
      {
        text: "The integration of JABA's AI-powered platform is a significant step forward for our NIL support system. It provides efficiency, ensures compliance, and most importantly, empowers our student-athletes to professionally manage their personal brand and maximize their NIL opportunities without compromising their time.",
        author: "Chris King '94",
        title: "VP and Director of Athletics, RMU",
      },
      {
        text: "We are proud to partner with RMU Athletics to ensure that every Colonial has a simple, powerful, and compliant way to engage with the market and unlock their full commercial potential.",
        author: "Jordon Rooney",
        title: "CEO, JABA",
      },
    ],
  },
  {
    id: "purdue",
    partner: "Purdue University",
    tag: "NCAA D-I · Big Ten",
    date: "December 10, 2025",
    wireDate: "DEC 10 2025 · WEST LAFAYETTE, IN",
    plateDate: "DEC 10",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
    graphic: "/press/jabaxpurdue.png",
    headline:
      "Purdue Athletics partners with JABA AI to enhance student-athlete branding and NIL opportunities.",
    location: "West Lafayette, IN",
    paragraphs: [
      "Purdue Athletics partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness and revenue sharing landscape. JABA AI will assist Boilermaker student-athletes and Boilermaker BrandWorks in brand opportunity outreach, campaign metrics, and management of student-athlete deals.",
      "JABA AI's core functions include seeking out prospective brand opportunities for Purdue's student-athletes, personalizing pitches and proposals for each Boilermaker, and tracking and tabulating campaign performance in real-time on social media.",
      "Boiler BrandWorks, Purdue's in-house student-athlete marketing and brand-building unit, works in collaboration with Purdue Sports Properties to identify and attract local, regional and national NIL opportunities. Those efforts will be bolstered with JABA AI's collaborative capabilities.",
    ],
    quotes: [
      {
        text: "Partnering with JABA gives us a powerful tool to utilize in the branding and marketing space. We are excited to continue innovating within the NIL landscape to keep Purdue Athletics on the cutting edge of what lies ahead.",
        author: "Ken Halpin",
        title: "Deputy Athletics Director & COO, Purdue",
      },
    ],
  },
  {
    id: "athletes-unlimited",
    partner: "Athletes Unlimited",
    tag: "Pro Women's Sports",
    date: "December 1, 2025",
    wireDate: "DEC 01 2025 · NEW YORK, NY",
    plateDate: "DEC 01",
    logo: "https://auprosports.com/wp-content/themes/au/assets/img/logo-athletes-unlimited-white.svg",
    graphic: "/press/jabaxathletesu.png",
    headline:
      "Athletes Unlimited partners with JABA to elevate athlete branding across pro women's sports.",
    location: "New York, NY",
    paragraphs: [
      "Athletes Unlimited, which owns and operates professional women's softball, volleyball, and basketball leagues featuring world-class competition and fan experience, is partnering with JABA, an AI platform built to make life easier for athletes and the teams behind them.",
      "JABA helps organizations support athletes in building their brands, project-managing their deliverables, and staying organized with everything outside their sport. JABA functions as a digital assistant for athletes and staff, simplifying everything from brand outreach to workflow management.",
      "This collaboration builds on Athletes Unlimited's commitment to elevating athlete empowerment and brand development. Since launching its innovative player-driven pro leagues in 2020, AU has redefined the athlete experience.",
    ],
    quotes: [
      {
        text: "JABA helps fill a void in the athlete community by working with AI-driven technology to deliver individual, tailored feedback to help athletes strengthen their social presence.",
        author: "James Zehren",
        title: "Sr. Manager, Athlete & Content Marketing, Athletes Unlimited",
      },
    ],
  },
  {
    id: "baylor",
    partner: "Baylor University",
    tag: "NCAA D-I · Big 12",
    date: "August 12, 2025",
    wireDate: "AUG 12 2025 · WACO, TX",
    plateDate: "AUG 12",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
    graphic: "/press/jabaxbaylor.png",
    headline:
      "Baylor University partners with JABA to power athlete NIL in the revenue sharing era.",
    location: "Waco, TX",
    paragraphs: [
      "Baylor Athletics is teaming up with JABA, the AI assistant built to support student-athletes and the team behind them in managing their brands and bringing them opportunities.",
      "As the college athletics landscape enters the era of revenue sharing, Baylor is taking a proactive step to ensure its student-athletes are equipped to succeed by adopting JABA's AI technology to streamline its NIL operations.",
      "This partnership is established in collaboration with Baylor's multimedia rights partner, Playfly Sports, which helps schools generate value through commercial innovation. At the center of this initiative is Playfly Max, an advanced revenue engine designed to leverage the evolving NIL landscape.",
    ],
    quotes: [
      {
        text: "Partnering with Playfly and JABA's AI technology allows us to elevate how our student-athletes engage with their personal brands and navigate opportunities in this dynamic NIL era. This collaboration reflects our continued investment in their growth, empowerment and long-term success.",
        author: "David Kaye",
        title: "Athletics General Manager, Baylor",
      },
    ],
  },
];

export const pressIndexNo = (i: number) =>
  String(pressReleases.length - i).padStart(3, "0");
