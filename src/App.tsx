import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import StudyModePage from './pages/StudyModePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/study-mode' element={<StudyModePage/>} />
    </Routes>
  )
}

export default App
