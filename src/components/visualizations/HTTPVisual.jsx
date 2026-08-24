import { useState } from 'react'

const REQUEST_PARTS = [
  {
    id: 'method',
    text: 'GET',
    label: 'Method',
    desc: '리소스를 "조회"하는 HTTP 메서드. 서버에 데이터 변경 없이 읽기만 요청합니다.',
    color: '#FF6B6B',
    line: 0,
  },
  {
    id: 'path',
    text: '/',
    label: 'Path',
    desc: '요청하는 경로. "/"는 서버의 루트(기본) 페이지를 의미합니다.',
    color: '#FFD93D',
    line: 0,
  },
  {
    id: 'version',
    text: 'HTTP/2',
    label: 'Version',
    desc: 'HTTP/2는 멀티플렉싱(여러 요청 동시 처리), 헤더 압축, 서버 푸시를 지원합니다.',
    color: '#C4B5FD',
    line: 0,
  },
  {
    id: 'host',
    text: 'Host: www.google.com',
    label: 'Host 헤더',
    desc: '하나의 IP에 여러 도메인이 연결될 수 있어(Virtual Hosting), 이 헤더로 서버가 구분합니다.',
    color: '#FF6B6B',
    line: 1,
  },
  {
    id: 'ua',
    text: 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X)',
    label: 'User-Agent',
    desc: '브라우저와 OS 정보를 서버에 전달. 서버가 호환되는 응답 포맷을 선택할 수 있습니다.',
    color: '#FFD93D',
    line: 2,
  },
  {
    id: 'accept',
    text: 'Accept: text/html,application/xhtml+xml',
    label: 'Accept',
    desc: '브라우저가 처리할 수 있는 콘텐츠 형식을 나열합니다. 서버는 이에 맞춰 응답합니다.',
    color: '#C4B5FD',
    line: 3,
  },
  {
    id: 'lang',
    text: 'Accept-Language: ko-KR,ko;q=0.9',
    label: 'Accept-Language',
    desc: '선호 언어를 서버에 알립니다. Google은 이를 보고 한국어 버전 페이지를 반환합니다.',
    color: '#FF6B6B',
    line: 4,
  },
  {
    id: 'encoding',
    text: 'Accept-Encoding: gzip, deflate, br',
    label: 'Accept-Encoding',
    desc: '지원하는 압축 형식. "br"은 Brotli로 Gzip보다 효율적입니다.',
    color: '#FFD93D',
    line: 5,
  },
  {
    id: 'cookie',
    text: 'Cookie: 1P_JAR=...; NID=...',
    label: 'Cookie',
    desc: '이전 세션 데이터, 사용자 설정, 언어 선택 등이 담긴 쿠키를 함께 전송합니다.',
    color: '#C4B5FD',
    line: 6,
  },
]

const HTTP_METHODS = [
  { method: 'GET', desc: '데이터 조회', color: '#FFD93D', example: '페이지 불러오기' },
  { method: 'POST', desc: '데이터 전송', color: '#FF6B6B', example: '로그인, 폼 제출' },
  { method: 'PUT', desc: '데이터 수정', color: '#C4B5FD', example: '프로필 업데이트' },
  { method: 'DELETE', desc: '데이터 삭제', color: '#FF6B6B', example: '게시글 삭제' },
]

