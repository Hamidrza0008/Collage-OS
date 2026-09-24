import CampusAI from "@/components/campus-ai/CampusAI";

export const metadata = {
  title: "Campus AI - Faculty Portal - College OS",
  description:
    "Your college-specific AI assistant. Get accurate answers from your college data, policies, guidelines, and more — powered by MongoDB + RAG.",
};

export default function FacultyCampusAIPage() {
  return <CampusAI />;
}
