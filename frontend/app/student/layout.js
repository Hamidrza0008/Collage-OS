import AppLayout from "@/components/layout/AppLayout";

export const metadata = {
  title: "Student Portal - College OS",
  description: "Student Academic and Campus Dashboard",
};

export default function StudentLayout({ children }) {
  return <AppLayout role="student">{children}</AppLayout>;
}
