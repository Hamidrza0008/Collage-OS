/**
 * Faculty Marks & Results Management Mock Data & Utilities
 * Bounded strictly to Dr. Arjun Mehta's assigned classes & courses
 */

export const ASSIGNED_COURSES = [
  {
    id: "cse-301",
    code: "CSE-301",
    shortName: "DSA",
    fullName: "Data Structures & Algorithms",
    batch: "Sem 5 • B.Tech CSE (Sec A)",
    semester: 5,
    section: "A",
    credits: 4,
    studentsCount: 15,
  },
  {
    id: "cse-302",
    code: "CSE-302",
    shortName: "Web Dev",
    fullName: "Web Development",
    batch: "Sem 3 • B.Tech CSE (Sec B)",
    semester: 3,
    section: "B",
    credits: 3,
    studentsCount: 15,
  },
  {
    id: "cse-303",
    code: "CSE-303",
    shortName: "DBMS",
    fullName: "Database Management Systems",
    batch: "Sem 5 • B.Tech CSE (Sec A)",
    semester: 5,
    section: "A",
    credits: 4,
    studentsCount: 15,
  },
  {
    id: "cse-304",
    code: "CSE-304",
    shortName: "CN",
    fullName: "Computer Networks",
    batch: "Sem 3 • B.Tech CSE (Sec A)",
    semester: 3,
    section: "A",
    credits: 3,
    studentsCount: 15,
  },
];

export const EXAM_TYPES = [
  {
    id: "mid1",
    name: "Mid-Term Examination 1 (IA-1)",
    shortLabel: "Mid-Term 1",
    maxMarks: 30,
    weightage: "15%",
    dueDate: "Completed",
    isLocked: false,
  },
  {
    id: "mid2",
    name: "Mid-Term Examination 2 (IA-2)",
    shortLabel: "Mid-Term 2",
    maxMarks: 30,
    weightage: "15%",
    dueDate: "Oct 28, 2026",
    isLocked: false,
  },
  {
    id: "practical",
    name: "Practical / Lab Assessment",
    shortLabel: "Lab Exam",
    maxMarks: 50,
    weightage: "25%",
    dueDate: "Nov 12, 2026",
    isLocked: false,
  },
  {
    id: "assignment",
    name: "Continuous Internal Assessment (CIA)",
    shortLabel: "CIA / Assignments",
    maxMarks: 20,
    weightage: "10%",
    dueDate: "Nov 04, 2026",
    isLocked: true,
  },
  {
    id: "endsem",
    name: "End-Semester Examination",
    shortLabel: "End-Semester",
    maxMarks: 100,
    weightage: "50%",
    dueDate: "Dec 15, 2026",
    isLocked: false,
  },
];

export const INITIAL_STUDENT_ROSTER = [
  { roll: "22CS001", name: "Aarav Sharma", marks: 27, status: "Graded", avatar: "/assets/students/male-3.jpg" },
  { roll: "22CS002", name: "Ananya Verma", marks: 25, status: "Graded", avatar: "/assets/students/female-1.jpg" },
  { roll: "22CS003", name: "Arjun Reddy", marks: 22, status: "Graded", avatar: "/assets/students/male-1.jpg" },
  { roll: "22CS004", name: "Bhavya Nair", marks: null, status: "Absent", avatar: "/assets/students/female-2.jpg" },
  { roll: "22CS005", name: "Chetan Gupta", marks: 28, status: "Graded", avatar: "/assets/students/male-2.jpg" },
  { roll: "22CS006", name: "Dev Patel", marks: 19, status: "Graded", avatar: "/assets/students/male-4.jpg" },
  { roll: "22CS007", name: "Divya Kapoor", marks: 26, status: "Graded", avatar: "/assets/students/female-3.jpg" },
  { roll: "22CS008", name: "Farhan Ali", marks: 14, status: "Needs Review", avatar: "/assets/students/male-5.jpg" },
  { roll: "22CS009", name: "Gayatri Joshi", marks: 29, status: "Graded", avatar: "/assets/students/female-4.jpg" },
  { roll: "22CS010", name: "Hamid Rza", marks: 28, status: "Graded", avatar: "/assets/layout/profile-avatar.jpg" },
  { roll: "22CS011", name: "Ishaan Malhotra", marks: 21, status: "Graded", avatar: "/assets/students/male-6.jpg" },
  { roll: "22CS012", name: "Jaya Mishra", marks: 24, status: "Graded", avatar: "/assets/students/female-5.jpg" },
  { roll: "22CS013", name: "Kunal Bansal", marks: 18, status: "Graded", avatar: "/assets/students/male-7.jpg" },
  { roll: "22CS014", name: "Lavanya Rao", marks: null, status: "Unentered", avatar: "/assets/students/female-6.jpg" },
  { roll: "22CS015", name: "Manish Tiwari", marks: 23, status: "Graded", avatar: "/assets/students/male-8.jpg" },
];

