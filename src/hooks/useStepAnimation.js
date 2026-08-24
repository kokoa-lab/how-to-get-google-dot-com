import { useState, useEffect, useRef } from 'react'

export function useStepAnimation(maxStep, delay = 1200, autoPlay = true) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [playing, setPlaying] = useState(autoPlay)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!playing) return
    intervalRef.current = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= maxStep) {
          return -1 // reset
        }
        return s + 1
      })
    }, delay)
    return () => clearInterval(intervalRef.current)
  }, [playing, maxStep, delay])

  const restart = () => {
    setCurrentStep(-1)
    setPlaying(true)
  }

  return { currentStep, playing, restart }
}
