import { motion } from 'framer-motion'
import logoBg from '../assets/images/logo-bg.jpg'

export default function AnimatedLogo() {
    return (
        <div className="relative overflow-hidden rounded-md h-12 w-48 flex items-center justify-center bg-black group transition-shadow duration-500 hover:shadow-lg hover:shadow-white/10">
            {/* Background Image with Motion */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1, filter: 'blur(3px)' }}
                animate={{
                    scale: [1.1, 1.2, 1.1],
                    x: [0, -10, 0],
                    filter: ['blur(3px)', 'blur(5px)', 'blur(3px)'],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            >
                <img
                    src={logoBg}
                    alt=""
                    className="w-full h-full object-cover opacity-60"
                />
            </motion.div>

            {/* Dark Overlay for minimal contrast */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Text Overlay */}
            <span
                className="relative z-20 text-white font-bold tracking-tight text-xl uppercase"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
                Shot By Nick
            </span>
        </div>
    )
}
