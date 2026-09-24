interface WelcomeScreenProps {
  onExploreMenu: () => void;
}

export function WelcomeScreen({ onExploreMenu }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0e1713] via-[#08120d] to-[#040906] text-white p-6 font-sans overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-green/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-orange/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Content Container */}
      <div className="w-full max-w-md flex flex-col items-center justify-between min-h-[85vh] py-6 relative z-10 text-center">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-center">
            <img src="/img/logo svg.png" alt="Juice Time Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              عصير تايم <span className="text-brand-orange">JUICE TIME</span>
            </h1>
            <p className="text-[11px] text-emerald-400 font-semibold tracking-widest uppercase mt-1 dir-ltr opacity-90">
              Fresh Juices & Specialty Mixes
            </p>
          </div>
        </div>

        {/* 3D Model Display */}
        <div className="my-6 relative flex items-center justify-center w-full max-w-[270px] aspect-square">
          <div className="absolute inset-0 rounded-full border border-emerald-500/20 shadow-[0_0_60px_rgba(0,154,116,0.15)] animate-pulse" />
          <img
            src="/3D-Model.png"
            alt="Juice Time 3D Model"
            className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom Call to Action */}
        <div className="w-full flex flex-col items-center gap-5">
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-gray-100">طازج • طبيعي • منعش</h2>
            <p className="text-xs text-gray-400 font-medium max-w-xs leading-relaxed">
              استمتع بأشهى العصائر الفريش، الميكسات الاستوائية، والحلويات الفاخرة
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreMenu}
            className="w-full max-w-xs py-4 px-8 rounded-full bg-gradient-to-r from-brand-orange to-[#e05d0e] hover:from-[#e05d0e] hover:to-brand-orange text-white font-black text-base shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>اكتشف المنيو</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
