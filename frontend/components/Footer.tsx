'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="glass-strong">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-electric-500 to-neon-purple rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">OmniMind</h3>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Reimagining retail intelligence with emotion-aware AI that understands you.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:glass-strong transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-white font-bold mb-6">Shop</h4>
              <ul className="space-y-3 text-sm">
                {['All Products', 'Wearables', 'Audio', 'Home'].map((item) => (
                  <li key={item}>
                    <Link href="/products" className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                {['Help Center', 'Track Order', 'Returns', 'Shipping Info'].map((item) => (
                  <li key={item}>
                    <Link href="/help" className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-6">Stay Updated</h4>
              <p className="text-sm text-white/60 mb-4">Get the latest deals and AI-powered recommendations.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 glass px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gradient-to-r from-electric-500 to-neon-purple rounded-xl shadow-electric"
                >
                  <Mail size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white/60">&copy; 2025 OmniMind. All rights reserved.</p>
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link key={item} href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
