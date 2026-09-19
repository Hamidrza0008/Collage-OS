import { BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Faculty Dashboard - College OS",
  description: "Faculty Workspace and Academic Management",
};

export default function FacultyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="p-4 rounded-2xl bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] mb-4 shadow-sm">
        <BookOpen className="w-10 h-10" strokeWidth={1.8} />
      </div>
      <h1 className="text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
        Faculty Dashboard
      </h1>
      <p className="text-sm text-[#658278] dark:text-[#789991] max-w-md mt-2 leading-relaxed">
        Faculty academic workspace and management modules are coming soon.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#159B72]/10 dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Faculty Module Placeholder</span>
      </div>
    </div>
  );
}