export default function HTTPVisual() {
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('anatomy') // 'anatomy' | 'methods'

  return (
    <div className="border-4 border-black bg-neo-bg p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-black px-3 py-1 border-4 border-black">
          <span className="font-black text-xs text-neo-secondary uppercase tracking-widest">HTTP 요청 해부도</span>
        </div>
        <div className="flex">
          {['anatomy', 'methods'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="border-4 border-black px-3 py-1 font-black text-xs uppercase tracking-wide push-btn -ml-1 first:ml-0"
              style={{ backgroundColor: tab === t ? '#000' : '#fff', color: tab === t ? '#FFD93D' : '#000' }}
            >
              {t === 'anatomy' ? '구조' : '메서드'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'anatomy' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: request view */}
          <div>
            <div className="bg-black border-4 border-black mb-4">
              <div className="border-b-4 border-white/20 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-neo-accent border-2 border-neo-accent" />
                  <div className="w-3 h-3 rounded-full bg-neo-secondary border-2 border-neo-secondary" />
                  <div className="w-3 h-3 rounded-full bg-neo-muted border-2 border-neo-muted" />
                </div>
                <span className="font-black text-xs text-white/50 uppercase tracking-widest ml-2">HTTP REQUEST</span>
              </div>
              <div className="p-4 font-mono text-xs sm:text-sm leading-7">
                {/* Request line */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {['method', 'path', 'version'].map((id) => {
                    const part = REQUEST_PARTS.find((p) => p.id === id)
                    return (
                      <button
                        key={id}
                        onClick={() => setSelected(selected === id ? null : id)}
                        className="font-mono font-black px-2 py-0.5 border-2 border-white/40 hover:border-white transition-colors cursor-pointer"
                        style={{
                          backgroundColor: selected === id ? part.color : 'transparent',
                          color: selected === id ? '#000' : part.color,
                        }}
                      >
                        {part.text}
                      </button>
                    )
                  })}
                </div>

                {/* Header lines */}
                {REQUEST_PARTS.filter((p) => p.line > 0).map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelected(selected === part.id ? null : part.id)}
                    className="block w-full text-left font-mono px-2 py-0.5 border-2 border-transparent hover:border-white/40 transition-colors cursor-pointer rounded-none"
                    style={{
                      backgroundColor: selected === part.id ? part.color + '30' : 'transparent',
                      color: selected === part.id ? part.color : part.color + 'cc',
                    }}
                  >
                    <span className="font-black" style={{ color: part.color }}>
                      {part.text.split(':')[0]}
                    </span>
                    {part.text.includes(':') && (
                      <span className="font-bold text-white/70">:{part.text.split(':').slice(1).join(':')}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-bold text-xs text-black/50 uppercase tracking-wide">
              * 각 항목을 클릭하면 설명을 볼 수 있습니다
            </p>
          </div>

          {/* Right: explanation panel */}
          <div>
            {selected ? (
              (() => {
                const part = REQUEST_PARTS.find((p) => p.id === selected)
                return (
                  <div
                    className="border-4 border-black h-full"
                    style={{ backgroundColor: part.color }}
                  >
                    <div className="border-b-4 border-black px-4 py-3 bg-black">
                      <span className="font-black text-sm uppercase tracking-wide text-neo-secondary">
                        {part.label}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="font-mono font-black text-base sm:text-lg break-all border-4 border-black bg-black text-neo-secondary px-3 py-2 mb-4">
                        {part.text}
                      </div>
                      <p className="font-bold text-base leading-relaxed text-black">
                        {part.desc}
                      </p>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="border-4 border-black border-dashed h-full flex flex-col items-center justify-center p-6 text-center min-h-[200px]">
                <div className="text-4xl mb-3">👆</div>
                <p className="font-black text-sm uppercase tracking-wide text-black/40">
                  왼쪽 요청에서<br />항목을 선택하세요
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {REQUEST_PARTS.map((p) => (
                    <div
                      key={p.id}
                      className="border-2 border-black px-2 py-0.5 font-black text-xs"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Methods tab */
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {HTTP_METHODS.map((m) => (
              <div
                key={m.method}
                className="border-4 border-black p-4 shadow-neo-sm hover:-translate-y-1 transition-transform duration-200"
                style={{ backgroundColor: m.color }}
              >
                <div className="font-black text-xl sm:text-2xl uppercase tracking-tighter mb-2">
                  {m.method}
                </div>
                <div className="font-bold text-sm border-t-4 border-black pt-2">{m.desc}</div>
                <div className="font-bold text-xs text-black/60 mt-1">예: {m.example}</div>
              </div>
            ))}
          </div>

          <div className="border-4 border-black bg-black p-4">
            <span className="font-black text-xs text-neo-secondary uppercase tracking-widest block mb-2">
              www.google.com 접속 시 사용하는 메서드
            </span>
            <div className="flex items-center gap-3">
              <div className="bg-neo-secondary border-4 border-neo-secondary px-4 py-2 shadow-neo-white">
                <span className="font-black text-2xl text-black">GET</span>
              </div>
              <div className="font-bold text-white text-sm">
                서버의 리소스를 수정하지 않고 읽기만 합니다.<br />
                URL에 데이터가 노출되며 캐싱 가능합니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
