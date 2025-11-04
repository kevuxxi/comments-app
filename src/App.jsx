import { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import CommentsPage from './pages/CommentsPage'
import GlobalLoader from './components/GlobalLoader'
import PrivateRoute from './routes/PrivateRoute'
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from './pages/LandingPage'

function App() {

  const { globalLoading } = useSelector((state) => state.app);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);

  return (
    <>
      {globalLoading && <GlobalLoader />}

      <BrowserRouter>
        <div className="app-shell">
          <main className="app-main">
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/comments' element={
                <PrivateRoute>
                  <CommentsPage />
                </PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-left"
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
