import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Search, SlidersHorizontal, CheckCircle2, UserCheck, Clock, Check } from 'lucide-react';

interface ShowEvent {
  id: string;
  season: string;
  brand: string;
  date: string;
  time: string;
  location: string;
  city: 'PARIS' | 'MILAN' | 'TOKYO' | 'NEW YORK';
  tier: 'Haute Couture' | 'Ready-To-Wear' | 'Special Exhibition' | 'Resort';
  notes: string;
}

const EVENTS_DATABASE: ShowEvent[] = [
  {
    id: 'ev-1',
    brand: 'Maison Valentino-Rosso (Julian Vance Inaugural)',
    season: 'S/S 2027 Ready-To-Wear',
    date: 'Sept 18, 2026',
    time: '18:00 CEST',
    location: 'Palazzo Reale, Milano',
    city: 'MILAN',
    tier: 'Ready-To-Wear',
    notes: 'The highly anticipated debut of Julian Vance since leaving Bottega Veneta. Heavy focus on classical tailoring.'
  },
  {
    id: 'ev-2',
    brand: 'Pelagia Kelp Silk Showcase',
    season: 'Circular Couture Initiatives',
    date: 'Sept 25, 2026',
    time: '11:00 CEST',
    location: 'Jardin des Plantes Greenhouse, Paris',
    city: 'PARIS',
    tier: 'Special Exhibition',
    notes: 'Presenting 100% seaweed-based and kelp-knitted biodegradable eveningwear developed in western Ireland.'
  },
  {
    id: 'ev-3',
    brand: 'Maison de l\'Architecture d\'Or',
    season: 'Autumn/Winter Haute Couture',
    date: 'Sept 26, 2026',
    time: '14:30 CEST',
    location: 'Basilica Concrete Arches, Paris Saint-Denis',
    city: 'PARIS',
    tier: 'Haute Couture',
    notes: 'A monastic-inspired runway set in cathedral ruins with slow-tempo live cello score.'
  },
  {
    id: 'ev-4',
    brand: 'Tokyo Lab - The Brutal Armor Show',
    season: 'A/W 2027 Avant-Garde',
    date: 'Oct 14, 2026',
    time: '20:00 JST',
    location: 'Ginza Vaults Underground, Tokyo',
    city: 'TOKYO',
    tier: 'Ready-To-Wear',
    notes: 'Showcasing hand-shaped metal harnesses and structures from Kyoto steel artists.'
  },
  {
    id: 'ev-5',
    brand: 'Minimalist Restraint: Sophia Sterling Solo',
    season: 'S/S 2027 Ready-To-Wear',
    date: 'Oct 01, 2026',
    time: '16:00 CEST',
    location: 'Carrousel du Louvre, Paris',
    city: 'PARIS',
    tier: 'Ready-To-Wear',
    notes: 'Zero-embellishment tailored jackets and organic unbleached canvas outerwear.'
  },
  {
    id: 'ev-6',
    brand: 'Resort 2028: Mediterranean Sands',
    season: 'Resort Collectives',
    date: 'Nov 04, 2026',
    time: '13:00 EST',
    location: 'Chelsea Highline Glasshouse, New York',
    city: 'NEW YORK',
    tier: 'Resort',
    notes: 'Exploring sustainable Riviera lifestyle elements and coastal organic sail-cloth drapes.'
  },
  {
    id: 'ev-7',
    brand: 'Loro Piana x THE Debut private tasting',
    season: 'Archival Materials Forum',
    date: 'Dec 10, 2026',
    time: '15:00 CEST',
    location: 'Rue Saint-Honoré Atelier, Paris',
    city: 'PARIS',
    tier: 'Special Exhibition',
    notes: 'Special tactile presentation of un-dyed baby cashmere fibers sourced exclusively from Inner Mongolia.'
  }
];

