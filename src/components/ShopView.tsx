import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, X, Sparkles, MapPin, Eye, Info, Check, Trash2, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'collars' | 'print' | 'apparel';
  price: number;
  description: string;
  materials: string[];
  dimensions: string;
  origin: string;
  image: string;
  availability: 'Available' | 'Extremely Scarce' | 'Bespoke Waiting List';
}

const PRODUCTS_DATABASE: Product[] = [
  {
    id: 'prod-1',
    name: 'The Deep-Molded Vegetable-Tanned Leather Collar',
    category: 'collars',
    price: 420,
    description: 'A structural, high-sculpted armor collar meant to frame the facial contours. Hand-shaped over custom wood blocks in Florence, designed for layering over delicate silk organza.',
    materials: ['100% Certified Italian Vegetable-Tanned Neck Leather', 'Hand-Polished Steel Buckle'],
    dimensions: 'Adjustable posture diameter: 12cm - 15cm',
    origin: 'Florence ateliers, Italy',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
    availability: 'Extremely Scarce'
  },
  {
    id: 'prod-2',
    name: 'THE DEBUT Issue 04: Limited Flax Linen Cover Copy',
    category: 'print',
    price: 95,
    description: 'A heavy keepsake print copy of Issue 04, hand-bound with unbleached organic French flax linen spun on traditional looms. Contains exclusive photog series signed by Sofia van der Post.',
    materials: ['Heavy FSC-certified 150gsm Munken paper', '100% Organic unbleached canvas thread-bind'],
    dimensions: '240mm x 320mm, 280 heavy pages',
    origin: 'Munich, Bavaria',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    availability: 'Available'
  },
  {
    id: 'prod-3',
    name: 'Cast-Metal Brutalist Chestpiece Armor',
    category: 'collars',
    price: 1250,
    description: 'An avant-garde hand-forged aluminum chest closure sculpture. Molded to rest softly on clavicle bones. Built in absolute collaboration with Kyoto modern metal sculptors.',
    materials: ['Lightweight sand-cast structural aluminum', 'Anodized non-reactive backing layer'],
    dimensions: 'Anatomical chest span: 32cm width',
    origin: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=800',
    availability: 'Bespoke Waiting List'
  },
  {
    id: 'prod-4',
    name: 'Unbleached Organic Raw Silk Organza Wrap',
    category: 'apparel',
    price: 680,
    description: 'A floating architectural wrap-layer mimicking monastic cowls. Made with certified biological silkworm thread woven on ancient zero-emission loom networks.',
    materials: ['100% Bio-certified wild silk fibers', 'Natural plant-based botanical core dyes'],
    dimensions: 'Symmetrical fluid width: 90cm x 220cm',
    origin: 'Lyon ateliers, France',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    availability: 'Available'
  },
  {
    id: 'prod-5',
    name: 'The Pelagia Sea-Kelp Shimmer Scarf',
    category: 'apparel',
    price: 310,
    description: 'Constructed completely of carbon-negative ocean kelp thread processed off the western Ireland coast. Holds an extraordinary liquid-like refractive shine.',
    materials: ['85% Harvested Marine Sea-Kelp Fibers', '15% Organic flax structure yarn'],
    dimensions: 'Aerosol width: 35cm x 180cm',
    origin: 'Connemara shores, Western Ireland',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800',
    availability: 'Extremely Scarce'
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ShopView() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  
  // Checkout submission states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutCode, setCheckoutCode] = useState('');

  // Filtering products
  const filteredProducts = activeCategory === 'ALL'
    ? PRODUCTS_DATABASE
    : PRODUCTS_DATABASE.filter(p => p.category === activeCategory);

  // Shop cart functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer immediately to provide lovely feedback
    setIsBagOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const triggerCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerAddress) return;
    
    // Create custom invoice code
    const uniqueCode = `ATELIER-BAG-${Math.floor(1000 + Math.random() * 9000)}`;
    setCheckoutCode(uniqueCode);
    setCheckoutComplete(true);
    
    setTimeout(() => {
      // Complete transaction and clear state
      setCart([]);
      setIsCheckingOut(false);
      setCheckoutComplete(false);
      setIsBagOpen(false);
      setBuyerName('');
      setBuyerEmail('');
      setBuyerAddress('');
    }, 4500);
  };

  return (
    <div className="space-y-12 relative">
      
      {/* 1. Header Hero Area */}
      <div className="bg-[#111111] text-white p-8 md:p-16 relative overflow-hidden border border-[#AF9662]/20">
        <div className="absolute top-0 right-10 text-[20vh] font-serif font-black text-white/5 tracking-tighter leading-none pointer-events-none uppercase">
          ATELIER
        </div>
        
        {/* Float Shopping Bag floating summary */}
        <button 
          onClick={() => setIsBagOpen(true)}
          className="absolute top-6 right-6 bg-[#FCFBF7] text-[#111111] border border-[#AF9662]/30 px-4 py-2.5 text-xs tracking-widest font-mono font-bold uppercase hover:bg-[#AF9662] hover:text-white transition-all flex items-center gap-2 z-20"
        >
          <ShoppingBag size={14} />
          MY BAG ({cart.reduce((qty, item) => qty + item.quantity, 0)})
        </button>

        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#AF9662] font-bold">THE DEBUT ATELIER CURATIONS</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest font-light text-white uppercase">
            ATELIER CURATED SHOP
          </h1>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
            An exclusive boutique preserving historical craft. Raw textures, vegetable-tanned Italian leathers, un-dyed baby cashmeres, and certified bio-synthetics are offered in limited batches.
          </p>
        </div>
      </div>

      {/* 2. Shop Categories Filtering Tabs */}
      <div className="flex border-b border-[#111111]/8 overflow-x-auto pb-px">
        {[
          { key: 'ALL', label: 'ALL ARTIFACTS' },
          { key: 'collars', label: 'MOLDED HARNESSES & LEATHERS' },
          { key: 'print', label: 'VOLUMES & PRINT EDITIONS' },
          { key: 'apparel', label: 'SILKS & APPALACHIAN APPAREL' }
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap px-6 py-4 text-xs tracking-[0.2em] font-sans font-medium uppercase border-b-2 transition-all ${activeCategory === cat.key ? 'border-[#AF9662] text-[#AF9662] font-semibold' : 'border-transparent text-neutral-400 hover:text-[#111111]'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Products Grid (Elegant, unbalanced list) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(prod => (
          <div 
            key={prod.id} 
            className="group bg-white border border-[#111111]/8 hover:border-[#AF9662] transition-colors duration-300 flex flex-col justify-between"
          >
            {/* Visual Preview Container */}
            <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
              <img 
                src={prod.image} 
                alt={prod.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Scarce tag labels */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
                <span className="bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 font-bold">
                  {prod.availability}
                </span>
                <span className="bg-[#FCFBF7] text-[#111111] text-[8px] font-mono tracking-widest uppercase border border-black/10 px-2.5 py-0.5">
                  ORIGIN: {prod.origin}
                </span>
              </div>
            </div>

            {/* Core Card Details */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-serif text-lg text-neutral-900 group-hover:text-[#AF9662] transition-colors leading-snug font-medium line-clamp-2">
                    {prod.name}
                  </h3>
                  <span className="font-serif text-lg text-[#AF9662] shrink-0">
                    ${prod.price} USD
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-sans tracking-wide leading-relaxed font-light line-clamp-3">
                  {prod.description}
                </p>
              </div>

              {/* Quick Details or Actions */}
              <div className="space-y-4 pt-4 border-t border-[#111111]/5">
                <div className="flex flex-wrap gap-1">
                  {prod.materials.slice(0, 2).map((mat, idx) => (
                    <span key={idx} className="bg-[#FAF7F0] border border-black/5 px-2 py-0.5 text-[8px] tracking-wider uppercase font-mono text-neutral-500">
                      • {mat}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedProduct(prod)}
                    className="w-1/3 border border-[#111111]/15 text-neutral-600 font-sans text-[10px] tracking-widest uppercase py-2.5 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye size={12} /> DETAILS
                  </button>
                  <button 
                    onClick={() => addToCart(prod)}
                    className="w-2/3 bg-[#111111] hover:bg-[#AF9662] text-white text-[10px] tracking-[0.25em] font-sans font-bold uppercase py-2.5 transition-colors duration-300"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 4. Overlaid Product Detail View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#111111]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-[#FCFBF7] border border-[#AF9662]/30 w-full max-w-2xl p-8 md:p-10 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="aspect-[4/5] bg-neutral-100 overflow-hidden border border-[#111111]/10">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between space-y-6 pb-2">
                <div className="space-y-4">
                  <span className="text-[9px] tracking-widest text-[#AF9662] font-mono font-bold uppercase block leading-none">
                    ATELIER CATALOG INDEX SPECIFICATION
                  </span>
                  
                  <h3 className="font-serif text-2xl text-neutral-900 leading-snug">
                    {selectedProduct.name}
                  </h3>

                  <p className="font-serif text-xl text-[#AF9662] font-bold">
                    ${selectedProduct.price} USD
                  </p>

                  <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-2 text-[11px] border-t border-[#111111]/5 pt-4">
                    <p className="text-neutral-500 font-mono"><strong className="font-sans text-neutral-800 uppercase tracking-widest text-[9px] mr-2">AVAILABILITY:</strong> {selectedProduct.availability}</p>
                    <p className="text-neutral-500 font-mono"><strong className="font-sans text-neutral-800 uppercase tracking-widest text-[9px] mr-2">DIMENSIONS:</strong> {selectedProduct.dimensions}</p>
                    <p className="text-neutral-500 font-mono"><strong className="font-sans text-neutral-800 uppercase tracking-widest text-[9px] mr-2">ORIGIN ATELIER:</strong> {selectedProduct.origin}</p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <p className="text-[9px] tracking-widest text-neutral-400 font-mono uppercase font-bold">TEXTILE CERTIFICATIONS</p>
                    <ul className="text-[10px] text-neutral-600 space-y-1 font-mono">
                      {selectedProduct.materials.map((mat, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <Check size={10} className="text-[#AF9662]" /> {mat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#111111]/8">
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full bg-[#111111] hover:bg-[#AF9662] text-white text-[10px] tracking-widest font-sans font-bold uppercase py-3.5 transition-colors"
                  >
                    ADD TO ATELIER BAG
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Shopping Bag Slide-Over Drawer panel */}
      {isBagOpen && (
        <div className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs z-50 flex justify-end">
          <div 
            className="w-full max-w-md h-full bg-[#FCFBF7] p-8 flex flex-col justify-between shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#AF9662]" />
                  <span className="font-serif text-lg tracking-wider text-neutral-900 uppercase">ATELIER BACKSTAGE BAG</span>
                </div>
                <button 
                  onClick={() => setIsBagOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-20 text-neutral-400">
                  <ShoppingBag size={32} className="mx-auto text-neutral-200 mb-2" />
                  <p className="text-xs uppercase tracking-widest">Your atelier bag is currently empty</p>
                  <p className="text-[10px] lowercase tracking-normal text-neutral-400 mt-1">Examine our physical curations page to request products.</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-[#111111]/5">
                      <div className="w-16 h-20 bg-neutral-100 overflow-hidden border border-black/5 shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <h4 className="font-serif text-sm text-neutral-900 leading-tight font-medium line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-[#AF9662] font-mono leading-none">
                            ${item.product.price} USD // Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2.5">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-5 h-5 border border-black/10 rounded-full flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-neutral-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-5 h-5 border border-black/10 rounded-full flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total price and transactional actions */}
            {cart.length > 0 && (
              <div className="border-t border-[#111111]/10 pt-6 space-y-4 bg-[#FCFBF7]">
                
                {isCheckingOut ? (
                  // Elegant slide up form
                  <div className="space-y-4">
                    {checkoutComplete ? (
                      <div className="space-y-4 text-center py-6 text-[#111111] animate-fade-in">
                        <div className="w-12 h-12 bg-neutral-900 border border-[#AF9662] rounded-full flex items-center justify-center mx-auto text-[#AF9662]">
                          <Check size={18} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-neutral-800">
                            ACQUISITION ORDER TRANSMITTED
                          </h4>
                          <p className="text-[11px] text-[#AF9662] font-mono font-medium uppercase tracking-widest">
                            CODE: {checkoutCode}
                          </p>
                          <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                            Check email coordinates. Our concierge officer will forward billing profiles, private logistic routing details, and security manifests.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={triggerCheckoutSubmit} className="space-y-3">
                        <p className="text-[9px] tracking-widest text-[#AF9662] font-mono uppercase font-bold leading-none mb-1">
                          SECURE SECULAR CHECKOUT PROCESS
                        </p>
                        
                        <div className="space-y-1">
                          <input
                            type="text"
                            required
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            placeholder="FULL NAME"
                            className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662]"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="email"
                            required
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            placeholder="CREST MAILBOX"
                            className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662]"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            required
                            value={buyerAddress}
                            onChange={(e) => setBuyerAddress(e.target.value)}
                            placeholder="SHIPPING PHYSICAL ADDRESS"
                            className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662]"
                          />
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsCheckingOut(false)}
                            className="w-1/3 border border-[#111111]/10 text-neutral-500 font-sans text-[10px] uppercase font-bold tracking-widest py-2.5 hover:bg-neutral-100"
                          >
                            BACK
                          </button>
                          <button
                            type="submit"
                            className="w-2/3 bg-[#111111] hover:bg-[#AF9662] text-white font-sans text-[10px] uppercase font-bold tracking-[0.2em] py-2.5"
                          >
                            SECURE ORDER
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  // Simple bag totals preview
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-black/5 pb-3">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400">BAG TOTAL SPECIFICATION:</span>
                      <span className="font-serif text-xl font-bold text-[#AF9662]">${cartTotal} USD</span>
                    </div>

                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full bg-[#111111] text-white text-[11px] tracking-[0.25em] font-sans font-bold uppercase py-3.5 hover:bg-[#AF9662] transition-colors flex items-center justify-center gap-1.5"
                    >
                      SECURE CURATED PRODUCTS <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
