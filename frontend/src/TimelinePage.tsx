/* START_MODULE timeline_page */
/* START_CONTRACT
PURPOSE: Render the bilingual, horizontally scrollable, multi-level research chronology.
MATHEMATICAL_SCOPE: Historical presentation only; dated events are not mathematical evidence.
PUBLIC_SURFACE: TimelinePage.
KEYWORDS: react, chronology, horizontal-scroll, provenance, accessibility
COMPLEXITY: 3
END_CONTRACT */

import {
  researchTimeline,
  type TimelineEvent,
  type TimelineVisual as TimelineVisualSpec,
} from "./content/timeline";
import { findFamilyById } from "./lib/families";
import { useLocale, type Locale } from "./i18n";

const COMMIT_URL = "https://github.com/VladimirMynka/MagicSquare/commit";
const MASK_POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

/* START_FUNCTION formatTimelineDate */
/* START_CONTRACT
PURPOSE: Format one archival ISO date without timezone-dependent drift.
CONTRACT: Preserve the recorded UTC calendar day in both supported locales.
FAILURE_MEANING: A repository event could be displayed under the wrong date.
KEYWORDS: date, locale, UTC
COMPLEXITY: 1
END_CONTRACT */
function formatTimelineDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}
/* END_FUNCTION formatTimelineDate */

/* START_FUNCTION TimelineMask */
/* START_CONTRACT
PURPOSE: Draw a compact nine-cell mask from an existing family definition.
CONTRACT: Highlight exactly the positions recorded by the referenced family and retain the event mark as text.
FAILURE_MEANING: The illustration could misrepresent the family named by a historical event.
KEYWORDS: mask, family, timeline-illustration
COMPLEXITY: 1
END_CONTRACT */
function TimelineMask({ familyId, mark }: { familyId: string; mark: string }) {
  const family = findFamilyById(familyId);
  const active = new Set(family?.positions ?? []);
  return (
    <span className={`timeline-mini-mask tone-${family?.group ?? "gray"}`}>
      {MASK_POSITIONS.map((position) => (
        <i className={active.has(position) ? "active" : ""} key={position} />
      ))}
      <small>{mark}</small>
    </span>
  );
}
/* END_FUNCTION TimelineMask */

/* START_FUNCTION TimelineVisual */
/* START_CONTRACT
PURPOSE: Render a compact code-native illustration for a timeline event.
CONTRACT: Use an existing family mask when referenced and retain a textual fallback and accessible label.
FAILURE_MEANING: Historical events lose their visual landmark but not their recorded text.
KEYWORDS: timeline, illustration, mask, accessibility
COMPLEXITY: 2
END_CONTRACT */
function TimelineVisual({
  visual,
  label,
}: {
  visual: TimelineVisualSpec;
  label: string;
}) {
  return (
    <div
      className={`timeline-visual timeline-visual-${visual.kind}`}
      role="img"
      aria-label={label}
    >
      {visual.familyId ? (
        <TimelineMask familyId={visual.familyId} mark={visual.mark} />
      ) : (
        <>
          <strong>{visual.mark}</strong>
          <span>{visual.detail}</span>
        </>
      )}
    </div>
  );
}
/* END_FUNCTION TimelineVisual */

/* START_FUNCTION TimelineEventCard */
/* START_CONTRACT
PURPOSE: Present one author-reviewed event with its visual and supporting source.
CONTRACT: Every event exposes its title, description, and immutable commit reference.
FAILURE_MEANING: The chronology would no longer distinguish historical evidence from editorial prose.
KEYWORDS: timeline-event, git, provenance
COMPLEXITY: 1
END_CONTRACT */
function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const { text } = useLocale();
  return (
    <article className="timeline-card">
      <TimelineVisual visual={event.visual} label={event.title} />
      <div className="timeline-card-copy">
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
      </div>
      <a
        className="timeline-source"
        href={`${COMMIT_URL}/${event.commit}`}
        target="_blank"
        rel="noreferrer"
      >
        {text("источник", "source")} · {event.commit} ↗
      </a>
    </article>
  );
}
/* END_FUNCTION TimelineEventCard */

/* START_FUNCTION TimelinePage */
/* START_CONTRACT
PURPOSE: Display the full project chronology as a horizontally scrollable multi-level research record.
CONTRACT: Keep events grouped by date, allow multiple cards above and below each date, and present an explicit empty state while history is being reconstructed.
FAILURE_MEANING: Readers could mistake draft history for an author-reviewed chronology or miss same-day events.
KEYWORDS: chronology, horizontal-scroll, multi-level, bilingual
COMPLEXITY: 3
END_CONTRACT */
export function TimelinePage() {
  const { locale, text } = useLocale();
  const moments = researchTimeline(locale);
  const eventCount = moments.reduce((total, moment) => total + moment.events.length, 0);
  const dateRange = moments.length > 0
    ? `${moments[0].date.slice(0, 4)} → ${moments[moments.length - 1].date.slice(0, 4)}`
    : null;
  return (
    <article className="page timeline-page">
      <header className="editorial-header timeline-header">
        <p className="eyebrow">{text("Архив исследования", "Research archive")}</p>
        <h1>{text("Хронология проекта", "Project timeline")}</h1>
        <p>
          {text(
            "Здесь будет восстановлена история исследования: от первых идей и найденных конструкций до доказательств и современной постановки задачи.",
            "This page will reconstruct the history of the research, from its first ideas and constructions to the proofs and the present form of the problem.",
          )}
        </p>
      </header>

      <div className="timeline-summary" id="timeline-instructions">
        <span>{dateRange ?? text("История исследования", "Research history")}</span>
        <strong>
          {eventCount > 0
            ? `${eventCount} ${text("событий", "events")}`
            : text("Хронология восстанавливается", "Timeline in preparation")}
        </strong>
        <span>
          {eventCount > 0
            ? text("Прокручивайте по горизонтали →", "Scroll horizontally →")
            : text("События пока не опубликованы", "Events have not yet been published")}
        </span>
      </div>

      <div className="timeline-scroll-shell">
        <div
          className={`timeline-scroll ${moments.length === 0 ? "timeline-scroll-empty" : ""}`}
          role="region"
          aria-label={text("Хронология исследования", "Research timeline")}
          aria-describedby="timeline-instructions"
          tabIndex={0}
        >
          {moments.length === 0 ? (
            <div className="timeline-empty">
              <div className="timeline-empty-card">
                <span aria-hidden="true">◇</span>
                <p>
                  {text(
                    "Здесь появятся датированные события исследования.",
                    "Dated milestones of the research will appear here.",
                  )}
                </p>
              </div>
              <i className="timeline-empty-axis" aria-hidden="true" />
            </div>
          ) : (
            <div className="timeline-track">
              {moments.map((moment, momentIndex) => {
                const above = moment.events.filter((event) => event.side === "above");
                const below = moment.events.filter((event) => event.side === "below");
                return (
                  <section className="timeline-moment" key={moment.date}>
                    <div className="timeline-stack timeline-stack-above">
                      {above.map((event) => (
                        <TimelineEventCard event={event} key={event.id} />
                      ))}
                    </div>
                    <div className="timeline-axis-point">
                      <i aria-hidden="true" />
                      <time dateTime={moment.date}>
                        {formatTimelineDate(moment.date, locale)}
                      </time>
                      <small>{String(momentIndex + 1).padStart(2, "0")}</small>
                    </div>
                    <div className="timeline-stack timeline-stack-below">
                      {below.map((event) => (
                        <TimelineEventCard event={event} key={event.id} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
/* END_FUNCTION TimelinePage */

/* END_MODULE timeline_page */
