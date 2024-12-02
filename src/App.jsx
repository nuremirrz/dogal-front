import './App.css'
import { Route, Router, Routes, MainPage, AdminPage, AdminLogin, ContactPage, TechSupportPage, ProductsPage, ErrorPage } from './routes/page.js'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
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
