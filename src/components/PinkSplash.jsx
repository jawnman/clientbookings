import { motion } from 'framer-motion'

/*
  Living, breathing pink brush strokes.
  - Draw in on load with staggered timing
  - Then continuously float, drift, pulse, and breathe while the site is open
  - Some strokes slowly morph position, others pulse opacity
*/

const strokes = [
    {
        d: 'M 650 -40 Q 820 60 780 200 Q 740 340 900 280 Q 1000 240 1050 320',
        width: 3.5,
        delay: 0.2,
        drawDuration: 1.6,
        color: '#e8a0b4',
        drift: { x: [0, 15, -10, 0], y: [0, -20, 10, 0] },
        driftDuration: 12,
        pulse: [0.15, 0.28, 0.12, 0.25, 0.15],
        pulseDuration: 8,
        rotate: [0, 1.5, -1, 0],
    },
    {
        d: 'M -60 120 Q 80 40 200 100 Q 340 170 300 60 Q 280 -20 400 30',
        width: 2.5,
        delay: 0.4,
        drawDuration: 1.3,
        color: '#d4798f',
        drift: { x: [0, -12, 8, 0], y: [0, 15, -8, 0] },
        driftDuration: 15,
        pulse: [0.12, 0.22, 0.08, 0.18, 0.12],
        pulseDuration: 10,
        rotate: [0, -1, 2, 0],
    },
    {
        d: 'M 900 400 Q 800 500 850 600 Q 900 700 780 680 Q 680 660 720 780',
        width: 4.5,
        delay: 0.7,
        drawDuration: 1.8,
        color: '#f0b6c8',
        drift: { x: [0, -20, 5, 0], y: [0, 12, -15, 0] },
        driftDuration: 18,
        pulse: [0.1, 0.2, 0.06, 0.16, 0.1],
        pulseDuration: 7,
        rotate: [0, 2, -1.5, 0],
    },
    {
        d: 'M 50 600 Q 150 550 250 620 Q 380 710 320 580 Q 280 480 400 520',
        width: 2.5,
        delay: 0.9,
        drawDuration: 1.2,
        color: '#c96b84',
        drift: { x: [0, 18, -6, 0], y: [0, -10, 18, 0] },
        driftDuration: 14,
        pulse: [0.08, 0.18, 0.05, 0.14, 0.08],
        pulseDuration: 9,
        rotate: [0, -2, 1, 0],
    },
    {
        d: 'M 500 150 Q 560 90 620 130 Q 680 170 640 250',
        width: 4,
        delay: 0.3,
        drawDuration: 1.0,
        color: '#f2c4d3',
        drift: { x: [0, 8, -15, 0], y: [0, -12, 6, 0] },
        driftDuration: 10,
        pulse: [0.14, 0.26, 0.1, 0.22, 0.14],
        pulseDuration: 6,
        rotate: [0, 3, -2, 0],
    },
    {
        d: 'M 850 750 Q 950 700 1000 800 Q 1050 900 920 880',
        width: 3,
        delay: 1.1,
        drawDuration: 1.1,
        color: '#dda0b8',
        drift: { x: [0, -8, 12, 0], y: [0, 10, -6, 0] },
        driftDuration: 16,
        pulse: [0.07, 0.16, 0.04, 0.12, 0.07],
        pulseDuration: 11,
        rotate: [0, 1, -2.5, 0],
    },
    {
        d: 'M 480 30 Q 500 50 520 25 Q 540 0 560 40',
        width: 5,
        delay: 0.5,
        drawDuration: 0.8,
        color: '#e694aa',
        drift: { x: [0, 6, -10, 0], y: [0, 8, -4, 0] },
        driftDuration: 9,
        pulse: [0.11, 0.24, 0.08, 0.2, 0.11],
        pulseDuration: 5,
        rotate: [0, -1.5, 3, 0],
    },
    // Extra flowing strokes for more life
    {
        d: 'M 200 350 Q 300 300 350 400 Q 400 500 320 480 Q 240 460 280 380',
        width: 2,
        delay: 1.3,
        drawDuration: 1.5,
        color: '#f0b6c8',
        drift: { x: [0, 10, -8, 0], y: [0, -18, 12, 0] },
        driftDuration: 20,
        pulse: [0.06, 0.14, 0.04, 0.1, 0.06],
        pulseDuration: 12,
        rotate: [0, 2.5, -1, 0],
    },
    {
        d: 'M 700 100 Q 750 180 820 150 Q 890 120 860 200',
        width: 3,
        delay: 0.8,
        drawDuration: 0.9,
        color: '#e8a0b4',
        drift: { x: [0, -14, 6, 0], y: [0, 8, -14, 0] },
        driftDuration: 13,
        pulse: [0.09, 0.2, 0.06, 0.16, 0.09],
        pulseDuration: 8,
        rotate: [0, -3, 1.5, 0],
    },
]

