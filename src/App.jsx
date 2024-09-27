import './App.css'
import { Route, Router, Routes, MainPage, AdminPage } from './routes/page.js'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/admin' element={<AdminPage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
