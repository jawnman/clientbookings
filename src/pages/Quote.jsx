import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { EMAIL_CONFIG } from '../config/email'
import ScrollReveal from '../components/ScrollReveal'
import AnimatedCounter from '../components/AnimatedCounter'

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const slideVariants = {
    initial: { opacity: 0, height: 0, y: 20 },
    animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3 } },
}

/* ===== SERVICE DATA ===== */
const serviceOptions = [
    {
        id: 'portrait',
        title: 'Portrait Photography',
        desc: 'Individual, couple, family, and senior sessions in studio or on location.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        id: 'event',
        title: 'Event Photography',
        desc: 'Concerts, corporate gatherings, and special celebrations captured beautifully.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        id: 'realestate',
        title: 'Real Estate Photography',
        desc: 'Professional interior and exterior property photos that help listings sell faster.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
]

const portraitSessionTypes = ['Individual', 'Couple', 'Family', 'Senior']
const portraitDurations = ['1 hour', '2 hours']
const eventTypes = ['Concert', 'Corporate', 'Birthday', 'Other']
const eventDurations = ['2 hours', '4 hours', '6 hours', '8+ hours']
const propertyTypes = ['Residential', 'Commercial']
const propertyCount = ['1 Property', '2 Properties', '3 Properties', '4 Properties', '5+ Properties']

/* ===== PRICING LOGIC ===== */
function calculateQuote(form) {
    const { service, sessionType, portraitDuration, eventType, eventDuration, guestCount, propertyType, numProperties } = form

    if (service === 'portrait') {
        let price = 250
        const sessionMap = { Individual: 0, Couple: 50, Family: 100, Senior: 50 }
        const durationMap = { '1 hour': 0, '2 hours': 150 }
        price += (sessionMap[sessionType] || 0) + (durationMap[portraitDuration] || 0)
        return price
    }

    if (service === 'event') {
        let price = 350
        const typeMap = { Concert: 200, Corporate: 250, Birthday: 0, Other: 100 }
        const durMap = { '2 hours': 0, '4 hours': 200, '6 hours': 400, '8+ hours': 600 }
        const guests = parseInt(guestCount) || 0
        const guestMult = guests > 200 ? 200 : guests > 100 ? 100 : guests > 50 ? 50 : 0
        price += (typeMap[eventType] || 0) + (durMap[eventDuration] || 0) + guestMult
        return price
    }

    if (service === 'realestate') {
        const propMap = { '1 Property': 1, '2 Properties': 2, '3 Properties': 3, '4 Properties': 4, '5+ Properties': 5 }
        const count = propMap[numProperties] || 1
        return 150 * count
    }

    return 0
}

const LOCALSTORAGE_KEY = 'quote_form_draft'

function loadDraft() {
    try {
        const saved = localStorage.getItem(LOCALSTORAGE_KEY)
        return saved ? JSON.parse(saved) : null
    } catch { return null }
}

/* ===== CONFETTI ===== */
function Confetti() {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random(),
        color: ['#fae8e8', '#e8f0ed', '#f5f1ed', '#1a1a1a', '#a3a3a3'][Math.floor(Math.random() * 5)],
        size: 6 + Math.random() * 6,
    }))
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: -20,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                    }}
                    initial={{ y: -20, rotate: 0, opacity: 1 }}
                    animate={{ y: '100vh', rotate: 360 + Math.random() * 360, opacity: 0 }}
                    transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                />
            ))}
        </div>
    )
}

/* ===== MAIN COMPONENT ===== */
const timeSlots = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
]

