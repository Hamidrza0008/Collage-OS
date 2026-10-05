import StudentActivationPage from "@/components/auth/StudentActivationPage";

export const metadata = {
  title: "Student Account Activation — College OS",
  description: "Verify your institutional student record with enrollment number and college email to activate your account.",
};

export default function StudentActivationRoute() {
  return <StudentActivationPage />;
}
