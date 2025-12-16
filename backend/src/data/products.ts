export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
  specs?: Record<string, string>;
  description?: string;
  images?: string[];
}

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    price: 29990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1250,
    isNew: true,
    specs: { brand: 'Sony', color: 'Black', type: 'Over-ear' },
    description: 'The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: 114900,
    image: '/images/products/macbook-m2-new.png',
    category: 'Electronics',
    rating: 4.9,
    reviews: 890,
    specs: { brand: 'Apple', processor: 'M2', ram: '8GB' },
    description: 'Supercharged by M2. The MacBook Air is a strikingly thin laptop that brings exceptional speed and power efficiency within its durable all-aluminum enclosure.',
    images: [
      '/images/products/macbook-m2-new.png',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    price: 134900,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.7,
    reviews: 2100,
    isNew: true,
    specs: { brand: 'Apple', storage: '256GB', color: 'Titanium' },
    description: 'iPhone 15 Pro. The ultimate smartphone forged in titanium. Features the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '4',
    name: 'Samsung Odyssey G9',
    price: 129999,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    reviews: 420,
    discount: 15,
    specs: { brand: 'Samsung', size: '49-inch', refreshRate: '240Hz' },
    description: 'The Samsung Odyssey G9 is the ultimate gaming monitor. With its 49-inch curved screen and 240Hz refresh rate, it offers an immersive gaming experience like no other.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '17',
    name: 'iPad Air 5',
    price: 59900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.6,
    reviews: 560,
    specs: { brand: 'Apple', chip: 'M1', display: 'Liquid Retina' },
    description: 'iPad Air. With an immersive 10.9-inch Liquid Retina display. The breakthrough M1 chip delivers faster performance, making iPad Air a creative and mobile gaming tablet powerhouse.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '18',
    name: 'Logitech MX Master 3S',
    price: 9995,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.9,
    reviews: 3200,
    specs: { brand: 'Logitech', connectivity: 'Bluetooth', dpi: '8000' },
    description: 'Meet MX Master 3S – an iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.',
    images: [
      description: 'The Air Jordan 1 Retro High OG brings back the classic sneaker shoe that started it all. It features the same color blocking as the original, with a premium leather upper. Perfect for any sneakerhead looking for iconic shoes.',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?auto=format&fit=crop&q=80&w=800'
      ]
  },
  {
    id: '6',
    name: 'Levi\'s Denim Jacket',
    price: 4500,
    image: '/images/products/denim-jacket-new.png',
    category: 'Fashion',
    rating: 4.6,
    reviews: 210,
    specs: { brand: 'Levis', material: 'Denim', fit: 'Regular' },
    description: 'A classic Trucker Jacket that has stood the test of time. This denim jacket is a versatile layer that you can wear with anything.',
    images: [
      '/images/products/denim-jacket-new.png',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '7',
    name: 'Ray-Ban Aviator',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    category: 'Fashion',
    rating: 4.7,
    reviews: 320,
    discount: 25,
    specs: { brand: 'Ray-Ban', frame: 'Metal', lens: 'Green' },
    description: 'Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. Aviators in 1937.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '8',
    name: 'Adidas Ultraboost',
    price: 14999,
    image: '/images/products/adidas-ultraboost-new.png',
    category: 'Fashion',
    rating: 4.8,
    reviews: 1100,
    specs: { brand: 'Adidas', type: 'Running', cushioning: 'Boost' },
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST. The ultimate running shoes for comfort and performance.',
    images: [
      '/images/products/adidas-ultraboost-new.png',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '19',
    name: 'Casio G-Shock',
    price: 7995,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    category: 'Fashion',
    rating: 4.8,
    reviews: 950,
    specs: { brand: 'Casio', waterResistant: '200m', type: 'Digital' },
    description: 'The G-SHOCK watch is built for toughness. It is shock-resistant, water-resistant, and packed with features like a stopwatch, countdown timer, and alarm.',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595923533867-8778d7131294?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '20',
    name: 'North Face Puffer',
    price: 21999,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
    category: 'Fashion',
    rating: 4.7,
    reviews: 430,
    specs: { brand: 'The North Face', insulation: 'Down', color: 'Black' },
    description: 'The Nuptse Jacket has been delivering game-changing warmth since 1992 and no other jacket has journeyed from the mountains to city streets so naturally.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
    ]
  },

  // Home
  {
    id: '9',
    name: 'Herman Miller Chair',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    category: 'Home',
    rating: 4.9,
    reviews: 150,
    specs: { brand: 'Herman Miller', material: 'Mesh', ergonomic: 'Yes' },
    description: 'The Aeron Chair combines a deep knowledge of human-centered design with cutting-edge technology. With over 7 million sold, it is the most admired and recognized work chair.',
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '10',
    name: 'Dyson V15 Detect',
    price: 55900,
    image: '/images/products/dyson-v15-new.png',
    category: 'Home',
    rating: 4.7,
    reviews: 890,
    specs: { brand: 'Dyson', type: 'Cordless', battery: '60 mins' },
    description: 'Dyson V15 Detect is the most powerful, intelligent cordless vacuum. It detects hidden dust and counts and measures microscopic dust particles.',
    images: [
      '/images/products/dyson-v15-new.png',
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '11',
    name: 'Philips Hue Kit',
    price: 18999,
    image: '/images/products/philips-hue-new.png',
    category: 'Home',
    rating: 4.6,
    reviews: 450,
    specs: { brand: 'Philips', type: 'Smart Bulb', compatibility: 'Alexa/Google' },
    description: 'Control your lights with your voice or app. The Philips Hue White and Color Ambiance Starter Kit lets you create the perfect ambiance for any occasion.',
    images: [
      '/images/products/philips-hue-new.png',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '12',
    name: 'Nespresso Vertuo',
    price: 19500,
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=800',
    category: 'Home',
    rating: 4.8,
    reviews: 670,
    discount: 5,
    specs: { brand: 'Nespresso', type: 'Pod', capacity: '1.1L' },
    description: 'Nespresso Vertuo offers a full range of coffee styles, from espresso to large cups, with a smooth crema. It uses Centrifusion technology to brew the perfect cup.',
    images: [
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '21',
    name: 'IKEA Billy Bookcase',
    price: 4990,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
    category: 'Home',
    rating: 4.5,
    reviews: 5000,
    specs: { brand: 'IKEA', material: 'Particleboard', color: 'White' },
    description: 'It is estimated that every five seconds, one BILLY bookcase is sold somewhere in the world. Pretty impressive considering we launched BILLY in 1979.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800'
    ]
  },

  // Sports
  {
    id: '13',
    name: 'Yonex Racket',
    price: 4500,
    image: '/images/products/yonex-racket-new.png',
    category: 'Sports',
    rating: 4.5,
    reviews: 120,
    specs: { brand: 'Yonex', weight: '3U', material: 'Graphite' },
    description: 'The Yonex racket is designed for power and speed. It features a graphite frame that is lightweight yet durable, making it perfect for competitive play.',
    images: [
      '/images/products/yonex-racket-new.png',
      'https://images.unsplash.com/photo-1626224583764-847890e0e99b?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '14',
    name: 'Wilson Basketball',
    price: 2500,
    image: '/images/products/wilson-basketball-new.png',
    category: 'Sports',
    rating: 4.7,
    reviews: 340,
    specs: { brand: 'Wilson', size: '7', material: 'Composite Leather' },
    description: 'The Wilson Basketball is built for the street and the court. It features a composite leather cover for superior grip and durability.',
    images: [
      '/images/products/wilson-basketball-new.png',
      'https://images.unsplash.com/photo-1519861531473-92002639313e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '15',
    name: 'Yoga Mat Premium',
    price: 1500,
    image: '/images/products/yoga-mat-new.png',
    category: 'Sports',
    rating: 4.4,
    reviews: 560,
    specs: { brand: 'Lululemon', thickness: '5mm', material: 'Rubber' },
    description: 'This premium yoga mat provides extra cushioning and grip for your practice. It is made from eco-friendly materials and is easy to clean.',
    images: [
      '/images/products/yoga-mat-new.png',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '16',
    name: 'Fitbit Charge 6',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=800',
    category: 'Sports',
    rating: 4.6,
    reviews: 890,
    isNew: true,
    specs: { brand: 'Fitbit', battery: '7 days', features: 'GPS/Heart Rate' },
    description: 'Fitbit Charge 6 is the most advanced fitness tracker. It tracks your heart rate, sleep, and activity, and features built-in GPS and stress management tools.',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1557858310-9052820906f7?auto=format&fit=crop&q=80&w=800'
    ]
  },

  // Beauty
  {
    id: '22',
    name: 'Dior Sauvage',
    price: 9500,
    image: '/images/products/dior-sauvage-new.png',
    category: 'Beauty',
    rating: 4.8,
    reviews: 1500,
    specs: { brand: 'Dior', type: 'Eau de Toilette', size: '100ml' },
    description: 'Dior Sauvage is a radically fresh composition, dictated by a name that has the ring of a manifesto. That was the way François Demachy, Dior Perfumer-Creator, wanted it: raw and noble all at once.',
    images: [
      '/images/products/dior-sauvage-new.png',
      'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '23',
    name: 'Estee Lauder Serum',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    category: 'Beauty',
    rating: 4.9,
    reviews: 2100,
    specs: { brand: 'Estee Lauder', type: 'Night Repair', size: '50ml' },
    description: 'Advanced Night Repair harnesses the restorative power of night to deliver visible renewal. It works night and day to help skin maximize its overall natural rhythm of repair and protection.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '24',
    name: 'MAC Lipstick',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    category: 'Beauty',
    rating: 4.7,
    reviews: 3200,
    specs: { brand: 'MAC', shade: 'Ruby Woo', finish: 'Matte' },
    description: 'MAC Lipstick – the iconic product that made M·A·C famous. This long-wearing formula features an intense colour payoff and a completely matte finish.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
