import CommunityGroupAssembler from "@/components/campus-feed/groups/CommunityGroupAssembler";
import CommunityGroupNotFound from "@/components/campus-feed/groups/CommunityGroupNotFound";
import { getCommunityGroupById } from "@/components/campus-feed/groups/communityGroupData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const community = getCommunityGroupById(resolvedParams?.id);

  if (!community) {
    return {
      title: "Community Not Found | College OS",
      description: "The requested campus club or community could not be found.",
    };
  }

  if (community.isPrivateDenied) {
    return {
      title: "Access Restricted | College OS",
      description: "You do not have access to view this private community.",
    };
  }

  return {
    title: `${community.name} | Campus Community Hub | College OS`,
    description: community.tagline || community.description?.mission || "Campus club and community on College OS.",
  };
}

export default async function CommunityGroupPage({ params }) {
  const resolvedParams = await params;
  const community = getCommunityGroupById(resolvedParams?.id);

  if (!community) {
    return <CommunityGroupNotFound isPrivate={false} />;
  }

  if (community.isPrivateDenied) {
    return <CommunityGroupNotFound isPrivate={true} />;
  }

  return <CommunityGroupAssembler initialCommunity={community} />;
}
