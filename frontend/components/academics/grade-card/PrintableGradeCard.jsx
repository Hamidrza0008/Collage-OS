"use client";

export default function PrintableGradeCard({
  student,
  semester,
  metrics,
}) {
  return (
    <div className="hidden print:block w-full text-black bg-white p-8 space-y-6 font-sans">
      {/* Formal Letterhead */}
      <div className="text-center border-b-2 border-black pb-4 space-y-1">
        <h1 className="text-2xl font-black uppercase tracking-wider">
          {student.college}
        </h1>
        <p className="text-xs text-gray-700">
          Affiliated with {student.university} • Recognized by AICTE & UGC
        </p>
        <h2 className="text-sm font-bold uppercase tracking-widest mt-2 border-y border-gray-400 py-1 inline-block">
          Student Semester Grade Report (Provisional)
        </h2>
      </div>

      {/* Student Meta Table */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs border border-gray-400 p-3">
        <div>
          <span className="font-bold">Student Name: </span>
          <span>{student.name}</span>
        </div>
        <div>
          <span className="font-bold">University Seat No (USN): </span>
          <span className="font-mono">{student.usn}</span>
        </div>
        <div>
          <span className="font-bold">Degree & Branch: </span>
          <span>
            {student.degree} in {student.branch}
          </span>
        </div>
        <div>
          <span className="font-bold">Academic Session: </span>
          <span>
            {semester.label} ({semester.academicYear})
          </span>
        </div>
        <div>
          <span className="font-bold">Batch: </span>
          <span>{student.batch}</span>
        </div>
        <div>
          <span className="font-bold">Academic Standing: </span>
          <span>{student.academicStanding}</span>
        </div>
      </div>

      {/* Grade Table */}
      <div>
        <table className="w-full text-left text-xs border border-black border-collapse">
          <thead>
            <tr className="border-b border-black bg-gray-100 font-bold">
              <th className="p-2 border-r border-black">Course Code</th>
              <th className="p-2 border-r border-black">Course Title</th>
              <th className="p-2 border-r border-black text-center">Credits</th>
              <th className="p-2 border-r border-black text-center">Internal</th>
              <th className="p-2 border-r border-black text-center">External</th>
              <th className="p-2 border-r border-black text-center">Total</th>
              <th className="p-2 border-r border-black text-center">Grade</th>
              <th className="p-2 border-r border-black text-center">Grade Point</th>
              <th className="p-2 text-right">Result</th>
            </tr>
          </thead>
          <tbody>
            {semester.subjects?.map((sub, i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="p-2 border-r border-black font-mono font-bold">
                  {sub.code}
                </td>
                <td className="p-2 border-r border-black">{sub.name}</td>
                <td className="p-2 border-r border-black text-center font-bold">
                  {sub.credits}
                </td>
                <td className="p-2 border-r border-black text-center">
                  {sub.internal > 0 ? sub.internal : "—"}
                </td>
                <td className="p-2 border-r border-black text-center">
                  {sub.external > 0 ? sub.external : "—"}
                </td>
                <td className="p-2 border-r border-black text-center font-bold">
                  {sub.total > 0 ? sub.total : "—"}
                </td>
                <td className="p-2 border-r border-black text-center font-bold">
                  {sub.grade}
                </td>
                <td className="p-2 border-r border-black text-center font-bold">
                  {sub.gradePoint !== null ? sub.gradePoint : "—"}
                </td>
                <td className="p-2 text-right font-medium">{sub.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Matrix */}
      <div className="grid grid-cols-4 gap-2 text-xs border border-black p-3 bg-gray-50 text-center">
        <div>
          <span className="block text-gray-600 font-bold">Semester SGPA</span>
          <span className="text-lg font-black">{semester.sgpa !== null ? semester.sgpa.toFixed(2) : "—"}</span>
        </div>
        <div>
          <span className="block text-gray-600 font-bold">Cumulative CGPA</span>
          <span className="text-lg font-black">{student.cumulativeCGPA.toFixed(2)}</span>
        </div>
        <div>
          <span className="block text-gray-600 font-bold">Credits Earned</span>
          <span className="text-lg font-black">{metrics.creditsEarned} / {metrics.creditsRegistered}</span>
        </div>
        <div>
          <span className="block text-gray-600 font-bold">Degree Completion</span>
          <span className="text-lg font-black">{student.cumulativeCreditsEarned} / 160 Cr</span>
        </div>
      </div>

      {/* Signatures & Verification Footer */}
      <div className="pt-12 grid grid-cols-3 gap-6 text-xs text-center border-t border-gray-400 mt-8">
        <div>
          <div className="border-t border-gray-500 w-3/4 mx-auto pt-1 font-bold">
            Student Signature
          </div>
        </div>
        <div>
          <div className="border-t border-gray-500 w-3/4 mx-auto pt-1 font-bold">
            Faculty Academic Advisor
          </div>
        </div>
        <div>
          <div className="border-t border-gray-500 w-3/4 mx-auto pt-1 font-bold">
            Controller of Examinations
          </div>
        </div>
      </div>

      <div className="text-[10px] text-gray-500 pt-4 text-center">
        Generated by College OS Academic ERP Portal • Internal Reference Copy • Timestamp: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
