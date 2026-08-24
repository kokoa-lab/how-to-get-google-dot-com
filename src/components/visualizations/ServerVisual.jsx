import { useState } from 'react'
import { useStepAnimation } from '../../hooks/useStepAnimation'
import { RotateCcw } from 'lucide-react'

const STATUS_CODES = [
  { code: '200', label: 'OK', desc: '요청 성공. HTML, CSS, JS 등 리소스 정상 반환', color: '#FFD93D' },
  { code: '301', label: 'Moved Permanently', desc: '영구 리다이렉트. http:// → https:// 전환 시 사용', color: '#C4B5FD' },
  { code: '304', label: 'Not Modified', desc: '캐시된 리소스가 최신 → 다시 전송하지 않음', color: '#C4B5FD' },
  { code: '404', label: 'Not Found', desc: '요청한 리소스가 서버에 존재하지 않음', color: '#FF6B6B' },
  { code: '500', label: 'Internal Server Error', desc: '서버 내부 오류. 개발자가 확인해야 할 에러', color: '#FF6B6B' },
]

const ARCH_NODES = [
  { id: 0, emoji: '🌐', label: '브라우저', sublabel: '클라이언트', color: '#FFD93D' },
  { id: 1, emoji: '🔀', label: 'Load Balancer', sublabel: '트래픽 분산', color: '#C4B5FD' },
  { id: 2, emoji: '📦', label: 'CDN Edge', sublabel: '가장 가까운 서버', color: '#FF6B6B' },
  { id: 3, emoji: '🖥️', label: 'Google Server', sublabel: 'Origin Server', color: '#FFD93D' },
]

function DataFlow({ active, from, to, label, color }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* from node */}
      <div
        className="border-4 border-black p-2 sm:p-3 text-center transition-all duration-400 flex-1"
        style={{
          backgroundColor: active ? from.color : '#fff',
          boxShadow: active ? '4px 4px 0px 0px #000' : 'none',
        }}
      >
        <div className="text-base sm:text-xl">{from.emoji}</div>
        <div className="font-black text-xs hidden sm:block">{from.label}</div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="border-2 border-black px-1.5 py-0.5 font-black text-xs mb-1 transition-all duration-300 hidden sm:block"
          style={{ backgroundColor: active ? color : '#fff' }}
        >
          {label}
        </div>
        <div
          className="h-0.5 w-8 sm:w-12 transition-all duration-300"
          style={{ backgroundColor: active ? '#000' : '#ccc' }}
        />
        <div
          className="w-0 h-0 transition-all duration-300"
          style={{
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: `10px solid ${active ? '#000' : '#ccc'}`,
          }}
        />
      </div>
    </div>
  )
}