export default function CalendarView() {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive state for RSVP modal
  const [rsvpShow, setRsvpShow] = useState<ShowEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    return EVENTS_DATABASE.filter(ev => {
      const matchesCity = selectedCity === 'ALL' || ev.city === selectedCity;
      const matchesTier = selectedTier === 'ALL' || ev.tier === selectedTier;
      
      const searchStr = `${ev.brand} ${ev.season} ${ev.location} ${ev.city}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
      
      return matchesCity && matchesTier && matchesSearch;
    });
  }, [selectedCity, selectedTier, searchQuery]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) {
      setRsvpError('All credential fields are required.');
      return;
    }
    setRsvpSubmitted(true);
    setRsvpError('');
    setTimeout(() => {
      // Clear forms
      setRsvpShow(null);
      setRsvpSubmitted(false);
      setRsvpName('');
      setRsvpEmail('');
    }, 3500);
  };

  return (
    <div className="space-y-12">
      {/* 1. Header Hero Panel */}
      <div className="bg-[#111111] text-white p-8 md:p-16 relative overflow-hidden border border-[#AF9662]/20">
        <div className="absolute top-0 right-10 text-[20vh] font-serif font-black text-white/5 tracking-tighter leading-none pointer-events-none uppercase">
          CALENDAR
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#AF9662] font-bold">THE DEBUT EDITORIAL DESK</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest font-light text-white uppercase">
            CALENDAR 2026/27
          </h1>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
            An audited schedule of primary luxury showcases, organic material debuts, and corporate alliances. Access credentials, location guidelines, and press seating RSVP protocols.
          </p>
        </div>
      </div>

      {/* 2. Interactive Navigation Filters & Search bar (Bento styled grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#111111]/8 p-6">
        
        {/* City Filter Selection */}
        <div className="lg:col-span-4 space-y-2.5">
          <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold block">FILTER BY PLATFORM CITY</label>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'PARIS', 'MILAN', 'TOKYO', 'NEW YORK'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider border transition-colors ${selectedCity === city ? 'bg-[#111111] text-white border-[#111111]' : 'border-[#111111]/10 text-neutral-600 hover:border-black'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Category Classification Selection */}
        <div className="lg:col-span-4 space-y-2.5">
          <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold block">SHOWCASE TIER</label>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'Haute Couture', 'Ready-To-Wear', 'Special Exhibition', 'Resort'].map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider border transition-colors ${selectedTier === tier ? 'bg-[#111111] text-white border-[#111111]' : 'border-[#111111]/10 text-neutral-600 hover:border-black'}`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Schedule Search input */}
        <div className="lg:col-span-4 space-y-2.5 flex flex-col justify-end">
          <label className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold block">SEARCH CALENDAR ENTRIES</label>
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH BRAND, VENUE, OR NOTES"
              className="w-full bg-[#FAF7F0] border border-[#111111]/15 pl-9 pr-4 py-2 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
            />
          </div>
        </div>

      </div>

      {/* 3. Event List (High-contrast editorial grid) */}
      <div className="space-y-6">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 border border-[#111111]/8 bg-white max-w-full">
            <p className="text-sm font-sans text-neutral-500 uppercase tracking-widest">No scheduled showcases meet your selection criteria</p>
            <button 
              onClick={() => { setSelectedCity('ALL'); setSelectedTier('ALL'); setSearchQuery(''); }}
              className="mt-4 bg-[#111111] text-white font-sans text-[10px] tracking-widest uppercase px-6 py-2.5 font-bold hover:bg-[#AF9662] transition-colors"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredEvents.map(ev => (
              <div 
                key={ev.id}
                className="group bg-white border border-[#111111]/8 hover:border-[#AF9662] transition-colors duration-300 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Meta Details */}
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 font-medium">
                      {ev.city}
                    </span>
                    <span className="border border-[#111111]/10 text-neutral-500 text-[9px] font-sans tracking-widest uppercase px-2.5 py-0.5">
                      {ev.tier}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono tracking-normal">
                      {ev.date} // {ev.time}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-neutral-900 group-hover:text-[#AF9662] transition-colors leading-snug">
                      {ev.brand}
                    </h3>
                    <p className="font-sans text-xs text-[#AF9662] tracking-wider uppercase leading-none">
                      {ev.season}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-neutral-500 max-w-xl font-light leading-relaxed">
                    {ev.notes}
                  </p>
                </div>

                {/* Vertical Separator and interactive action */}
                <div className="flex flex-col md:items-end justify-between self-stretch pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#111111]/8 md:pl-8 shrink-0 space-y-4 md:space-y-0 text-left md:text-right">
                  <div className="space-y-1">
                    <div className="text-[9px] tracking-widest text-neutral-400 font-mono flex items-center md:justify-end gap-1.5">
                      <MapPin size={11} className="text-[#AF9662]" /> VENUE SECURED
                    </div>
                    <p className="font-sans text-xs text-neutral-800 font-medium">
                      {ev.location}
                    </p>
                  </div>

                  <button
                    onClick={() => setRsvpShow(ev)}
                    className="bg-[#111111] hover:bg-[#AF9662] text-white text-[10px] tracking-[0.2em] font-sans font-bold uppercase px-6 py-3 transition-colors duration-300 w-full md:w-auto"
                  >
                    REQUEST PRESS RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Luxury RSVP Overlay Modal */}
      {rsvpShow && (
        <div className="fixed inset-0 bg-[#111111]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-[#FCFBF7] border border-[#AF9662]/30 w-full max-w-lg p-8 md:p-10 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2 text-center">
              <span className="text-[9px] tracking-widest text-[#AF9662] font-mono leading-none font-bold uppercase block">
                PRESS SEATING ACCREDITATION
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 uppercase tracking-wide">
                THE DEBUT FRONT ROW DIRECTORY
              </h3>
              <p className="text-[11px] font-sans text-neutral-500 uppercase tracking-widest">
                {rsvpShow.brand} // {rsvpShow.city}
              </p>
            </div>

            <div className="p-4 bg-amber-50/50 border border-[#AF9662]/25">
              <p className="text-[10px] text-[#AF9662] leading-relaxed uppercase tracking-wider font-semibold">
                ⚠️ LIMITED JOURNAL DESK ACCESS
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-1 font-sans">
                Seating coordinates are strictly audited. Approved media representives receive standard invitation tokens, official visual reference packs, and post-show interviews.
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="space-y-4 text-center py-6 text-[#111111]">
                <div className="w-12 h-12 bg-zinc-900 border border-[#AF9662] rounded-full flex items-center justify-center mx-auto text-[#AF9662]">
                  <Check size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-neutral-800">
                    RSVP PROPOSAL SECURED
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                    Check your digital mailbox. Our Bureau Coordinator will verify your publication credentials index within 12 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                {rsvpError && (
                  <p className="text-xs text-rose-600 uppercase tracking-widest text-center font-mono font-bold">
                    {rsvpError}
                  </p>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="ENTER FULL NAME"
                    className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-4 py-2.5 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400 font-bold block">CORPORATE / PRESS MAILBOX</label>
                  <input
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    placeholder="E.G., AUTHOR@THEIMPRESSION.COM"
                    className="w-full bg-[#FAF7F0] border border-[#111111]/15 px-4 py-2.5 text-xs tracking-wider uppercase font-sans focus:outline-none focus:border-[#AF9662] text-[#111111]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setRsvpShow(null)}
                    className="w-1/2 border border-[#111111]/15 text-neutral-600 font-sans text-[10px] tracking-widest uppercase py-3 font-semibold hover:bg-neutral-100 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#111111] text-white font-sans text-[10px] tracking-widest uppercase py-3 font-bold hover:bg-[#AF9662] transition-colors"
                  >
                    REQUEST ACCESS
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
