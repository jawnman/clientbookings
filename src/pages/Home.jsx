import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import FloatingImage from '../components/FloatingImage'
import images from '../data/images'

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const services = [
    {
        title: 'Portraits',
        desc: 'Timeless portraits that capture your personality — individuals, couples, families, and seniors.',
        image: images.portrait,
        color: '#fae8e8',
    },
    {
        title: 'Events',
        desc: 'Candid, emotional coverage of concerts, celebrations, and corporate gatherings.',
        image: images.event,
        color: '#e8f0ed',
    },
    {
        title: 'Real Estate',
        desc: 'Professional property photography that makes listings stand out and sell faster.',
        image: images.realestate,
        color: '#f5f1ed',
    },
]

const galleryImages = images.gallery

const testimonials = [
    {
        name: 'Alan Ashby',
        role: 'Portrait Client',
        text: 'Absolutely insane behind the camera — strongly recommend Nick.',
        avatar: images.avatars[0],
    },
    {
        name: 'Phil Manansala',
        role: 'Portrait Client',
        text: "I've never felt so comfortable in front of a camera. The photos look like they belong in a magazine!",
        avatar: images.avatars[2],
    },
]

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* ===== HERO ===== */}
            <section className="min-h-[100dvh] flex items-center relative overflow-hidden">
                <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-16 pt-24 pb-16 px-6">
                    <div className="flex-1 text-center max-w-xl mx-auto flex flex-col items-center">
                        <motion.p
                            className="text-sm font-medium tracking-[0.2em] uppercase text-gray-400 mb-4"
                            style={{ fontFamily: 'var(--font-display)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                            Shot By Nick
                        </motion.p>

                        <motion.h1
                            className="heading-xl mb-5"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        >
                            Capturing Your
                            <br />
                            <span className="bg-gradient-to-r from-[#c96b84] via-[#e8a0b4] to-[#c96b84] bg-clip-text text-transparent">
                                Most Beautiful
                            </span>
                            <br />
                            Moments
                        </motion.h1>

                        <motion.p
                            className="text-body max-w-md mx-auto mb-8 text-center"
                            style={{ textAlign: 'center !important' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        >
                            Professional photography that tells your story with passion and precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="flex gap-4 justify-center lg:justify-start"
                        >
                            <Link to="/quote">
                                <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Get a Quote
                                </motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Learn More
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="flex-1 flex justify-center relative">
                        <FloatingImage src={images.hero} alt="Photography" size={340} round={true} delay={0.3} />
                        <motion.div
                            className="absolute w-3 h-3 rounded-full"
                            style={{ top: '12%', right: '12%', background: '#e8a0b4' }}
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute w-5 h-5 rounded-full"
                            style={{ bottom: '18%', left: '8%', background: '#d4e8dd' }}
                            animate={{ y: [5, -5, 5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute w-2 h-2 rounded-full"
                            style={{ top: '55%', right: '2%', background: '#f0b6c8' }}
                            animate={{ y: [-3, 7, -3] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c3c3c3" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </motion.div>
            </section>

            {/* ===== SERVICES ===== */}
            <section className="py-24 md:py-32 px-6 relative z-10">
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal>
                        <div className="text-center mb-14" style={{ textAlign: 'center' }}>
                            <p className="text-sm font-medium tracking-[0.15em] uppercase text-gray-400 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                Services
                            </p>
                            <h2 className="heading-lg">What I Offer</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <ScrollReveal key={service.title} delay={i * 0.1}>
                                <motion.div
                                    className="card-lift rounded-[24px] p-7 text-center"
                                    style={{ background: service.color, textAlign: 'center' }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden shadow-lg">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="heading-md mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY ===== */}
            <section className="py-24 md:py-32 px-6 bg-[#fafafa] relative z-10">
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal>
                        <div className="text-center mb-14" style={{ textAlign: 'center' }}>
                            <p className="text-sm font-medium tracking-[0.15em] uppercase text-gray-400 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                Portfolio
                            </p>
                            <h2 className="heading-lg">Recent Work</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, i) => (
                            <ScrollReveal key={i} delay={i * 0.07}>
                                <motion.div
                                    className="overflow-hidden rounded-2xl cursor-pointer"
                                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                                    onClick={() => setSelectedImage(img)}
                                    layoutId={`gallery-img-${i}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery ${i + 1}`}
                                        className="w-full h-64 md:h-96 object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-24 md:py-32 px-6 relative z-10">
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal>
                        <div className="text-center mb-14" style={{ textAlign: 'center' }}>
                            <p className="text-sm font-medium tracking-[0.15em] uppercase text-gray-400 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                Testimonials
                            </p>
                            <h2 className="heading-lg">Client Love</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-16">
                        {testimonials.map((t, i) => (
                            <ScrollReveal key={t.name} delay={i * 0.15}>
                                <motion.div
                                    className="bg-[#faf7f5] rounded-[24px] p-8 text-center"
                                    style={{ textAlign: 'center' }}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="w-14 h-14 mx-auto mb-5 rounded-full overflow-hidden shadow-sm">
                                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-gray-600 text-base italic leading-relaxed mb-5">
                                        "{t.text}"
                                    </p>
                                    <p className="font-semibold text-sm text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 md:py-28 px-6 bg-primary text-white text-center relative z-10" style={{ textAlign: 'center' }}>
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ScrollReveal className="flex flex-col items-center w-full">
                        <h2 className="heading-lg text-white mb-3">Ready to Create Something Beautiful?</h2>
                        <p className="text-base text-white/80 mb-8 max-w-md mx-auto flex flex-col items-center justify-center text-center w-full" style={{ textAlign: 'center' }}>
                            Get a personalized quote in minutes — no commitment required.
                        </p>
                        <Link to="/quote">
                            <motion.button
                                className="btn-primary bg-white !text-primary hover:bg-gray-100"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Your Free Quote
                            </motion.button>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
            {/* ===== LIGHTBOX ===== */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Gallery Fullscreen"
                            className="max-w-full max-h-[90vh] object-contain rounded-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
