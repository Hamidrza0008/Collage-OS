"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function EventQuestions({ initialQuestions, onAskQuestion }) {
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const created = {
      id: `q-${Date.now()}`,
      author: "Hamid Rza (You)",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      time: "Just now",
      question: newQuestion.trim(),
      answer: "Thank you for asking! The organizing team has received your query and will post an answer shortly.",
      answerBy: "Organizing Committee",
    };

    setQuestions((prev) => [created, ...prev]);
    onAskQuestion(newQuestion.trim());
    setNewQuestion("");
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Event Q&A & Discussion
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Direct public questions answered by event coordinators
          </p>
        </div>
      </div>

      {/* Ask Question Composer */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask the organizer a question about this event..."
          className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#F8FAF9] dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!newQuestion.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Questions List */}
      <div className="space-y-3 pt-1">
        {questions.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-2 text-xs"
          >
            {/* Question */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {item.author}
                </span>
                <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  • {item.time}
                </span>
              </div>
            </div>
            <p className="font-semibold text-[#0B3024] dark:text-[#E2F1EC] leading-relaxed">
              Q: {item.question}
            </p>

            {/* Answer */}
            {item.answer && (
              <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-[#06241F] border border-emerald-100 dark:border-[#10372F] space-y-1 mt-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-[#20D39B]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
                  <span>Answered by {item.answerBy || "Coordinator"}</span>
                </div>
                <p className="text-xs text-[#36594C] dark:text-[#C5DCD4] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
