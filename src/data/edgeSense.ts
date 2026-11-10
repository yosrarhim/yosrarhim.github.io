import type { Rich, SectionMeta, Spec } from './types';

/* ------------------------------------------------------------------ */
/* §02 Featured case study — Edge Sense AI                             */
/* Source: CV, PFE technical file and deployment diagram.              */
/* ------------------------------------------------------------------ */

export const caseSection: SectionMeta = { num: '§02', label: 'Featured case study', note: 'Final-year project · 2026' };

export const caseIntro = {
  label: 'ACTIA Engineering Services · Tunis',
  name: 'Edge Sense *AI*' satisfies Rich,
  sub: 'Federated edge AI for industrial predictive maintenance — learning from every site without moving a single raw sample.',
  meta: [
    { term: 'Context', value: 'Final-year engineering project (PFE), ESPRIM × ACTIA Engineering Services' },
    { term: 'Period', value: 'Feb – Jun 2026' },
    { term: 'Role', value: 'AI engineer — architecture, local model, backend, dashboard, deployment' },
    { term: 'Stack', value: 'GRU · FedAvg · MQTT (Mosquitto) · Spring Boot · FastAPI · React · PostgreSQL · Docker Compose' },
    { term: 'Code', value: 'Industry project — source not public' },
  ] satisfies readonly Spec[],
};

export interface Argument {
  readonly kicker: string;
  readonly title: string;
  readonly body: Rich;
}

export const problemApproach: readonly Argument[] = [
  {
    kicker: '01 — Problem',
    title: 'Failure data is valuable, sensitive and scattered.',
    body: "Industrial machines produce continuous sensor streams, but each plant only sees its own machines and its own failure modes. **Centralising raw data** raises confidentiality and GDPR concerns and moves large volumes over the network — yet a model trained on a single site generalises poorly.",
  },
  {
    kicker: '02 — Approach',
    title: 'Move the model, not the data.',
    // TODO(confirm, Q8): is the 500-machine fleet real or simulated?
    body: "Each site runs a **local GRU** on sliding windows of its own sensor stream and publishes only its **model weights** over MQTT. A Spring Boot backend aggregates them with **FedAvg**, weighted by each site's sample count, and the global model is stored and redistributed — while a real-time dashboard monitors a 500-machine fleet.",
  },
];

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
  block: { num: '03', title: 'System architecture', note: 'Fig. 02' },
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
    { idx: 'A', target: 'edge', name: 'Edge clients', tag: '×3', description: 'One per site. Sliding-window inference + local GRU training; publish weights only.' },
    { idx: 'B', target: 'broker', name: 'Mosquitto', tag: 'MQTT', description: 'Lightweight pub/sub transport for weights, QoS 1 (at-least-once).' },
    { idx: 'C', target: 'backend', name: 'Spring Boot', tag: 'Java', description: 'REST API, JWT auth, FedAvg aggregation, WebSocket push, round report e-mail with iText PDF.' },
    { idx: 'D', target: 'ai', name: 'AI service', tag: 'FastAPI', description: 'Python model service alongside the backend.' },
    { idx: 'E', target: 'db', name: 'PostgreSQL', tag: '+ volume', description: 'Persistent state; global weights stored in a Docker volume.' },
    { idx: 'F', target: 'front', name: 'React dashboard', description: 'Fleet map, health breakdown, live FL round status, alerts & logs, users.' },
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
    idle: 'Select a component, or run a round to follow one aggregation cycle.' satisfies Rich,
    complete: '**Round complete.** The next round brings new machine profiles to every site.' satisfies Rich,
    /** Reduced motion: packets are skipped and waits are capped. */
    reducedPacketMs: 700,
    reducedMaxWaitMs: 900,
    steps: [
      {
        nodes: ['edge'],
        edges: [],
        text: '**1 · Local training.** Each site trains its GRU on sliding windows of its own sensor stream. Raw data never leaves the site.',
        actions: [{ type: 'wait', ms: 1500 }],
      },
      {
        nodes: ['edge', 'broker'],
        edges: ['mqtt'],
        text: '**2 · Publish.** Only the weights W_{k} are published to Mosquitto over MQTT, QoS 1.',
        actions: [
          { type: 'packets', paths: ['p-e1', 'p-e2', 'p-e3'], ms: 1300 },
          { type: 'wait', ms: 400 },
        ],
      },
      {
        nodes: ['broker', 'backend', 'ai'],
        edges: ['notify', 'fedavg'],
        text: '**3 · Aggregate.** The backend computes W_{global} = Σ n_{k}W_{k} / Σ n_{k} — in under 500 ms.',
        actions: [
          { type: 'packets', paths: ['p-n'], ms: 700 },
          { type: 'packets', paths: ['p-f'], ms: 700 },
          { type: 'wait', ms: 500 },
        ],
      },
      {
        nodes: ['ai', 'vol', 'db', 'backend', 'front', 'admin'],
        edges: ['vol', 'db', 'ws', 'http'],
        text: '**4 · Persist & broadcast.** The global model is stored, the dashboard updates live over WebSocket and a PDF round report is e-mailed.',
        actions: [
          { type: 'packets', paths: ['p-v', 'p-db', 'p-ws'], ms: 1200 },
          { type: 'wait', ms: 1400 },
        ],
      },
    ] satisfies readonly RoundStep[],
  },
  figure: 'Fig. 02',
  caption: "Redrawn from the project's deployment diagram. One command — `docker compose up -d` — starts all six services." satisfies Rich,
};

