import { useState } from 'react'
import { useStepAnimation } from '../../hooks/useStepAnimation'
import { RotateCcw } from 'lucide-react'

const NODES = [
  {
    label: 'Browser Cache',
    sublabel: '브라우저 내부 캐시',
    emoji: '🌐',
    color: '#FFD93D',
    query: 'www.google.com?',
    response: '캐시 없음(MISS) →',
  },
  {
    label: 'OS Cache',
    sublabel: '/etc/hosts · OS DNS',
    emoji: '💻',
    color: '#C4B5FD',
    query: 'www.google.com?',
    response: '캐시 없음(MISS) →',
  },
  {
    label: 'ISP DNS Resolver',
    sublabel: '재귀적 질의 시작',
    emoji: '📡',
    color: '#FF6B6B',
    query: 'www.google.com?',
    response: 'Root NS에 위임 →',
  },
  {
    label: 'Root Nameserver',
    sublabel: '전 세계 13개 클러스터',
    emoji: '🌍',
    color: '#FFD93D',
    query: '.com TLD NS 주소?',
    response: 'a.gtld-servers.net →',
  },
  {
    label: '.com TLD NS',
    sublabel: 'Verisign 운영',
    emoji: '📋',
    color: '#C4B5FD',
    query: 'google.com NS 주소?',
    response: 'ns1.google.com →',
  },
  {
    label: 'Authoritative NS',
    sublabel: 'ns1~4.google.com',
    emoji: '✅',
    color: '#FF6B6B',
    query: 'www.google.com A레코드?',
    response: '142.250.196.100 ✓',
  },
]

export default function DNSVisual() {
  const { currentStep, restart } = useStepAnimation(NODES.length, 900)
  const [hovered, setHovered] = useState(null)

  const isActive = (i) => currentStep === i
  const isPast = (i) => currentStep > i
  const activeNode = hovered !== null ? hovered : currentStep

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-black px-3 py-1 border-4 border-black">
            <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">DNS 조회 체인</span>
          </div>
        </div>
        <button
          onClick={restart}
          className="border-4 border-black bg-white shadow-neo-sm px-3 py-1 flex items-center gap-1 push-btn hover:bg-neo-secondary"
          aria-label="애니메이션 재시작"
        >
          <RotateCcw className="w-4 h-4 stroke-[3px]" />
          <span className="font-black text-xs uppercase tracking-wide hidden sm:block">재시작</span>
        </button>
      </div>

      {/* Chain diagram */}
      <div className="flex flex-col gap-0">
        {NODES.map((node, i) => (
          <div key={i}>
            {/* Node box */}
            <div
              className="flex items-stretch gap-3 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left: step line */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <div
                  className="w-8 h-8 flex items-center justify-center border-4 border-black flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor:
                      isActive(i) || isPast(i) ? node.color : '#fff',
                  }}
                >
                  <span className="font-black text-xs">{i + 1}</span>
                </div>
                {i < NODES.length - 1 && (
                  <div
                    className="w-0.5 flex-1 min-h-[24px] transition-all duration-500"
                    style={{ backgroundColor: isPast(i) || isActive(i) ? '#000' : '#ccc' }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                className="flex-1 border-4 border-black mb-2 transition-all duration-300"
                style={{
                  backgroundColor: isActive(i) ? node.color : isPast(i) ? '#f0f0e8' : '#fff',
                  boxShadow: isActive(i) ? '6px 6px 0px 0px #000' : 'none',
                  transform: isActive(i) ? 'translateY(-2px)' : 'none',
                }}
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">{node.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-black text-sm leading-none truncate">{node.label}</div>
                      <div className="font-bold text-xs text-black/60 mt-0.5">{node.sublabel}</div>
                    </div>
                  </div>
                  {(isActive(i) || isPast(i)) && (
                    <div className="flex-shrink-0 ml-2">
                      {isPast(i) ? (
                        <span className="font-black text-xs bg-black text-white px-2 py-0.5 border-2 border-black">✓</span>
                      ) : (
                        <span
                          className="font-black text-xs border-2 border-black px-2 py-0.5 animate-pulse"
                          style={{ backgroundColor: node.color }}
                        >
                          조회중
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Active/hovered detail */}
                {activeNode === i && (
                  <div className="border-t-4 border-black px-3 py-2 grid grid-cols-2 gap-2">
                    <div className="border-2 border-black bg-white p-2">
                      <div className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">Query →</div>
                      <div className="font-bold text-xs">{node.query}</div>
                    </div>
                    <div
                      className="border-2 border-black p-2"
                      style={{ backgroundColor: node.color }}
                    >
                      <div className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">Response ←</div>
                      <div className="font-bold text-xs">{node.response}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Result */}
      <div
        className="border-4 border-black p-3 flex items-center gap-3 transition-all duration-500"
        style={{
          backgroundColor: currentStep >= NODES.length ? '#FFD93D' : '#fff',
          boxShadow: currentStep >= NODES.length ? '8px 8px 0px 0px #000' : 'none',
        }}
      >
        <span className="text-2xl">📍</span>
        <div>
          <div className="font-black text-sm uppercase tracking-wide">IP 주소 획득!</div>
          <div className="font-mono font-bold text-base">142.250.196.100</div>
        </div>
        {currentStep >= NODES.length && (
          <div className="ml-auto bg-black text-neo-secondary border-4 border-black px-3 py-1">
            <span className="font-black text-xs uppercase">완료 ✓</span>
          </div>
        )}
      </div>

      <p className="font-bold text-xs text-black/50 mt-3 uppercase tracking-wide">
        * 노드에 마우스를 올리면 Query/Response를 확인할 수 있습니다
      </p>
    </div>
  )
}
