import { useState } from 'react'
import { useStepAnimation } from '../../hooks/useStepAnimation'
import { RotateCcw, Lock, Shield, Key, CheckCircle } from 'lucide-react'

const TLS_STEPS = [
  {
    label: 'Client Hello',
    emoji: '👋',
    from: 'Client',
    desc: 'TLS 1.3 지원, 암호화 알고리즘 목록(Cipher Suites), 랜덤값 전송',
    direction: '→',
    color: '#FF6B6B',
    detail: 'TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256 ...',
  },
  {
    label: 'Server Hello',
    emoji: '🤝',
    from: 'Server',
    desc: '암호화 방식 선택, 서버 인증서(공개키 포함) 전송',
    direction: '←',
    color: '#FFD93D',
    detail: '선택: TLS_AES_256_GCM_SHA384',
  },
  {
    label: '인증서 검증',
    emoji: '🔍',
    from: 'Client',
    desc: 'CA(Certificate Authority) 서명 확인, 만료일·도메인 검증',
    direction: '🔐',
    color: '#C4B5FD',
    detail: 'DigiCert Global Root CA → Google Trust Services → *.google.com',
  },
  {
    label: 'Key Exchange',
    emoji: '🔑',
    from: 'Both',
    desc: 'ECDHE 알고리즘으로 Pre-master Secret 교환, 세션 키 도출',
    direction: '↔',
    color: '#FF6B6B',
    detail: 'ECDHE: 공개키 노출 없이 두 키를 교환',
  },
  {
    label: 'Finished',
    emoji: '🔒',
    from: 'Both',
    desc: '이후 모든 데이터를 AES-256-GCM으로 암호화. TLS 완료!',
    direction: '✓',
    color: '#FFD93D',
    detail: 'Symmetric key encryption — 빠르고 안전',
  },
]

export default function TLSVisual() {
  const { currentStep, restart } = useStepAnimation(TLS_STEPS.length, 1300)
  const [expanded, setExpanded] = useState(null)

  const completedLayers = Math.max(0, currentStep + 1)

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-black px-3 py-1 border-4 border-black">
          <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">TLS 1.3 핸드셰이크</span>
        </div>
        <button
          onClick={restart}
          className="border-4 border-black bg-white shadow-neo-sm px-3 py-1 flex items-center gap-1 push-btn hover:bg-neo-secondary"
        >
          <RotateCcw className="w-4 h-4 stroke-[3px]" />
          <span className="font-black text-xs uppercase tracking-wide hidden sm:block">재시작</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: step sequence */}
        <div className="space-y-2">
          {TLS_STEPS.map((step, i) => {
            const isActive = currentStep === i
            const isDone = currentStep > i
            const isExpanded = expanded === i

            return (
              <div
                key={i}
                className="border-4 border-black cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: isActive ? step.color : isDone ? '#f0f0e8' : '#fff',
                  boxShadow: isActive ? '6px 6px 0px 0px #000' : 'none',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className="w-8 h-8 flex items-center justify-center border-4 border-black flex-shrink-0 font-black text-sm"
                    style={{ backgroundColor: isDone || isActive ? step.color : '#fff' }}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className="text-lg">{step.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm uppercase tracking-wide">{step.label}</span>
                      <span
                        className="font-black text-xs border-2 border-black px-1.5 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.direction}
                      </span>
                    </div>
                    <span className="font-bold text-xs text-black/60">{step.from}</span>
                  </div>
                  {(isActive || isDone) && !isExpanded && (
                    <span className="font-bold text-xs text-black/40 hidden sm:block">▼ 상세</span>
                  )}
                </div>

                {/* Expanded detail */}
                {(isActive || isExpanded) && (
                  <div className="border-t-4 border-black px-3 py-2 bg-white">
                    <p className="font-bold text-xs sm:text-sm leading-relaxed mb-2">{step.desc}</p>
                    <div
                      className="border-2 border-black px-2 py-1.5 font-mono text-xs"
                      style={{ backgroundColor: step.color + '40' }}
                    >
                      {step.detail}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right: lock visualization */}
        <div className="flex flex-col items-center justify-center border-4 border-black bg-white p-6">
          <div className="text-center mb-4">
            <div className="font-black text-xs uppercase tracking-widest text-black/40 mb-2">보안 레이어 구축</div>

            {/* Lock icon stack */}
            <div className="relative flex items-center justify-center mb-4">
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-black flex items-center justify-center transition-all duration-500"
                style={{
                  backgroundColor:
                    completedLayers >= 5
                      ? '#000'
                      : completedLayers >= 3
                      ? '#C4B5FD'
                      : completedLayers >= 1
                      ? '#FFD93D'
                      : '#fff',
                  boxShadow:
                    completedLayers >= 5
                      ? '8px 8px 0px 0px #FF6B6B'
                      : '4px 4px 0px 0px #000',
                }}
              >
                {completedLayers >= 5 ? (
                  <Lock
                    className="w-12 h-12 sm:w-16 sm:h-16 stroke-[3px]"
                    style={{ color: '#FFD93D' }}
                  />
                ) : completedLayers >= 3 ? (
                  <Key
                    className="w-12 h-12 sm:w-16 sm:h-16 stroke-[3px]"
                    style={{ color: '#000' }}
                  />
                ) : completedLayers >= 1 ? (
                  <Shield
                    className="w-12 h-12 sm:w-16 sm:h-16 stroke-[3px]"
                    style={{ color: '#000' }}
                  />
                ) : (
                  <div className="font-black text-4xl text-black/20">?</div>
                )}
              </div>

              {/* Progress rings */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-4 border-black rounded-full transition-all duration-500"
                  style={{
                    width: `${(i + 2) * 20 + 80}px`,
                    height: `${(i + 2) * 20 + 80}px`,
                    opacity: completedLayers > i ? 0.15 : 0.03,
                    backgroundColor: TLS_STEPS[i]?.color,
                  }}
                />
              ))}
            </div>

            {/* Status */}
            <div
              className="border-4 border-black px-4 py-2 transition-all duration-500"
              style={{
                backgroundColor: completedLayers >= 5 ? '#000' : '#fff',
                boxShadow: completedLayers >= 5 ? '6px 6px 0px 0px #FF6B6B' : 'none',
              }}
            >
              <div
                className="font-black text-sm uppercase tracking-wide"
                style={{ color: completedLayers >= 5 ? '#FFD93D' : '#000' }}
              >
                {completedLayers >= 5
                  ? '🔒 암호화 채널 완성!'
                  : completedLayers > 0
                  ? `레이어 ${completedLayers}/5 구축 중...`
                  : '보안 협상 시작'}
              </div>
            </div>

            {/* Layer dots */}
            <div className="flex gap-2 justify-center mt-3">
              {TLS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="w-6 h-6 border-4 border-black transition-all duration-300"
                  style={{
                    backgroundColor: completedLayers > i ? step.color : '#fff',
                    transform: completedLayers > i ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="font-bold text-xs text-black/50 mt-3 uppercase tracking-wide">
        * 단계를 클릭하면 상세 정보를 볼 수 있습니다
      </p>
    </div>
  )
}
