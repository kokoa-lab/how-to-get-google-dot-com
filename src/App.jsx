import Header from './components/Header'
import Hero from './components/Hero'
import StepCard from './components/StepCard'
import Footer from './components/Footer'
import { steps } from './data/steps'
import { Star } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-neo-bg font-space">
      <Header />
      <main>
        <Hero />

        {/* Steps section */}
        <section className="relative">
          {/* Section intro */}
          <div className="bg-neo-muted border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-black border-4 border-black p-3 shadow-neo rotate-2">
                    <Star className="w-8 h-8 fill-neo-secondary stroke-neo-secondary stroke-[3px]" />
                  </div>
                  <div>
                    <span className="font-black text-xs uppercase tracking-widest text-black/60 block mb-1">
                      6 Steps
                    </span>
                    <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter text-black leading-none">
                      여정 시작
                    </h2>
                  </div>
                </div>
                <div className="border-4 border-black bg-white shadow-neo p-4 max-w-lg">
                  <p className="font-bold text-sm sm:text-base leading-relaxed text-black">
                    각 단계는 <strong>실제 네트워크에서 발생하는 순서</strong>입니다.
                    전체 과정은 보통 <span className="bg-neo-accent px-1">100ms 이내</span>에 완료됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps list */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-8">
            {steps.map((step, index) => (
              <div key={step.id}>
                <StepCard step={step} index={index} />
                {/* Remove connector after last step */}
                {index === steps.length - 1 && (
                  <div className="-mt-8 sm:-mt-12 lg:-mt-16" />
                )}
              </div>
            ))}
          </div>

          {/* Final celebration block */}
          <div className="border-t-4 border-b-4 border-black bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
              <div className="relative inline-block">
                <h2
                  className="font-black leading-none tracking-tighter"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                    WebkitTextStroke: '3px #FFD93D',
                    color: 'transparent',
                  }}
                >
                  DONE!
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {['DNS', 'TCP', 'TLS', 'HTTP', 'CDN', 'RENDER'].map((tag, i) => {
                  const colors = [
                    'bg-neo-accent',
                    'bg-neo-secondary',
                    'bg-neo-muted',
                    'bg-neo-accent',
                    'bg-neo-secondary',
                    'bg-neo-muted',
                  ]
                  const rotations = ['rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1', '-rotate-3']
                  return (
                    <div
                      key={tag}
                      className={`${colors[i]} ${rotations[i]} border-4 border-white px-4 py-2 shadow-neo-white`}
                    >
                      <span className="font-black text-sm sm:text-base uppercase tracking-widest text-black">
                        {tag}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="font-bold text-neo-secondary text-base sm:text-lg mt-8 uppercase tracking-widest">
                www.google.com 완전 해부 완료
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