/* Soft glowing blobs that breathe */
const blobs = [
    { cx: 180, cy: 200, r: 90, color: '#f0b6c8', maxOpacity: 0.06, duration: 6, delay: 0.4, drift: { x: [0, 20, -15, 0], y: [0, -15, 20, 0] }, driftDur: 20 },
    { cx: 850, cy: 300, r: 110, color: '#e8a0b4', maxOpacity: 0.07, duration: 8, delay: 0.7, drift: { x: [0, -25, 10, 0], y: [0, 18, -12, 0] }, driftDur: 25 },
    { cx: 400, cy: 700, r: 70, color: '#d4798f', maxOpacity: 0.05, duration: 5, delay: 1.0, drift: { x: [0, 12, -18, 0], y: [0, -10, 15, 0] }, driftDur: 18 },
    { cx: 600, cy: 450, r: 80, color: '#f2c4d3', maxOpacity: 0.04, duration: 7, delay: 1.2, drift: { x: [0, -10, 20, 0], y: [0, 12, -8, 0] }, driftDur: 22 },
]

export default function PinkSplash() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <svg
                viewBox="0 0 1100 900"
                fill="none"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Breathing blobs */}
                {blobs.map((blob, i) => (
                    <motion.circle
                        key={`blob-${i}`}
                        cx={blob.cx}
                        cy={blob.cy}
                        r={blob.r}
                        fill={blob.color}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, blob.maxOpacity, blob.maxOpacity * 0.4, blob.maxOpacity, 0, blob.maxOpacity * 0.6, blob.maxOpacity],
                            scale: [0, 1, 1.15, 0.9, 1.1, 0.95, 1],
                            x: blob.drift.x,
                            y: blob.drift.y,
                        }}
                        transition={{
                            opacity: { duration: blob.duration, delay: blob.delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                            scale: { duration: blob.duration * 1.5, delay: blob.delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                            x: { duration: blob.driftDur, repeat: Infinity, ease: 'easeInOut' },
                            y: { duration: blob.driftDur, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        style={{ filter: `blur(${blob.r * 0.5}px)` }}
                    />
                ))}

                {/* Animated brush strokes */}
                {strokes.map((stroke, i) => (
                    <motion.path
                        key={`stroke-${i}`}
                        d={stroke.d}
                        stroke={stroke.color}
                        strokeWidth={stroke.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1, 1],
                            opacity: stroke.pulse,
                            x: stroke.drift.x,
                            y: stroke.drift.y,
                            rotate: stroke.rotate,
                        }}
                        transition={{
                            pathLength: {
                                duration: stroke.drawDuration,
                                delay: stroke.delay,
                                ease: [0.4, 0, 0.2, 1],
                                times: [0, 0.6, 0.8, 1],
                            },
                            opacity: {
                                duration: stroke.pulseDuration,
                                delay: stroke.delay + stroke.drawDuration,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            },
                            x: {
                                duration: stroke.driftDuration,
                                delay: stroke.delay + stroke.drawDuration * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                            y: {
                                duration: stroke.driftDuration,
                                delay: stroke.delay + stroke.drawDuration * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                            rotate: {
                                duration: stroke.driftDuration * 1.2,
                                delay: stroke.delay,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                        style={{
                            filter: `blur(${stroke.width > 3.5 ? 1.5 : 0.8}px)`,
                            transformOrigin: 'center center',
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}
