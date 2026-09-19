import AppLayout from "@/components/layout/AppLayout";

export const metadata = {
  title: "Faculty Portal - College OS",
  description: "Faculty Workspace and Academic Management",
};

export default function FacultyLayout({ children }) {
  return <AppLayout role="faculty">{children}</AppLayout>;
}
