export const Header = () => {
  return (
    <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="inline-block px-5 py-2 mb-4 border-2 border-[#003399] rounded-xl">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter italic">
          <span className="text-[#003399]">SELLATU</span>
          <span className="text-[#e11d48]">PARLEY</span>
        </h1>
        <div className="text-gray-600 italic text-xs font-black">EVENTOS</div>
      </div>
      <p className="text-black text-sm sm:text-sm">
        GESTIÓN DE VERIFICACIÓN DE TICKETS
      </p>
    </header>
  );
};
