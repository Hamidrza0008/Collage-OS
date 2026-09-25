import NoticeReaderAssembler from "@/components/notices/details/NoticeReaderAssembler";
import { getNoticeDetails } from "@/components/notices/details/noticeReaderData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const notice = getNoticeDetails(resolvedParams?.id);

  if (!notice) {
    return {
      title: "Notice Not Found - College OS",
      description: "The requested college notice or circular could not be found.",
    };
  }

  return {
    title: `${notice.title} - College OS`,
    description: notice.subtitle || "Official college notice and circular information record.",
  };
}

export default async function NoticeReaderPage({ params }) {
  const resolvedParams = await params;
  return <NoticeReaderAssembler noticeId={resolvedParams?.id} />;
}
