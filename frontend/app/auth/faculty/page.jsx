import StaffLoginPage from "@/components/auth/StaffLoginPage";

export const metadata = {
  title: "Faculty Login — College OS",
  description: "Sign in with your official college email or employee ID to access your faculty academic portal.",
};

export default function FacultyLoginRoute() {
  return <StaffLoginPage />;
}
