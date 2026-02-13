import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    const links = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="no-underline">
                        <motion.span
                            className="font-[var(--font-display)] text-xl font-bold tracking-tight text-primary"
                            style={{ fontFamily: 'var(--font-display)' }}
                            whileHover={{ scale: 1.02 }}
                        >
                            Shot By <span className="font-light text-gray-400">Nick</span>
                        </motion.span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="relative no-underline text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {link.label}
                                {location.pathname === link.to && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    />
                                )}
                            </Link>
                        ))}
                        <Link to="/quote">
                            <motion.button
                                className="btn-primary text-sm py-[10px] px-6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get a Quote
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="block w-6 h-[2px] bg-primary rounded"
                            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="block w-6 h-[2px] bg-primary rounded"
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.span
                            className="block w-6 h-[2px] bg-primary rounded"
                            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
                    >
                        {links.map((link, i) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    to={link.to}
                                    className="no-underline text-2xl font-semibold text-primary"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link to="/quote">
                                <button className="btn-primary text-lg">Get a Quote</button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
