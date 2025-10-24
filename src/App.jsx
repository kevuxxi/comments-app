import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CommentsPage from './pages/CommentsPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/comments' element={<CommentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
