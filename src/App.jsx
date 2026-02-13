import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PinkSplash from './components/PinkSplash'
import Home from './pages/Home'
import About from './pages/About'
import Quote from './pages/Quote'

function App() {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <>
            <PinkSplash />
            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/quote" element={<Quote />} />
                </Routes>
            </AnimatePresence>
            <Footer />
            <Analytics />
        </>
    )
}

export default App

