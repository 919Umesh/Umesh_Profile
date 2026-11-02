/** Site copy and trail data shared across components. One-off strings live in their components. */

export const site = {
  name: "Umesh Shahi",
  title: "Software Engineer",
  location: "Kathmandu, Nepal",
  email: "thakuriumesh919@gmail.com",
  role: "Software Engineer at Inovaara Technologies",
  description:
    "Software Engineer based in Kathmandu, building cross-platform mobile apps with Flutter and working on scalable systems, backend data and system design.",
} as const;

export const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/umesh-shahi-4a71b5324", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/919Umesh", icon: "github" },
  { label: "X", href: "https://x.com/UmeshSh56100400", icon: "x" },
  { label: "Email", href: "mailto:thakuriumesh919@gmail.com", icon: "mail" },
] as const;

export const hero = {
  headlineStart: "Software Engineer",
  headlineEmphasis: ["cross-platform", "reliable"],
  headlineEnd: "apps.",
  intro: [
    "I'm Umesh, a Kathmandu based software engineer with over two years of experience building cross-platform mobile apps. I work day to day with Flutter and Dart — MVC and Clean Architecture, state managed with GetX, Provider and BLoC — and I integrate .NET APIs and Firebase.",
    "Now a Software Engineer at Inovaara Technologies, where I work on scaling, optimization and system design — SQL, edge functions, RPC and complex data management — bringing data-structure and algorithm thinking to real architectural problems.",
  ],
} as const;

export const stack = [
  "Flutter",
  "Dart",
  "GetX",
  "BLoC",
  "Firebase",
  "SQL",
] as const;

export type Camp = {
  company: string;
  role: string;
  period: string;
  url: string;
  camp: string;
  altitude: string;
  description: string;
};

export const experience: Camp[] = [
  {
    company: "Inovaara Technologies",
    role: "Software Engineer",
    period: "2025 – Present",
    url: "https://www.inovaara.com",
    camp: "Camp II",
    altitude: "4,100 m",
    description:
      "Working on scaling, optimization and system design — SQL, edge functions, RPC and complex data management — and bringing data-structure and algorithm thinking to high-level architectural challenges. Part of the team building Krayam.",
  },
  {
    company: "Global Tech Nepal",
    role: "Mid-level Mobile Developer (Flutter)",
    period: "2023 – 2025",
    url: "https://globaltechnepal.com",
    camp: "Camp I",
    altitude: "3,200 m",
    description:
      "Built cross-platform mobile apps with Flutter using MVC and Clean Architecture, managed state with GetX and BLoC, and integrated .NET APIs and Firebase. Shipped the OMS suite — ERP, Retails, B2B, Salesforce, Parking and Mechanic — to the Play Store.",
  },
];

export const testimonials = [
  {
    quote:
      "Add a short recommendation from someone you've worked with — a manager, teammate or client. A couple of sentences about how you work is plenty.",
    name: "Your recommender's name",
    role: "Their role, Company",
  },
  {
    quote:
      "A second note works well here — something that speaks to your code quality, reliability or how you collaborate.",
    name: "Another recommender",
    role: "Their role, Company",
  },
  {
    quote:
      "And a third keeps the register feeling lived-in. Swap these for real quotes whenever you have them.",
    name: "A third recommender",
    role: "Their role, Company",
  },
];

export const contact = {
  heading: "Let's build something together.",
  subcopy: "The fastest way to reach me is email. I read everything myself.",
  email: "Email me",
  linkedin: "Connect on LinkedIn",
  linkedinHref: "https://www.linkedin.com/in/umesh-shahi-4a71b5324",
};

/** the 404 page, for any path that isn't on the trail, and the little runner game on it */
export const lost = {
  hand: "Yakku wandered off the path",
  heading: "This trail doesn't go anywhere.",
  subcopy: "The page you were looking for isn't here. It may have moved, or the link had a typo. Either way, Yakku is happy to walk you back.",
  home: "Back to the trailhead",
  notes: "Read the field notes",
  game: {
    title: "Yakku's trail run",
    label: "Yakku's trail run. Press Space or tap to jump.",
    start: "Press Space or tap to start running",
    again: "Space or tap to go again.",
    paused: "Paused. Space or tap to keep going.",
    best: "best",
    crashes: {
      cairn: "Down went a cairn. Someone spent all morning on that.",
      mani: "Mani walls stay on your right, Yakku. Not underneath you.",
      chorten: "Yakku tried to go through a chorten. Clockwise, around it.",
      dog: "Yakku tripped over a sleeping trail dog. It didn't wake up.",
      wheel: "Prayer wheels turn clockwise. Not when you run into them.",
      bush: "Yakku ran into a rhododendron, Nepal's national flower. He's wearing some of it now.",
    },
    stops: [
      { name: "Namche Bazaar", alt: 3440 },
      { name: "Tengboche", alt: 3867 },
      { name: "Dingboche", alt: 4410 },
      { name: "Lobuche", alt: 4940 },
      { name: "Gorak Shep", alt: 5164 },
      { name: "Everest Base Camp", alt: 5364 },
      { name: "Kala Patthar", alt: 5645 },
      { name: "Everest summit!", alt: 8849 },
    ],
  },
};

