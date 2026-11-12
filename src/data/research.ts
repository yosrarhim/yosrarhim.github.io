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
  body: 'Topics I would like to explore further, in R&D or doctoral research — each one linked to work I have already done.',
};

export const topics: readonly Topic[] = [
  {
    idx: 'R.01',
    glyph: 'federated',
    title: 'Federated learning',
    question: 'Robust models when every site has very different data.',
    link: { label: 'Grounded in', text: 'Edge Sense AI' },
  },
  {
    idx: 'R.02',
    glyph: 'chip',
    title: 'Edge AI',
    question: 'Small models that run and learn on the device itself.',
    link: { label: 'Grounded in', text: 'On-site GRU inference' },
  },
  {
    idx: 'R.03',
    glyph: 'signal',
    title: 'Intelligent embedded systems',
    question: 'From sensing to decision to action on microcontrollers, safely.',
    link: { label: 'Grounded in', text: 'ESP32-CAM fire extinguisher' },
  },
  {
    idx: 'R.04',
    glyph: 'target',
    title: 'Predictive maintenance',
    question: 'Predicting failures early enough to act, with few false alarms.',
    link: { label: 'Grounded in', text: 'Edge Sense AI · NVIDIA DLI certificate' },
  },
  {
    idx: 'R.05',
    glyph: 'network',
    title: 'Deep learning',
    question: 'Sequence models for sensor data, from RNNs to attention.',
    link: { label: 'Grounded in', text: 'GRU model · Transformer projects' },
  },
  {
    idx: 'R.06',
    glyph: 'bolt',
    title: 'AI hardware acceleration',
    question: 'Making models smaller and faster for embedded chips.',
    link: { label: 'Next step', text: 'A direction I want to explore.', next: true },
  },
];
