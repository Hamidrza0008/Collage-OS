import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Student Portal - College OS",
  description: "Student Academic and Campus Dashboard",
};

export default function StudentLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <AppLayout role="student">{children}</AppLayout>
    </ProtectedRoute>
  );
}
