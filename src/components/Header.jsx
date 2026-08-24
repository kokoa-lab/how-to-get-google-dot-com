export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-neo-secondary border-4 border-neo-secondary px-3 py-1">
            <span className="font-black text-black text-sm sm:text-base uppercase tracking-widest">
              HOW TO
            </span>
          </div>
          <span className="font-black text-white text-sm sm:text-base uppercase tracking-widest hidden sm:block">
            GET GOOGLE.COM
          </span>
        </div>

        {/* Right badge */}
        <div className="flex items-center gap-2">
          <div className="border-2 border-neo-secondary px-3 py-1 rotate-1">
            <span className="font-bold text-neo-secondary text-xs uppercase tracking-widest">
              6 Steps
            </span>
          </div>
          <div className="bg-neo-accent border-4 border-neo-accent w-3 h-3 animate-bounce" />
        </div>
      </div>
    </header>
  )
}
