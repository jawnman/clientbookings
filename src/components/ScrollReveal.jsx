import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 40,
    once = true,
    className = '',
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-50px' })
    const controls = useAnimation()

    const directionMap = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { y: 0, x: distance },
        right: { y: 0, x: -distance },
        none: { y: 0, x: 0 },
    }

    const { x, y } = directionMap[direction] || directionMap.up

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [isInView, controls])

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, x, y },
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                        duration,
                        delay,
                        ease: [0.4, 0, 0.2, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}
