import type { IconName, Rich, SectionMeta, Spec } from './types';

/* ------------------------------------------------------------------ */
/* Identity & links                                                    */
/* ------------------------------------------------------------------ */

export const person = {
  name: 'Yosra Rhim',
  initials: 'YR',
  brandRole: 'Embedded · AI',
  location: 'Monastir, Tunisia',
  email: 'yosrarhimyosra@gmail.com',
} as const;

export const links = {
  cv: '/docs/Yosra-Rhim-CV.pdf',
} as const;

export interface SocialProfile {
  readonly id: 'linkedin' | 'github';
  readonly name: string;
  readonly href: string;
  readonly handle: string;
}

export const socials: readonly SocialProfile[] = [
  { id: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/in/rhim-yosra-135a51251/', handle: 'in/rhim-yosra' },
  { id: 'github', name: 'GitHub', href: 'https://github.com/YosraRhim', handle: '@YosraRhim' },
];

/** Interface wording shared by several components. */
export const ui = {
  skipToContent: 'Skip to content',
  backToTop: 'back to top',
  opensInNewTab: '(opens in a new tab)',
  cvShort: 'CV',
  downloadCv: 'Download CV',
  pdfInNewTab: '(PDF, opens in a new tab)',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  primaryNav: 'Primary',
  mobileNav: 'Mobile navigation',
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  readonly id: string;
  readonly num: string;
  readonly label: string;
  /** Label used in the full-screen mobile menu, when different. */
  readonly mobileLabel?: string;
  /** Shown in the desktop header (the mobile menu lists every section). */
  readonly inHeader: boolean;
}

export const navigation: readonly NavItem[] = [
  { id: 'profile', num: '01', label: 'Profile', inHeader: true },
  { id: 'edge-sense-ai', num: '02', label: 'Edge Sense AI', inHeader: true },
  { id: 'work', num: '03', label: 'Work', mobileLabel: 'Selected work', inHeader: true },
  { id: 'experience', num: '04', label: 'Experience', inHeader: true },
  { id: 'expertise', num: '05', label: 'Expertise', inHeader: false },
  { id: 'research', num: '06', label: 'Research', inHeader: true },
  { id: 'education', num: '07', label: 'Education', inHeader: false },
  { id: 'contact', num: '08', label: 'Contact', inHeader: true },
];

/** Every section observed by the scroll spy. */
export const spiedSectionIds: readonly string[] = navigation.map((n) => n.id);

/** Sections without their own header link highlight a neighbour instead. */
export const navAliases: Readonly<Record<string, string>> = {
  expertise: 'experience',
  education: 'research',
};

/* ------------------------------------------------------------------ */
/* §00 Hero                                                            */
/* ------------------------------------------------------------------ */

export const hero = {
  edition: 'Portfolio · Rev. 2026',
  location: person.location,
  // TODO(confirm, Q3): keep this availability line or replace it.
  status: 'Open to R&D engineering & doctoral opportunities',
  kicker: 'Embedded Systems & AI Engineer',
  firstName: 'Yosra',
  lastName: 'Rhim',
  headline: 'Intelligence, *where the data is born* — from the sensor to the model.' satisfies Rich,
  intro:
    'Engineer in **Embedded Electronic Systems & Telecommunications** (ESPRIM, 2026). I design systems that join hardware, software and machine learning — most recently **Edge Sense AI**, a federated edge-AI platform for industrial predictive maintenance built with ACTIA Engineering Services.' satisfies Rich,
  primaryCta: { label: 'Explore the work', href: '#edge-sense-ai' },
  domains: ['Federated learning', 'Edge AI', 'Embedded systems', 'IoT · MQTT', 'Predictive maintenance', 'Computer vision'],
  signal: {
    channel: 'CH.01',
    channelLabel: 'vibration · edge node',
    status: 'live',
    ariaLabel:
      'Animated illustration: a sensor vibration signal scrolls through a sliding window that a GRU model scores for failure probability.',
    windowSize: 64,
    windowLabel: 'Window',
    windowValue: '64 samples',
    probabilityLabel: 'p(failure)',
    stateLabel: 'State',
    figure: 'Fig. 00',
    caption: 'Illustrative simulation of the on-device pipeline used in Edge Sense AI: signal → sliding window → GRU → threshold.',
  },
} as const;

/* ------------------------------------------------------------------ */
/* §01 Profile                                                         */
/* ------------------------------------------------------------------ */

export const profile = {
  section: { num: '§01', label: 'Profile — engineering identity', note: 'Electronics → AI' } satisfies SectionMeta,
  title: 'Profile',
  portrait: {
    webpSrcSet: '/img/yosra-rhim-480.webp 480w, /img/yosra-rhim-760.webp 760w',
    jpgSrcSet: '/img/yosra-rhim-480.jpg 480w, /img/yosra-rhim-760.jpg 760w',
    src: '/img/yosra-rhim-760.jpg',
    sizes: '(max-width: 760px) 360px, 33vw',
    width: 760,
    height: 950,
    alt: 'Portrait of Yosra Rhim',
    figure: 'Fig. 01',
    caption: 'Yosra Rhim — Monastir, Tunisia',
  },
  statement:
    'I work across the whole chain of an intelligent system — from the *board that reads a sensor* to the *model that learns from it*, and the software that makes both useful.' satisfies Rich,
  prose: [
    "My path started in **electronics** — a technical-sciences baccalaureate, then a bachelor's degree in **embedded systems** at ISIMM — and continued with an engineering degree in **embedded electronic systems and telecommunications** at ESPRIM.",
    'Along the way, four internships and an industry final-year project took me from designing monitoring boards on ESP32 and STM32 to forecasting models, full-stack platforms and, finally, **federated learning at the edge**.',
    'What connects these projects is a single question: how to make intelligence run **reliably, privately and close to the machine** — the space where embedded engineering and machine learning meet.',
  ] satisfies readonly Rich[],
  facts: [
    { term: 'Degree', value: 'Engineer, 2026' },
    { term: 'Experience', value: '5 organisations' },
    { term: 'Languages', value: 'AR · FR · EN' },
  ] satisfies readonly Spec[],
} as const;

/* Trajectory: Electronics → Embedded → AI → Intelligent systems */

export interface TrajectoryStage {
  readonly label: string;
  readonly name: string;
  readonly items: readonly { readonly year: string; readonly text: string }[];
}

export const trajectory = {
  title: 'Trajectory',
  note: 'Each stage verified against CV & certificates',
  stages: [
    {
      label: 'Stage 1',
      name: 'Electronics',
      items: [
        { year: '2020', text: 'Baccalaureate in Technical Sciences, Monastir' },
        // TODO(confirm, Q5): exact Watts Electronics internship dates.
        { year: '2022', text: 'Watts Electronics — electronic boards for smart environmental monitoring' },
      ],
    },
    {
      label: 'Stage 2',
      name: 'Embedded systems',
      items: [
        { year: '2023', text: "Bachelor's degree in Embedded Systems, ISIMM" },
        { year: '2023', text: 'CRMN — AI-assisted telemedicine mobile robot' },
        { year: '2025', text: 'ROS code foundation — The Construct' },
      ],
    },
    {
      label: 'Stage 3',
      name: 'Artificial intelligence',
      items: [
        { year: '2024', text: 'Dräxlmaier — ensemble forecasting, 95% accuracy' },
        { year: '2024', text: 'NVIDIA DLI — deep learning & AI for predictive maintenance' },
        { year: '2025', text: 'Leoni — predictive analytics in a full-stack platform' },
      ],
    },
    {
      label: 'Stage 4',
      name: 'Intelligent systems',
      items: [
        { year: '2026', text: 'Engineering degree, ESPRIM' },
        { year: '2026', text: 'ACTIA — Edge Sense AI, federated edge AI for predictive maintenance' },
      ],
    },
  ] satisfies readonly TrajectoryStage[],
} as const;

/* ------------------------------------------------------------------ */
/* §08 Contact & footer                                                */
/* ------------------------------------------------------------------ */

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly icon: IconName;
  /** Opens in a new tab; `noreferrer` is added for third-party sites. */
  readonly newTab?: 'internal' | 'external';
}

