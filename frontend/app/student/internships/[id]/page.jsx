import OpportunityDetailsAssembler from "@/components/internships/details/OpportunityDetailsAssembler";
import OpportunityNotFound from "@/components/internships/details/OpportunityNotFound";
import {
  getOpportunityDetails,
  getRelatedOpportunities,
} from "@/components/internships/details/opportunityDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const opportunity = getOpportunityDetails(resolvedParams?.id);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found - College OS",
      description: "The requested opportunity could not be found.",
    };
  }

  return {
    title: `${opportunity.title} at ${opportunity.company} - College OS`,
    description:
      opportunity.summary ||
      `${opportunity.type} opportunity for students on College OS.`,
  };
}

export default async function OpportunityDetailsPage({ params }) {
  const resolvedParams = await params;
  const opportunity = getOpportunityDetails(resolvedParams?.id);

  if (!opportunity) {
    return <OpportunityNotFound id={resolvedParams?.id} />;
  }

  const related = getRelatedOpportunities(opportunity.id);

  return (
    <OpportunityDetailsAssembler
      opportunity={opportunity}
      related={related}
    />
  );
}
