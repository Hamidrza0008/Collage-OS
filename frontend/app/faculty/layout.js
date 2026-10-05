import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Faculty Portal - College OS",
  description: "Faculty Workspace and Academic Management",
};

export default function FacultyLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["faculty", "hod", "principal", "admin"]}>
      <AppLayout role="faculty">{children}</AppLayout>
    </ProtectedRoute>
  );
}
