import type { Rich, SectionMeta, Spec } from './types';

/* ------------------------------------------------------------------ */
/* §02 Featured case study — Edge Sense AI                             */
/* Source: CV, PFE technical file and deployment diagram.              */
/* ------------------------------------------------------------------ */

export const caseSection: SectionMeta = { num: '§02', label: 'Featured project', note: 'Final-year project · 2026' };

export const caseIntro = {
  label: 'ACTIA Engineering Services · Tunis',
  name: 'Edge Sense *AI*' satisfies Rich,
  sub: 'AI that predicts machine failures. Each site learns locally and shares only its model — never its raw data.',
  meta: [
    { term: 'Context', value: 'Final-year project · ESPRIM × ACTIA' },
    { term: 'Period', value: 'Feb – Jun 2026' },
    { term: 'Role', value: 'AI engineer' },
    { term: 'Stack', value: 'GRU · FedAvg · MQTT · Spring Boot · React · Docker' },
  ] satisfies readonly Spec[],
};

/* ------------------------------------------------------------------ */
/* Architecture diagram (Fig. 02)                                      */
/* ------------------------------------------------------------------ */

export type NodeKey = 'edge' | 'broker' | 'backend' | 'ai' | 'db' | 'vol' | 'front' | 'admin';
export type EdgeKey = 'mqtt' | 'notify' | 'fedavg' | 'db' | 'vol' | 'ws' | 'http';
export type PathId = 'p-e1' | 'p-e2' | 'p-e3' | 'p-n' | 'p-f' | 'p-db' | 'p-v' | 'p-ws' | 'p-h';

