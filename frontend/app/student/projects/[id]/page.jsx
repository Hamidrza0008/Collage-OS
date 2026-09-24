import ProjectDetailsAssembler from "@/components/projects/details/ProjectDetailsAssembler";
import { getProjectDetails } from "@/components/projects/details/projectDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = getProjectDetails(resolvedParams?.id);

  if (!project) {
    return {
      title: "Project Not Found - College OS",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - College OS`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  return <ProjectDetailsAssembler projectId={resolvedParams?.id} />;
}
