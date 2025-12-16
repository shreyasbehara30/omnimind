'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { useCart } from '@/lib/cart';
import { ShoppingBag, Star, Heart, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group relative"
        >
          {/* Glass Card Container */}
          <div className="glass-strong rounded-3xl overflow-hidden shadow-glass hover:shadow-glow transition-all duration-500">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-electric-500/5 to-neon-purple/5">
              <motion.img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Floating Category Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 left-4 glass px-4 py-2 rounded-xl backdrop-blur-md"
              >
                <span className="text-xs font-semibold bg-gradient-to-r from-electric-400 to-neon-purple bg-clip-text text-transparent">
                  {product.category}
                </span>
              </motion.div>
              
              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Rating Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 glass px-3 py-2 rounded-xl backdrop-blur-md">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-electric-400 text-electric-400" />
                ))}
                <span className="text-xs text-white ml-1 font-semibold">4.9</span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-gradient transition-all">
                {product.name}
              </h3>
              
              <p className="text-sm text-white/60 line-clamp-2 mb-4">
                {product.description}
              </p>
              
              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 mb-1">Price</p>
                  <span className="text-3xl font-bold text-gradient">
                    ${product.price}
                  </span>
                </div>
                <motion.button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-purple font-semibold flex items-center gap-2 shadow-electric hover:shadow-neon-lg transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* AI Recommendation Badge */}
          {index === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-3 -right-3 glass px-4 py-2 rounded-full flex items-center gap-2 shadow-glow"
            >
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span className="text-xs font-bold text-gradient">AI Pick</span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
