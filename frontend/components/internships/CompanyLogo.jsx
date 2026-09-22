"use client";

export default function CompanyLogo({ logoType, className = "w-8 h-8" }) {
  switch (logoType) {
    case "google":
      return (
        <div className={`${className} rounded-xl bg-white dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#16463D] flex items-center justify-center p-1.5 shadow-2xs shrink-0`}>
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
            />
          </svg>
        </div>
      );

    case "microsoft":
      return (
        <div className={`${className} rounded-xl bg-white dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#16463D] flex items-center justify-center p-1.5 shadow-2xs shrink-0`}>
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" rx="1" />
            <rect x="13" y="1" width="10" height="10" fill="#7FBA00" rx="1" />
            <rect x="1" y="13" width="10" height="10" fill="#00A4EF" rx="1" />
            <rect x="13" y="13" width="10" height="10" fill="#FFB900" rx="1" />
          </svg>
        </div>
      );

    case "tcs":
      return (
        <div className={`${className} rounded-xl bg-[#00519E] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <div className="flex flex-col items-center justify-center text-white">
            <span className="text-[10px] font-black tracking-tighter leading-none font-sans">TCS</span>
            <span className="text-[6.5px] font-medium tracking-tightest leading-none mt-0.5 opacity-90">TATA</span>
          </div>
        </div>
      );

    case "zomato":
      return (
        <div className={`${className} rounded-xl bg-[#E23744] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[10.5px] font-black text-white italic tracking-tight font-sans">
            zomato
          </span>
        </div>
      );

    case "google-dev":
      return (
        <div className={`${className} rounded-xl bg-white dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#16463D] flex items-center justify-center p-1.5 shadow-2xs shrink-0`}>
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"
            />
            <path
              fill="#34A853"
              d="M14.6 7.4L19.2 12l-4.6 4.6L16 18l6-6-6-6-1.4 1.4z"
            />
            <circle cx="12" cy="12" r="2.5" fill="#FBBC05" />
          </svg>
        </div>
      );

    case "devfolio":
      return (
        <div className={`${className} rounded-xl bg-[#276FE6] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[13px] font-black text-white tracking-tight font-sans">
            D
          </span>
        </div>
      );

    case "hackerearth":
      return (
        <div className={`${className} rounded-xl bg-[#1C2C3E] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[12px] font-extrabold text-white tracking-tight font-mono">
            H
          </span>
        </div>
      );

    case "amazon":
      return (
        <div className={`${className} rounded-xl bg-[#232F3E] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[11px] font-black text-[#FF9900] tracking-tight">a</span>
        </div>
      );

    case "adobe":
      return (
        <div className={`${className} rounded-xl bg-[#FF0000] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[11px] font-black text-white">A</span>
        </div>
      );

    case "uber":
      return (
        <div className={`${className} rounded-xl bg-black flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[10px] font-bold text-white tracking-tighter">Uber</span>
        </div>
      );

    case "flipkart":
      return (
        <div className={`${className} rounded-xl bg-[#2874F0] flex items-center justify-center p-1 shadow-2xs shrink-0`}>
          <span className="text-[11px] font-black text-[#FFE500] italic">f</span>
        </div>
      );

    default:
      return (
        <div className={`${className} rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0`}>
          ⚡
        </div>
      );
  }
}