export const contact = {
  section: { num: '§08', label: 'Contact', note: 'E-mail preferred' } satisfies SectionMeta,
  heading: "Let's build systems that *think at the edge.*" satisfies Rich,
  email: person.email,
  copy: { idle: 'Copy', done: 'Copied', failed: 'Select & copy', resetAfterMs: 2000 },
  channels: [
    { label: 'LinkedIn', value: 'in/rhim-yosra', href: 'https://www.linkedin.com/in/rhim-yosra-135a51251/', icon: 'ext', newTab: 'external' },
    { label: 'GitHub', value: '@YosraRhim', href: 'https://github.com/YosraRhim', icon: 'ext', newTab: 'external' },
    { label: 'Curriculum vitae', value: 'CV · PDF', href: links.cv, icon: 'down', newTab: 'internal' },
    { label: 'Phone', value: '+216 92 187 090', href: 'tel:+21692187090', icon: 'ext' },
  ] satisfies readonly ContactChannel[],
} as const;

export const footer = {
  /** Shown in the pre-rendered HTML; replaced by the current year in the browser. */
  year: 2026,
  owner: 'Yosra Rhim · Monastir, Tunisia',
  note: 'Hand-built HTML, CSS & JS · no tracking',
  backToTop: 'Back to top ↑',
} as const;