export default function ServerVisual() {
  const { currentStep, restart } = useStepAnimation(ARCH_NODES.length, 1000)
  const [selectedCode, setSelectedCode] = useState(null)
  const [tab, setTab] = useState('arch')

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-black px-3 py-1 border-4 border-black">
          <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">서버 응답 시스템</span>
        </div>
        <div className="flex">
          {[
            { key: 'arch', label: '아키텍처' },
            { key: 'status', label: '상태코드' },
            { key: 'response', label: '응답헤더' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="border-4 border-black px-2 sm:px-3 py-1 font-black text-xs uppercase tracking-wide push-btn -ml-1 first:ml-0"
              style={{ backgroundColor: tab === t.key ? '#000' : '#fff', color: tab === t.key ? '#FFD93D' : '#000' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'arch' && (
        <div>
          {/* Architecture flow */}
          <div className="border-4 border-black bg-white p-4 mb-4">
            <div className="font-black text-xs uppercase tracking-widest text-black/40 mb-4 text-center">
              요청 처리 경로 (Request → Response)
            </div>

            {/* Flow diagram */}
            <div className="flex items-stretch gap-1 sm:gap-2 mb-6">
              {ARCH_NODES.map((node, i) => (
                <div key={i} className="flex items-center flex-1 min-w-0">
                  <div
                    className="border-4 border-black p-2 sm:p-4 text-center w-full transition-all duration-400"
                    style={{
                      backgroundColor: currentStep >= i ? node.color : '#fff',
                      boxShadow: currentStep === i ? '6px 6px 0px 0px #000' : 'none',
                      transform: currentStep === i ? 'translateY(-4px)' : 'none',
                    }}
                  >
                    <div className="text-2xl sm:text-3xl mb-1">{node.emoji}</div>
                    <div className="font-black text-xs sm:text-sm leading-tight">{node.label}</div>
                    <div className="font-bold text-xs text-black/60 hidden sm:block">{node.sublabel}</div>
                  </div>
                  {i < ARCH_NODES.length - 1 && (
                    <div className="flex flex-col items-center px-1 flex-shrink-0">
                      <div
                        className="w-6 sm:w-8 h-0.5 transition-colors duration-500"
                        style={{ backgroundColor: currentStep > i ? '#000' : '#ccc' }}
                      />
                      <div
                        className="w-0 h-0"
                        style={{
                          borderTop: '4px solid transparent',
                          borderBottom: '4px solid transparent',
                          borderLeft: `8px solid ${currentStep > i ? '#000' : '#ccc'}`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Node details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '브라우저', desc: 'HTTP/2로 요청 전송', color: '#FFD93D' },
                { label: 'Load Balancer', desc: '수백만 요청을 여러 서버로 분배', color: '#C4B5FD' },
                { label: 'CDN Edge', desc: '가장 가까운 PoP에서 캐시 응답', color: '#FF6B6B' },
                { label: 'Origin Server', desc: '동적 콘텐츠 생성 후 반환', color: '#FFD93D' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-4 border-black p-2 sm:p-3"
                  style={{ backgroundColor: currentStep >= i ? item.color + '60' : '#f5f5f0' }}
                >
                  <div className="font-black text-xs uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="font-bold text-xs text-black/70 leading-snug">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold text-xs text-black/50 uppercase tracking-wide">
              Google의 CDN은 전 세계 200+ PoP(Point of Presence) 보유
            </div>
            <button
              onClick={restart}
              className="border-4 border-black bg-white shadow-neo-sm px-3 py-1 flex items-center gap-1 push-btn hover:bg-neo-secondary"
            >
              <RotateCcw className="w-4 h-4 stroke-[3px]" />
              <span className="font-black text-xs uppercase tracking-wide">재시작</span>
            </button>
          </div>
        </div>
      )}

      {tab === 'status' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {STATUS_CODES.map((s) => (
              <button
                key={s.code}
                onClick={() => setSelectedCode(selectedCode === s.code ? null : s.code)}
                className="border-4 border-black text-left transition-all duration-200 push-btn"
                style={{
                  backgroundColor: selectedCode === s.code ? s.color : '#fff',
                  boxShadow: selectedCode === s.code ? '6px 6px 0px 0px #000' : '4px 4px 0px 0px #000',
                  transform: selectedCode === s.code ? 'translate(2px, 2px)' : 'none',
                }}
              >
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-14 h-14 border-4 border-black flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    <span className="font-black text-lg leading-none">{s.code}</span>
                  </div>
                  <div>
                    <div className="font-black text-sm uppercase tracking-wide">{s.label}</div>
                    <div className="font-bold text-xs text-black/70 mt-1 leading-snug">{s.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="border-4 border-black bg-black p-4">
            <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">
              www.google.com 접속 시 → HTTP 200 OK
            </span>
          </div>
        </div>
      )}

      {tab === 'response' && (
        <div>
          <div className="bg-black border-4 border-black mb-4">
            <div className="border-b-4 border-white/20 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-neo-accent border-2 border-neo-accent" />
                <div className="w-3 h-3 rounded-full bg-neo-secondary border-2 border-neo-secondary" />
                <div className="w-3 h-3 rounded-full bg-neo-muted border-2 border-neo-muted" />
              </div>
              <span className="font-black text-xs text-white/50 uppercase tracking-widest ml-2">HTTP RESPONSE</span>
            </div>
            <pre className="p-4 font-mono text-xs sm:text-sm leading-7 overflow-x-auto">
              <code>
                <span className="text-neo-secondary font-black">HTTP/2 200</span>{'\n'}
                <span className="text-neo-accent">content-type</span>
                <span className="text-white/70">: text/html; charset=UTF-8{'\n'}</span>
                <span className="text-neo-accent">content-encoding</span>
                <span className="text-white/70">: br{'\n'}</span>
                <span className="text-neo-accent">cache-control</span>
                <span className="text-white/70">: private, max-age=0{'\n'}</span>
                <span className="text-neo-accent">strict-transport-security</span>
                <span className="text-white/70">: max-age=31536000{'\n'}</span>
                <span className="text-neo-accent">x-frame-options</span>
                <span className="text-white/70">: SAMEORIGIN{'\n'}</span>
                <span className="text-neo-accent">server</span>
                <span className="text-white/70">: gws{'\n'}</span>
                <span className="text-neo-accent">alt-svc</span>
                <span className="text-white/70">: h3=":443"; ma=2592000</span>
              </code>
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'content-encoding: br', label: 'Brotli 압축', desc: 'Google이 개발한 압축 알고리즘. Gzip 대비 20% 더 효율적', color: '#FFD93D' },
              { key: 'strict-transport-security', label: 'HSTS', desc: '앞으로 1년(31536000초)간 HTTPS만 허용', color: '#C4B5FD' },
              { key: 'alt-svc: h3', label: 'HTTP/3 지원', desc: 'QUIC 기반 HTTP/3로 업그레이드 가능함을 알림', color: '#FF6B6B' },
              { key: 'server: gws', label: 'Google Web Server', desc: 'Google이 자체 개발한 웹 서버 소프트웨어', color: '#FFD93D' },
            ].map((item) => (
              <div
                key={item.key}
                className="border-4 border-black p-3 shadow-neo-sm"
                style={{ backgroundColor: item.color }}
              >
                <div className="font-mono font-black text-xs mb-1">{item.key}</div>
                <div className="font-black text-sm uppercase tracking-wide border-t-2 border-black pt-2 mb-1">{item.label}</div>
                <div className="font-bold text-xs leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
