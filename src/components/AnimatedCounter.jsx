import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function AnimatedCounter({ value, duration = 0.8, className = '' }) {
    const spring = useSpring(0, {
        stiffness: 60,
        damping: 20,
        duration: duration * 1000,
    })

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

    return <motion.span className={className}>{display}</motion.span>
}
