'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, Trash2, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart';
import Image from 'next/image';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/10 shadow-electric"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-500 to-neon-purple rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Shopping Cart</h2>
              <p className="text-sm text-gray-400">{items.length} items</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass hover:glass-strong rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto max-h-[50vh] p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-electric-500/20 to-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add some products to get started!</p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-4 rounded-2xl flex items-center gap-4 hover:glass-strong transition-all"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.name}</h3>
                  <p className="text-electric-400 font-bold">${item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 glass hover:glass-strong rounded-lg flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  
                  <motion.button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 glass hover:glass-strong rounded-lg flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 glass hover:bg-red-500/20 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </motion.button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-gradient">${total.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={clearCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-glass"
              >
                Clear Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-primary"
              >
                <Sparkles className="w-4 h-4" />
                Checkout
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
