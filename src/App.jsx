import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CommentsPage from './pages/CommentsPage'
import GlobalLoader from './components/GlobalLoader'
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const { globalLoading } = useSelector((state) => state.app);

  return (
    <>
      {globalLoading && <GlobalLoader />}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/comments' element={<CommentsPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
