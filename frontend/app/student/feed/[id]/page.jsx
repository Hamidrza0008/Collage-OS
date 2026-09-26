import FeedPostDetailsAssembler from "@/components/campus-feed/details/FeedPostDetailsAssembler";
import { getFeedPostById } from "@/components/campus-feed/details/feedPostDetailsData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getFeedPostById(resolvedParams?.id);

  if (!post) {
    return {
      title: "Post Not Found | College OS",
      description: "The requested campus feed discussion could not be found.",
    };
  }

  const snippet = post.content?.slice(0, 120) || "Campus Feed Discussion";

  return {
    title: `${post.author?.name}: "${snippet}..." | College OS`,
    description: snippet,
  };
}

export default async function FeedPostPage({ params }) {
  const resolvedParams = await params;
  return <FeedPostDetailsAssembler postId={resolvedParams?.id} />;
}
