import type { Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §06 Research interests — interests, not completed research.         */
/* ------------------------------------------------------------------ */

export type TopicGlyph = 'federated' | 'chip' | 'signal' | 'target' | 'network' | 'bolt';

export interface Topic {
  readonly idx: string;
  readonly glyph: TopicGlyph;
  readonly title: string;
  readonly question: string;
  readonly link: {
    readonly label: string;
    readonly text: string;
    /** Marks a direction not yet backed by a project. */
    readonly next?: boolean;
  };
}

export const researchSection: SectionMeta = { num: '§06', label: 'Research interests', note: 'Interests — not completed research' };

export const researchIntro = {
  title: 'Questions I want\n*to work on.*' satisfies Rich,
  body: 'These are the directions I would like to pursue in doctoral research or advanced R&D. Each one grows out of a system I have already built — or, where marked, out of a gap I want to close.',
};

export const topics: readonly Topic[] = [
  {
    idx: 'R.01',
    glyph: 'federated',
    title: 'Federated learning',
    question: 'How can federated models stay robust when industrial sites hold non-IID data of very different sizes and failure profiles?',
    link: { label: 'Grounded in', text: 'Weighted FedAvg and profile rotation in Edge Sense AI' },
  },
  {
    idx: 'R.02',
    glyph: 'chip',
    title: 'Edge AI',
    question: 'What is the smallest model that still anticipates a failure in time — and can inference and learning run on the device itself?',
    link: { label: 'Grounded in', text: 'On-site sliding-window GRU inference' },
  },
  {
    idx: 'R.03',
    glyph: 'signal',
    title: 'Intelligent embedded systems',
    question: 'Closing the loop from sensing to inference to actuation on microcontrollers, with safety built in.',
    link: { label: 'Grounded in', text: 'ESP32-CAM fire detection with MQTT-driven actuation' },
  },
  {
    idx: 'R.04',
    glyph: 'target',
    title: 'Predictive maintenance',
    question: 'Time-series failure prediction where thresholds reflect the real cost asymmetry between a missed failure and a false alarm.',
    link: { label: 'Grounded in', text: 'Recall-first GRU · NVIDIA DLI, AI for predictive maintenance' },
  },
  {
    idx: 'R.05',
    glyph: 'network',
    title: 'Deep learning',
    question: 'Sequence models for sensor data — from recurrent networks to attention-based architectures.',
    link: { label: 'Grounded in', text: 'GRU design · Transformers in GenAI projects' },
  },
  {
    idx: 'R.06',
    glyph: 'bolt',
    title: 'AI hardware acceleration',
    question: 'Quantisation, pruning and accelerator-aware deployment for microcontroller-class and embedded targets.',
    link: { label: 'Next step', text: 'Not yet in my portfolio — a direction I want to explore.', next: true },
  },
];
