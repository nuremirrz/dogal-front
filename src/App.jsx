import './App.css'
import { Route, Router, Routes, MainPage, AdminPage, ContactPage, TechSupportPage, ProductsPage, ErrorPage } from './routes/page.js'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path="/tech-sup/:country/:slug" element={<TechSupportPage />} />        
          <Route path="/tech-sup/:country" element={<TechSupportPage />} />           
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
