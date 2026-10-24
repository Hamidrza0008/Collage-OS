import FacultyTimetableAssembler from "@/components/faculty/timetable/FacultyTimetableAssembler";

export const metadata = {
  title: "Teaching Timetable — Faculty Portal | College OS",
  description: "View weekly teaching schedule, manage daily periods, and request lecture reschedules or faculty substitutions.",
};

export default function FacultyTimetablePage() {
  return <FacultyTimetableAssembler />;
}
