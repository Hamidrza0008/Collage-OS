import SecurityAssembler from "@/components/settings/security/SecurityAssembler";

export const metadata = {
  title: "Security & Connected Accounts - College OS",
  description:
    "Manage credentials, two-factor authentication, active sessions, and connected third-party accounts.",
};

export default function SecuritySettingsPage() {
  return <SecurityAssembler />;
}
