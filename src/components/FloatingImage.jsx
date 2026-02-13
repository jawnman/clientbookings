import { motion } from 'framer-motion'

export default function FloatingImage({
    src,
    alt = '',
    size = 300,
    round = true,
    className = '',
    delay = 0,
}) {
    return (
        <motion.div
            className={`inline-block ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
                <img
                    src={src}
                    alt={alt}
                    className={round ? 'bubble-image' : 'bubble-rounded'}
                    style={{
                        width: size,
                        height: round ? size : 'auto',
                        aspectRatio: round ? '1' : undefined,
                    }}
                    loading="lazy"
                />
            </div>
        </motion.div>
    )
}
