import { ArrowDown, Star, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-neo-bg min-h-[90vh] flex flex-col justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Decorative floating shapes */}
      <div className="absolute top-12 right-8 w-20 h-20 bg-neo-accent border-4 border-black shadow-neo rotate-12 hidden sm:block" />
      <div className="absolute top-28 right-16 w-10 h-10 bg-neo-secondary border-4 border-black shadow-neo-sm -rotate-6 hidden sm:block" />
      <div className="absolute bottom-20 left-8 w-16 h-16 bg-neo-muted border-4 border-black shadow-neo rotate-3 hidden md:block" />
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-black rounded-full hidden md:block" />

      {/* Spinning star */}
      <div className="absolute top-16 left-12 hidden lg:block">
        <Star
          className="w-12 h-12 fill-neo-secondary stroke-black stroke-[3px] animate-spin-slow"
        />
      </div>
      <div className="absolute bottom-24 right-16 hidden lg:block">
        <Star
          className="w-8 h-8 fill-neo-accent stroke-black stroke-[3px] animate-spin-slow"
          style={{ animationDirection: 'reverse', animationDuration: '8s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-black text-white border-4 border-black px-4 py-2 mb-8 -rotate-1 shadow-neo-sm">
          <Zap className="w-4 h-4 fill-neo-secondary stroke-neo-secondary" />
          <span className="font-black text-xs sm:text-sm uppercase tracking-widest text-neo-secondary">
            브라우저 내부를 파헤친다
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-6">
          <h1 className="font-black leading-none tracking-tighter mb-2">
            {/* Outlined big text */}
            <span
              className="block text-6xl sm:text-8xl lg:text-[10rem] text-stroke"
              style={{ lineHeight: 0.9 }}
            >
              www.
            </span>
            <span
              className="block text-6xl sm:text-8xl lg:text-[10rem] font-black text-black"
              style={{ lineHeight: 0.9 }}
            >
              google.
            </span>
            <div className="flex flex-wrap items-end gap-4">
              <span
                className="block text-6xl sm:text-8xl lg:text-[10rem] text-stroke"
                style={{ lineHeight: 0.9 }}
              >
                com
              </span>
              <div
                className="bg-neo-accent border-4 border-black shadow-neo px-4 py-2 rotate-2 mb-2"
              >
                <span className="font-black text-2xl sm:text-4xl lg:text-6xl text-black uppercase">
                  을 입력하면?
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-2xl">
          <div className="bg-white border-4 border-black shadow-neo p-6 -rotate-1">
            <p className="font-bold text-lg sm:text-xl leading-relaxed text-black">
              단 한 번의 엔터(Enter) 키 입력으로{' '}
              <span className="bg-neo-secondary px-1">수십 개의 복잡한 과정</span>이 밀리초 안에
              일어납니다. DNS 조회부터 브라우저 렌더링까지, 6단계로 완전히 해부합니다.
            </p>
          </div>
        </div>

        {/* Step preview pills */}
        <div className="flex flex-wrap gap-3 mt-10">
          {['01 DNS', '02 TCP', '03 TLS', '04 HTTP', '05 서버응답', '06 렌더링'].map(
            (label, i) => {
              const colors = [
                'bg-neo-accent',
                'bg-neo-secondary',
                'bg-neo-muted',
                'bg-neo-accent',
                'bg-neo-secondary',
                'bg-neo-muted',
              ]
              return (
                <div
                  key={label}
                  className={`${colors[i]} border-4 border-black shadow-neo-sm px-4 py-2 font-black text-sm uppercase tracking-widest hover:-translate-y-1 transition-transform duration-200`}
                >
                  {label}
                </div>
              )
            }
          )}
        </div>

        {/* Scroll down */}
        <div className="mt-16 flex items-center gap-3">
          <div className="bg-black border-4 border-black p-3 shadow-neo animate-bounce">
            <ArrowDown className="w-6 h-6 text-white stroke-[3px]" />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest text-black">
            스크롤해서 알아보기
          </span>
        </div>
      </div>

      {/* Marquee banner */}
      <div className="border-t-4 border-b-4 border-black bg-black overflow-hidden py-3">
        <div className="animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="font-black text-neo-secondary text-sm uppercase tracking-widest">
                DNS LOOKUP
              </span>
              <Star className="w-4 h-4 fill-neo-accent stroke-neo-accent" />
              <span className="font-black text-white text-sm uppercase tracking-widest">
                TCP HANDSHAKE
              </span>
              <Star className="w-4 h-4 fill-neo-secondary stroke-neo-secondary" />
              <span className="font-black text-neo-muted text-sm uppercase tracking-widest">
                TLS ENCRYPTION
              </span>
              <Star className="w-4 h-4 fill-neo-accent stroke-neo-accent" />
              <span className="font-black text-neo-secondary text-sm uppercase tracking-widest">
                HTTP REQUEST
              </span>
              <Star className="w-4 h-4 fill-neo-muted stroke-neo-muted" />
              <span className="font-black text-white text-sm uppercase tracking-widest">
                SERVER RESPONSE
              </span>
              <Star className="w-4 h-4 fill-neo-secondary stroke-neo-secondary" />
              <span className="font-black text-neo-accent text-sm uppercase tracking-widest">
                BROWSER RENDER
              </span>
              <Star className="w-4 h-4 fill-white stroke-white" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
