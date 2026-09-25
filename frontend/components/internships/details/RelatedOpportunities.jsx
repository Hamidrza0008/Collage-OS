'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RelatedOpportunities({ related = [], currentType = 'Opportunity' }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="bg-white dark:bg-[#06241F] rounded-2xl border border-gray-200 dark:border-[#10372F] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-[#D8E8E2]">
            Similar Opportunities
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#A7C7BC] mt-0.5">
            More opportunities matching your interests and background
          </p>
        </div>
        <Link
          href="/student/internships"
          className="text-xs font-semibold text-emerald-600 dark:text-[#20D39B] hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((item) => (
          <Link
            key={item.id}
            href={`/student/internships/${item.id}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-gray-200 dark:border-[#10372F] hover:border-emerald-400 dark:hover:border-[#159B72] bg-gray-50/50 dark:bg-[#021512]/60 hover:bg-white dark:hover:bg-[#06241F] transition-all duration-200 shadow-sm hover:shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#10372F] flex items-center justify-center font-bold text-sm text-emerald-600 dark:text-[#20D39B] border border-gray-200 dark:border-[#10372F] shrink-0">
                  {item.companyLogo ? (
                    <img
                      src={item.companyLogo}
                      alt={item.company}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    item.company?.[0] || 'C'
                  )}
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#10372F] dark:text-[#20D39B]">
                  {item.type || 'Internship'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-gray-900 dark:text-[#D8E8E2] group-hover:text-emerald-600 dark:group-hover:text-[#20D39B] transition-colors line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-[#A7C7BC] mt-0.5 flex items-center gap-1 truncate">
                <Building2 className="w-3 h-3 shrink-0" />
                {item.company}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 dark:text-[#A7C7BC] mt-3">
                {item.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                  </span>
                )}
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-200/60 dark:border-[#10372F]/60 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600 dark:text-[#20D39B]">
                {item.stipend || item.prizePool || item.salary || 'Competitive'}
              </span>
              <span className="text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-[#20D39B] flex items-center gap-0.5 font-medium transition-colors">
                Details <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
