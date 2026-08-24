import { Globe, Network, Lock, Send, Server, Monitor } from 'lucide-react'

export const steps = [
  {
    id: '01',
    title: 'DNS 조회',
    subtitle: 'DNS Resolution',
    icon: Globe,
    color: '#FF6B6B',
    bgClass: 'bg-neo-accent',
    description:
      '브라우저는 "www.google.com"이라는 사람이 읽을 수 있는 도메인 이름을 컴퓨터가 이해하는 IP 주소로 변환해야 합니다. 이 과정이 DNS(Domain Name System) 조회입니다. 인터넷의 전화번호부라고 할 수 있죠.',
    details: [
      {
        label: '① 브라우저 캐시',
        text: '가장 먼저 브라우저 자체 DNS 캐시를 확인합니다. 최근에 방문했다면 즉시 IP 주소를 얻습니다.',
      },
      {
        label: '② OS 캐시',
        text: '브라우저 캐시에 없으면 운영체제의 /etc/hosts 파일과 OS DNS 캐시를 확인합니다.',
      },
      {
        label: '③ 로컬 DNS 리졸버',
        text: 'ISP(인터넷 서비스 제공자)나 회사 네트워크의 DNS 서버에 재귀(Recursive) 쿼리를 보냅니다.',
      },
      {
        label: '④ Root Nameserver',
        text: '전 세계 13개의 루트 서버가 ".com" TLD를 담당하는 서버 주소를 알려줍니다.',
      },
      {
        label: '⑤ TLD Nameserver',
        text: '.com TLD 서버가 "google.com"의 권한 있는 네임서버(Authoritative NS) 주소를 반환합니다.',
      },
      {
        label: '⑥ Authoritative Nameserver',
        text: 'google.com 네임서버가 "www.google.com"의 실제 IP 주소를 최종 반환합니다. TTL(Time-To-Live) 값에 따라 캐싱됩니다.',
      },
    ],
    tip: 'nslookup www.google.com 또는 dig www.google.com 명령어로 직접 DNS 조회를 해볼 수 있습니다.',
    result: '142.250.196.100 (Google 서버 IP 획득)',
  },
  {
    id: '02',
    title: 'TCP 연결 수립',
    subtitle: 'TCP 3-Way Handshake',
    icon: Network,
    color: '#FFD93D',
    bgClass: 'bg-neo-secondary',
    description:
      'IP 주소를 얻었으니 이제 서버와 연결해야 합니다. TCP(Transmission Control Protocol)는 데이터를 신뢰성 있게 주고받기 위한 프로토콜로, 실제 데이터를 보내기 전에 3-Way Handshake로 연결을 먼저 수립합니다. 마치 전화를 걸기 전에 신호음을 확인하는 것과 같습니다.',
    details: [
      {
        label: 'SYN (포트 443)',
        text: '브라우저 → 서버: "연결 요청합니다. 내 시퀀스 번호는 X입니다." — Synchronize 패킷 전송',
      },
      {
        label: 'SYN-ACK',
        text: '서버 → 브라우저: "요청 수락합니다. 내 시퀀스 번호는 Y, 당신 번호(X+1) 확인했습니다." — Synchronize-Acknowledge 패킷 전송',
      },
      {
        label: 'ACK',
        text: '브라우저 → 서버: "확인했습니다. 이제 통신을 시작합니다." — Acknowledge 패킷 전송 후 연결 완료',
      },
    ],
    extra: [
      { label: 'HTTP vs HTTPS', text: 'HTTP는 포트 80, HTTPS는 포트 443을 사용합니다.' },
      { label: 'TCP vs UDP', text: 'TCP는 신뢰성 보장, UDP는 빠른 속도 우선. HTTP/3는 UDP 기반의 QUIC 프로토콜을 사용합니다.' },
    ],
    result: 'TCP 연결 수립 완료 → 다음 단계로',
  },
  {
    id: '03',
    title: 'TLS 핸드셰이크',
    subtitle: 'SSL/TLS Handshake',
    icon: Lock,
    color: '#C4B5FD',
    bgClass: 'bg-neo-muted',
    description:
      'Google은 HTTPS를 사용하므로, TCP 연결 후 TLS(Transport Layer Security) 핸드셰이크가 필요합니다. 이 과정에서 서버 신원을 검증하고 암호화 키를 교환합니다. 이후 모든 데이터는 암호화되어 전송됩니다.',
    details: [
      {
        label: 'Client Hello',
        text: '브라우저가 지원하는 TLS 버전(1.3), 암호화 알고리즘(Cipher Suites) 목록, 랜덤 데이터를 서버에 전송합니다.',
      },
      {
        label: 'Server Hello',
        text: '서버가 암호화 알고리즘을 선택하고, SSL 인증서(공개키 포함)와 랜덤 데이터를 브라우저에 전송합니다.',
      },
      {
        label: '인증서 검증',
        text: '브라우저가 CA(Certificate Authority, 예: DigiCert, Let\'s Encrypt)의 서명을 확인해 인증서의 유효성을 검증합니다. 신뢰할 수 없으면 경고를 표시합니다.',
      },
      {
        label: 'Key Exchange',
        text: '비대칭 암호화(RSA 또는 ECDHE)를 사용해 양쪽만 아는 세션 키(Pre-master Secret)를 안전하게 교환합니다.',
      },
      {
        label: 'Session Keys',
        text: '교환된 값으로 대칭 암호화 세션 키를 생성합니다. 이후 데이터는 대칭 암호화(AES-256-GCM 등)로 빠르게 암호화됩니다.',
      },
    ],
    tip: 'TLS 1.3은 이전 버전보다 핸드셰이크 왕복 횟수가 1번 줄어 더 빠릅니다. 이미 방문했다면 0-RTT(Zero Round Trip Time)로 즉시 연결도 가능합니다.',
    result: '암호화 통신 채널 수립 완료 🔒',
  },
  {
    id: '04',
    title: 'HTTP 요청',
    subtitle: 'HTTP Request',
    icon: Send,
    color: '#FF6B6B',
    bgClass: 'bg-neo-accent',
    description:
      '암호화된 채널을 통해 브라우저가 서버에 HTTP 요청을 보냅니다. 현대 브라우저는 HTTP/2 또는 HTTP/3(QUIC 기반)을 사용해 여러 요청을 동시에 처리하고 헤더를 압축합니다.',
    details: [
      {
        label: 'Request Line',
        text: 'GET / HTTP/2 — 루트 경로("/")의 페이지를 GET 방식으로 요청합니다.',
      },
      {
        label: 'Host 헤더',
        text: 'Host: www.google.com — 하나의 IP에 여러 도메인이 연결될 수 있어 이 헤더로 구분합니다.',
      },
      {
        label: 'User-Agent',
        text: '브라우저 정보를 전달합니다. 서버가 맞는 형식의 응답을 보낼 수 있게 해줍니다.',
      },
      {
        label: 'Accept-Language',
        text: 'ko-KR,ko;q=0.9,en-US;q=0.8 — 선호 언어를 서버에 알립니다.',
      },
      {
        label: 'Cookie',
        text: '이전 세션 데이터, 사용자 설정, 인증 정보 등을 담은 쿠키를 함께 전송합니다.',
      },
    ],
    code: `GET / HTTP/2
Host: www.google.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Accept: text/html,application/xhtml+xml
Accept-Language: ko-KR,ko;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive`,
    result: 'HTTP 요청 전송 완료 →',
  },
  {
    id: '05',
    title: '서버 응답',
    subtitle: 'Server Response',
    icon: Server,
    color: '#FFD93D',
    bgClass: 'bg-neo-secondary',
    description:
      'Google의 서버(또는 CDN Edge 서버)가 요청을 받고 응답을 보냅니다. Google은 전 세계 수백 개의 데이터센터와 CDN을 운영해 사용자와 가장 가까운 서버에서 빠르게 응답합니다.',
    details: [
      {
        label: '200 OK',
        text: '요청이 성공했음을 나타내는 HTTP 상태 코드입니다. 그 외: 301(영구 이동), 404(없음), 500(서버 오류).',
      },
      {
        label: 'Content-Type',
        text: 'text/html; charset=UTF-8 — 응답이 HTML 형식임을 알립니다.',
      },
      {
        label: 'CDN (Content Delivery Network)',
        text: '사용자와 가장 가까운 엣지 서버에서 콘텐츠를 전달해 응답 속도를 높입니다. Google은 자체 CDN 인프라를 보유합니다.',
      },
      {
        label: 'Load Balancer',
        text: '초당 수십억 건의 요청을 처리하기 위해 로드 밸런서가 트래픽을 여러 서버에 분산시킵니다.',
      },
      {
        label: 'Brotli/Gzip 압축',
        text: 'Content-Encoding: br — 응답 데이터를 압축해 전송 크기를 최소화합니다. Brotli는 Gzip보다 약 20% 더 효율적입니다.',
      },
    ],
    code: `HTTP/2 200
content-type: text/html; charset=UTF-8
content-encoding: br
cache-control: private, max-age=0
strict-transport-security: max-age=31536000
server: gws
x-xss-protection: 0
alt-svc: h3=":443"; ma=2592000`,
    result: 'HTML 문서 수신 완료 → 렌더링 시작',
  },
  {
    id: '06',
    title: '브라우저 렌더링',
    subtitle: 'Critical Rendering Path',
    icon: Monitor,
    color: '#C4B5FD',
    bgClass: 'bg-neo-muted',
    description:
      '수신한 HTML, CSS, JavaScript를 브라우저 엔진이 처리해 화면에 표시합니다. 이 과정을 Critical Rendering Path(CRP)라 부르며, 웹 성능 최적화의 핵심입니다. Chrome은 Blink 엔진과 V8 JavaScript 엔진을 사용합니다.',
    details: [
      {
        label: '① DOM 생성',
        text: 'HTML을 바이트 → 문자 → 토큰 → 노드 → DOM 트리 순서로 파싱합니다. <script> 태그는 파싱을 블록할 수 있어 async/defer 속성이 중요합니다.',
      },
      {
        label: '② CSSOM 생성',
        text: 'CSS를 파싱해 CSSOM(CSS Object Model) 트리를 생성합니다. CSS는 렌더링 블로킹 리소스입니다.',
      },
      {
        label: '③ Render Tree 구성',
        text: 'DOM + CSSOM을 결합해 실제 화면에 표시될 요소만 포함하는 Render Tree를 생성합니다. (display:none 요소는 제외)',
      },
      {
        label: '④ Layout (Reflow)',
        text: '각 요소의 정확한 위치(x, y)와 크기(width, height)를 계산합니다. 뷰포트 크기를 기준으로 상대적 단위를 절대값으로 변환합니다.',
      },
      {
        label: '⑤ Paint',
        text: '계산된 레이아웃을 바탕으로 텍스트, 색상, 이미지, 그림자 등을 실제 픽셀로 그립니다. 레이어별로 분리됩니다.',
      },
      {
        label: '⑥ Composite',
        text: 'GPU가 각 레이어를 최종적으로 합성해 화면에 출력합니다. transform, opacity 애니메이션이 이 단계에서만 처리되어 성능이 좋습니다.',
      },
    ],
    tip: 'JavaScript 실행(V8 엔진)이 DOM을 변경하면 Reflow와 Repaint가 다시 발생할 수 있어, 웹 성능 최적화의 핵심 대상입니다.',
    result: '🎉 www.google.com 화면 표시 완료!',
  },
]
