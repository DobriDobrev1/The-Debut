import React, { useState } from 'react';
import { BookOpen, Calendar, MapPin, Sparkles, X, ChevronRight, Eye, Send, ArrowRight, Check } from 'lucide-react';

interface MagazineIssue {
  id: string;
  volume: string;
  seasonText: string;
  title: string;
  description: string;
  pagesCount: number;
  printSpec: string;
  featuredStory: string;
  publishedDate: string;
  coverImage: string;
  prevChapters: { title: string; excerpt: string; page: number }[];
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'issue-4',
    volume: 'VOL. IV // SPRING COMMUNIQUE',
    seasonText: 'Spring/Summer 2026 Issue',
    title: 'The Architecture of Silence & Restraint',
    description: 'An expansive investigation looking at the global deceleration of modern fashion. Celebrating raw textile canvases, Japanese cast armors, and deep structural silence as the sole viable path forward.',
    pagesCount: 280,
    printSpec: 'Gmund cotton feel 160gsm, Offset printed in Bavaria',
    featuredStory: 'Julian Vance and the return to heavy, silent couture silhouettes.',
    publishedDate: 'May 2026 (Current Issue)',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    prevChapters: [
      { title: 'The Post-Work Wardrobe', excerpt: 'How the office uniform dissolved into structural high-molded leather armor harnesses.', page: 24 },
      { title: 'The Silence of Sophia', excerpt: 'Conversations with Sophia Sterling on designing outerwear that stands completely still.', page: 74 },
      { title: 'Botanical Resins', excerpt: 'A deep-dive research index studying light-thermic seaweed fibers processed off Ireland.', page: 130 }
    ]
  },
  {
    id: 'issue-3',
    volume: 'VOL. III // RETREAT & REFLECT',
    seasonText: 'Autumn/Winter 2025 Issue',
    title: 'Monastic Lines & Spatial Draping',
    description: 'Revisiting medieval ecclesiastical garments, sacred vesture, and cloistered silhouettes. Analyzing how luxury houses design heavy-draped shelters against modern digital noise.',
    pagesCount: 310,
    printSpec: 'FSC-Certified silk-soft Munken paper, bound in Milan',
    featuredStory: 'Under undercroft concrete vaults: St-Denis Monastic Runway appraisals.',
    publishedDate: 'November 2025',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    prevChapters: [
      { title: 'Benedictine Cowls', excerpt: 'A mathematical audit of volumetric wool drapes walked under basilica stone basins.', page: 32 },
      { title: 'The Scarce Capital', excerpt: 'Strategy briefs exploring the defense of regional craftsmanship mills by mega-groups.', page: 88 },
      { title: 'Unbleached Flax Linens', excerpt: 'Farming circular cotton alongside heavy traditional flax weaving matrices.', page: 164 }
    ]
  },
  {
    id: 'issue-2',
    volume: 'VOL. II // METALS & METAPHOR',
    seasonText: 'Spring/Summer 2025 Issue',
    title: 'Brutalist Vestments & Cast Armor',
    description: 'Examining the historic friction between fragile textiles and cast-metal shields: Met Gala archival retrospectives, 1950s Dior cocoons, and protective chest closures.',
    pagesCount: 260,
    printSpec: 'Heavy 140gsm Munken offset paper, stitch-bound in Kyoto',
    featuredStory: 'Kyoto steelworks meets Paris Haute Couture: An anatomical study of breastplates.',
    publishedDate: 'May 2025',
    coverImage: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=800',
    prevChapters: [
      { title: 'Cocoon Archeology', excerpt: 'Unearthing pristine Christian Dior double-wool envelopes at secluded estate archives.', page: 18 },
      { title: 'Kyoto Iron Masters', excerpt: 'Molding aluminum sheets to rest softly on skeletal collar joints without heavy hardware.', page: 72 },
      { title: 'Ethereal Netting', excerpt: 'Drifting sail-cloth sheets meets Riviera resort wear along St. Tropez sandbanks.', page: 122 }
    ]
  }
];

