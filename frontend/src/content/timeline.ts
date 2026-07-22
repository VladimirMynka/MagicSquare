/* START_MODULE research_timeline */
/* START_CONTRACT
PURPOSE: Hold the author-reviewed bilingual chronology of the Magic Squares project.
MATHEMATICAL_SCOPE: Historical metadata only; no event is evidence for a mathematical claim.
PUBLIC_SURFACE: TimelineEvent, TimelineMoment, researchTimeline.
KEYWORDS: timeline, chronology, attribution, source-records
COMPLEXITY: 2
END_CONTRACT */

import type { Locale } from "../i18n";

export type TimelineSide = "above" | "below";
export type TimelineVisualKind =
  | "atlas"
  | "code"
  | "coordinates"
  | "document"
  | "formula"
  | "language"
  | "mask"
  | "publication";

export interface TimelineVisual {
  kind: TimelineVisualKind;
  mark: string;
  detail?: string;
  familyId?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  summary: string;
  commit: string;
  side: TimelineSide;
  visual: TimelineVisual;
}

export interface TimelineMoment {
  date: string;
  events: readonly TimelineEvent[];
}

interface BilingualTimelineEvent extends Omit<TimelineEvent, "title" | "summary"> {
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
}

interface BilingualTimelineMoment {
  date: string;
  events: readonly BilingualTimelineEvent[];
}

// Events are intentionally empty until the chronology is reconstructed with the author.
// A supporting commit can be attached to each future event without making Git history
// the source of the event's interpretation or importance.
const TIMELINE: readonly BilingualTimelineMoment[] = [];

/* START_FUNCTION researchTimeline */
/* START_CONTRACT
PURPOSE: Return the author-reviewed chronology in the requested language.
CONTRACT: Preserve dates, supporting commit references, ordering, sides, and visuals; localize prose only.
FAILURE_MEANING: Missing localized copy would expose untranslated or unreviewed history.
KEYWORDS: localization, historical-record
COMPLEXITY: 2
END_CONTRACT */
export function researchTimeline(locale: Locale): readonly TimelineMoment[] {
  return TIMELINE.map((moment) => ({
    date: moment.date,
    events: moment.events.map((event) => ({
      id: event.id,
      title: locale === "ru" ? event.title : event.titleEn,
      summary: locale === "ru" ? event.summary : event.summaryEn,
      commit: event.commit,
      side: event.side,
      visual: event.visual,
    })),
  }));
}
/* END_FUNCTION researchTimeline */

/* END_MODULE research_timeline */
