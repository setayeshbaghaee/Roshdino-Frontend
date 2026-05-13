import { Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Articles from '../pages/Articles'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='services' element={<Services />} />
        <Route path='articles' element={<Articles />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter