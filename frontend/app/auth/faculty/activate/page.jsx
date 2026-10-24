import FacultyActivationPage from "@/components/auth/FacultyActivationPage";

export const metadata = {
  title: "Faculty Account Activation — College OS",
  description: "Verify your institutional faculty record with your Employee ID and official college email to set up your password.",
};

export default function FacultyActivationRoute() {
  return <FacultyActivationPage />;
}
