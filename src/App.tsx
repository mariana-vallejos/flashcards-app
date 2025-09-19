import './App.css'
import CreateModal from './components/CreateModal'
import FlashcardList from './components/FlashcardsList'



function App() {

  return (
    <>
      <h1 className='text-4xl text-center font-bold'>Study App</h1>
      <CreateModal/>
      <FlashcardList/>
    </>
  )
}

export default App
