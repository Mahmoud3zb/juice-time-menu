const SHOP_PHONE = "01069059005";
const WHATSAPP_NUMBER = "201069059005";
const ADDRESS = "قنا - حوض 10 أمام ديوان عام المحافظة";
const FACEBOOK_URL = "https://facebook.com";
const INSTAGRAM_URL = "https://instagram.com";

export function Footer() {
  return (
    <footer
      aria-label="أسفل الصفحة ومعلومات التواصل"
      className="bg-white border-t-[1.5px] border-brand-green/80 rounded-t-3xl px-4 py-2.5 flex justify-between items-center fixed bottom-0 w-full max-w-md shadow-[0_-10px_20px_rgba(0,0,0,0.06)] z-50 font-sans"
    >
      {/* Right Section: Action Icons + Contact Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Crisp Social Action Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Phone Call */}
          <a
            href={`tel:${SHOP_PHONE}`}
            aria-label="اتصل بنا"
            title={`اتصل بنا: ${SHOP_PHONE}`}
            className="w-8.5 h-8.5 rounded-full bg-emerald-50 text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 border border-emerald-200/70 flex items-center justify-center active:scale-90 shadow-2xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل عبر واتساب"
            title="واتساب"
            className="w-8.5 h-8.5 rounded-full bg-emerald-50 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 border border-emerald-200/70 flex items-center justify-center active:scale-90 shadow-2xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحة فيسبوك"
            title="فيسبوك: Juice Time Qena"
            className="w-8.5 h-8.5 rounded-full bg-blue-50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 border border-blue-200/70 flex items-center justify-center active:scale-90 shadow-2xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تابعنا على انستغرام"
            title="انستجرام: Juice Time Qena"
            className="w-8.5 h-8.5 rounded-full bg-rose-50 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 border border-rose-200/70 flex items-center justify-center active:scale-90 shadow-2xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* Text Details Block */}
        <div className="text-right flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-gray-400 leading-tight">تواصل معنا:</span>
            <a
              href={`tel:${SHOP_PHONE}`}
              className="text-brand-green font-extrabold text-xs sm:text-sm hover:underline leading-tight dir-ltr"
            >
              {SHOP_PHONE}
            </a>
          </div>
          <div className="flex items-center gap-0.5 text-[9px] text-gray-500 font-semibold truncate max-w-[135px] sm:max-w-[175px] leading-tight mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-brand-orange flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="truncate">{ADDRESS}</span>
          </div>
        </div>
      </div>

      {/* Left Section: Made by AZB + Circular Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-[9px] text-gray-400 font-bold hidden sm:block">
          Made by <span className="text-brand-orange font-extrabold">AZB</span>
        </div>
        <img
          src="/logo.png"
          alt="Juice Time"
          className="h-9 w-9 object-contain rounded-full border border-brand-green/20 p-0.5 bg-white shadow-xs"
        />
      </div>
    </footer>
  );
}
