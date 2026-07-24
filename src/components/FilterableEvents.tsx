import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { BentoEventCard } from "@/components/ui/BentoEventCard";
import { CATEGORIES, matchesCategory, type Event, type Category } from "@/types/events";

interface FilterableEventsProps {
  events: Event[];
  pastLimit?: number;
}

export function FilterableEvents({ events, pastLimit }: FilterableEventsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All Events");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => matchesCategory(event, activeCategory));
  }, [events, activeCategory]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents
      .filter((event) => event.upcoming)
      .sort(
        (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
      );
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents
      .filter((event) => !event.upcoming)
      .sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
      );
  }, [filteredEvents]);

  const visiblePast = pastLimit ? pastEvents.slice(0, pastLimit) : pastEvents;

  return (
    <>
      {/* Category Pills */}
      <section className="px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <CategoryPill
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Upcoming Events
            </h2>
            <a
              href="/events"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="rounded-lg border border-border bg-card/50 p-12 text-center backdrop-blur-sm">
              <p className="text-muted-foreground">
                No upcoming events match the selected category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
              {/* Featured Large Card */}
              {upcomingEvents[0] && (
                <div className="relative overflow-hidden md:col-span-1 md:row-span-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-emerald-500/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  <BentoEventCard
                    title={upcomingEvents[0].title}
                    date={upcomingEvents[0].date}
                    time={upcomingEvents[0].time}
                    location={upcomingEvents[0].location}
                    tags={upcomingEvents[0].tags}
                    link={`/events/${upcomingEvents[0].slug}`}
                    accent={0}
                    variant="dark"
                    size="large"
                  />
                </div>
              )}

              {/* Second Card */}
              {upcomingEvents[1] && (
                <div className="md:col-span-1">
                  <BentoEventCard
                    title={upcomingEvents[1].title}
                    date={upcomingEvents[1].date}
                    time={upcomingEvents[1].time}
                    location={upcomingEvents[1].location}
                    tags={upcomingEvents[1].tags}
                    link={`/events/${upcomingEvents[1].slug}`}
                    accent={1}
                    variant="light"
                    size="medium"
                  />
                </div>
              )}

              {/* Third Card */}
              {upcomingEvents[2] && (
                <div className="md:col-span-1">
                  <BentoEventCard
                    title={upcomingEvents[2].title}
                    date={upcomingEvents[2].date}
                    time={upcomingEvents[2].time}
                    location={upcomingEvents[2].location}
                    tags={upcomingEvents[2].tags}
                    link={`/events/${upcomingEvents[2].slug}`}
                    accent={2}
                    variant="light"
                    size="medium"
                  />
                </div>
              )}

              {/* Community Stats Card */}
              <div className="relative overflow-hidden md:col-span-2">
                <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                  {/* Subtle gradient accent */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent blur-2xl" />

                  <div className="relative">
                    <p className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                      Atlanta, Georgia
                    </p>
                    <h3 className="mb-4 max-w-md text-balance text-xl font-bold uppercase tracking-tight md:text-2xl">
                      Atlanta's Premier React Developer Community
                    </h3>
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black md:text-5xl">200+</span>
                      <span className="text-muted-foreground">members</span>
                    </div>
                    <a
                      href="https://www.meetup.com/react-atl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                      Join Community
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section id="previous" className="border-t border-border px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Past Events
            </h2>
            {pastLimit && pastEvents.length > pastLimit ? (
              <a
                href="/events"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                View all {pastEvents.length} events
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          {pastEvents.length === 0 ? (
            <div className="rounded-lg border border-border bg-card/50 p-12 text-center backdrop-blur-sm">
              <p className="text-muted-foreground">
                No past events match the selected category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visiblePast.map((event, index) => (
                <BentoEventCard
                  key={event.slug}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  tags={event.tags}
                  link={`/events/${event.slug}`}
                  accent={index}
                  variant={index === 0 ? "dark" : "light"}
                  size="small"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
