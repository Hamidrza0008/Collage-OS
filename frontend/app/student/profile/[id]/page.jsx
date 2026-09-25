import PublicStudentProfileAssembler from "@/components/profile/public/PublicStudentProfileAssembler";
import PublicProfileNotFound from "@/components/profile/public/PublicProfileNotFound";
import {
  getPublicStudentProfile,
  getRelatedStudents,
} from "@/components/profile/public/publicStudentProfileData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const profile = getPublicStudentProfile(resolvedParams?.id);

  if (!profile) {
    return {
      title: "Student Not Found - College OS",
      description: "The requested student profile could not be found.",
    };
  }

  return {
    title: `${profile.name} (${profile.username}) - College OS`,
    description: profile.headline || `Student profile of ${profile.name} on College OS.`,
  };
}

export default async function PublicStudentProfilePage({ params }) {
  const resolvedParams = await params;
  const profile = getPublicStudentProfile(resolvedParams?.id);

  if (!profile) {
    return <PublicProfileNotFound id={resolvedParams?.id} />;
  }

  const relatedStudents = getRelatedStudents(profile.id);

  return (
    <PublicStudentProfileAssembler
      profile={profile}
      relatedStudents={relatedStudents}
    />
  );
}
