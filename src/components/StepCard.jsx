import { CheckCircle, Lightbulb } from 'lucide-react'
import DNSVisual from './visualizations/DNSVisual'
import TCPVisual from './visualizations/TCPVisual'
import TLSVisual from './visualizations/TLSVisual'
import HTTPVisual from './visualizations/HTTPVisual'
import ServerVisual from './visualizations/ServerVisual'
import RenderVisual from './visualizations/RenderVisual'

const VISUALS = {
  '01': <DNSVisual />,
  '02': <TCPVisual />,
  '03': <TLSVisual />,
  '04': <HTTPVisual />,
  '05': <ServerVisual />,
  '06': <RenderVisual />,
}

export default function StepCard({ step, index }) {
  const isEven = index % 2 === 0
  const Icon = step.icon

  const accentColors = {
    '#FF6B6B': 'bg-neo-accent',
    '#FFD93D': 'bg-neo-secondary',
    '#C4B5FD': 'bg-neo-muted',
  }
  const colorBg = accentColors[step.color] || 'bg-neo-accent'

  return (
    <article className="relative mb-16 sm:mb-24 lg:mb-32">
      {/* Huge background step number */}
      <div
        className="absolute -top-8 sm:-top-12 font-black select-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(6rem, 20vw, 16rem)',
          lineHeight: 1,
          left: isEven ? '-0.02em' : undefined,
          right: !isEven ? '-0.02em' : undefined,
          WebkitTextStroke: '2px rgba(0,0,0,0.06)',
          color: 'transparent',
        }}
      >
        {step.id}
      </div>

      <div
        className={`relative z-10 flex flex-col ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-6 lg:gap-10`}
      >
        {/* Side panel: number + icon */}
        <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 flex-shrink-0">
          <div className="bg-black border-4 border-black shadow-neo px-4 py-2 flex-shrink-0">
            <span className="font-black text-3xl sm:text-5xl text-white leading-none">{step.id}</span>
          </div>
          <div
            className={`${colorBg} border-4 border-black shadow-neo p-4 flex-shrink-0 rotate-2 hover:rotate-0 transition-transform duration-200`}
          >
            <Icon className="w-10 h-10 sm:w-14 sm:h-14 stroke-[3px] text-black" />
          </div>
          <div className="hidden lg:block border-4 border-black bg-white shadow-neo-sm px-3 py-2 -rotate-1">
            <span className="font-black text-xs uppercase tracking-widest">{step.subtitle}</span>
          </div>
        </div>

        {/* Main content card */}
        <div className="flex-1 min-w-0">
          <div className="border-4 border-black shadow-neo bg-white lift-card">
            {/* Card header */}
            <div
              className={`${colorBg} border-b-4 border-black px-6 py-4 flex items-center justify-between`}
            >
              <h2 className="font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
                {step.title}
              </h2>
              <span className="font-black text-xs uppercase tracking-widest hidden sm:block border-4 border-black bg-white px-2 py-1 shadow-neo-sm">
                STEP {step.id}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Description */}
              <p className="font-bold text-base sm:text-lg leading-relaxed text-black mb-6 border-l-4 border-black pl-4">
                {step.description}
              </p>

              {/* ── VISUALIZATION ── */}
              {VISUALS[step.id] && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`${colorBg} border-4 border-black px-3 py-1 shadow-neo-sm -rotate-1`}>
                      <span className="font-black text-xs uppercase tracking-widest">시각화</span>
                    </div>
                    <div className="flex-1 h-1 border-t-4 border-black" />
                  </div>
                  {VISUALS[step.id]}
                </div>
              )}

              {/* Details list */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="border-4 border-black bg-black px-3 py-1 shadow-neo-sm">
                    <span className="font-black text-xs uppercase tracking-widest text-neo-secondary">상세 설명</span>
                  </div>
                  <div className="flex-1 h-1 border-t-4 border-black" />
                </div>
                <div className="space-y-3">
                  {step.details.map((detail, i) => (
                    <div
                      key={i}
                      className="border-4 border-black p-4 bg-neo-bg hover:-translate-y-0.5 hover:shadow-neo-sm transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 stroke-[3px] text-black flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-black text-sm uppercase tracking-wide block mb-1">
                            {detail.label}
                          </span>
                          <span className="font-bold text-sm leading-relaxed text-black">
                            {detail.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra items */}
              {step.extra && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-6">
                  {step.extra.map((item, i) => (
                    <div key={i} className="border-4 border-black p-3 bg-neo-muted">
                      <span className="font-black text-xs uppercase tracking-widest block mb-1">
                        {item.label}
                      </span>
                      <span className="font-bold text-sm leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tip */}
              {step.tip && (
                <div className="border-4 border-black bg-neo-secondary p-4 mt-6 hover:-rotate-1 transition-transform duration-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 stroke-[3px] fill-black text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-xs uppercase tracking-widest block mb-1">
                        💡 알아두기
                      </span>
                      <span className="font-bold text-sm leading-relaxed">{step.tip}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="border-4 border-black bg-black p-4 shadow-neo mt-6">
                <div className="flex items-center gap-3">
                  <div className={`${colorBg} border-4 border-white w-4 h-4 flex-shrink-0`} />
                  <span className="font-black text-sm sm:text-base text-white uppercase tracking-wide">
                    {step.result}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center mt-8 lg:mt-12">
        <div className="w-0.5 sm:w-1 h-12 sm:h-16 bg-black" />
      </div>
    </article>
  )
}
