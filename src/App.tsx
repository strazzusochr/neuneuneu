import { GameCanvas } from './components/game/GameCanvas'
import { HUD } from './components/ui/HUD'
import { useTimeCycle } from './hooks/useTimeCycle'
import { GameAudio } from './components/audio/GameAudio'
import { AmbientAudio } from './systems/audio/AmbientAudio'

function App() {
  useTimeCycle();
  
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <GameCanvas />
      <HUD />
      <GameAudio />
      <AmbientAudio />
    </div>
  )
}

export default App
