import StudentPasswordPage from "@/components/auth/StudentPasswordPage";

export const metadata = {
  title: "Set Your Password — College OS",
  description: "Create a private, encrypted password for your College OS student account.",
};

export default function StudentPasswordRoute() {
  return <StudentPasswordPage />;
}