// The trek: every stop on the trail, left to right

export type Biome = "forest" | "meadow" | "rock" | "snow";
export type Pose = "idle" | "wave" | "sit" | "read" | "celebrate" | "sleep";

export type Stop = {
  id: string;
  name: string;
  altitude: number;
  biome: Biome;
  pose: Pose;
  color: string;
};

export const stops: Stop[] = [
  { id: "basecamp", name: "Basecamp", altitude: 1400, biome: "forest", pose: "wave", color: "#EF476F" },
  { id: "trailhead", name: "Trailhead", altitude: 2100, biome: "forest", pose: "idle", color: "#FFD166" },
  { id: "climb", name: "Camp I", altitude: 3200, biome: "forest", pose: "idle", color: "#06D6A0" },
  { id: "camp-2", name: "Camp II", altitude: 4100, biome: "meadow", pose: "idle", color: "#4CC9F0" },
  { id: "hikers", name: "Fireside", altitude: 6500, biome: "snow", pose: "sit", color: "#E85D2F" },
  { id: "summit", name: "Summit", altitude: 8848, biome: "snow", pose: "celebrate", color: "#EF476F" },
  { id: "night", name: "Night camp", altitude: 8200, biome: "snow", pose: "sleep", color: "#06D6A0" },
];

/** Things Yakku says when he arrives at a stop */
export const quips: Record<string, string[]> = {
  basecamp: ["Namaste! I'm Yakku. Scroll and I'll walk.", "Snacks packed. Boots on. Let's go!"],
  trailhead: ["Read the board. There's a quiz later.", "Packing list checks out."],
  climb: ["Camp I. Where it all started.", "Flutter apps, shipped to the Play Store."],
  "camp-2": ["Camp II. He lives up here now.", "Scaling, SQL and system design."],
  hikers: ["Pull up a log. Read the register.", "Kind words keep the fire going."],
  summit: ["WE MADE IT! Send him a note!", "8,848 m. He replies within a day."],
  night: ["zzz… dreaming of grass…", "Wake me if you send an email."],
};

/**
 * What Yakku says on the guided tour, stop by stop, in order. On phones,
 * stops wider than the screen are read a page at a time and these lines
 * are spread across the pages.
 */
export const tour: Record<string, string[]> = {
  basecamp: ["Namaste! I'm Yakku. I'll walk you up Umesh's mountain.", "He builds apps and systems, from Kathmandu. Let's climb!"],
  trailhead: ["The trailhead board: who he is and how he works.", "Flutter, Dart, GetX, BLoC, Firebase, SQL. Mobile and backend."],
  climb: ["Camp I, 2023. Mid-level Flutter developer at Global Tech Nepal.", "Cross-platform apps with Clean Architecture. The OMS suite shipped to the Play Store."],
  "camp-2": ["Camp II: Software Engineer at Inovaara Technologies, since 2025.", "Scaling, optimization and system design — SQL, edge functions, RPC. Building Krayam."],
  hikers: ["The trail register. People he's worked with left notes.", "They shuffle on their own. Take your time."],
  summit: ["8,848 m. The summit!", "Want to build something together? His email's right here."],
  night: ["That's the whole trek. Thanks for walking with me.", "zzz…"],
};

/** Things Yakku says when you poke him */
export const pokes = [
  "Mehhh-velous!",
  "Fun fact: yaks can't read code. Umesh reads all of it.",
  "I was told there would be grass.",
  "Altitude? I'm built for it.",
  "Every yak needs a CI/CD pipeline.",
  "Boop registered. Deploying good vibes.",
  "Careful, I shed on production.",
  "Hooves off the merchandise.",
];
