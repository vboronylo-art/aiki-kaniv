export type ThrowPhase = 
  | 'Kamae'     // On-guard / Posture & Stance
  | 'Ma-ai'     // Distance & Timing
  | 'Irimi'     // Entering into the center
  | 'Tenkan'    // Circular pivot / redirection
  | 'Kuzushi'   // Off-balancing
  | 'Nage'      // Projection / Dynamic throw
  | 'Ukemi'     // Breakfall & roll
  | 'Zanshin';   // Remaining spirit / meditative awareness

export interface KeyframeMarker {
  id: string;
  time: number; // in seconds
  label: string;
  labelEn?: string;
  japaneseTerm: string;
  phase: ThrowPhase;
  description: string;
  descriptionEn?: string;
  haraPosition: { x: number; y: number }; // percentage coordinates (0-100)
  vectorAngle: number; // angle in degrees
  vectorMagnitude: number; // 0-100
  notes: string;
  notesEn?: string;
}

export interface CinematicTake {
  id: string;
  title: string;
  titleEn?: string;
  japaneseTitle: string;
  cameraPerspective: string;
  cameraPerspectiveEn?: string;
  lensType: string;
  duration: number; // duration in seconds
  description: string;
  descriptionEn?: string;
  imagePath: string;
  aspectRatio: string;
  ambientLight: string;
  ambientLightEn?: string;
  primaryTechnique: string;
  primaryTechniqueEn?: string;
  keyPractitioners: string;
  keyPractitionersEn?: string;
  philosophicalConcept: string;
  philosophicalConceptEn?: string;
  keyframes: KeyframeMarker[];
}

export type PlaybackSpeed = 0.1 | 0.25 | 0.5 | 1.0;

export type VisualFilter = 'amber-lantern' | 'sumi-ink' | 'dnieper-dusk' | 'natural-tatami';
