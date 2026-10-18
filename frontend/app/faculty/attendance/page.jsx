import FacultyAttendanceAssembler from "@/components/faculty/attendance/FacultyAttendanceAssembler";

export const metadata = {
  title: "Attendance — Faculty Portal | College OS",
  description: "Track, record and manage student roll-call attendance across assigned courses.",
};

export default function FacultyAttendancePage() {
  return <FacultyAttendanceAssembler />;
}
