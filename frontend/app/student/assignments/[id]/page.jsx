import AssignmentDetailsAssembler from "@/components/assignments/details/AssignmentDetailsAssembler";
import { getAssignmentDetails } from "@/components/assignments/details/assignmentDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const assignment = getAssignmentDetails(resolvedParams?.id);

  if (!assignment) {
    return {
      title: "Assignment Not Found - College OS",
      description: "The requested academic assignment could not be found.",
    };
  }

  return {
    title: `${assignment.title} (${assignment.subject}) - College OS`,
    description: assignment.description,
  };
}

export default async function AssignmentDetailsPage({ params }) {
  const resolvedParams = await params;
  return <AssignmentDetailsAssembler assignmentId={resolvedParams?.id} />;
}