/* ------------------------------------------------------------------ */
/* Federated strategy                                                  */
/* ------------------------------------------------------------------ */

export const federated = {
  block: { num: '04', title: 'Federated strategy', note: 'Cross-device FL' },
  intro:
    'If the same clients contribute the same data every round, the global model stops learning after round one. Edge Sense AI ==rotates machine profiles between rounds==, so each round brings new sensor behaviour — the model becomes more general without any raw data being shared.' satisfies Rich,
  table: {
    caption: 'Machine profiles per site and round — from the project technical file.',
    columns: ['Round', 'Site 1', 'Site 2', 'Site 3'],
    rows: [
      {
        round: 'R1 · light',
        cells: [
          { machine: 'Air compressor', profile: 'low temp, normal vib.' },
          { machine: 'Hydraulic pump', profile: 'normal temp, high vib.' },
          { machine: 'Electric motor', profile: 'very high vib.' },
        ],
      },
      {
        round: 'R2 · medium',
        cells: [
          { machine: 'Industrial conveyor', profile: 'slow degradation' },
          { machine: 'Welding robot', profile: 'short cycles, variable temp' },
          { machine: 'Rotary compressor', profile: 'periodic vibration' },
        ],
      },
      {
        round: 'R3 · heavy',
        cells: [
          { machine: 'Industrial turbine', profile: 'continuous high temp' },
          { machine: 'Hydraulic press', profile: 'pressure peaks' },
          { machine: 'Centrifugal pump', profile: 'variable flow' },
        ],
      },
    ],
  },
  fedavg: {
    label: 'Aggregation · FedAvg',
    formulaAriaLabel: 'W global equals the sum over k of n k times W k, divided by the sum of n k',
    weights: [
      { site: 'Site 1', share: '100%', samples: '200 000' },
      { site: 'Site 2', share: '75%', samples: '150 000' },
      { site: 'Site 3', share: '75%', samples: '150 000' },
    ],
    note: 'Sample-weighted averaging reflects realistic non-IID sites of unequal size. Aggregation time: ==< 500 ms==. After each round, the administrator receives an HTML e-mail with a PDF report of the round metrics.' satisfies Rich,
  },
};

/* ------------------------------------------------------------------ */
/* Local model & on-device inference                                   */
/* ------------------------------------------------------------------ */

export interface PipeStep {
  readonly title: Rich;
  readonly detail: string;
  readonly thresholds?: readonly { readonly level: 'n' | 'w' | 'c'; readonly label: string }[];
}

export const localModel = {
  block: { num: '05', title: 'Local model & on-device inference', note: 'GRU' },
  pipeline: [
    { title: 'Real-time sensor stream', detail: 'Temperature, vibration and related machine signals.' },
    { title: 'Sliding window', detail: 'Fixed-length sequences fed to the recurrent model.' },
    { title: 'GRU with local weights W_{k}', detail: 'Two outputs: a failure probability, and updated weights for federation.' },
    {
      title: 'Business thresholds',
      detail: 'Probability mapped to a machine state, streamed to the dashboard as alerts.',
      thresholds: [
        { level: 'n', label: 'NORMAL' },
        { level: 'w', label: 'WARNING' },
        { level: 'c', label: 'CRITICAL ≥ 0.70' },
      ],
    },
    { title: 'MQTT → FedAvg', detail: 'Only W_{k} leaves the site.' },
  ] satisfies readonly PipeStep[],
  spec: [
    { term: 'Architecture', value: 'GRU × 2 layers (128 → 64) + LayerNorm + Dropout 0.2 + Dense 64 → 32 → 16 → 1' },
    { term: 'Dataset', value: '500 000 observations' },
    { term: 'Augmentation', value: 'Bootstrap, 30%' },
    { term: 'Output', value: 'Failure probability (binary: normal / failure)' },
    { term: 'Decision', value: 'Optimal threshold 0.819 on the validation distribution; critical alert at 0.70' },
  ] satisfies readonly Spec[],
};

