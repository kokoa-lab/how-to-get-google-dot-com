import { useState } from 'react'
import { useStepAnimation } from '../../hooks/useStepAnimation'
import { RotateCcw } from 'lucide-react'

const PIPELINE_STEPS = [
  {
    id: 0,
    label: 'HTML 파싱',
    sublabel: 'Parse HTML',
    color: '#FF6B6B',
    emoji: '📄',
    output: 'DOM Tree',
    outputEmoji: '🌳',
    desc: 'HTML 태그를 읽어 DOM(Document Object Model) 트리를 생성합니다.',
    visual: 'dom',
  },
  {
    id: 1,
    label: 'CSS 파싱',
    sublabel: 'Parse CSS',
    color: '#FFD93D',
    emoji: '🎨',
    output: 'CSSOM Tree',
    outputEmoji: '🌿',
    desc: 'CSS 규칙을 파싱해 CSSOM(CSS Object Model) 트리를 생성합니다.',
    visual: 'cssom',
  },
  {
    id: 2,
    label: 'Render Tree',
    sublabel: 'DOM + CSSOM',
    color: '#C4B5FD',
    emoji: '🔗',
    output: 'Render Tree',
    outputEmoji: '🌲',
    desc: 'DOM과 CSSOM을 합쳐, 실제 화면에 보이는 요소만 포함한 Render Tree를 구성합니다.',
    visual: 'rendertree',
  },
  {
    id: 3,
    label: 'Layout',
    sublabel: 'Reflow',
    color: '#FF6B6B',
    emoji: '📐',
    output: '좌표·크기',
    outputEmoji: '📏',
    desc: '각 요소의 정확한 위치(x, y)와 크기(width, height)를 계산합니다.',
    visual: 'layout',
  },
  {
    id: 4,
    label: 'Paint',
    sublabel: 'Draw Pixels',
    color: '#FFD93D',
    emoji: '🖌️',
    output: '픽셀 레이어',
    outputEmoji: '🖼️',
    desc: '계산된 레이아웃을 바탕으로 텍스트, 색상, 이미지 등을 픽셀로 그립니다.',
    visual: 'paint',
  },
  {
    id: 5,
    label: 'Composite',
    sublabel: 'GPU 합성',
    color: '#C4B5FD',
    emoji: '⚡',
    output: '화면 출력',
    outputEmoji: '🖥️',
    desc: 'GPU가 여러 레이어를 최종 합성해 화면에 출력합니다.',
    visual: 'composite',
  },
]

// Mini DOM tree visualization
function DOMTree() {
  return (
    <div className="font-mono text-xs leading-6 p-3 bg-black text-neo-secondary">
      <div className="text-white/50">&lt;<span className="text-neo-accent">html</span>&gt;</div>
      <div className="pl-4 text-white/50">&lt;<span className="text-neo-secondary">head</span>&gt;...&lt;/<span className="text-neo-secondary">head</span>&gt;</div>
      <div className="pl-4 text-white/50">&lt;<span className="text-neo-secondary">body</span>&gt;</div>
      <div className="pl-8 text-white/50">&lt;<span className="text-neo-accent">div</span> id=<span className="text-neo-muted">"app"</span>&gt;</div>
      <div className="pl-12 text-white/50">&lt;<span className="text-neo-accent">h1</span>&gt;Google&lt;/<span className="text-neo-accent">h1</span>&gt;</div>
      <div className="pl-12 text-white/50">&lt;<span className="text-neo-accent">input</span> /&gt;</div>
      <div className="pl-8 text-white/50">&lt;/<span className="text-neo-accent">div</span>&gt;</div>
      <div className="pl-4 text-white/50">&lt;/<span className="text-neo-secondary">body</span>&gt;</div>
      <div className="text-white/50">&lt;/<span className="text-neo-accent">html</span>&gt;</div>
    </div>
  )
}

// CSS rules visualization
function CSSOMTree() {
  return (
    <div className="font-mono text-xs leading-6 p-3 bg-black text-neo-secondary">
      <div><span className="text-neo-accent">body</span> {'{'}</div>
      <div className="pl-4"><span className="text-white/70">font-family</span>: <span className="text-neo-secondary">Arial;</span></div>
      <div>{'}'}</div>
      <div><span className="text-neo-accent">h1</span> {'{'}</div>
      <div className="pl-4"><span className="text-white/70">font-size</span>: <span className="text-neo-secondary">24px;</span></div>
      <div className="pl-4"><span className="text-white/70">color</span>: <span className="text-neo-secondary">#202124;</span></div>
      <div>{'}'}</div>
      <div><span className="text-neo-accent">input</span> {'{'}</div>
      <div className="pl-4"><span className="text-white/70">width</span>: <span className="text-neo-secondary">450px;</span></div>
      <div>{'}'}</div>
    </div>
  )
}