export default function Quote() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const defaults = {
        service: '',
        time: '',
        sessionType: '',
        portraitDuration: '',
        portraitLocation: '',
        eventType: '',
        eventDuration: '',
        guestCount: '',
        propertyType: '',
        numProperties: '',
        date: '',
        location: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
    }

    const draft = loadDraft()
    const [form, setForm] = useState(draft || defaults)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    // Save draft
    useEffect(() => {
        if (!submitted) {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(form))
        }
    }, [form, submitted])

    // Calculate date limits (1.5 months = approx 45 days)
    const { minDate, maxDate } = useMemo(() => {
        const today = new Date()
        const future = new Date(today)
        future.setDate(today.getDate() + 45)

        return {
            minDate: today.toISOString().split('T')[0],
            maxDate: future.toISOString().split('T')[0]
        }
    }, [])

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => {
                const copy = { ...prev }
                delete copy[field]
                return copy
            })
        }
    }

    const quote = useMemo(() => calculateQuote(form), [form])

    const validate = () => {
        const e = {}
        if (!form.service) e.service = 'Please select a service'
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)

        try {
            // Prepare template parameters
            const templateParams = {
                to_name: 'Nick',
                from_name: form.name,
                from_email: form.email,
                phone: form.phone || 'Not provided',
                service: serviceOptions.find((s) => s.id === form.service)?.title || form.service,
                session_type: form.sessionType || 'N/A',
                duration: form.portraitDuration || form.eventDuration || 'N/A',
                location: form.location || form.portraitLocation || 'Not specified',
                event_type: form.eventType || 'N/A',
                guest_count: form.guestCount || 'N/A',
                property_type: form.propertyType || 'N/A',
                num_properties: form.numProperties || 'N/A',
                date: form.date ? `${form.date}${form.time ? ` (${form.time})` : ''}` : 'Not specified',
                estimated_quote: `$${quote}`,
                notes: form.notes || 'None',
            }

            // Send via EmailJS
            await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAIL_CONFIG.PUBLIC_KEY
            )

            localStorage.removeItem(LOCALSTORAGE_KEY)
            navigate('/thank-you')
        } catch (error) {
            console.error('EmailJS Error:', error)
            alert('Something went wrong. Please try again or contact me directly at nickroehmxyz@gmail.com')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {showConfetti && <Confetti />}

            <section className="section bg-white pt-28 pb-8">
                <div className="container text-center" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <motion.h1
                        className="heading-xl mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{ textAlign: 'center' }}
                    >
                        Get a Quote
                    </motion.h1>
                    <motion.p
                        className="text-body max-w-lg mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ textAlign: 'center' }}
                    >
                        Tell me about your project and get an instant estimate. It only takes a minute.
                    </motion.p>
                </div>
            </section>

            <section className="section pt-4 pb-20">
                <div className="container max-w-[900px]">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            /* ===== SUCCESS STATE ===== */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="flex flex-col items-center justify-center text-center w-full py-20"
                            >
                                {/* Animated Checkmark */}
                                <motion.div className="flex justify-center mb-8">
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <motion.circle
                                            cx="40" cy="40" r="36"
                                            stroke="var(--color-primary)"
                                            strokeWidth="3"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                        />
                                        <motion.path
                                            d="M24 40 L35 51 L56 30"
                                            stroke="var(--color-primary)"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                        />
                                    </svg>
                                </motion.div>

                                <h2 className="heading-lg mb-4" style={{ textAlign: 'center' }}>Quote Request Received!</h2>
                                <p className="text-body max-w-md mx-auto mb-8" style={{ textAlign: 'center' }}>
                                    Thank you for your interest! Check your email for confirmation.
                                    I'll get back to you with a finalized quote within 24 hours.
                                </p>
                                <motion.button
                                    className="btn-primary"
                                    onClick={() => {
                                        setSubmitted(false)
                                        setForm(defaults)
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Submit Another Request
                                </motion.button>
                            </motion.div>
                        ) : (
                            /* ===== FORM ===== */
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="flex flex-col lg:flex-row gap-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                {/* Left: Form Fields */}
                                <div className="flex-1 space-y-10">
                                    {/* STEP 1: Service Selection */}
                                    <div>
                                        <ScrollReveal>
                                            <h2 className="heading-md mb-6">1. Choose Your Service</h2>
                                        </ScrollReveal>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            {serviceOptions.map((opt, i) => (
                                                <ScrollReveal key={opt.id} delay={i * 0.1}>
                                                    <motion.button
                                                        type="button"
                                                        onClick={() => update('service', opt.id)}
                                                        className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer bg-white ${form.service === opt.id
                                                            ? 'border-primary shadow-lg'
                                                            : 'border-gray-200 hover:border-gray-400'
                                                            }`}
                                                        whileHover={{ y: -4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {/* Checkmark */}
                                                        <AnimatePresence>
                                                            {form.service === opt.id && (
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    exit={{ scale: 0 }}
                                                                    transition={{ type: 'spring', stiffness: 400 }}
                                                                    className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                                                >
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                    </svg>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>

                                                        <div className="text-gray-600 mb-3">{opt.icon}</div>
                                                        <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                                                            {opt.title}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                                                    </motion.button>
                                                </ScrollReveal>
                                            ))}
                                        </div>
                                        {errors.service && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-500 text-sm mt-2"
                                            >
                                                {errors.service}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* STEP 2: Service Details (conditional) */}
                                    <AnimatePresence>
                                        {form.service && (
                                            <motion.div
                                                key={form.service}
                                                variants={slideVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <h2 className="heading-md mb-6">2. Service Details</h2>

                                                {/* Portrait Details */}
                                                {form.service === 'portrait' && (
                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="form-label">Session Type</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {portraitSessionTypes.map((type) => (
                                                                    <ToggleButton
                                                                        key={type}
                                                                        label={type}
                                                                        active={form.sessionType === type}
                                                                        onClick={() => update('sessionType', type)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Duration</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {portraitDurations.map((dur) => (
                                                                    <ToggleButton
                                                                        key={dur}
                                                                        label={dur}
                                                                        active={form.portraitDuration === dur}
                                                                        onClick={() => update('portraitDuration', dur)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Preferred Location</label>
                                                            <p className="text-xs text-gray-400 mb-2">
                                                                Have a spot in mind? Let me know — a park, urban street, your home, a studio, or any location that fits your vision. This is your shoot, so you have full control over the setting.
                                                            </p>
                                                            <textarea
                                                                className="form-input"
                                                                rows={3}
                                                                placeholder="e.g. Rittenhouse Square, a rooftop downtown, my backyard..."
                                                                value={form.portraitLocation}
                                                                onChange={(e) => update('portraitLocation', e.target.value)}
                                                                style={{ resize: 'vertical', minHeight: 70 }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Event Details */}
                                                {form.service === 'event' && (
                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="form-label">Event Type</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {eventTypes.map((type) => (
                                                                    <ToggleButton
                                                                        key={type}
                                                                        label={type}
                                                                        active={form.eventType === type}
                                                                        onClick={() => update('eventType', type)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Duration</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {eventDurations.map((dur) => (
                                                                    <ToggleButton
                                                                        key={dur}
                                                                        label={dur}
                                                                        active={form.eventDuration === dur}
                                                                        onClick={() => update('eventDuration', dur)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Estimated Guest Count</label>
                                                            <input
                                                                type="number"
                                                                className="form-input max-w-[200px]"
                                                                placeholder="e.g. 100"
                                                                value={form.guestCount}
                                                                onChange={(e) => update('guestCount', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Real Estate Details */}
                                                {form.service === 'realestate' && (
                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="form-label">Property Type</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {propertyTypes.map((type) => (
                                                                    <ToggleButton
                                                                        key={type}
                                                                        label={type}
                                                                        active={form.propertyType === type}
                                                                        onClick={() => update('propertyType', type)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Number of Properties</label>
                                                            <div className="flex flex-wrap gap-3">
                                                                {propertyCount.map((opt) => (
                                                                    <ToggleButton
                                                                        key={opt}
                                                                        label={opt}
                                                                        active={form.numProperties === opt}
                                                                        onClick={() => update('numProperties', opt)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-400 italic">$150 per property</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* STEP 3: Date & Location */}
                                    <AnimatePresence>
                                        {form.service && (
                                            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                                                <h2 className="heading-md mb-6">3. Date & Location</h2>
                                                <div className="space-y-5">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div>
                                                            <label className="form-label">Preferred Date</label>
                                                            <input
                                                                type="date"
                                                                className="form-input"
                                                                value={form.date}
                                                                min={minDate}
                                                                max={maxDate}
                                                                onChange={(e) => update('date', e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Preferred Time</label>
                                                            <select
                                                                className="form-input appearance-none bg-white"
                                                                value={form.time}
                                                                onChange={(e) => update('time', e.target.value)}
                                                            >
                                                                <option value="">Select a time slot...</option>
                                                                {timeSlots.map((slot) => (
                                                                    <option key={slot} value={slot}>
                                                                        {slot}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="form-label">Location / Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder="e.g. Center City, Philadelphia"
                                                            value={form.location}
                                                            onChange={(e) => update('location', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* STEP 4: Contact Info */}
                                    <AnimatePresence>
                                        {form.service && (
                                            <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit">
                                                <h2 className="heading-md mb-6">4. Contact Information</h2>
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="form-label">
                                                            Name <span className="text-red-400">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-input ${errors.name ? 'error' : form.name.trim() ? 'valid' : ''}`}
                                                            placeholder="Your full name"
                                                            value={form.name}
                                                            onChange={(e) => update('name', e.target.value)}
                                                            autoComplete="name"
                                                        />
                                                        {errors.name && (
                                                            <motion.p
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="text-red-500 text-sm mt-1"
                                                            >
                                                                {errors.name}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="form-label">
                                                            Email <span className="text-red-400">*</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className={`form-input ${errors.email ? 'error' : /\S+@\S+\.\S+/.test(form.email) ? 'valid' : ''}`}
                                                            placeholder="your@email.com"
                                                            value={form.email}
                                                            onChange={(e) => update('email', e.target.value)}
                                                            autoComplete="email"
                                                        />
                                                        {errors.email && (
                                                            <motion.p
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="text-red-500 text-sm mt-1"
                                                            >
                                                                {errors.email}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="form-label">Phone (optional)</label>
                                                        <input
                                                            type="tel"
                                                            className="form-input"
                                                            placeholder="(555) 000-0000"
                                                            value={form.phone}
                                                            onChange={(e) => update('phone', e.target.value)}
                                                            autoComplete="tel"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="form-label">Additional Notes</label>
                                                        <textarea
                                                            className="form-input"
                                                            rows={4}
                                                            placeholder="Any special requests or details about your session..."
                                                            value={form.notes}
                                                            onChange={(e) => update('notes', e.target.value)}
                                                            style={{ resize: 'vertical', minHeight: 100 }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit Button (Mobile: also show quote inline) */}
                                    {form.service && (
                                        <div>
                                            {/* Mobile-only quote display */}
                                            <div className="lg:hidden mb-6">
                                                <QuoteCard quote={quote} service={form.service} />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="btn-primary w-full text-lg py-4"
                                                disabled={loading}
                                                whileHover={!loading ? { scale: 1.02 } : {}}
                                                whileTap={!loading ? { scale: 0.98 } : {}}
                                            >
                                                {loading ? (
                                                    <motion.span
                                                        className="flex items-center justify-center gap-3"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        <motion.span
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        />
                                                        Sending...
                                                    </motion.span>
                                                ) : (
                                                    'Request Quote'
                                                )}
                                            </motion.button>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Sticky Quote Card (Desktop) */}
                                <div className="hidden lg:block w-[340px] flex-shrink-0">
                                    <div className="sticky top-28">
                                        <QuoteCard quote={quote} service={form.service} />
                                    </div>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </motion.div>
    )
}

/* ===== TOGGLE BUTTON COMPONENT ===== */
function ToggleButton({ label, active, onClick }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={`px-5 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-300 cursor-pointer ${active
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: 'var(--font-display)' }}
        >
            {label}
        </motion.button>
    )
}

/* ===== QUOTE CARD COMPONENT ===== */
function QuoteCard({ quote, service }) {
    return (
        <motion.div
            className="glass rounded-3xl p-8 border border-gray-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            <h3
                className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Estimated Quote
            </h3>

            {service ? (
                <motion.div
                    key={quote}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                            $<AnimatedCounter value={quote} />
                        </span>
                    </div>
                </motion.div>
            ) : (
                <p className="text-2xl font-bold text-gray-300" style={{ fontFamily: 'var(--font-display)' }}>
                    $---
                </p>
            )}

            <motion.p
                className="text-xs text-gray-400 mt-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Final quote will be confirmed via email based on your specific requirements.
                <br /><br />
                <span className="font-semibold text-primary">Note:</span> All shoots require a $50 non-refundable deposit for finalization.
                <br />
                <span className="font-semibold text-primary">Travel:</span> Limited to 25 miles outside of the Philadelphia area.
            </motion.p>

            {/* Visual progress dots */}
            <div className="flex gap-2 mt-6">
                {['Service', 'Details', 'Date', 'Contact'].map((step, i) => (
                    <div key={step} className="flex-1 text-center">
                        <div
                            className={`h-1 rounded-full transition-all duration-500 mb-1 ${i === 0 && service ? 'bg-primary' :
                                i === 1 && service ? 'bg-primary/50' :
                                    i <= 1 && !service ? 'bg-gray-200' :
                                        'bg-gray-200'
                                }`}
                        />
                        <span className="text-[10px] text-gray-400">{step}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
