import { useStepAnimation } from '../../hooks/useStepAnimation'
import { RotateCcw } from 'lucide-react'

const HANDSHAKE_STEPS = [
  {
    id: 0,
    label: 'SYN',
    direction: 'right',
    from: '클라이언트',
    to: '서버',
    description: '"연결 요청" — 초기 시퀀스 번호(ISN) 전송',
    color: '#FF6B6B',
    emoji: '→',
  },
  {
    id: 1,
    label: 'SYN-ACK',
    direction: 'left',
    from: '서버',
    to: '클라이언트',
    description: '"요청 수락" — 서버 ISN + 클라이언트 ACK 전송',
    color: '#FFD93D',
    emoji: '←',
  },
  {
    id: 2,
    label: 'ACK',
    direction: 'right',
    from: '클라이언트',
    to: '서버',
    description: '"확인 완료" — 연결 수립, 데이터 전송 준비',
    color: '#C4B5FD',
    emoji: '→',
  },
]

function PacketArrow({ step, active, done }) {
  const isRight = step.direction === 'right'
  return (
    <div className="relative flex items-center my-1 sm:my-2 h-12 sm:h-14">
      {/* Packet label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 border-4 border-black px-3 py-1 font-black text-sm sm:text-base uppercase tracking-wide transition-all duration-300"
        style={{
          backgroundColor: active || done ? step.color : '#fff',
          boxShadow: active ? '4px 4px 0px 0px #000' : 'none',
          transform: active
            ? `translate(-50%, 0) scale(1.1)`
            : 'translate(-50%, 0) scale(1)',
        }}
      >
        {step.label}
      </div>

      {/* Arrow line */}
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-full h-1 sm:h-1.5 transition-all duration-500 relative overflow-hidden"
          style={{ backgroundColor: done || active ? '#000' : '#ddd' }}
        >
          {/* Animated packet dot */}
          {active && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-4 border-black rounded-full"
              style={{
                backgroundColor: step.color,
                animation: `${isRight ? 'packetRight' : 'packetLeft'} 0.9s ease-in-out forwards`,
              }}
            />
          )}
        </div>
      </div>

      {/* Arrowhead */}
      <div
        className="absolute transition-all duration-500 z-10"
        style={{
          right: isRight ? '10%' : undefined,
          left: !isRight ? '10%' : undefined,
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          [isRight ? 'borderLeft' : 'borderRight']: `16px solid ${done || active ? '#000' : '#ddd'}`,
        }}
      />

      {/* Column markers */}
      <div className="absolute left-[15%] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-black/20" />
      <div className="absolute right-[15%] top-0 bottom-0 w-0.5 border-r-2 border-dashed border-black/20" />
    </div>
  )
}

export default function TCPVisual() {
  const { currentStep, restart } = useStepAnimation(4, 1100)

  const isConnected = currentStep >= 3

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-black px-3 py-1 border-4 border-black">
          <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">3-Way Handshake 시퀀스</span>
        </div>
        <button
          onClick={restart}
          className="border-4 border-black bg-white shadow-neo-sm px-3 py-1 flex items-center gap-1 push-btn hover:bg-neo-secondary"
        >
          <RotateCcw className="w-4 h-4 stroke-[3px]" />
          <span className="font-black text-xs uppercase tracking-wide hidden sm:block">재시작</span>
        </button>
      </div>

      {/* Columns header */}
      <div className="grid grid-cols-3 mb-2">
        <div
          className="border-4 border-black p-2 sm:p-3 text-center transition-all duration-300"
          style={{
            backgroundColor: isConnected ? '#C4B5FD' : '#FFD93D',
            boxShadow: '4px 4px 0px 0px #000',
          }}
        >
          <div className="text-xl sm:text-2xl mb-1">🌐</div>
          <div className="font-black text-xs sm:text-sm uppercase">클라이언트</div>
          <div className="font-bold text-xs text-black/60">브라우저</div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full h-0.5 bg-black/20" />
        </div>

        <div
          className="border-4 border-black p-2 sm:p-3 text-center transition-all duration-300"
          style={{
            backgroundColor: isConnected ? '#C4B5FD' : '#FF6B6B',
            boxShadow: '4px 4px 0px 0px #000',
          }}
        >
          <div className="text-xl sm:text-2xl mb-1">🖥️</div>
          <div className="font-black text-xs sm:text-sm uppercase">서버</div>
          <div className="font-bold text-xs text-black/60">google.com</div>
        </div>
      </div>

      {/* Timeline container */}
      <div className="border-4 border-black bg-white p-4 mb-4">
        {/* Vertical timelines */}
        <div className="relative">
          <div className="absolute left-[15%] top-0 bottom-0 w-1 bg-black/10 border-l-4 border-dashed border-black/20" />
          <div className="absolute right-[15%] top-0 bottom-0 w-1 bg-black/10 border-r-4 border-dashed border-black/20" />

          {HANDSHAKE_STEPS.map((step, i) => (
            <div key={i}>
              <PacketArrow
                step={step}
                active={currentStep === i}
                done={currentStep > i}
              />
              {/* Step description */}
              {(currentStep === i || currentStep > i) && (
                <div
                  className="border-2 border-black px-3 py-2 mb-2 mx-4 sm:mx-12 transition-all duration-300"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="font-black text-xs sm:text-sm">{step.emoji} {step.label}: </span>
                  <span className="font-bold text-xs sm:text-sm">{step.description}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connection status */}
      <div
        className="border-4 border-black p-4 flex items-center justify-between transition-all duration-500"
        style={{
          backgroundColor: isConnected ? '#C4B5FD' : '#fff',
          boxShadow: isConnected ? '8px 8px 0px 0px #000' : 'none',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 border-4 border-black rounded-full flex-shrink-0 transition-all duration-300"
            style={{ backgroundColor: isConnected ? '#000' : '#ddd' }}
          />
          <div>
            <div className="font-black text-sm uppercase tracking-wide">
              {isConnected ? '🔗 TCP 연결 수립 완료!' : '연결 대기중...'}
            </div>
            {isConnected && (
              <div className="font-bold text-xs text-black/70">
                Port 443 · 신뢰할 수 있는 양방향 통신 채널 오픈
              </div>
            )}
          </div>
        </div>
        {isConnected && (
          <div className="bg-black text-neo-secondary border-4 border-black px-3 py-1 flex-shrink-0">
            <span className="font-black text-xs uppercase">ESTABLISHED</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes packetRight {
          from { left: 0; }
          to { left: calc(100% - 16px); }
        }
        @keyframes packetLeft {
          from { right: 0; left: auto; }
          to { right: calc(100% - 16px); left: auto; }
        }
      `}</style>
    </div>
  )
}
