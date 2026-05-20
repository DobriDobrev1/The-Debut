import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Bookmark, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  Globe, 
  Mail, 
  Compass, 
  Heart, 
  Share2, 
  Sliders, 
  Briefcase, 
  ArrowUpRight, 
  BookOpen,
  Filter,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTICLES, CATEGORIES, CALENDAR_EVENTS, BRAND_MEMBERS } from './data';
import { Article, CategoryKey } from './types';
import CalendarView from './components/CalendarView';
import ShopView from './components/ShopView';
import MagazinesView from './components/MagazinesView';

// Luxury market status tickers
const MARKET_TICKERS = [
  { brand: "LVMH", symbol: "MC.PA", price: "€782.40", change: "+1.24%", up: true },
  { brand: "KERING", symbol: "KER.PA", price: "€320.15", change: "-0.45%", up: false },
  { brand: "HERMÈS", symbol: "RMS.PA", price: "€2,143.00", change: "+2.10%", up: true },
  { brand: "PRADA", symbol: "1913.HK", price: "HK$61.90", change: "+3.05%", up: true },
  { brand: "RICHEMONT", symbol: "CFR.SW", price: "CHF128.50", change: "+0.15%", up: true }
];

export default function App() {
  // Navigation & Content States
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'category'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('news');

  // Interactive Overlays
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User Profile Account States
  const [userProfile, setUserProfile] = useState<{
    email: string;
    name: string;
    role: string;
    company?: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('the_debut_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      email: 'Doboo2121@gmail.com',
      name: 'David Doboo',
      role: 'Press Partner',
      company: 'THE DEBUT Bureau'
    };
  });

  const [signInEmail, setSignInEmail] = useState('');
  const [signInName, setSignInName] = useState('');
  const [signInRole, setSignInRole] = useState('Press Partner');
  const [signInCompany, setSignInCompany] = useState('');

  // Form States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalSubscribed, setModalSubscribed] = useState(false);

  // Archive (Bookmarks) local persistence state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('the_debut_archive_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track shared article state to trigger brief UI prompts
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  // Synchronize bookmarks with local storage
  useEffect(() => {
    localStorage.setItem('the_debut_archive_v1', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle document scrolling during overlays
  useEffect(() => {
    if (isSearching || isSubscribeOpen || isArchiveOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearching, isSubscribeOpen, isArchiveOpen, mobileMenuOpen]);

  // Core navigation helpers
  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedArticleId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
    setIsSearching(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToCategory = (catKey: CategoryKey) => {
    setSelectedCategory(catKey);
    setCurrentView('category');
    setIsSearching(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Toggle Bookmark logic
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(bId => bId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // User Account Action Handlers
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInName) return;
    const profile = {
      email: signInEmail,
      name: signInName,
      role: signInRole,
      company: signInCompany || 'Independent Atelier'
    };
    setUserProfile(profile);
    try {
      localStorage.setItem('the_debut_user_profile', JSON.stringify(profile));
    } catch {}
  };

  const handleLogOut = () => {
    setUserProfile(null);
    try {
      localStorage.removeItem('the_debut_user_profile');
    } catch {}
  };

  // Share story helper using clipboard
  const shareArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const article = ARTICLES.find(a => a.id === id);
    if (!article) return;
    
    const fakeUrl = `${window.location.origin}/article/${id}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      setCopiedArticleId(id);
      setTimeout(() => setCopiedArticleId(null), 2500);
    });
  };

  // Search filter
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return ARTICLES;
    const q = searchQuery.toLowerCase();
    return ARTICLES.filter(art => 
      art.title.toLowerCase().includes(q) || 
      art.excerpt.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Slideshow/Carousel State
  const featuredSlides = useMemo(() => {
    // 8 distinct articles spanning magazines, news, insights, runway and trends
    const ids = ['art-1', 'art-2', 'art-3', 'art-4', 'art-5', 'art-6', 'art-7', 'art-8'];
    return ARTICLES.filter(a => ids.includes(a.id)).sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }, []);

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIdx(prev => (prev + 1) % featuredSlides.length);
    }, 10000); // 10 seconds auto transitions

    return () => clearInterval(timer);
  }, [featuredSlides.length, currentSlideIdx]);

  const featuredArticle = useMemo(() => {
    return featuredSlides[currentSlideIdx] || ARTICLES[0];
  }, [featuredSlides, currentSlideIdx]);

  const activeArticle = useMemo(() => {
    return ARTICLES.find(a => a.id === selectedArticleId) || ARTICLES[0];
  }, [selectedArticleId]);

  const categoryArticles = useMemo(() => {
    return ARTICLES.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  const archiveArticles = useMemo(() => {
    return ARTICLES.filter(a => bookmarks.includes(a.id));
  }, [bookmarks]);

  const activeCategorySpec = useMemo(() => {
    return CATEGORIES.find(c => c.key === selectedCategory) || CATEGORIES[0];
  }, [selectedCategory]);

  // Newsletter Submit handlers
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const handleModalNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalEmail.trim()) {
      setModalSubscribed(true);
      setTimeout(() => {
        setIsSubscribeOpen(false);
        setModalEmail('');
        setModalSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div id="the-debut-root" className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#111111] selection:bg-[#AF9662] selection:text-white">
      
      {/* 1. TOP PREMIUM BAR: GLOBAL TICKER & LIVE METRICS */}
      <div id="luxury-ticker-bar" className="hidden lg:block bg-[#111111] text-white py-1.5 px-6 uppercase text-[10px] tracking-[0.2em] font-sans border-b border-white/5 z-40">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-[#AF9662] font-semibold">EDITION: MONTE CARLO & PARIS</span>
            <span className="opacity-50">|</span>
            <span className="opacity-75">LIVE WEATHER: PARIS 19°C / NYC 22°C</span>
          </div>
          
          {/* Real-time styled luxury indexes */}
          <div className="flex items-center gap-5">
            <span className="text-white/40">INDEX:</span>
            {MARKET_TICKERS.map((ticker, index) => (
              <div key={index} className="flex items-center gap-1.5 font-mono">
                <span className="opacity-80 font-sans">{ticker.brand}</span>
                <span className="opacity-50">{ticker.price}</span>
                <span className={ticker.up ? 'text-emerald-400' : 'text-rose-400'}>
                  {ticker.change}
                </span>
                {index < MARKET_TICKERS.length - 1 && <span className="opacity-20 ml-1">•</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Sticky and beautifully branded) */}
      <header id="main-editorial-header" className="sticky top-0 bg-[#FCFBF7]/90 backdrop-blur-md z-30 border-b border-[#111111]/8 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Core Branding Row */}
          <div className="flex justify-between items-center py-5 md:py-6 relative">
            
            {/* Left Options */}
            <div className="flex items-center gap-4">
              <button 
                id="btn-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 text-[#111111] hover:text-[#AF9662] transition-colors"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <button 
                id="btn-search-trigger"
                onClick={() => setIsSearching(true)}
                className="p-2 text-[#111111] hover:text-[#AF9662] transition-colors relative"
                title="Search THE Debut"
              >
                <Search size={19} />
              </button>
            </div>

            {/* Magnificent Editorial Logo Center */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center select-none">
              <button 
                onClick={navigateToHome}
                className="group focus:outline-none"
              >
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[0.04em] uppercase leading-none transition-all duration-500 group-hover:text-[#AF9662]">
                  THE DEBUT
                </h1>
                <p className="text-[8px] md:text-[10px] tracking-[0.25em] uppercase text-center mt-2.5 opacity-60 group-hover:opacity-100 transition-opacity duration-500 leading-none font-sans font-medium">
                  Your front row seat
                </p>
              </button>
            </div>

            {/* Right Options (Archive, Search, Subscribe UI) */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                id="btn-archive-trigger"
                onClick={() => setIsArchiveOpen(true)}
                className="p-2 text-[#111111] hover:text-[#AF9662] transition-colors relative"
                title={userProfile ? "My Account" : "Sign In / Join"}
              >
                <User size={19} />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#111111] text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              <button 
                id="btn-subscribe-header"
                onClick={() => setIsSubscribeOpen(true)}
                className="hidden md:block bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-sans px-5 py-2 hover:bg-[#AF9662] hover:text-white transition-all duration-300"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Desktop Categories Navigation Row */}
          <nav id="desktop-category-nav" className="hidden lg:block border-t border-[#111111]/8">
            <ul className="flex justify-center items-center py-3.5 gap-12 text-xs tracking-[0.25em] font-sans font-medium text-center">
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <button 
                    onClick={() => navigateToCategory(cat.key)}
                    className={`hover:text-[#AF9662] transition-colors py-1 relative uppercase ${currentView === 'category' && selectedCategory === cat.key ? 'text-[#AF9662] font-semibold' : 'opacity-70'}`}
                  >
                    {cat.label}
                    {currentView === 'category' && selectedCategory === cat.key && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#AF9662]" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </header>

      {/* MOBILE NAVIGATION MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#111111]/60 backdrop-blur-md z-50 lg:hidden"
          >
            <motion.div 
              id="mobile-drawer-content"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-4/5 max-w-[340px] h-full bg-[#FCFBF7] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <h2 className="font-serif text-2xl tracking-[0.04em] text-[#AF9662]">THE DEBUT</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold border-b border-[#111111]/5 pb-2">Navigation</p>
                  
                  <nav className="flex flex-col gap-5 text-sm tracking-[0.2em] font-sans font-medium">
                    {CATEGORIES.map((cat) => (
                      <button 
                        key={cat.key}
                        onClick={() => navigateToCategory(cat.key)}
                        className={`text-left uppercase hover:text-[#AF9662] py-1 ${currentView === 'category' && selectedCategory === cat.key ? 'text-[#AF9662] font-bold' : ''}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="space-y-6 border-t border-[#111111]/8 pt-6">
                <p className="text-xs italic font-serif text-neutral-500">
                  Designing a high-contrast elegant ecosystem for modern luxury fashion.
                </p>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSubscribeOpen(true);
                  }}
                  className="w-full bg-[#111111] text-white text-xs tracking-widest uppercase font-semibold py-3 hover:bg-[#AF9662] transition-all"
                >
                  SUBSCRIBE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE PAGE WRAPPER / STATE SWITCH Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* A. HOMEPAGE VIEW */}
          {currentView === 'home' && (
            <motion.div 
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-fade-in"
            >
                  {/* UNIFIED HERO SLIDESHOW & COUTURE INTELLIGENCE WIRE ZONE */}
              <section id="homepage-editorial-hero" className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-12 relative group/section">
                
                {/* Header for Unified Media Zone */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#111111]/8 pb-4 mb-8">
                  <div>
                    <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#AF9662] font-semibold block mb-1">REAL-TIME COUTURE INTEL</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest text-[#111111]">
                      EDITORIAL WIRE & COVERAGE
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#AF9662] animate-pulse" />
                    <span className="text-[9px] font-mono tracking-widest text-[#AF9662] font-bold uppercase font-sans">
                      AUTO-SYNCING EVERY 10S
                    </span>
                  </div>
                </div>

                {/* Master Responsive Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Main Slideshow Area (Columns 1-9) */}
                  <div className="relative group/main-slideshow xl:col-span-9 flex flex-col justify-between">
                    
                    {/* Visual Navigation Control Arrows floating over slideshow boundary */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIdx(prev => (prev - 1 + featuredSlides.length) % featuredSlides.length);
                      }}
                      className="absolute left-4 top-[40%] md:top-[50%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#AF9662] hover:text-white border border-[#111111]/10 flex items-center justify-center text-[#111111] transition-all duration-300 shadow-md md:opacity-0 md:group-hover/main-slideshow:opacity-100 hover:scale-105"
                      title="Previous Slide"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIdx(prev => (prev + 1) % featuredSlides.length);
                      }}
                      className="absolute right-4 top-[40%] md:top-[50%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#AF9662] hover:text-white border border-[#111111]/10 flex items-center justify-center text-[#111111] transition-all duration-300 shadow-md md:opacity-0 md:group-hover/main-slideshow:opacity-100 hover:scale-105"
                      title="Next Slide"
                    >
                      <ChevronRight size={22} />
                    </button>

                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={featuredArticle.id}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => navigateToArticle(featuredArticle.id)}
                        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 border border-[#111111]/8 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 h-full"
                      >
                        
                        {/* Big Hero Image */}
                        <div className="lg:col-span-8 overflow-hidden relative h-[380px] md:h-[500px] lg:h-[580px]">
                          <img 
                            src={featuredArticle.image} 
                            alt={featuredArticle.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-[2.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-102"
                          />
                          
                          {/* Artistic gradient layer for mobile overlay readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                          
                          {/* Dynamic Label for Overlay */}
                          <div className="absolute bottom-6 left-6 lg:hidden text-white space-y-2 z-10">
                            <span className="bg-[#AF9662]/90 text-white font-sans text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-semibold">
                              FEATURED {featuredArticle.category}
                            </span>
                            <h3 className="font-serif text-xl tracking-normal text-white drop-shadow-sm font-light leading-snug">
                              {featuredArticle.title}
                            </h3>
                          </div>

                          {/* Creative Director Photographer credit banner */}
                          {featuredArticle.photographer && (
                            <div className="hidden lg:block absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 opacity-80">
                              PH: {featuredArticle.photographer}
                            </div>
                          )}
                        </div>

                        {/* Big Hero Text Side Column */}
                        <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between bg-white relative">
                          
                          {/* Top Decorative Meta */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#AF9662]">
                                ★ THE SELECTION
                              </span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(featuredArticle.id, e);
                                }}
                                className="text-[#111111]/50 hover:text-[#AF9662] transition-all p-1 hover:bg-neutral-50 rounded"
                                title="Save story to Cabinet"
                              >
                                <Bookmark size={17} className={bookmarks.includes(featuredArticle.id) ? "fill-[#AF9662] text-[#AF9662]" : ""} />
                              </button>
                            </div>
                            
                            <div className="h-[1px] bg-[#AF9662]/20 w-16" />
                          </div>

                          {/* Editorial Core */}
                          <div className="space-y-5 my-6 lg:my-0">
                            <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#AF9662] font-bold block">
                              {featuredArticle.category} • {featuredArticle.readTime}
                            </span>
                            
                            <h2 className="font-serif text-2xl md:text-3xl lg:text-2xl xl:text-3xl leading-[1.12] tracking-normal text-[#111111] group-hover:text-[#AF9662] transition-colors duration-500 font-light line-clamp-4">
                              {featuredArticle.title}
                            </h2>
                            
                            <p className="text-xs text-neutral-600 tracking-wide leading-relaxed font-sans font-light line-clamp-4">
                              {featuredArticle.excerpt}
                            </p>
                          </div>

                          {/* Footer Row */}
                          <div className="border-t border-[#111111]/8 pt-5">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2.5">
                                <img 
                                  src={featuredArticle.author.avatar} 
                                  alt={featuredArticle.author.name}
                                  referrerPolicy="no-referrer"
                                  className="w-7 h-7 rounded-full object-cover filter grayscale"
                                />
                                <div>
                                  <p className="text-[9px] tracking-wider uppercase font-sans font-semibold text-neutral-800 leading-tight">
                                    {featuredArticle.author.name}
                                  </p>
                                  <p className="text-[8px] uppercase tracking-widest text-[#AF9662] leading-tight font-mono">
                                    {featuredArticle.author.role}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs font-serif text-[#AF9662] tracking-wider font-light group-hover:translate-x-1 transition-transform duration-500">
                                READ PORTAL <ArrowRight size={13} />
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right Sidebar Timeline Index Panel (Columns 10-12) - Desktop Only */}
                  <div className="hidden xl:flex xl:col-span-3 flex-col border border-[#111111]/8 bg-white h-full max-h-[580px] overflow-hidden">
                    <div className="border-b border-[#111111]/8 p-4 bg-[#FAF7F0] flex items-center justify-between">
                      <span className="text-[9px] tracking-[0.2em] font-bold text-neutral-800 uppercase flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#AF9662] animate-pulse" />
                        LATEST MEDIA BRIEF
                      </span>
                      <span className="text-[8px] font-mono bg-[#111111] text-white px-2 py-0.5 tracking-wider uppercase font-bold">
                        INDEX
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-[#111111]/5 scrollbar-thin scrollbar-thumb-neutral-200">
                      {featuredSlides.map((slide, idx) => (
                        <div 
                          key={slide.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIdx(idx);
                          }}
                          className={`p-4 transition-all duration-300 cursor-pointer text-left relative group/wire-item ${currentSlideIdx === idx ? 'bg-[#FAF7F0]' : 'bg-white hover:bg-neutral-50/70'}`}
                        >
                          {currentSlideIdx === idx && (
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#AF9662]" />
                          )}
                          <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-[#AF9662] uppercase mb-1 font-bold">
                            <span>{slide.category}</span>
                            <span className="opacity-70">{idx === 0 ? "10:15 AM MET" : idx === 1 ? "08:30 AM MET" : idx === 2 ? "05:40 AM MET" : idx === 3 ? "YESTERDAY" : `${idx - 2} DAYS AGO`}</span>
                          </div>
                          
                          <h4 className={`font-serif text-[11px] leading-tight mb-1 transition-colors ${currentSlideIdx === idx ? 'text-[#AF9662] font-semibold' : 'text-neutral-900 group-hover/wire-item:text-[#AF9662]'}`}>
                            {slide.title}
                          </h4>
                          <p className="text-[10px] text-neutral-500 font-sans line-clamp-1 font-light">{slide.excerpt}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Mobile/Tablet Ticker Tracker (Horizontal scrolling index of news) */}
                <div className="xl:hidden mt-6">
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400 block mb-2 font-bold uppercase">
                    TOUCH INDEX TO JUMP:
                  </span>
                  <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-neutral-200">
                    {featuredSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlideIdx(idx);
                        }}
                        className={`shrink-0 text-left p-3 border transition-all duration-300 max-w-[260px] flex flex-col justify-between ${currentSlideIdx === idx ? 'bg-[#FAF7F0] border-[#AF9662] ring-1 ring-[#AF9662]' : 'bg-white border-[#111111]/8 hover:border-[#111111]/20'}`}
                      >
                        <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-[#AF9662] uppercase mb-1.5 font-bold w-full">
                          <span>{slide.category}</span>
                          <span className="opacity-60">{idx < 3 ? "NEW" : `${idx}D`}</span>
                        </div>
                        <h4 className="font-serif text-[11px] leading-snug text-neutral-900 line-clamp-2 font-medium">
                          {slide.title}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Unified pagination bullets */}
                <div className="flex justify-center items-center gap-2.5 mt-8 border-t border-[#111111]/5 pt-6">
                  {featuredSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIdx(idx);
                      }}
                      className={`group flex items-center transition-all duration-400 ${currentSlideIdx === idx ? 'px-3' : 'px-1'}`}
                      title={`View Slide ${idx + 1}`}
                    >
                      <span className={`h-1.5 rounded-full transition-all duration-500 ${currentSlideIdx === idx ? 'w-8 bg-[#AF9662]' : 'w-2 bg-neutral-300 group-hover:bg-[#AF9662]/70 hover:scale-110'}`} />
                    </button>
                  ))}
                </div>
              </section>

              {/* SECTION: FEATURED RUNWAY (Elegant editorial horizontal gallery) */}
              <section id="homepage-runway-section" className="bg-[#111111] text-white py-20 overflow-hidden relative">
                {/* Background watermarked text */}
                <div className="absolute right-0 bottom-0 text-[18vh] font-serif font-black text-white/5 tracking-tighter leading-none pointer-events-none select-none uppercase font-light">
                  RUNWAY
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                  
                  <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-[#AF9662] font-semibold block mb-1">FRONT ROW CRITIQUE</span>
                      <h2 className="font-serif text-2xl md:text-4xl font-light uppercase tracking-widest">
                        RUNWAY MOMENTS
                      </h2>
                    </div>

                    <button 
                      onClick={() => navigateToCategory('runway')}
                      className="group flex items-center gap-2 text-xs tracking-widest font-sans font-semibold hover:text-[#AF9662] text-white transition-colors"
                    >
                      EXPLORE ALL SHOWS <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.filter(a => a.category === 'runway' || a.tags?.includes('Runway')).slice(0, 3).map((art, index) => (
                      <div 
                        key={art.id}
                        onClick={() => navigateToArticle(art.id)}
                        className="group cursor-pointer bg-[#1A1A1A] border border-white/10 hover:border-[#AF9662] transition-all duration-500 overflow-hidden"
                      >
                        {/* Dramatic Tall Portrait Aspect Ratio for Models */}
                        <div className="aspect-[3/4] overflow-hidden relative bg-black">
                          <img 
                            src={art.image} 
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-103 opacity-90 group-hover:opacity-100"
                          />
                          
                          {/* Model number watermark mimicking film frames */}
                          <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-white/50 bg-black/40 px-2 py-1 uppercase scale-90">
                            RUNWAY LOOK 0{index + 1}
                          </div>

                          {/* Gradient to hide metadata text overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80" />

                          {/* Hover custom actions */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(art.id, e);
                              }}
                              className="w-8 h-8 rounded-full bg-white text-[#111111] flex items-center justify-center hover:bg-[#AF9662] hover:text-white transition-colors"
                              title="Archive look"
                            >
                              <Bookmark size={14} className={bookmarks.includes(art.id) ? "fill-current" : ""} />
                            </button>
                          </div>

                          {/* Meta Overlay */}
                          <div className="absolute bottom-6 left-6 right-6 space-y-3">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#AF9662] font-semibold">
                              {art.subCategory}
                            </span>
                            <h3 className="font-serif text-lg md:text-xl text-white tracking-normal font-light group-hover:text-[#AF9662] transition-colors leading-snug">
                              {art.title}
                            </h3>
                          </div>
                        </div>

                        {/* Critical commentary box below */}
                        <div className="p-5 space-y-3">
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                            {art.excerpt}
                          </p>
                          <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono tracking-widest py-1 border-t border-white/5">
                            <span>BY {art.author.name.toUpperCase()}</span>
                            <span>{art.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* SECTION: RED CARPET & CAMPAIGNS (Large beautiful side-by-side bento card structure) */}
              <section id="homepage-redcarpet-trends-section" className="bg-[#FCFBF7] py-20 border-t border-[#111111]/10">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Big Panel: Red carpet moments (Columns 1-7) */}
                    <div className="lg:col-span-7 space-y-8">
                      <div className="border-b border-[#111111]/8 pb-4">
                        <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#AF9662] font-semibold block mb-1">COUTURE ARCHIVE IN MOTION</span>
                        <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest">
                          RED CARPET & MOMENTS
                        </h2>
                      </div>

                      {ARTICLES.filter(a => a.category === 'runway').slice(0, 1).map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => navigateToArticle(art.id)}
                          className="group cursor-pointer bg-white border border-[#111111]/8 overflow-hidden"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img 
                              src={art.image} 
                              alt={art.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-102"
                            />
                            <div className="absolute top-4 left-4 bg-[#111111] text-white text-[9px] tracking-widest uppercase px-3 py-1 font-mono font-bold">
                              {art.subCategory}
                            </div>
                          </div>

                          <div className="p-8 space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] tracking-widest font-bold text-[#AF9662] uppercase bg-[#AF9662]/10 px-2.5 py-0.5">
                                HISTORIC COUTURE
                              </span>
                              <span className="text-neutral-300 font-sans text-[10px]">•</span>
                              <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
                                {art.readTime}
                              </span>
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl font-light leading-snug tracking-normal text-[#111111] group-hover:text-[#AF9662] transition-colors duration-300">
                              {art.title}
                            </h3>

                            <p className="text-xs text-neutral-600 leading-relaxed font-light">
                              {art.excerpt}
                            </p>

                            <div className="flex items-center justify-between border-t border-[#111111]/5 pt-5 mt-6">
                              <span className="text-[10px] tracking-widest font-mono text-neutral-400">REPORTED BY: {art.author.name.toUpperCase()}</span>
                              <div className="flex items-center gap-1.5 text-xs font-serif text-[#AF9662] tracking-wider group-hover:translate-x-1 transition-transform">
                                READ PORTFOLIO <ArrowRight size={12} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Bento Panel: TRENDS Forecasts (Columns 8-12) */}
                    <div className="lg:col-span-5 space-y-8">
                      <div className="border-b border-[#111111]/8 pb-4">
                        <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#AF9662] font-semibold block mb-1">FORECAST LABORATORY</span>
                        <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest">
                          TRENDS & FORECASTS
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {ARTICLES.filter(a => a.category === 'trends').slice(0, 2).map((art) => (
                          <div 
                            key={art.id}
                            onClick={() => navigateToArticle(art.id)}
                            className="group cursor-pointer bg-white border border-[#111111]/8 p-6 hover:border-[#AF9662] transition-all flex flex-col md:flex-row gap-6"
                          >
                            <div className="w-full md:w-32 h-32 shrink-0 overflow-hidden relative bg-neutral-100">
                              <img 
                                src={art.image} 
                                alt={art.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              />
                            </div>
                            
                            <div className="flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[9px] uppercase tracking-widest text-[#AF9662] font-semibold font-mono">
                                  {art.subCategory}
                                </span>
                                <h3 className="font-serif text-lg leading-snug group-hover:text-[#AF9662] transition-colors font-medium">
                                  {art.title}
                                </h3>
                                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed mt-1">
                                  {art.excerpt}
                                </p>
                              </div>

                              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#111111] mt-3 block">
                                READ BRIEF {art.readTime}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* Interactive dynamic designer quote box */}
                        <div className="bg-[#FAF7F0] border border-[#AF9662]/20 p-6 relative overflow-hidden">
                          <span className="font-serif text-[120px] text-[#AF9662]/5 absolute -top-12 -left-4 leading-none select-none">“</span>
                          <div className="relative z-10 space-y-3">
                            <span className="text-[9px] tracking-widest uppercase font-mono text-[#AF9662] font-bold block">EDITORIAL QUOTE</span>
                            <p className="font-serif text-base italic text-neutral-800 leading-relaxed font-light">
                              "{featuredArticle.quote || 'True luxury lies in the space between the threads—where the body moves in complete lightness.'}"
                            </p>
                            <div className="text-[10px] tracking-[0.1em] uppercase font-sans font-bold text-neutral-600 text-right">
                              — {featuredArticle.quoteAuthor || 'Sofia van der Post'}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </section>

              {/* SECTION: SUSTAINABILITY & INVESTIGATIONS */}
              <section id="homepage-sustainability-section" className="bg-[#FAF7F0] py-20 border-t border-[#111111]/10">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#111111]/8 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-emerald-800 font-semibold block mb-1">CONSCIOUS FUTURE DISCOURSE</span>
                      <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest">
                        SUSTAINABILITY SOLUTIONS
                      </h2>
                    </div>

                    <button 
                      onClick={() => navigateToCategory('insights')}
                      className="group flex items-center gap-2 text-xs tracking-widest font-sans font-semibold hover:text-emerald-800 transition-colors"
                    >
                      EXPLORE CONSCIOUS INITIATIVES <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {ARTICLES.filter(a => a.category === 'insights').slice(0, 2).map((art) => (
                      <div 
                        key={art.id}
                        onClick={() => navigateToArticle(art.id)}
                        className="group cursor-pointer bg-white border border-[#111111]/8 overflow-hidden hover:border-emerald-800 transition-colors"
                      >
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img 
                            src={art.image} 
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-102"
                          />
                          <div className="absolute top-4 left-4 bg-emerald-900 text-white text-[8px] tracking-widest font-mono uppercase px-2.5 py-1">
                            {art.subCategory}
                          </div>
                        </div>

                        <div className="p-8 space-y-4">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-800 font-mono block">
                            INVESTIGATIVE JOURNALISM • {art.readTime}
                          </span>
                          <h3 className="font-serif text-2xl font-light text-[#111111] group-hover:text-emerald-800 transition-colors leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-xs text-neutral-600 leading-relaxed font-light">
                            {art.excerpt}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-widest text-[#111111] group-hover:translate-x-1 transition-transform pt-4">
                            READ DISCLOSURE <ArrowRight size={12} className="text-emerald-800" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* SECTION: INSIGHTS & INTEL (Luxury Conglomerate and corporate strategies) */}
              <section id="homepage-insights-section" className="bg-[#111111] text-white py-20 relative">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-[#AF9662] font-semibold block mb-1">BUSINESS OF CRAFT</span>
                      <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest">
                        INDUSTRY INSIGHTS
                      </h2>
                    </div>

                    <button 
                      onClick={() => navigateToCategory('insights')}
                      className="group flex items-center gap-2 text-xs tracking-widest font-sans font-semibold hover:text-[#AF9662] text-white transition-colors"
                    >
                      EXPLORE STRATEGY FEED <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Insights Big spotlight */}
                    <div className="lg:col-span-7">
                      {ARTICLES.filter(a => a.category === 'insights').slice(0, 1).map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => navigateToArticle(art.id)}
                          className="group cursor-pointer bg-[#1D1D1D] p-8 md:p-12 border border-white/10 flex flex-col justify-between h-full hover:border-[#AF9662] transition-colors"
                        >
                          <div className="space-y-6">
                            <span className="bg-[#AF9662]/25 text-[#AF9662] font-mono text-[10px] tracking-widest uppercase px-3 py-1 inline-block font-semibold">
                              {art.subCategory}
                            </span>
                            
                            <h3 className="font-serif text-3xl md:text-4xl leading-tight font-light group-hover:text-[#AF9662] transition-colors">
                              {art.title}
                            </h3>

                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                              {art.excerpt}
                            </p>
                          </div>

                          <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-white/5 pt-6 gap-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={art.author.avatar} 
                                alt={art.author.name}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full filter grayscale object-cover border border-white/10"
                              />
                              <div>
                                <span className="text-xs uppercase font-sans tracking-wider block font-semibold">{art.author.name}</span>
                                <span className="text-[10px] text-[#AF9662] tracking-widest uppercase block">{art.author.role}</span>
                              </div>
                            </div>
                            <span className="text-xs tracking-widest font-mono text-neutral-500">{art.readTime} READ</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Conglomerate Indexes overview & brand spotlight quotes */}
                    <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                      
                      <div className="bg-[#1A1A1A] p-6 border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border-b border-white/10 pb-3 text-[#AF9662]">
                          <TrendingUp size={14} /> REVENUE INDEX SNAPSHOT (EUR/CHF)
                        </div>
                        
                        <div className="space-y-3 font-mono text-xs">
                          {MARKET_TICKERS.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 last:pb-0">
                              <div className="flex items-center gap-2">
                                <span className="font-sans font-semibold tracking-wider text-white">{item.brand}</span>
                                <span className="text-[9px] text-neutral-500 uppercase">({item.symbol})</span>
                              </div>
                              <div className="flex items-center gap-4 text-right">
                                <span className="text-neutral-300">{item.price}</span>
                                <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                  {item.change}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#1A1A1A] p-6 border border-white/5 space-y-5">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">WHAT INDUSTRY LEADERS REPORT</span>
                        
                        <div className="space-y-4">
                          {BRAND_MEMBERS.map((item, id) => (
                            <div key={id} className="text-xs border-l-2 border-[#AF9662] pl-3 py-1">
                              <p className="italic text-neutral-300">"{item.quote}"</p>
                              <span className="text-[9px] tracking-widest uppercase font-mono text-[#AF9662] font-semibold mt-1 block">— {item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </section>

              {/* NEWSLETTER SIGNUP ROW */}
              <section id="homepage-newsletter-section" className="bg-[#FCFBF7] border-y border-[#111111]/8 py-16">
                <div className="max-w-[800px] mx-auto px-4 text-center space-y-6">
                  <span className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#AF9662] font-semibold block">LE JOURNAL DES INCLUSIONS</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide uppercase">
                    JOIN THE CHRONICLES
                  </h2>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-[580px] mx-auto font-light">
                    Receive weekly editorial dissections of modern luxury couture developments, seasonal analysis, and critical insights direct to your inbox.
                  </p>

                  <div className="pt-4 max-w-[500px] mx-auto">
                    {newsletterSubscribed ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-zinc-900 text-white rounded-none flex items-center justify-center gap-3"
                      >
                        <Check size={16} className="text-[#AF9662]" />
                        <span className="text-xs uppercase tracking-widest">COUTURE CHRONICLES CONFIGURED. WELCOME.</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                        <input 
                          type="email" 
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="ENTER EMAIL ADDRESS" 
                          className="flex-grow bg-[#FAF7F0] border border-[#111111]/15 px-4 py-3 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-center sm:text-left text-[#111111]"
                        />
                        <button 
                          type="submit"
                          className="bg-[#111111] text-white text-[10px] tracking-[0.25em] font-sans font-semibold uppercase px-8 py-3.5 hover:bg-[#AF9662] transition-all duration-300 shrink-0"
                        >
                          SUBSCRIBE
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* B. IMMERSIVE ARTICLE DETAIL VIEW */}
          {currentView === 'article' && (
            <motion.div 
              key="article-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-[1400px] mx-auto px-4 md:px-8 py-8"
            >
              {/* Back Button and action menu */}
              <div className="flex justify-between items-center mb-8 border-b border-[#111111]/8 pb-4">
                <button 
                  onClick={navigateToHome}
                  className="group flex items-center gap-2 text-xs font-sans font-semibold tracking-widest text-[#111111] hover:text-[#AF9662] transition-colors uppercase"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK TO THE DEBUT
                </button>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleBookmark(activeArticle.id)}
                    className="flex items-center gap-1.5 text-xs font-sans text-neutral-600 hover:text-[#AF9662] transition-colors border border-black/10 px-3 py-1.5 bg-white uppercase tracking-widest"
                  >
                    <Bookmark size={13} className={bookmarks.includes(activeArticle.id) ? "fill-[#AF9662] text-[#AF9662]" : ""} />
                    {bookmarks.includes(activeArticle.id) ? "SAVED" : "ARCHIVE STORY"}
                  </button>

                  <button 
                    onClick={(e) => shareArticle(activeArticle.id, e)}
                    className="flex items-center gap-1.5 text-xs font-sans text-neutral-600 hover:text-[#AF9662] transition-colors border border-black/10 px-3 py-1.5 bg-white uppercase tracking-widest relative"
                  >
                    <Share2 size={13} />
                    {copiedArticleId === activeArticle.id ? "COPIED URL!" : "SHARE STORY"}
                  </button>
                </div>
              </div>

              {/* Large Immersive Article Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                
                {/* Text meta parameters (Columns 1-5) */}
                <div className="lg:col-span-5 flex flex-col justify-between py-4">
                  
                  <div className="space-y-6">
                    <button 
                      onClick={() => navigateToCategory(activeArticle.category)}
                      className="bg-[#111111] hover:bg-[#AF9662] text-white font-sans text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 font-bold transition-all"
                    >
                      {activeCategorySpec.label} // {activeArticle.subCategory}
                    </button>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-4xl xl:text-5xl tracking-normal text-[#111111] leading-[1.12] font-light">
                      {activeArticle.title}
                    </h1>

                    <p className="text-sm md:text-base text-neutral-600 font-sans tracking-wide leading-relaxed font-light italic">
                      "{activeArticle.excerpt}"
                    </p>
                  </div>

                  {/* Author bio specs */}
                  <div className="border-t border-[#111111]/8 pt-6 mt-8">
                    <div className="flex items-center gap-4">
                      <img 
                        src={activeArticle.author.avatar} 
                        alt={activeArticle.author.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full grayscale object-cover"
                      />
                      <div>
                        <p className="text-[10px] tracking-widest text-[#AF9662] uppercase font-bold leading-none mb-1">PUBLICATION AUTHOR</p>
                        <h4 className="font-sans text-xs uppercase font-bold text-neutral-800">{activeArticle.author.name}</h4>
                        <p className="text-[11px] text-neutral-400 font-sans">{activeArticle.author.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-mono text-neutral-400 mt-6 pt-4 border-t border-[#111111]/5">
                      <span>DATE: {activeArticle.date}</span>
                      <span>TIME: {activeArticle.readTime}</span>
                    </div>
                  </div>

                </div>

                {/* Big full screen gorgeous image with camera credit (Columns 7-12) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="h-[400px] md:h-[550px] overflow-hidden bg-neutral-100">
                    <img 
                      src={activeArticle.image} 
                      alt={activeArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeArticle.photographer && (
                    <p className="text-right text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
                      PH: {activeArticle.photographer} FOR THE DEBUT
                    </p>
                  )}
                </div>

              </div>

              {/* Dynamic Beautiful Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
                
                {/* Left side tags & reading parameters (Columns 1-3) */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="sticky top-32 space-y-6">
                    
                    <div className="border-b border-[#111111]/8 pb-4">
                      <h4 className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-bold">STORY CONTEXT</h4>
                      <p className="font-serif text-sm text-neutral-600 italic mt-2">
                        This document belongs to THE Debut’s curated global media network. It emphasizes structural fashion analysis, independent reporting, and artisan preservation.
                      </p>
                    </div>

                    {activeArticle.tags && (
                      <div className="space-y-2">
                        <h4 className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-bold">INDEXED TAGS</h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {activeArticle.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              onClick={() => {
                                setSearchQuery(tag);
                                setIsSearching(true);
                              }}
                              className="cursor-pointer bg-[#FAF7F0] border border-[#111111]/10 px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono text-neutral-600 hover:bg-[#AF9662] hover:text-white hover:border-[#AF9662] transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-[#FAF7F0] p-4 border border-[#AF9662]/20">
                      <p className="text-[10px] uppercase tracking-wider text-[#AF9662] font-bold mb-1">ARCHIVAL RECOGNITION</p>
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                        You can read this and other stories offline by saving them using our built-in archive system. Click the bookmark icon in the header to view your Saved Folder.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Main Read Body (Columns 4-11) */}
                <div className="lg:col-span-8 space-y-6 text-[#111111]">
                  
                  {activeArticle.content.map((paragraph, index) => {
                    // For the first paragraph, apply a luxurious Drop Cap
                    if (index === 0) {
                      const firstLetter = paragraph.charAt(0);
                      const restOfParagraph = paragraph.slice(1);
                      return (
                        <p key={index} className="text-sm md:text-base tracking-wide leading-relaxed font-sans font-light first-letter:float-left first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:font-light first-letter:mr-3 first-letter:mt-1 first-letter:text-[#AF9662]">
                          {restOfParagraph}
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-sm md:text-base tracking-wide leading-relaxed font-sans font-light text-neutral-800">
                        {paragraph}
                      </p>
                    );
                  })}

                  {/* Blockquote Segment (styled beautifully with thick lines) */}
                  {activeArticle.quote && (
                    <blockquote className="my-10 border-y border-[#AF9662]/30 py-8 px-4 text-center space-y-3 relative">
                      <span className="font-serif italic text-2xl md:text-3xl text-neutral-900 font-light block">
                        "{activeArticle.quote}"
                      </span>
                      {activeArticle.quoteAuthor && (
                        <cite className="font-sans text-[10px] tracking-widest font-bold uppercase text-[#AF9662] block">
                          — {activeArticle.quoteAuthor} // ARTISTIC PERSPECTIVE
                        </cite>
                      )}
                    </blockquote>
                  )}

                  {/* Sustainability disclaimer if category matches */}
                  {activeArticle.category === 'sustainability' && (
                    <div className="bg-emerald-50/50 border border-emerald-900/10 p-6 space-y-3 mt-8">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-800 flex items-center gap-1.5 font-sans">
                        🧬 CIRCULARITY MANIFESTO INDEX
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                        This investigational briefing is subjected to rigorous supply chain validation. Our journalists check synthetic textile compositions, workers carbon offsets, and agricultural cooperative land certifications.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Related Articles Segment */}
              <section className="border-t border-[#111111]/10 pt-16 mt-16 bg-[#FAF7F0] -mx-4 md:-mx-8 px-4 md:px-8 pb-10">
                <div className="max-w-[1400px] mx-auto">
                  
                  <div className="flex justify-between items-end mb-10 border-b border-[#111111]/8 pb-4">
                    <h3 className="font-serif text-xl md:text-2xl uppercase tracking-widest font-light">
                      CONTINUE EDITORIAL READING
                    </h3>
                    <button 
                      onClick={navigateToHome}
                      className="text-xs tracking-widest font-semibold uppercase text-[#AF9662] hover:text-[#111111] transition-colors"
                    >
                      SEE HOMEPAGE
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ARTICLES.filter(a => a.id !== activeArticle.id && (a.category === activeArticle.category || a.featured)).slice(0, 3).map((art) => (
                      <div 
                        key={art.id}
                        onClick={() => navigateToArticle(art.id)}
                        className="group cursor-pointer bg-white border border-[#111111]/8 overflow-hidden hover:shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative bg-neutral-100">
                          <img 
                            src={art.image} 
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                          />
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[9px] tracking-widest uppercase font-mono text-[#AF9662] font-semibold">
                              {art.category} • {art.readTime}
                            </span>
                            <h4 className="font-serif text-base text-[#111111] group-hover:text-[#AF9662] transition-colors font-medium leading-snug line-clamp-2">
                              {art.title}
                            </h4>
                          </div>

                          <div className="text-[9px] uppercase tracking-widest text-[#AF9662] mt-4 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                            READ REPORT <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* C. CATEGORY CHRONICLES VIEW */}
          {currentView === 'category' && (
            <motion.div 
              key="category-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-[1400px] mx-auto px-4 md:px-8 py-10"
            >
              {selectedCategory === 'calendar' ? (
                <CalendarView />
              ) : selectedCategory === 'shop' ? (
                <ShopView />
              ) : selectedCategory === 'magazines' ? (
                <MagazinesView />
              ) : (
                <>
                  {/* Category Jumbotron */}
                  <div className="bg-[#111111] text-white p-8 md:p-16 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-[18vh] font-serif font-black text-white/5 tracking-tighter leading-none pointer-events-none uppercase">
                      {activeCategorySpec.key}
                    </div>

                    <div className="max-w-[800px] relative z-20 space-y-4">
                      <button 
                        onClick={navigateToHome}
                        className="text-[10px] tracking-[0.3em] uppercase text-[#AF9662] hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <ArrowLeft size={12} /> THE DEBUT ARCHIVE
                      </button>

                      <h1 className="font-serif text-4xl md:text-6xl font-light tracking-widest uppercase text-white">
                        {activeCategorySpec.label}
                      </h1>

                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
                        {activeCategorySpec.description}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Filter summary */}
                  <div className="flex justify-between items-center border-b border-[#111111]/8 pb-4 mb-10">
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                      {categoryArticles.length} ARTICLES REGISTERED UNDER {activeCategorySpec.label}
                    </span>

                    <div className="flex items-center gap-2 text-xs font-sans text-neutral-400">
                      <Filter size={12} /> <span className="uppercase tracking-widest">FILTER: CHRONOLOGICAL FEED</span>
                    </div>
                  </div>

                  {categoryArticles.length === 0 ? (
                    <div className="text-center py-24 bg-white border border-[#111111]/8">
                      <BookOpen size={48} className="mx-auto text-neutral-300 mb-4" />
                      <h3 className="font-serif text-2xl font-light text-[#111111] uppercase tracking-wider">No articles indexed yet</h3>
                      <p className="text-xs text-neutral-400 mt-2">Our physical editorial team is compiling this catalog right now.</p>
                      <button 
                        onClick={navigateToHome}
                        className="mt-6 bg-[#111111] text-white font-sans text-xs tracking-widest uppercase px-6 py-2.5"
                      >
                        RETURN HOME
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryArticles.map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => navigateToArticle(art.id)}
                          className="group cursor-pointer bg-white border border-[#111111]/8 overflow-hidden flex flex-col justify-between hover:border-[#AF9662] transition-colors"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative bg-neutral-100">
                            <img 
                              src={art.image} 
                              alt={art.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-102"
                            />
                            <div className="absolute top-3 left-3 bg-[#111111] text-white text-[8px] tracking-widest uppercase px-2 py-0.5 font-mono font-semibold">
                              {art.subCategory}
                            </div>
                          </div>

                          <div className="p-6 flex-grow flex flex-col justify-between">
                            <div className="space-y-3">
                              <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-400 font-bold block">
                                {art.date} • {art.readTime}
                              </span>
                              <h3 className="font-serif text-xl text-[#111111] group-hover:text-[#AF9662] transition-colors duration-300 leading-snug font-medium line-clamp-2">
                                {art.title}
                              </h3>
                              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-light mt-2">
                                {art.excerpt}
                              </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#111111]/5 pt-4 mt-6">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={art.author.avatar} 
                                  alt={art.author.name}
                                  referrerPolicy="no-referrer"
                                  className="w-5 h-5 rounded-full grayscale object-cover"
                                />
                                <span className="text-[10px] text-neutral-500 font-semibold uppercase">{art.author.name}</span>
                              </div>

                              <div className="text-[10px] uppercase font-bold tracking-widest text-[#AF9662] group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                                READ <ArrowRight size={10} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. CURATED EDITORIAL FOOTER */}
      <footer id="main-editorial-footer" className="bg-[#111111] text-white pt-20 pb-10 mt-auto border-t border-white/5 relative overflow-hidden">
        
        {/* Subtle decorative geometry background lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#AF9662]/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Logo center section */}
          <div className="text-center pb-12 mb-12 border-b border-white/5">
            <h2 className="font-serif text-4xl md:text-6xl font-semibold tracking-[0.04em] uppercase leading-none mb-3">
              THE DEBUT
            </h2>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/55 leading-none font-sans font-medium">
              Your front row seat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Outward Brand Identity (Cols 1-5) */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="font-serif text-lg tracking-wider font-light text-white uppercase">
                ABOUT THE DEBUT
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                THE Debut is an independent modern luxury fashion journal dedicated to critical journalism, meticulous seasonal runway forecasts, corporate strategy insights, and biological fabric designs. Establishing a digital cathedral of quiet luxury, we avoid temporary marketing fast-fashion buzzwords to deliver heavy, historic prose and timeless aesthetics.
              </p>
              
              <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase font-mono text-[#AF9662] font-bold">
                <a href="#" className="hover:text-white transition-colors">PARIS RUE ST. HONORE</a>
                <a href="#" className="hover:text-white transition-colors">MILANO VIA MONTENAPOLEONE</a>
              </div>

              <div className="flex items-center gap-4 text-neutral-400 pt-3">
                <span className="text-xs tracking-wider uppercase">FOLLOW DIRECTORIES:</span>
                <div className="flex gap-3 text-white text-xs font-mono">
                  <a href="#" className="hover:text-[#AF9662] transition-colors">I.G</a>
                  <span>/</span>
                  <a href="#" className="hover:text-[#AF9662] transition-colors">L.N</a>
                  <span>/</span>
                  <a href="#" className="hover:text-[#AF9662] transition-colors">X.T</a>
                </div>
              </div>
            </div>

            {/* Column 2: Structural Navigation Links (Cols 6-8) */}
            <div className="lg:col-span-3 space-y-6">
              <h4 className="font-serif text-lg tracking-wider font-light text-white uppercase">
                CATEGORIES
              </h4>
              <ul className="space-y-3.5 text-xs text-neutral-400 font-sans tracking-widest font-medium">
                {CATEGORIES.map((cat) => (
                  <li key={cat.key}>
                    <button onClick={() => navigateToCategory(cat.key)} className="hover:text-[#AF9662] transition-colors uppercase">
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Custom mini form for footer (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="font-serif text-lg tracking-wider font-light text-white uppercase">
                RELEASES
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                Secure access to special physical prints, private seasonal trends publications, and VIP runway admissions.
              </p>

              <button 
                onClick={() => setIsSubscribeOpen(true)}
                className="w-full bg-white text-[#111111] text-[11px] tracking-[0.25em] font-sans font-bold uppercase py-3.5 hover:bg-[#AF9662] hover:text-white transition-all duration-300"
              >
                REQUEST PRINT MATTERS
              </button>

              <div className="text-[9px] text-neutral-500 font-mono tracking-wider space-y-1">
                <p>© 2026 THE DEBUT INC. ALL RIGHTS SECURED.</p>
                <p>LICENSED UNDER COUTURE REGISTER MC-91500.</p>
              </div>
            </div>

          </div>

          {/* Lower Copyright alignment banner */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest uppercase font-mono text-neutral-500 gap-4">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-all">TERMS & PRIVACY</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-all">EDITORIAL CHARTER</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-all">ACCESSIBILITY PROTOCOL</a>
            </div>
            <span>DEVELOPED FOR LUXURY PRESS STARTUPS</span>
          </div>

        </div>
      </footer>

      {/* OVERLAY: LUXURED SEARCH MODAL */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            id="search-overlay-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
            className="fixed inset-0 bg-[#111111]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              id="search-panel"
              initial={{ scale: 0.98, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 15 }}
              transition={{ damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FCFBF7] w-full max-w-[850px] p-8 md:p-12 space-y-8 max-h-[90vh] overflow-y-auto"
            >
              
              <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4">
                <span className="font-serif text-lg tracking-widest uppercase text-[#AF9662]">THE DEBUT CATALOG INDEX SEARCH</span>
                <button 
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery('');
                  }}
                  className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Input Form */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="text"
                  autoFocus
                  placeholder="SEARCH RETAIL, RUNWAY, BRANDS, TAGS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF7F0] border-b-2 border-[#111111]/15 focus:border-[#AF9662] py-4 pl-12 pr-4 text-sm tracking-widest font-sans uppercase font-semibold focus:outline-none text-[#111111]"
                />
              </div>

              {/* Recommendations and Quick Tags */}
              <div className="space-y-3">
                <h4 className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase">POPULAR SEARCH CLUSTER INDICES</h4>
                <div className="flex flex-wrap gap-2">
                  {['Minimalism', 'Couture', 'Silent Luxury', 'Met Gala', 'Paris', 'Kelp Fiber', 'Valentino-Rosso', 'Tailoring'].map((tag, i) => (
                    <button 
                      key={i}
                      onClick={() => setSearchQuery(tag)}
                      className="bg-white hover:bg-[#111111] hover:text-white border border-[#111111]/10 px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest text-[#111111] transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live search results counts and display container */}
              <div className="space-y-4 pt-4 border-t border-[#111111]/10">
                <h4 className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                  {searchQuery ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}" (${filteredArticles.length})` : 'PREMIUM ARCHIVE FOCUS'}
                </h4>

                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2">
                  {filteredArticles.map((art) => (
                    <div 
                      key={art.id}
                      onClick={() => navigateToArticle(art.id)}
                      className="group cursor-pointer p-3 hover:bg-[#FAF7F0] border border-[#111111]/5 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest font-mono text-[#AF9662] block">
                          {art.category} • {art.date}
                        </span>
                        <h5 className="font-serif text-base text-[#111111] group-hover:text-[#AF9662] transition-colors leading-snug">
                          {art.title}
                        </h5>
                      </div>

                      <div className="rounded-full w-7 h-7 flex items-center justify-center border border-neutral-200 group-hover:bg-[#111111] group-hover:text-white transition-all shrink-0">
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  ))}

                  {filteredArticles.length === 0 && (
                    <p className="text-center text-xs text-neutral-400 py-10 italic">
                      No documents mapped under that specific criteria index code. Try browsing different tags.
                    </p>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY: LUXURY SUBSCRIPTION MODAL */}
      <AnimatePresence>
        {isSubscribeOpen && (
          <motion.div 
            id="subscribe-overlay-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSubscribeOpen(false)}
            className="fixed inset-0 bg-[#111111]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <motion.div 
              id="subscribe-modal-content"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FCFBF7] border border-[#AF9662]/30 w-full max-w-[600px] p-8 md:p-12 relative shadow-2xl text-center"
            >
              <button 
                onClick={() => setIsSubscribeOpen(false)}
                className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <span className="text-[9px] tracking-[0.45em] uppercase font-sans text-[#AF9662] font-semibold block mb-2">LIMITED ACCESS REQUEST</span>
              
              <h3 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-widest text-[#111111] mb-4">
                THE DEBUT SALON
              </h3>
              
              <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-[450px] mx-auto mb-8 font-light">
                Secure immediate digital access to private runway archives, real-time strategy forecasts, exclusive invite lists, and physical coffee-table prints delivered three times per season.
              </p>

              {modalSubscribed ? (
                <div className="p-6 bg-zinc-900 text-white rounded-none border border-[#AF9662]/30 space-y-3">
                  <Check size={24} className="mx-auto text-[#AF9662]" />
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold">APPLICATION REGISTERED</p>
                  <p className="text-[10px] text-neutral-300">An invitation passcode has been dispatched to your digital address. Welcome to THE Debut Salon.</p>
                </div>
              ) : (
                <form onSubmit={handleModalNewsletterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      required
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="ENTER EMAIL ADDRESS" 
                      className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-4 py-3 text-xs tracking-wider uppercase font-sans text-center focus:outline-none focus:border-[#AF9662] text-[#111111]"
                    />
                    
                    <div className="flex items-center gap-2 justify-center py-2">
                      <input type="checkbox" required id="modal-policy" className="accent-[#AF9662]" />
                      <label htmlFor="modal-policy" className="text-[9px] text-neutral-400 uppercase tracking-widest">
                        I ACCEPT THE EDITORIAL COUTURE PRIVACY ACT
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#111111] text-white text-xs tracking-widest uppercase font-semibold py-4 hover:bg-[#AF9662] transition-colors"
                  >
                    SUBMIT APPLICATION
                  </button>
                </form>
              )}

              <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono mt-8 border-t border-[#111111]/5 pt-6">
                PARIS • MILANO • LONDON • SHANGHAI • TOKYO
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY: ACCOUNT & READING ARCHIVE CABINET DRAWER */}
      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div 
            id="archive-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsArchiveOpen(false)}
            className="fixed inset-0 bg-[#111111]/60 backdrop-blur-sm z-50 flex justify-end"
          >
            <motion.div 
              id="archive-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[500px] h-full bg-[#FCFBF7] p-8 flex flex-col justify-between shadow-2xl border-l border-[#111111]/8 overflow-y-auto text-[#111111]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Title & Close */}
                  <div className="flex justify-between items-center mb-8 border-b border-[#111111]/8 pb-4">
                    <div>
                      <h3 className="font-serif text-xl tracking-widest text-[#AF9662] uppercase leading-none">
                        {userProfile ? "MY ACCOUNT" : "SIGN IN / JOIN"}
                      </h3>
                      <span className="text-[9px] font-mono tracking-widest text-neutral-400 block mt-1 uppercase">
                        {userProfile ? "THE DEBUT MEMBER CABINET" : "ACCESS ELITE ARCHIVE PERKS"}
                      </span>
                    </div>
                    
                    <button onClick={() => setIsArchiveOpen(false)} className="p-1 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-black">
                      <X size={20} />
                    </button>
                  </div>

                  {userProfile ? (
                    /* Elegant Signed In profile dashboard */
                    <div className="space-y-6 mb-8">
                      <div className="bg-[#FAF7F0] border border-[#AF9662]/20 p-6 relative overflow-hidden">
                        <div className="absolute top-2 right-4 text-[9px] font-mono font-bold text-[#AF9662]/40 uppercase tracking-widest">
                          MEMBER ID: #DK-2026
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#111111] text-white font-serif text-lg font-bold flex items-center justify-center border border-[#AF9662]/40">
                            {userProfile.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-serif text-sm text-[#111111] uppercase tracking-[0.1em] font-semibold">{userProfile.name}</h4>
                            <p className="text-xs text-neutral-500 font-sans tracking-tight">{userProfile.email}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-black/5 text-[10px] uppercase font-mono tracking-wider">
                          <div>
                            <span className="text-neutral-400 block text-[8px] tracking-widest">ROLE</span>
                            <span className="text-[#111111] font-semibold">{userProfile.role}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[8px] tracking-widest">ORGANIZATION</span>
                            <span className="text-[#111111] font-semibold">{userProfile.company || 'Atelier Group'}</span>
                          </div>
                        </div>

                        <div className="mt-5 flex justify-end pt-3 border-t border-black/5">
                          <button 
                            onClick={handleLogOut}
                            className="text-[9px] font-mono uppercase tracking-widest text-[#AF9662] hover:text-rose-700 transition-colors flex items-center gap-1.5 font-bold"
                          >
                            <LogOut size={11} /> LOG OUT
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Editorial Sign In Form */
                    <form onSubmit={handleSignIn} className="space-y-4 mb-8 p-5 bg-[#FAF7F0] border border-black/5">
                      <p className="text-[10px] text-neutral-500 tracking-wide uppercase leading-relaxed font-sans mt-1">
                        Please provide your credentials below to instantly authenticate into THE DEBUT's global archive workspace.
                      </p>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={signInName}
                          onChange={(e) => setSignInName(e.target.value)}
                          placeholder="ENTER FULL NAME"
                          className="w-full bg-white border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="E.G., INFO@ATELIER.COM"
                          className="w-full bg-white border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">CURATORIAL ROLE</label>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          {['Press Partner', 'Couture Collector', 'Luxury Advisor', 'Curator'].map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setSignInRole(role)}
                              className={`text-[9px] font-sans font-bold uppercase py-1.5 px-1 border tracking-wider transition-all text-center ${signInRole === role ? 'bg-[#111111] text-white border-black' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'}`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">ORGANIZATION / HOUSE</label>
                        <input
                          type="text"
                          value={signInCompany}
                          onChange={(e) => setSignInCompany(e.target.value)}
                          placeholder="E.G., THE DEBUT BUREAU"
                          className="w-full bg-white border border-[#111111]/15 px-3 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#111111] hover:bg-[#AF9662] text-white text-[10px] tracking-[0.2em] uppercase py-3 font-bold transition-colors mt-3 flex items-center justify-center gap-1.5"
                      >
                        <LogIn size={12} /> AUTHENTICATE ATELIER LOGIN
                      </button>
                    </form>
                  )}

                  {/* bookmarks list inside the drawer */}
                  <div className="space-y-4">
                    <div className="border-t border-[#111111]/8 pt-6">
                      <h4 className="font-serif text-sm tracking-widest text-[#AF9662] font-semibold uppercase leading-none">
                        SAVED COUTURE ARTIFACTS
                      </h4>
                      <p className="text-[9px] font-mono tracking-widest text-neutral-400 block mt-1 uppercase">
                        YOUR READING LIST ({archiveArticles.length})
                      </p>
                    </div>

                    <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-1">
                      {archiveArticles.map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => {
                            navigateToArticle(art.id);
                            setIsArchiveOpen(false);
                          }}
                          className="group cursor-pointer border-b border-[#111111]/5 pb-4 last:border-0 last:pb-0 flex gap-4 items-center"
                        >
                          <div className="w-12 h-12 shrink-0 bg-neutral-150 overflow-hidden relative">
                            <img 
                              src={art.image} 
                              alt={art.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale" 
                            />
                          </div>

                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[8px] text-[#AF9662] font-mono uppercase font-bold tracking-widest">
                                {art.category}
                              </span>
                              
                              <button 
                                onClick={(e) => {
                                  toggleBookmark(art.id, e);
                                }}
                                className="text-neutral-300 hover:text-rose-500 p-0.5 transition-colors"
                                title="Remove item"
                              >
                                <TrashSizeShim size={12} />
                              </button>
                            </div>

                            <h4 className="font-serif text-xs font-medium leading-tight group-hover:text-[#AF9662] transition-colors text-zinc-900 line-clamp-2">
                              {art.title}
                            </h4>
                          </div>
                        </div>
                      ))}

                      {archiveArticles.length === 0 && (
                        <div className="text-center py-10 text-neutral-400 space-y-2">
                          <Bookmark size={24} className="mx-auto text-neutral-300" />
                          <p className="text-xs font-serif italic text-neutral-500">Your profile archive is currently vacant.</p>
                          <p className="text-[9px] uppercase tracking-widest leading-relaxed text-neutral-400">
                            Tag stories across the issue feed with the save icon to preserve them.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {archiveArticles.length > 0 && (
                  <div className="border-t border-[#111111]/8 pt-6 space-y-4 mt-6">
                    <div className="flex justify-between text-xs tracking-wider">
                      <span className="text-neutral-500 uppercase font-mono text-[9px]">TOTAL PRESERVED:</span>
                      <span className="font-bold text-neutral-900 font-mono text-[10px]">{archiveArticles.length} EDITIONS</span>
                    </div>
                    
                    <button 
                      onClick={() => setBookmarks([])}
                      className="w-full border border-neutral-300 text-neutral-500 text-[9px] tracking-widest uppercase py-2.5 hover:text-rose-600 hover:border-rose-400 transition-colors font-mono"
                    >
                      FLUSH ENTIRE READING LOG
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Elegant trash icon shim using X to avoid importing heavy lists or missing imports
function TrashSizeShim({ size }: { size: number }) {
  return (
    <span className="inline-block relative leading-none font-bold uppercase tracking-wider text-[9px] text-neutral-400 hover:text-red-500 hover:scale-105 transition-all">
      [CLEAR]
    </span>
  );
}
