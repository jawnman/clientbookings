import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import images from '../data/images'

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const features = [

    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        title: 'Tailored Approach',
        desc: 'Every session is customized to your unique vision and story.',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: 'Quick Turnaround',
        desc: 'Edited photos delivered within 12–24 hours.',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: 'Premium Editing',
        desc: 'Meticulous retouching using industry-standard techniques.',
    },
]

export default function About() {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* ===== HEADER ===== */}
            <section className="pt-36 pb-8 px-6 relative z-10" style={{ paddingTop: '192px' }}>
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <motion.p
                        className="text-sm font-medium tracking-[0.2em] uppercase text-gray-400 mb-3"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        About
                    </motion.p>
                    <motion.h1
                        className="heading-xl"
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        The Photographer
                    </motion.h1>

                    <motion.div className="flex justify-center mt-4">
                        <svg width="80" height="3" viewBox="0 0 80 3">
                            <motion.line
                                x1="0" y1="1.5" x2="80" y2="1.5"
                                stroke="#d4798f"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* ===== PROFILE ===== */}
            <section className="py-16 md:py-24 px-6 relative z-10">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <motion.div
                            className="flex-shrink-0"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="animate-float-slow">
                                <img
                                    src={images.profile}
                                    alt="Photographer"
                                    className="bubble-image w-56 h-56 lg:w-72 lg:h-72"
                                />
                            </div>
                        </motion.div>

                        <div className="flex-1 max-w-xl">
                            {[
                                "I’m Nick Roehm, a Philadelphia-based photographer with a strong passion for music, creativity, and visual storytelling. Photography became a natural outlet for me — a way to express ideas, capture personality, and create images that feel intentional and real. What started as a personal creative escape quickly turned into a serious craft and career built around helping people bring their vision to life through visuals.",
                                "Outside of my work in the music and touring world, I focus on portrait, lifestyle, and creative photography for individuals, entrepreneurs, and small businesses who want imagery that feels modern and authentic. My style leans cinematic and slightly dreamy, with an emphasis on natural lighting, strong composition, and subtle mood. I aim to create images that feel clean, elevated, and true to the person or brand in front of the camera.",
                                "I bring years of experience behind the camera and in fast-paced creative environments, which allows me to work efficiently while keeping shoots relaxed and collaborative. Whether it’s personal branding, lifestyle portraits, or creative projects, my goal is always the same: to create high-quality visuals that stand out and help you present yourself with confidence.",
                            ].map((paragraph, i) => (
                                <motion.p
                                    key={i}
                                    className="text-gray-500 text-[0.95rem] leading-[1.75] mb-4 last:mb-0"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE ME ===== */}
            <section className="py-24 md:py-32 px-6 bg-[#fafafa] relative z-10">
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal>
                        <div className="text-center mb-12" style={{ textAlign: 'center' }}>
                            <p className="text-sm font-medium tracking-[0.15em] uppercase text-gray-400 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                Why Me
                            </p>
                            <h2 className="heading-lg">Why Choose Me</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((feature, i) => (
                            <ScrollReveal key={feature.title} delay={i * 0.08}>
                                <motion.div
                                    className="card-lift bg-white rounded-[20px] p-6 text-center"
                                    style={{ textAlign: 'center' }}
                                    whileHover={{ y: -6 }}
                                >
                                    <motion.div
                                        className="w-11 h-11 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#fae8e8] text-[#c96b84]"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 md:py-28 px-6 relative overflow-hidden z-10" style={{ textAlign: 'center' }}>
                <div className="container relative z-10 text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal>
                        <h2 className="heading-lg mb-3">Ready to Book?</h2>
                        <p className="text-gray-500 text-base max-w-md mx-auto mb-8" style={{ textAlign: 'center' }}>
                            Let's create something extraordinary together.
                        </p>
                        <Link to="/quote">
                            <motion.button
                                className="btn-primary animate-pulse-glow"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Your Free Quote
                            </motion.button>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    )
}
