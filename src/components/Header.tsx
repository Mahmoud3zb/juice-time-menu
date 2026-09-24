export function Header() {
  return (
    <header className="w-full flex flex-col items-center bg-white">
      
      <div className="bg-brand-green text-white text-center py-1.5 text-[13px] font-semibold w-full">
        أهلاً بكم! تم المسح بنجاح | Welcome! Scan Successful
      </div>

     
      <div className="w-full py-4 flex justify-center border-b border-gray-100 relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#009a74 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
        <img
          src="/img/logo svg.png"
          alt="شعار عصير تايم - Juice Time Logo"
          className="h-24 w-auto object-contain relative z-10 drop-shadow-sm"
        />
      </div>
    </header>
  );
}
