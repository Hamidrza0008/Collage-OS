import SubjectDetailsAssembler from "@/components/academics/subject-details/SubjectDetailsAssembler";
import { getSubjectDetails } from "@/components/academics/subject-details/subjectDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subject = getSubjectDetails(resolvedParams?.code);

  if (!subject) {
    return {
      title: "Subject Not Found - College OS",
      description: "The requested course details could not be found.",
    };
  }

  return {
    title: `${subject.name} (${subject.code}) - College OS`,
    description: `Course details, syllabus, attendance, marks, and resources for ${subject.fullName} — Semester ${subject.semester}.`,
  };
}

export default async function SubjectDetailsPage({ params }) {
  const resolvedParams = await params;
  return <SubjectDetailsAssembler code={resolvedParams?.code} />;
}