// Layout box model
function LayoutVisual() {
  return (
    <div className="p-3 bg-white border-4 border-black flex items-center justify-center min-h-[100px]">
      <div className="relative border-4 border-dashed border-black p-1" style={{ width: '180px' }}>
        <div className="absolute -top-5 left-0 font-black text-xs text-black/40">margin</div>
        <div className="border-4 border-black bg-neo-muted p-1">
          <div className="absolute -top-5 left-20 font-black text-xs text-black/40">border</div>
          <div className="border-4 border-dashed border-black/40 bg-neo-secondary p-2">
            <div className="absolute top-2 left-2 font-black text-xs text-black/40">padding</div>
            <div className="bg-neo-accent border-4 border-black p-2 text-center">
              <span className="font-black text-xs">content</span>
              <div className="font-bold text-xs text-black/60">450 × 44px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Paint pixel grid
function PaintVisual() {
  const pixels = Array.from({ length: 6 * 8 }, (_, i) => {
    const row = Math.floor(i / 8)
    const col = i % 8
    if (row === 0) return '#202124'
    if (row >= 2 && row <= 3 && col >= 1 && col <= 6) return '#4285f4'
    if (row === 5 && col >= 2 && col <= 5) return '#FF6B6B'
    return '#f8f9fa'
  })
  return (
    <div className="p-3 bg-black flex flex-col items-center gap-1">
      <div className="font-black text-xs text-white/40 mb-2 uppercase tracking-widest">픽셀 렌더링</div>
      <div
        className="border-4 border-black"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '2px',
          padding: '4px',
          backgroundColor: '#333',
        }}
      >
        {pixels.map((color, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              border: '1px solid rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </div>
      <div className="font-bold text-xs text-white/40 mt-1">텍스트, 버튼, 배경 픽셀화</div>
    </div>
  )
}

// Composite layers
function CompositeVisual() {
  const layers = [
    { label: 'Layer 3: Overlay', color: '#FF6B6B', rotate: '-2deg', opacity: 0.9 },
    { label: 'Layer 2: Content', color: '#FFD93D', rotate: '0deg', opacity: 0.95 },
    { label: 'Layer 1: Background', color: '#C4B5FD', rotate: '1deg', opacity: 1 },
  ]
  return (
    <div className="p-3 bg-black flex flex-col items-center">
      <div className="font-black text-xs text-white/40 mb-3 uppercase tracking-widest">레이어 합성</div>
      <div className="relative h-24 w-48">
        {layers.map((layer, i) => (
          <div
            key={i}
            className="absolute border-4 border-black flex items-center justify-center"
            style={{
              backgroundColor: layer.color,
              width: `${160 - i * 20}px`,
              height: '40px',
              top: `${i * 20}px`,
              left: `${i * 10}px`,
              transform: `rotate(${layer.rotate})`,
              boxShadow: '4px 4px 0px 0px rgba(255,255,255,0.3)',
              zIndex: 10 - i,
            }}
          >
            <span className="font-black text-xs text-black">{layer.label}</span>
          </div>
        ))}
      </div>
      <div className="font-bold text-xs text-neo-secondary mt-4">GPU → 최종 화면 출력 🖥️</div>
    </div>
  )
}

const VISUALS = {
  dom: <DOMTree />,
  cssom: <CSSOMTree />,
  rendertree: (
    <div className="font-mono text-xs p-3 bg-black text-neo-secondary leading-6">
      <div className="text-neo-muted"># Render Tree (보이는 요소만)</div>
      <div className="text-white/50">├─ <span className="text-neo-secondary">body</span></div>
      <div className="text-white/50">│  ├─ <span className="text-neo-accent">h1</span> "Google" <span className="text-neo-muted">(font-size:24px)</span></div>
      <div className="text-white/50">│  └─ <span className="text-neo-accent">input</span> <span className="text-neo-muted">(width:450px)</span></div>
      <div className="text-white/50 line-through opacity-40">│  # display:none → 제외됨</div>
    </div>
  ),
  layout: <LayoutVisual />,
  paint: <PaintVisual />,
  composite: <CompositeVisual />,
}

export default function RenderVisual() {
  const { currentStep, restart } = useStepAnimation(PIPELINE_STEPS.length, 1200)
  const [selectedStep, setSelectedStep] = useState(null)

  const activeStep = selectedStep !== null ? selectedStep : Math.max(0, currentStep)

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-black px-3 py-1 border-4 border-black">
          <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">Critical Rendering Path</span>
        </div>
        <button
          onClick={() => { restart(); setSelectedStep(null) }}
          className="border-4 border-black bg-white shadow-neo-sm px-3 py-1 flex items-center gap-1 push-btn hover:bg-neo-secondary"
        >
          <RotateCcw className="w-4 h-4 stroke-[3px]" />
          <span className="font-black text-xs uppercase tracking-wide hidden sm:block">재시작</span>
        </button>
      </div>

      {/* Pipeline */}
      <div className="flex gap-1 sm:gap-2 mb-4 overflow-x-auto pb-2">
        {PIPELINE_STEPS.map((step, i) => {
          const isActive = currentStep === i
          const isDone = currentStep > i
          const isSelected = selectedStep === i

          return (
            <div key={i} className="flex items-center flex-shrink-0">
              <button
                onClick={() => setSelectedStep(isSelected ? null : i)}
                className="border-4 border-black text-center transition-all duration-300 w-16 sm:w-20 push-btn"
                style={{
                  backgroundColor: isSelected ? step.color : isActive ? step.color : isDone ? step.color + '80' : '#fff',
                  boxShadow: isActive || isSelected ? '6px 6px 0px 0px #000' : isDone ? '3px 3px 0px 0px #000' : 'none',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                }}
              >
                <div className="p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl mb-1">{step.emoji}</div>
                  <div className="font-black text-xs leading-tight">{step.label}</div>
                  <div className="font-bold text-xs text-black/50 hidden sm:block mt-0.5">{step.sublabel}</div>
                </div>
                {isDone && (
                  <div className="bg-black text-white font-black text-xs py-0.5">✓</div>
                )}
              </button>
              {i < PIPELINE_STEPS.length - 1 && (
                <div
                  className="w-4 sm:w-6 h-0.5 flex-shrink-0 mx-0.5 transition-colors duration-500"
                  style={{ backgroundColor: isDone ? '#000' : '#ccc' }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Text description */}
        <div>
          {PIPELINE_STEPS[activeStep] && (
            <div
              className="border-4 border-black h-full transition-all duration-300"
              style={{ backgroundColor: PIPELINE_STEPS[activeStep].color }}
            >
              <div className="border-b-4 border-black px-4 py-3 bg-black">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{PIPELINE_STEPS[activeStep].emoji}</span>
                  <span className="font-black text-sm sm:text-base uppercase tracking-wide text-white">
                    {PIPELINE_STEPS[activeStep].label}
                  </span>
                  <span className="font-mono text-xs text-white/40 ml-auto">
                    {activeStep + 1}/{PIPELINE_STEPS.length}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm sm:text-base leading-relaxed text-black mb-4">
                  {PIPELINE_STEPS[activeStep].desc}
                </p>
                <div className="flex items-center gap-3">
                  <div className="border-4 border-black bg-white px-3 py-2 flex-shrink-0">
                    <span className="font-bold text-xs text-black/50 block">입력</span>
                    <span className="text-xl">{PIPELINE_STEPS[activeStep].emoji}</span>
                  </div>
                  <div className="font-black text-2xl">→</div>
                  <div
                    className="border-4 border-black px-3 py-2 flex-shrink-0"
                    style={{ backgroundColor: '#000' }}
                  >
                    <span className="font-bold text-xs text-white/50 block">출력</span>
                    <span className="font-black text-sm text-neo-secondary">
                      {PIPELINE_STEPS[activeStep].outputEmoji} {PIPELINE_STEPS[activeStep].output}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visual representation */}
        <div className="border-4 border-black overflow-hidden">
          <div className="bg-black border-b-4 border-black px-4 py-2">
            <span className="font-black text-xs text-white/50 uppercase tracking-widest">
              시각화: {PIPELINE_STEPS[activeStep]?.output}
            </span>
          </div>
          {VISUALS[PIPELINE_STEPS[activeStep]?.visual]}
        </div>
      </div>

      {/* JS note */}
      <div className="mt-4 border-4 border-black bg-black p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">⚡</span>
        <div>
          <div className="font-black text-xs text-neo-secondary uppercase tracking-widest mb-1">JavaScript 실행 (V8 엔진)</div>
          <div className="font-bold text-xs text-white/70 leading-relaxed">
            JS가 DOM을 변경하면 Reflow(Layout)와 Repaint(Paint)가 다시 발생합니다.{' '}
            <span className="text-neo-accent">transform/opacity</span> 속성은 Composite 단계만 트리거해 성능이 최적입니다.
          </div>
        </div>
      </div>

      <p className="font-bold text-xs text-black/50 mt-3 uppercase tracking-wide">
        * 파이프라인 단계를 클릭하면 해당 단계의 시각화를 볼 수 있습니다
      </p>
    </div>
  )
}
