/* START_MODULE timeline_page */
/* START_CONTRACT
PURPOSE: Render the bilingual, horizontally scrollable, multi-level research chronology.
MATHEMATICAL_SCOPE: Historical presentation only; repository dates are not mathematical evidence or retrospective release dates.
PUBLIC_SURFACE: TimelinePage.
KEYWORDS: react, chronology, horizontal-scroll, provenance, accessibility
COMPLEXITY: 3
END_CONTRACT */

import { researchTimeline, type TimelineEvent, type TimelineVisual as TimelineVisualSpec } from "./content/timeline";
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
PURPOSE: Present one dated repository-backed event with its visual and source commit.
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
        {text("запись", "record")} · {event.commit} ↗
      </a>
    </article>
  );
}
/* END_FUNCTION TimelineEventCard */

/* START_FUNCTION TimelinePage */
/* START_CONTRACT
PURPOSE: Display the full project chronology as a horizontally scrollable multi-level research record.
CONTRACT: Keep events grouped by recorded date, allow multiple cards above and below each date, and state that dates are not retrospective release claims.
FAILURE_MEANING: Readers could mistake repository activity for contemporaneous publication or miss same-day events.
KEYWORDS: chronology, horizontal-scroll, multi-level, bilingual
COMPLEXITY: 3
END_CONTRACT */
export function TimelinePage() {
  const { locale, text } = useLocale();
  const moments = researchTimeline(locale);
  const eventCount = moments.reduce((total, moment) => total + moment.events.length, 0);
  return (
    <article className="page timeline-page">
      <header className="editorial-header timeline-header">
        <p className="eyebrow">{text("Архив исследования", "Research archive")}</p>
        <h1>{text("Хронология проекта", "Project timeline")}</h1>
        <p>
          {text(
            "Вехи восстановлены по истории репозитория. Это даты зафиксированной работы, а не утверждение о том, что результаты публично объявлялись в тот же день.",
            "Milestones are reconstructed from repository history. These are dates of recorded work, not claims that the results were publicly announced on those dates.",
          )}
        </p>
      </header>

      <div className="timeline-summary" id="timeline-instructions">
        <span>2021 → 2026</span>
        <strong>
          {eventCount} {text("подтверждённых событий", "verified events")}
        </strong>
        <span>{text("Прокручивайте по горизонтали →", "Scroll horizontally →")}</span>
      </div>

      <div className="timeline-scroll-shell">
        <div
          className="timeline-scroll"
          role="region"
          aria-label={text("Хронология исследования", "Research timeline")}
          aria-describedby="timeline-instructions"
          tabIndex={0}
        >
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
        </div>
      </div>

      <section className="timeline-method">
        <div>
          <span>{text("Принцип отбора", "Selection rule")}</span>
          <h2>{text("Только проверяемые вехи", "Only verifiable milestones")}</h2>
        </div>
        <p>
          {text(
            "Включены изменения, для которых существует запись в репозитории и которые меняли математические инструменты, генераторы, теоретический текст или способ публикации исследования. Позднейшая редактура описаний не меняет исходных дат.",
            "An event is included only when a repository record exists and the change affected mathematical tools, generators, theory text, or publication of the research. Later editorial work does not alter the original dates.",
          )}
        </p>
        <a href="https://github.com/VladimirMynka/MagicSquare" target="_blank" rel="noreferrer">
          {text("Открыть историю репозитория", "Open repository history")} ↗
        </a>
      </section>
    </article>
  );
}
/* END_FUNCTION TimelinePage */

/* END_MODULE timeline_page */
