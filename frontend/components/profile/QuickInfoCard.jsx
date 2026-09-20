"use client";

import {
  Info,
  Pencil,
  Hash,
  Calendar,
  Layers,
  Building2,
  Droplet,
  User,
  Cake,
  Network,
} from "lucide-react";

const ICON_MAP = {
  hash: Hash,
  calendar: Calendar,
  network: Network,
  layers: Layers,
  building: Building2,
  droplet: Droplet,
  user: User,
  cake: Cake,
};

export default function QuickInfoCard({ info = [] }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-[13.5px] sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Quick Info
          </h2>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#159B72] dark:text-[#20D39B] hover:underline transition-colors"
        >
          <Pencil className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>

      {/* Info Rows */}
      <div className="divide-y divide-[#E8F1ED] dark:divide-[#10372F] text-[11.5px]">
        {info.map((item, index) => {
          const IconComponent = ICON_MAP[item.icon] || Info;
          return (
            <div
              key={index}
              className="flex items-center justify-between py-1.5 gap-2"
            >
              <div className="flex items-center gap-2 text-[#658278] dark:text-[#789991] shrink-0">
                <IconComponent className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                <span>{item.label}</span>
              </div>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right truncate">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
