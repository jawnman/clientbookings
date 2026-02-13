import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/nick.roehm/',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:nickroehmxyz@gmail.com',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
]

export default function Footer() {
    return (
        <footer className="py-12 px-6 bg-[#f7f5f3] relative z-10">
            <div className="container max-w-[1000px]">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        <div className="text-center md:text-left">
                            <span className="text-lg font-bold tracking-tight text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                                Shot By <span className="font-light text-gray-400">Nick</span>
                            </span>
                            <p className="text-xs text-gray-400 mt-1">Capturing life's beautiful moments.</p>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-xs text-gray-500 mb-0.5">nickroehmxyz@gmail.com</p>
                            <p className="text-xs text-gray-400">Philadelphia, PA</p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/60">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Shot By Nick. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                aria-label={social.name}
                                className="text-gray-400 hover:text-primary transition-colors duration-300"
                                whileHover={{ scale: 1.15, y: -1 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
