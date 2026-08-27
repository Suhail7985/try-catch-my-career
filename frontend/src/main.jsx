import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'lenis/dist/lenis.css'
import './lib/gsap'
import './styles/moncy/index.css'
import { prefetchCharacter } from './components/Character/utils/decrypt'

prefetchCharacter()

createRoot(document.getElementById('root')).render(<App />)
