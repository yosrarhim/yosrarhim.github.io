import type { InlineSegment, Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §03 Selected work                                                   */
/* Repository links point to public GitHub repositories only.          */
/* ------------------------------------------------------------------ */

export interface Project {
  readonly idx: string;
  readonly name: string;
  readonly kind: string;
  /** Short source label shown in the collapsed row. */
  readonly source: string;
  readonly problem: string;
  readonly approach: string;
  /** Optional mini schematic (e.g. architecture or pipeline). */
  readonly schematic?: {
    readonly heading: string;
    readonly ariaLabel: string;
    readonly steps: readonly string[];
  };
  readonly stack: readonly string[];
  /** Public repository, or `null` when the source is not public. */
  readonly repository: string | null;
}

export const workSection: SectionMeta = { num: '§03', label: 'Selected work', note: 'Embedded · Vision · GenAI · Platforms' };

export const workIntro = {
  title: 'Other systems, *end to end.*' satisfies Rich,
  body: 'Each entry states the problem, the technical approach and what I built. Repository links point to my public GitHub; where none exists, it is said.',
  labels: {
    problem: 'Problem',
    approach: 'Approach',
    stack: 'Stack',
    repository: 'Repository',
    notPublic: 'Source not public',
  },
};

export const projects: readonly Project[] = [
  {
    idx: 'P.01',
    name: 'IoT-AI Fire Extinguisher',
    kind: 'Embedded systems · Computer vision · IoT',
    source: 'GitHub',
    problem: 'Detect a fire from a low-cost camera and trigger suppression automatically, without a human in the loop.',
    // TODO(confirm, Q7): was YOLOv3-Tiny actually used in this project?
    approach:
      'An ESP32-CAM streams video to a Python vision node. The published detector combines HSV flame-colour profiles, contour circularity and temporal motion analysis (MOG2 background subtraction); the CV project description also cites YOLOv3-Tiny. On detection, an MQTT message drives a second ESP32 that switches relays for the pump and alarm, with a 60-second automatic shut-off as a safety measure.',
    schematic: {
      heading: 'Architecture',
      ariaLabel: 'ESP32-CAM, then vision node, then MQTT, then ESP32 relay node, then pump and alarm',
      steps: ['ESP32-CAM', 'Vision node · OpenCV', 'MQTT', 'ESP32 · relays', 'Pump · alarm'],
    },
    stack: ['ESP32-CAM', 'ESP32', 'Python', 'OpenCV', 'MQTT · PubSubClient', 'C/C++ · Arduino'],
    repository: 'https://github.com/yosrarhim/IoT-AI-Fire-Extinguisher-System',
  },
  {
    idx: 'P.02',
    name: 'Smart Chatbot — RAG',
    kind: 'Generative AI · NLP · Retrieval',
    source: 'GitHub',
    problem: 'Answer questions with contextual, grounded responses rather than free-form generation.',
    approach:
      'A retrieval-augmented pipeline: documents are embedded with a sentence-transformers model (all-MiniLM-L6-v2) into a FAISS index; the top-k passages are assembled into a numbered context prompt and passed to a configurable Hugging Face causal language model. A Flask API returns the answer together with its source identifiers.',
    schematic: {
      heading: 'Pipeline',
      ariaLabel: 'Question, then embedding, then FAISS top-k, then prompt, then language model, then answer with sources',
      steps: ['Question', 'Embed', 'FAISS top-k', 'Prompt', 'LLM', 'Answer + sources'],
    },
    stack: ['Python', 'Transformers', 'sentence-transformers', 'FAISS', 'PyTorch', 'Flask'],
    repository: 'https://github.com/yosrarhim/Smart-Chatbot-AI',
  },
  {
    idx: 'P.03',
    name: 'Smart Stage',
    kind: 'Full-stack · Predictive analytics · Leoni, 2025',
    source: 'GitHub',
    problem: 'Internship management at Leoni relied on manual follow-up of tasks, logbooks and reports.',
    approach:
      'A full-stack web platform for interns, coaches and administrators, with predictive analytics for automated task recommendations (+30% efficiency), Power BI dashboards and secure JWT authentication with role-based access control.',
    stack: ['Node.js', 'Express', 'React', 'MongoDB', 'Power BI', 'JWT · RBAC'],
    repository: 'https://github.com/yosrarhim/Smart-Stage-AI-Powered-Internship-Management-Platform-',
  },
  {
    idx: 'P.04',
    name: 'AI Knowledge Assistant',
    kind: 'Generative AI · Summarisation',
    source: 'No public repo',
    problem: 'Technical documentation is long and slow to consult.',
    approach: 'A generative AI assistant that summarises technical documents, built with Transformer models from Hugging Face and served through Flask.',
    stack: ['Python', 'Hugging Face Transformers', 'Flask'],
    repository: null,
  },
];

export const alsoOnGitHub: readonly InlineSegment[] = [
  'Also on GitHub: ',
  { label: 'OpenCV image-processing labs', href: 'https://github.com/yosrarhim/monprojet' },
  ' (filtering, Canny edges, thresholding, shape detection) · ',
  { label: 'all repositories', href: 'https://github.com/YosraRhim' },
  '.',
];