export interface Box {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface DiagramZone extends Box {
  readonly label: string;
}

export interface DiagramNode extends Box {
  readonly key: NodeKey;
  readonly title: string;
  readonly detail: string;
  readonly dashed?: boolean;
}

export interface DiagramEdge {
  readonly key: EdgeKey;
  readonly paths: readonly { readonly id: PathId; readonly d: string; readonly arrowStart?: boolean }[];
  readonly label: { readonly x: number; readonly y: number; readonly text: string };
}

export interface Highlight {
  readonly nodes: readonly NodeKey[];
  readonly edges: readonly EdgeKey[];
}

export type RoundAction =
  | { readonly type: 'wait'; readonly ms: number }
  | { readonly type: 'packets'; readonly paths: readonly PathId[]; readonly ms: number };

export interface RoundStep extends Highlight {
  readonly text: Rich;
  readonly actions: readonly RoundAction[];
}

export type BomTarget = 'edge' | 'broker' | 'backend' | 'ai' | 'db' | 'front';

export interface BomItem {
  readonly idx: string;
  readonly target: BomTarget;
  readonly name: string;
  readonly tag?: string;
  readonly description: string;
}

/** Connections, drawn before the nodes. Path ids are used by the packet animation. */
const diagramEdges: readonly DiagramEdge[] = [
  {
    key: 'mqtt',
    paths: [
      { id: 'p-e1', d: 'M200 112 C 250 112, 250 102, 320 102' },
      { id: 'p-e2', d: 'M200 232 C 260 232, 250 112, 320 108' },
      { id: 'p-e3', d: 'M200 352 C 270 352, 250 122, 320 114' },
    ],
    label: { x: 26, y: 424, text: '→ MQTT · QoS 1 · W_k' },
  },
  { key: 'notify', paths: [{ id: 'p-n', d: 'M410 140 V 192' }], label: { x: 418, y: 172, text: 'weights' } },
  { key: 'fedavg', paths: [{ id: 'p-f', d: 'M410 260 V 312' }], label: { x: 418, y: 292, text: 'FedAvg' } },
  { key: 'db', paths: [{ id: 'p-db', d: 'M500 226 H 552', arrowStart: true }], label: { x: 506, y: 218, text: 'SQL' } },
  { key: 'vol', paths: [{ id: 'p-v', d: 'M500 346 H 552' }], label: { x: 504, y: 338, text: 'W_global' } },
  { key: 'ws', paths: [{ id: 'p-ws', d: 'M470 192 V 160 H 760 V 226 H 800' }], label: { x: 590, y: 152, text: 'REST + WebSocket (STOMP)' } },
  { key: 'http', paths: [{ id: 'p-h', d: 'M866 260 V 312' }], label: { x: 874, y: 292, text: 'HTTP' } },
];

export const architecture = {
  block: { num: '01', title: 'How it works', note: 'Fig. 02 · interactive' },
  viewBox: '0 0 960 470',
  title: 'Edge Sense AI deployment architecture',
  description:
    'Three edge clients publish GRU weights over MQTT with QoS 1 to a Mosquitto broker. The Spring Boot backend aggregates them with FedAvg, works with a FastAPI AI service and a PostgreSQL database, stores the global weights in a Docker volume, and pushes updates to a React dashboard over REST and WebSocket.',
  zones: [
    { x: 12, y: 24, w: 216, h: 420, label: 'ZONE EDGE · 3 SITES' },
    { x: 292, y: 24, w: 452, h: 420, label: 'DOCKER COMPOSE · 6 SERVICES' },
    { x: 784, y: 24, w: 164, h: 420, label: 'ZONE CLIENT' },
  ] satisfies readonly DiagramZone[],
  edges: diagramEdges,
  nodes: [
    { key: 'edge', x: 36, y: 80, w: 164, h: 64, title: 'edge-scripts · site 1', detail: 'GRU · sliding window' },
    { key: 'edge', x: 36, y: 200, w: 164, h: 64, title: 'edge-scripts · site 2', detail: 'GRU · sliding window' },
    { key: 'edge', x: 36, y: 320, w: 164, h: 64, title: 'edge-scripts · site 3', detail: 'GRU · sliding window' },
    { key: 'broker', x: 320, y: 76, w: 180, h: 64, title: 'Mosquitto', detail: 'MQTT broker · :1883' },
    { key: 'backend', x: 320, y: 192, w: 180, h: 68, title: 'Spring Boot backend', detail: 'REST · JWT · :9096' },
    { key: 'ai', x: 320, y: 312, w: 180, h: 64, title: 'AI service', detail: 'FastAPI · :8000' },
    { key: 'db', x: 552, y: 194, w: 168, h: 64, title: 'PostgreSQL 16', detail: 'persistent store · :5432' },
    { key: 'vol', x: 552, y: 314, w: 168, h: 64, title: '/weights volume', detail: 'global model W_global', dashed: true },
    { key: 'front', x: 800, y: 196, w: 132, h: 64, title: 'React dashboard', detail: 'fleet UI · :3000' },
    { key: 'admin', x: 800, y: 312, w: 132, h: 64, title: 'Administrator', detail: 'alerts · reports' },
  ] satisfies readonly DiagramNode[],
  mobileNote: 'Diagram simplified on small screens — the components are listed below.',
  sideHead: 'Components · select to inspect',
  bom: [
    { idx: 'A', target: 'edge', name: 'Edge clients', tag: '×3', description: 'One per site: trains locally, sends weights only.' },
    { idx: 'B', target: 'broker', name: 'Mosquitto', tag: 'MQTT', description: 'Carries the weights.' },
    { idx: 'C', target: 'backend', name: 'Spring Boot', tag: 'Java', description: 'API, security (JWT) and FedAvg.' },
    { idx: 'D', target: 'ai', name: 'AI service', tag: 'FastAPI', description: 'Python model service.' },
    { idx: 'E', target: 'db', name: 'PostgreSQL', tag: '+ volume', description: 'Stores data and the global model.' },
    { idx: 'F', target: 'front', name: 'React dashboard', description: 'Live monitoring and alerts.' },
  ] satisfies readonly BomItem[],
  /** What lights up when a component is selected in the list. */
  relations: {
    edge: { nodes: ['edge'], edges: ['mqtt'] },
    broker: { nodes: ['broker', 'edge', 'backend'], edges: ['mqtt', 'notify'] },
    backend: { nodes: ['backend', 'broker', 'ai', 'db', 'front'], edges: ['notify', 'fedavg', 'db', 'ws'] },
    ai: { nodes: ['ai', 'backend', 'vol'], edges: ['fedavg', 'vol'] },
    db: { nodes: ['db', 'vol', 'backend', 'ai'], edges: ['db', 'vol'] },
    front: { nodes: ['front', 'admin', 'backend'], edges: ['ws', 'http'] },
  } satisfies Readonly<Record<BomTarget, Highlight>>,
  round: {
    startLabel: 'Run a federated round',
    againLabel: 'Run another round',
    idle: 'Run a round, or select a component.' satisfies Rich,
    complete: '**Round complete.** Run it again, or select a component.' satisfies Rich,
    /** Reduced motion: packets are skipped and waits are capped. */
    reducedPacketMs: 700,
    reducedMaxWaitMs: 900,
    steps: [
      {
        nodes: ['edge'],
        edges: [],
        text: '**1 · Train.** Each site trains its model on its own data.',
        actions: [{ type: 'wait', ms: 1500 }],
      },
      {
        nodes: ['edge', 'broker'],
        edges: ['mqtt'],
        text: '**2 · Share.** Only the model weights are sent, over MQTT.',
        actions: [
          { type: 'packets', paths: ['p-e1', 'p-e2', 'p-e3'], ms: 1300 },
          { type: 'wait', ms: 400 },
        ],
      },
      {
        nodes: ['broker', 'backend', 'ai'],
        edges: ['notify', 'fedavg'],
        text: '**3 · Combine.** The backend averages them with FedAvg.',
        actions: [
          { type: 'packets', paths: ['p-n'], ms: 700 },
          { type: 'packets', paths: ['p-f'], ms: 700 },
          { type: 'wait', ms: 500 },
        ],
      },
      {
        nodes: ['ai', 'vol', 'db', 'backend', 'front', 'admin'],
        edges: ['vol', 'db', 'ws', 'http'],
        text: '**4 · Update.** The new model is saved and the dashboard updates live.',
        actions: [
          { type: 'packets', paths: ['p-v', 'p-db', 'p-ws'], ms: 1200 },
          { type: 'wait', ms: 1400 },
        ],
      },
    ] satisfies readonly RoundStep[],
  },
  figure: 'Fig. 02',
  caption: "Redrawn from the project's deployment diagram." satisfies Rich,
};

/* ------------------------------------------------------------------ */
/* Results & my role                                                   */
/* ------------------------------------------------------------------ */

/** Local GRU, evaluation set — figures from the project technical file. */
export const results = {
  block: { num: '02', title: 'Results', note: 'Local GRU model' },
  kpis: [
    { term: 'Accuracy', value: '0.943', detail: 'Correct predictions' },
    { term: 'Recall', value: '0.939', detail: 'Failures detected' },
    { term: 'AUC-ROC', value: '0.983', detail: 'Ranking quality' },
  ],
};

export const contribution = {
  block: { num: '03', title: 'My role' },
  items: [
    '**Designed** the federated-learning architecture and the local GRU model.',
    '**Built** the Spring Boot backend and the real-time React dashboard.',
    '**Deployed** the whole system with Docker; model weights travel over MQTT.',
  ] satisfies readonly Rich[],
  disclaimer: 'Industry project with ACTIA — source code is not public.',
};