/**
 * Calculates letter grade and grade points based on percentage score
 */
export function calculateGrade(marksObtained, maxMarks) {
  if (marksObtained === null || marksObtained === undefined || marksObtained === "" || isNaN(marksObtained)) {
    return { grade: "--", gradePoints: 0, label: "Unentered", badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" };
  }
  const numericMarks = Number(marksObtained);
  if (numericMarks < 0 || numericMarks > maxMarks) {
    return { grade: "ERR", gradePoints: 0, label: "Invalid", badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" };
  }

  const percentage = (numericMarks / maxMarks) * 100;

  if (percentage >= 90) return { grade: "O", gradePoints: 10, label: "Outstanding", badgeColor: "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-500/30" };
  if (percentage >= 80) return { grade: "A+", gradePoints: 9, label: "Excellent", badgeColor: "bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border-teal-500/30" };
  if (percentage >= 70) return { grade: "A", gradePoints: 8, label: "Very Good", badgeColor: "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-500/30" };
  if (percentage >= 60) return { grade: "B+", gradePoints: 7, label: "Good", badgeColor: "bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border-sky-500/30" };
  if (percentage >= 50) return { grade: "B", gradePoints: 6, label: "Above Average", badgeColor: "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-500/30" };
  if (percentage >= 40) return { grade: "C", gradePoints: 5, label: "Pass", badgeColor: "bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border-orange-500/30" };
  return { grade: "F", gradePoints: 0, label: "Fail", badgeColor: "bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-500/30" };
}

/**
 * Client-side CSV export generator
 */
export function exportMarksToCSV({ students, course, exam, maxMarks }) {
  if (typeof window === "undefined") return;

  const headers = [
    "Roll Number",
    "Student Name",
    "Course Code",
    "Course Name",
    "Semester",
    "Exam Type",
    "Max Marks",
    "Marks Obtained",
    "Percentage",
    "Letter Grade",
    "Status",
  ];

  const rows = students.map((s) => {
    const isAbsent = s.status === "Absent";
    const numericMarks = s.marks !== null && s.marks !== undefined && s.marks !== "" ? Number(s.marks) : "";
    const pct = isAbsent || numericMarks === "" ? "--" : `${((numericMarks / maxMarks) * 100).toFixed(1)}%`;
    const gradeInfo = isAbsent ? { grade: "AB" } : calculateGrade(numericMarks, maxMarks);

    return [
      s.roll,
      `"${s.name}"`,
      course.code,
      `"${course.fullName}"`,
      `Sem ${course.semester}`,
      `"${exam.name}"`,
      maxMarks,
      isAbsent ? "AB" : numericMarks !== "" ? numericMarks : "--",
      pct,
      gradeInfo.grade,
      s.status,
    ];
  });

  const csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  const fileName = `Marks_${course.code}_${exam.shortLabel}_${new Date().toISOString().slice(0, 10)}.csv`.replace(/\s+/g, "_");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
