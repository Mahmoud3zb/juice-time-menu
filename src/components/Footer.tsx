const SHOP_PHONE = "01069059005";
const ADDRESS = "قنا - حوض 10 أمام ديوان عام المحافظة";
const FACEBOOK_TEXT = "Juice Time Qena - عصير تايم قنا";
const INSTAGRAM_TEXT = "Juice Time Qena - عصير تايم قنا";
const FACEBOOK_URL = "https://facebook.com";
const INSTAGRAM_URL = "https://instagram.com";

export function Footer() {
  return (
    <footer aria-label="أسفل الصفحة ومعلومات التواصل" className="bg-gradient-to-b from-[#7a0026] via-[#61001e] to-[#470016] text-white rounded-t-3xl px-4 py-5 mt-10 shadow-2xl border-t-2 border-amber-400/30 text-center font-sans relative z-10">
      <div className="max-w-md mx-auto space-y-3.5">
        
        {/* Address with Location Pin */}
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{ADDRESS}</span>
        </div>

        {/* Phone Button */}
        <div className="flex items-center justify-center">
          <a
            href={`tel:${SHOP_PHONE}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full border border-white/20 text-white font-extrabold text-sm tracking-wider dir-ltr transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{SHOP_PHONE}</span>
          </a>
        </div>

        {/* Social Accounts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-semibold">
          {/* Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/15 text-white transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-[#1877F2] flex items-center justify-center text-white font-black text-[11px]">
              f
            </div>
            <span>{FACEBOOK_TEXT}</span>
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/15 text-white transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white font-black text-[10px]">
              📷
            </div>
            <span>{INSTAGRAM_TEXT}</span>
          </a>
        </div>

        {/* Developer Credit */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-amber-100/90 font-medium">
          <span>Made by</span>
          <span className="font-black text-amber-300 tracking-wider uppercase px-2 py-0.5 rounded-md bg-black/20 border border-white/10">
            AZB
          </span>
        </div>

      </div>
    </footer>
  );
}
