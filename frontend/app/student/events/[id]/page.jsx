import EventDetailsAssembler from "@/components/events/details/EventDetailsAssembler";
import { getEventDetails } from "@/components/events/details/eventDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const event = getEventDetails(resolvedParams?.id);

  if (!event) {
    return {
      title: "Event Not Found - College OS",
      description: "The requested college event could not be found.",
    };
  }

  return {
    title: `${event.title} - College OS`,
    description: event.subtitle || event.about?.description || "Explore college event details, schedule, speakers, and digital passes.",
  };
}

export default async function EventDetailsPage({ params }) {
  const resolvedParams = await params;
  return <EventDetailsAssembler eventId={resolvedParams?.id} />;
}
