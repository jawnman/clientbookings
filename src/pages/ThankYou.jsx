import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'

export default function ThankYou() {
    useEffect(() => {
        // Fire confetti on mount
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#c96b84', '#e8a0b4', '#d4798f']
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#c96b84', '#e8a0b4', '#d4798f']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()
    }, [])

    return (
        <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-12 px-6">
            <motion.div
                className="text-center max-w-md mx-auto flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
                <motion.div
                    className="w-20 h-20 bg-[#e8f0ed] text-[#4a7a6c] rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </motion.div>

                <h1 className="heading-lg mb-4">Request Received!</h1>
                <p className="text-gray-500 mb-8">
                    Thanks for reaching out. I've received your details and will get back to you shortly with a personalized quote.
                </p>

                <Link to="/">
                    <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Back to Home
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    )
}
