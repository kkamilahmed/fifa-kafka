import React, { useCallback, useEffect, useState } from 'react'
import Slide1 from './Slide1.jsx'
import Slide2 from './Slide2.jsx'
import './App.css'

const REVEAL_MS = 650
const PUSH_MS = 600

export default function App() {
  const [phase, setPhase] = useState('slide1') // slide1 | revealing | pushing | slide2
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' })

  const handleKafkaClick = useCallback(
    (x, y) => {
      if (phase !== 'slide1') return
      setOrigin({ x: `${x}px`, y: `${y}px` })
      setPhase('revealing')
      setTimeout(() => setPhase('slide2'), REVEAL_MS)
    },
    [phase]
  )

  const handleNext = useCallback(() => {
    if (phase !== 'slide1') return
    setPhase('pushing')
    setTimeout(() => setPhase('slide2'), PUSH_MS)
  }, [phase])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext])

  return (
    <div className="stage">
      {phase !== 'slide2' && <Slide1 onKafkaClick={handleKafkaClick} pushed={phase === 'pushing'} />}
      {phase !== 'slide1' && (
        <Slide2
          entering={phase === 'revealing'}
          pushing={phase === 'pushing'}
          originX={origin.x}
          originY={origin.y}
        />
      )}
    </div>
  )
}