/* ------------------------------------------------------------------ */
/* Results (Fig. 03)                                                   */
/* ------------------------------------------------------------------ */

export const results = {
  block: { num: '06', title: 'Results', note: 'Local GRU · evaluation set' },
  kpis: [
    { term: 'Recall', value: '0.939', detail: 'Failures detected' },
    { term: 'AUC-ROC', value: '0.983', detail: 'Ranking quality' },
  ],
  note: "In predictive maintenance a missed failure costs far more than a false alarm, so recall was prioritised while keeping every metric above the project's 0.80 target.",
  chart: {
    ariaLabel: 'Bar chart of local GRU metrics: accuracy 0.943, recall 0.939, F1 0.884, precision 0.835, AUC-ROC 0.983. Target 0.80.',
    metrics: [
      { label: 'Accuracy', value: 0.943, display: '0.943' },
      { label: 'Recall', value: 0.939, display: '0.939' },
      { label: 'F1-score', value: 0.884, display: '0.884' },
      { label: 'Precision', value: 0.835, display: '0.835' },
      { label: 'AUC-ROC', value: 0.983, display: '0.983' },
    ],
    axis: ['0', '0.5', '1.0'],
    legend: 'Project target ≥ 0.80',
    figure: 'Fig. 03',
    caption: 'Local GRU performance, as reported in the project technical file.',
  },
};

/* ------------------------------------------------------------------ */
/* Engineering decisions & contribution                                */
/* ------------------------------------------------------------------ */

export const decisions = {
  block: { num: '07', title: 'Engineering decisions' },
  items: [
    { id: 'D1', title: 'Share weights, not data', body: 'Raw sensor data stays on site. Only model parameters travel, which addresses confidentiality, GDPR and bandwidth at once.' },
    { id: 'D2', title: 'MQTT with QoS 1', body: "A lightweight publish/subscribe protocol suited to constrained edge devices, with at-least-once delivery so no site's update is silently lost." },
    { id: 'D3', title: 'Sample-weighted FedAvg', body: 'Sites hold unequal amounts of non-IID data (200k / 150k / 150k samples); weighting by n_{k} lets each site contribute in proportion.' },
    { id: 'D4', title: 'Rotating machine profiles', body: 'New machine types each round keep the global model learning instead of re-averaging the same distribution.' },
    { id: 'D5', title: 'Recall-first thresholds', body: 'Decision thresholds tuned on the probability distribution, with explicit NORMAL / WARNING / CRITICAL states operators can act on.' },
    { id: 'D6', title: 'One-command deployment', body: 'Six services in Docker Compose — broker, backend, AI service, database, edge scripts, frontend — for reproducible demos and handover.' },
  ] satisfies readonly { id: string; title: string; body: Rich }[],
};

export const contribution = {
  block: { num: '08', title: 'My contribution' },
  items: [
    '**Designed** the edge-AI / federated-learning architecture (FedAvg) for predictive fault detection without centralising raw data.',
    '**Built and evaluated** the local GRU model (0.943 accuracy, 0.983 AUC-ROC) and its secure weight transmission over MQTT.',
    '**Implemented** the Spring Boot backend: REST API, JWT authentication and FedAvg aggregation.',
    '**Developed** the real-time React dashboard (WebSocket / STOMP) with fleet monitoring, automated alerts and round reports.',
    '**Containerised** the full solution as six Docker Compose services for one-command deployment.',
  ] satisfies readonly Rich[],
  stack: [
    { group: 'Machine learning', tags: ['Python', 'GRU', 'FedAvg', 'FastAPI'] },
    { group: 'Edge & transport', tags: ['MQTT', 'Mosquitto', 'QoS 1'] },
    { group: 'Platform', tags: ['Spring Boot', 'JWT', 'React', 'WebSocket / STOMP', 'PostgreSQL', 'iText'] },
    { group: 'Delivery', tags: ['Docker', 'Docker Compose'] },
  ],
  disclaimer:
    'Industry partner project with ACTIA Engineering Services: source code and production screenshots are not published. Figures on this page are redrawn from the project documentation.',
};