export default function MagazinesView() {
  const [activeIssue, setActiveIssue] = useState<MagazineIssue | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPageIndex, setPreviewPageIndex] = useState(0);

  // Form states to order print matters
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderIssue, setOrderIssue] = useState<MagazineIssue | null>(null);
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const triggerOpenPreview = (issue: MagazineIssue) => {
    setActiveIssue(issue);
    setPreviewPageIndex(0);
    setIsPreviewOpen(true);
  };

  const triggerOpenOrder = (issue: MagazineIssue) => {
    setOrderIssue(issue);
    setIsOrderOpen(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderName || !orderEmail) return;
    setOrderSubmitted(true);
    setTimeout(() => {
      setIsOrderOpen(false);
      setOrderSubmitted(false);
      setOrderName('');
      setOrderEmail('');
      setOrderIssue(null);
    }, 3500);
  };

  return (
    <div className="space-y-16">
      
      {/* 1. Header Hero Panel */}
      <div className="bg-[#111111] text-white p-8 md:p-16 relative overflow-hidden border border-[#AF9662]/20">
        <div className="absolute top-0 right-10 text-[20vh] font-serif font-black text-white/5 tracking-tighter leading-none pointer-events-none uppercase">
          PRINT
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#AF9662] font-bold">THE DEBUT PAPER MATTER REGISTER</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest font-light text-white uppercase">
            MAGAZINES & ESSAYS
          </h1>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
            A quiet sanctuary of physical luxury journalism. Released bi-annually, our physical volumes are hand-assembled, printed on Gmund raw-cotton canvas slabs, and devoted to timeless prose, deep structural analysis, and cinematic imagery.
          </p>
        </div>
      </div>

      {/* 2. Highlight Issue Card (Bento Layout) */}
      <div className="border border-[#111111]/8 bg-white p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Cover image (Cols 1-5) */}
          <div className="lg:col-span-5 aspect-[4/5] overflow-hidden bg-neutral-100 border border-[#111111]/10 relative group">
            <img 
              src={MAGAZINE_ISSUES[0].coverImage} 
              alt={MAGAZINE_ISSUES[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-101"
            />
            <div className="absolute bottom-6 left-6 text-white z-10 space-y-1">
              <span className="bg-[#AF9662] text-white text-[8px] font-mono tracking-widest uppercase px-2 py-0.5">CURRENT JOURNAL EDITION</span>
              <h4 className="font-serif text-lg tracking-wide uppercase">{MAGAZINE_ISSUES[0].volume}</h4>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Issue Parameters (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 space-y-8 lg:space-y-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] tracking-widest text-[#AF9662] font-mono font-bold uppercase leading-none block">
                  {MAGAZINE_ISSUES[0].publishedDate} // SPECIFICATION COUTURE REGISTER
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight">
                  {MAGAZINE_ISSUES[0].title}
                </h2>
                <p className="font-sans text-xs text-neutral-400 tracking-wider uppercase leading-none">
                  {MAGAZINE_ISSUES[0].volume}
                </p>
              </div>

              <p className="text-sm text-neutral-600 font-sans tracking-wide leading-relaxed font-light">
                {MAGAZINE_ISSUES[0].description}
              </p>

              <div className="space-y-1 text-xs border-y border-[#111111]/8 py-4 my-2">
                <p className="text-neutral-500 font-sans"><strong className="font-sans text-neutral-800 uppercase tracking-widest mr-2 text-[10px]">VOLUME PAGES:</strong> {MAGAZINE_ISSUES[0].pagesCount} heavyweight offset pages</p>
                <p className="text-neutral-500 font-sans"><strong className="font-sans text-neutral-800 uppercase tracking-widest mr-2 text-[10px]">PRINT MEDIUM:</strong> {MAGAZINE_ISSUES[0].printSpec}</p>
                <p className="text-neutral-500 font-sans"><strong className="font-sans text-neutral-800 uppercase tracking-widest mr-2 text-[10px]">COVER BRIEF:</strong> {MAGAZINE_ISSUES[0].featuredStory}</p>
              </div>

              {/* Curated list of chapters prearranged */}
              <div className="space-y-3 pt-2">
                <p className="text-[9px] tracking-widest text-neutral-400 font-mono font-bold uppercase">VOLUME EXTRACT SECTIONS</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MAGAZINE_ISSUES[0].prevChapters.map((ch, idx) => (
                    <div key={idx} className="bg-[#FAF7F0] border border-black/5 p-3.5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-xs font-semibold uppercase text-[#AF9662]">{ch.title}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">P. {ch.page}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-normal line-clamp-2 font-sans font-light">
                        {ch.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Row */}
            <div className="flex gap-4 pt-6 border-t border-[#111111]/5">
              <button 
                onClick={() => triggerOpenPreview(MAGAZINE_ISSUES[0])}
                className="w-1/2 border border-[#111111]/15 text-neutral-600 font-sans text-xs tracking-widest uppercase py-3.5 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Eye size={14} className="text-[#AF9662]" /> OPEN DIGITAL PREVIEW
              </button>
              <button 
                onClick={() => triggerOpenOrder(MAGAZINE_ISSUES[0])}
                className="w-1/2 bg-[#111111] hover:bg-[#AF9662] text-white text-xs tracking-widest font-sans font-bold uppercase py-3.5 transition-colors"
              >
                REQUEST COMPLEMENTARY PRINT
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Archives Grid: Historical Issues */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl md:text-2xl uppercase tracking-widest font-light border-b border-[#111111]/8 pb-4">
          HISTORICAL PRINT CATALOGS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MAGAZINE_ISSUES.slice(1).map(issue => (
            <div key={issue.id} className="border border-[#111111]/8 bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[#AF9662] transition-colors duration-300">
              
              {/* Cover mini thumbnail */}
              <div className="w-full md:w-36 aspect-[4/5] bg-neutral-100 overflow-hidden border border-black/5 shrink-0">
                <img 
                  src={issue.coverImage} 
                  alt={issue.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brief specification text details */}
              <div className="flex-grow flex flex-col justify-between py-1 space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest text-neutral-400 font-mono leading-none font-bold uppercase block">
                    PUBLISHED: {issue.publishedDate}
                  </span>
                  <h4 className="font-serif text-lg text-neutral-900 leading-tight">
                    {issue.title}
                  </h4>
                  <p className="font-sans text-xs text-[#AF9662] tracking-wider uppercase leading-none">
                    {issue.volume}
                  </p>
                  <p className="text-xs text-neutral-500 font-sans line-clamp-3 leading-relaxed font-light pt-1">
                    {issue.description}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={() => triggerOpenPreview(issue)}
                    className="w-1/2 border border-[#111111]/15 text-neutral-600 font-sans text-[10px] tracking-widest uppercase py-2 hover:bg-neutral-100 transition-colors"
                  >
                    DIGITAL PREVIEW
                  </button>
                  <button 
                    onClick={() => triggerOpenOrder(issue)}
                    className="w-1/2 bg-[#111111] text-white font-sans text-[10px] tracking-widest uppercase py-2 hover:bg-[#AF9662] transition-colors font-semibold"
                  >
                    ACQUIRE ISSUE
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 4. Reading Room Overlay: Immersive double-column book layout */}
      {isPreviewOpen && activeIssue && (
        <div className="fixed inset-0 bg-[#111111]/95 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-[#FCFBF7] border border-[#AF9662]/30 w-full max-w-4xl p-6 md:p-12 space-y-8 relative max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center border-b border-[#111111]/10 pb-4">
              <div className="space-y-0.5">
                <span className="text-[9px] tracking-widest text-[#AF9662] font-mono font-bold uppercase block leading-none">
                  THE DEBUT ARCHIVE DIGITAL READING ROOM
                </span>
                <p className="font-serif text-sm text-neutral-900 uppercase">
                  {activeIssue.volume} // SIMULATED ESSAY EXTRACT
                </p>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Simulated Dual-Column Page layouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-[#111111]">
              
              {/* Left Column (Core Theory) */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold leading-snug border-b border-[#111111]/5 pb-2 text-neutral-900">
                  SECTION I. THE CRISIS OF COMMERCE & THE RISE OF THE REVOLT
                </h3>
                <p className="text-xs md:text-sm leading-relaxed font-sans font-light text-neutral-700 first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:text-[#AF9662] first-letter:mr-2.5 first-letter:mt-1">
                  he absolute state of global high luxury fashion has reached its physical limits. In an age where digital feeds recycle trends in sub-forty-second frames, true aesthetic merit cannot establish foothold. Rather, holding groups are forced into a toxic acceleration curve, exhausting resources, land-stocks, and historical mills simply to generate rapid hyper-volume accessories.
                </p>
                <p className="text-xs md:text-sm leading-relaxed font-sans font-light text-neutral-700">
                  Our journalists trace this paradigm shift. From Florence leather houses to Kyoto iron furnaces, specialized creators are shutting out the noise. We explore how physical structures—molded collars, sand-cast breastplates, and un-dyed baby cashmeres—represent personal barricures.
                </p>
                <div className="bg-[#FAF7F0] p-4 border border-[#AF9662]/20 italic text-xs text-neutral-600 font-serif">
                  "It is easy to craft a screen-optimized silhouette. It demands absolute historical commitment to weave threads that stand completely silent."
                </div>
              </div>

              {/* Right Column (Material Science Analysis) */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold leading-snug border-b border-[#111111]/5 pb-2 text-neutral-900">
                  SECTION II. REGENERATIVE TEXTILE MATRICES & SILENT HEMS
                </h3>
                <p className="text-xs md:text-sm leading-relaxed font-sans font-light text-neutral-700">
                  Moving beyond basic organic linen certification, current research directions embrace aquatic matrices. Off the cold shores of Ireland, engineers process organic seaweed kelp on modular ocean ropes into a resilient fiber holding natural cellulose-silk sheen.
                </p>
                <p className="text-xs md:text-sm leading-relaxed font-sans font-light text-neutral-700">
                  This oceanic gel requires zero fresh irrigation water, zero inputs, and actively absorbs oceanic carbon load while growing. atelier houses utilize this yarn—named Pelagia Silk—to build heavy cascading evening cloaks that flow like fluid pools in transit.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono uppercase text-neutral-400 border-t border-[#111111]/5 pt-4">
                  <p>REPORT INDEX: #AT-091</p>
                  <p className="text-right">DATE SECURED: MAY 2026</p>
                </div>
              </div>

            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center border-t border-[#111111]/8 pt-6">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                DIGITAL REPRODUCTION LICENSED BY THE DEBUT MC-91500
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="bg-[#111111] hover:bg-[#AF9662] text-white text-[10px] tracking-[0.2em] font-sans font-bold uppercase px-6 py-2.5 transition-colors"
              >
                CLOSE PREVIEW ROOM
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Luxury complementary print order modal */}
      {isOrderOpen && orderIssue && (
        <div className="fixed inset-0 bg-[#111111]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-[#FCFBF7] border border-[#AF9662]/30 w-full max-w-md p-8 md:p-10 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2 text-center">
              <span className="text-[9px] tracking-widest text-[#AF9662] font-mono leading-none font-bold uppercase block">
                COMPLEMENTARY KEEPSAKE PRINT ACQUISITION
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 uppercase tracking-wide">
                SECURE PRINT ACCESS
              </h3>
              <p className="text-[11px] font-sans text-neutral-500 uppercase tracking-widest">
                {orderIssue.volume}
              </p>
            </div>

            <div className="p-4 bg-amber-50/50 border border-[#AF9662]/25 font-sans leading-normal">
              <p className="text-[10px] text-[#AF9662] uppercase tracking-wider font-semibold">
                🔒 PRINT AUDITS & SHIPPING VERIFICATION
              </p>
              <p className="text-[10px] text-neutral-500 tracking-wide mt-1">
                Print runs of THE DEBUT are limited. Complementary copies are prioritized to industry insiders, luxury strategy researchers, and registered archival partners.
              </p>
            </div>

            {orderSubmitted ? (
              <div className="space-y-4 text-center py-6 text-[#111111]">
                <div className="w-12 h-12 bg-zinc-900 border border-[#AF9662] rounded-full flex items-center justify-center mx-auto text-[#AF9662]">
                  <Check size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-neutral-800">
                    PRINT REQUEST SECURED
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                    Request validated successfully. Check your digital mail coordinates. Our distribution officer will confirm shipment numbers details within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    placeholder="ENTER FULL NAME"
                    className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-4 py-2.5 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">SHIPPING COUTURE EMAIL</label>
                  <input
                    type="email"
                    required
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                    placeholder="E.G., VISUALS@ATELIER.COM"
                    className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-4 py-2.5 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOrderOpen(false)}
                    className="w-1/2 border border-[#111111]/15 text-neutral-600 font-sans text-[10px] tracking-widest uppercase py-3 font-semibold hover:bg-neutral-100 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#111111] text-white font-sans text-[10px] tracking-widest uppercase py-3 font-bold hover:bg-[#AF9662] transition-colors"
                  >
                    SUBMIT REQUEST
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
