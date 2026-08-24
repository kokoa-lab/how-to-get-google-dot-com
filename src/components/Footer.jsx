import { Star, Globe, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-black border-t-4 border-black">
      {/* Summary banner */}
      <div className="border-b-4 border-white/20 bg-neo-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-black border-4 border-black p-2 shadow-neo-sm">
                  <Globe className="w-6 h-6 text-neo-secondary stroke-[3px]" />
                </div>
                <span className="font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
                  요약
                </span>
              </div>
              <p className="font-bold text-base sm:text-lg text-black max-w-xl leading-relaxed">
                엔터 한 번에 <span className="bg-black text-neo-secondary px-1">6단계</span>,
                수십 개의 네트워크 요청, 그리고 밀리초 단위의 기적이 일어납니다.
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="bg-black border-4 border-black text-neo-secondary font-black text-sm uppercase tracking-widest px-6 py-4 shadow-neo push-btn hover:bg-white hover:text-black flex items-center gap-2"
            >
              <ArrowUp className="w-5 h-5 stroke-[3px]" />
              맨 위로
            </button>
          </div>
        </div>
      </div>

      {/* Steps summary grid */}
      <div className="border-b-4 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: '01', label: 'DNS 조회', color: 'bg-neo-accent' },
              { id: '02', label: 'TCP 연결', color: 'bg-neo-secondary' },
              { id: '03', label: 'TLS 핸드셰이크', color: 'bg-neo-muted' },
              { id: '04', label: 'HTTP 요청', color: 'bg-neo-accent' },
              { id: '05', label: '서버 응답', color: 'bg-neo-secondary' },
              { id: '06', label: '브라우저 렌더링', color: 'bg-neo-muted' },
            ].map((step) => (
              <div
                key={step.id}
                className="border-4 border-white/20 p-4 hover:border-white/60 transition-colors duration-200"
              >
                <div className={`${step.color} border-4 border-black w-10 h-10 flex items-center justify-center mb-3`}>
                  <span className="font-black text-sm text-black">{step.id}</span>
                </div>
                <span className="font-bold text-sm text-white leading-snug block">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-neo-secondary border-4 border-neo-secondary px-3 py-1">
            <span className="font-black text-black text-xs uppercase tracking-widest">HOW TO</span>
          </div>
          <span className="font-bold text-white text-sm uppercase tracking-widest">
            GET GOOGLE.COM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-neo-secondary stroke-neo-secondary animate-spin-slow" />
          <span className="font-bold text-white/60 text-xs uppercase tracking-widest">
            Built with Bun + Vite + React
          </span>
          <Star className="w-4 h-4 fill-neo-accent stroke-neo-accent animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>
    </footer>
  )
}
