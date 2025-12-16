'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Search, Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { AuthModal } from './AuthModal';
import CartModal from './CartModal';

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  return (
    <>
      {/* Premium Glassmorphic Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="glass border-b border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo with Premium Animation */}
              <Link href="/" className="group flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-neon-purple rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-electric-500 to-neon-purple rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">OmniMind</h1>
                  <p className="text-xs text-white/60">AI Retail Platform</p>
                </div>
              </Link>

              {/* Premium Search Bar */}
              <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
                <div className="relative w-full group">
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-500/20 to-neon-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative glass-strong rounded-2xl overflow-hidden">
                    <div className="flex items-center">
                      <Search className="w-5 h-5 text-white/40 ml-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products, AI recommendations..."
                        className="w-full px-4 py-4 bg-transparent text-white placeholder-white/40 focus:outline-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 mr-2 rounded-xl bg-gradient-to-r from-electric-500 to-neon-purple font-semibold hover:shadow-electric transition-all"
                      >
                        Search
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* User Menu */}
                {isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="hidden md:flex items-center gap-3 glass px-6 py-3 rounded-2xl hover:glass-strong transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-500 to-neon-purple flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/60">Welcome back</p>
                      <p className="text-sm font-semibold">{user?.name}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hidden md:flex items-center gap-2 btn-primary"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </motion.button>
                )}

                {/* Cart */}
                <motion.button
                  onClick={() => setIsCartModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative glass p-3 rounded-2xl hover:glass-strong transition-all"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center text-xs font-bold shadow-neon"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Mobile Menu Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden glass p-3 rounded-2xl"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>

            {/* Premium Category Navigation */}
            <div className="hidden md:flex items-center gap-2 pb-4 overflow-x-auto scrollbar-hide">
              {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'AI Picks', 'New Arrivals'].map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-xl font-medium transition-all ${
                    category === 'AI Picks'
                      ? 'bg-gradient-to-r from-electric-500 to-neon-purple text-white shadow-electric'
                      : 'glass hover:glass-strong'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <div className="glass rounded-2xl p-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                />
              </div>
              {!isAuthenticated && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full btn-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {/* Cart Modal */}
      <AnimatePresence>
        {isCartModalOpen && <CartModal onClose={() => setIsCartModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
