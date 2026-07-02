import { gsap } from "gsap";

export const createTimeline = (defaults?: GSAPTimelineVars): gsap.core.Timeline =>
  gsap.timeline(defaults);
