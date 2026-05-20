import { Article, CategorySpec } from './types';

export const CATEGORIES: CategorySpec[] = [
  {
    key: 'news',
    label: 'NEWS',
    description: 'Real-time reporting on the shifting terrains of global luxury, executive appointments, and creative director maneuvers.',
    editorialAccent: 'text-zinc-950 font-serif'
  },
  {
    key: 'insights',
    label: 'INSIGHTS',
    description: 'Strategic market-intelligence on regional growth spikes, luxury conglomerate mergers, and retail architecture evolutions.',
    editorialAccent: 'text-neutral-900 font-serif'
  },
  {
    key: 'magazines',
    label: 'MAGAZINES',
    description: 'Printed and digital issues of THE DEBUT. Architectural layouts, heavy editorial essays, and high-fashion collections in print format.',
    editorialAccent: 'text-stone-900 font-serif'
  },
  {
    key: 'runway',
    label: 'RUNWAY',
    description: 'Front-row critical appraisals of Haute Couture, Ready-To-Wear, and groundbreaking digital and physical showcases.',
    editorialAccent: 'text-amber-950 font-serif'
  },
  {
    key: 'trends',
    label: 'TRENDS',
    description: 'Systematic visual analysis and forecasts parsing macro-cultural behaviors and the silhouettes defining today.',
    editorialAccent: 'text-slate-950 font-serif'
  },
  {
    key: 'calendar',
    label: 'CALENDAR',
    description: 'The official Haute Couture and Ready-To-Wear schedules for Paris, Milan, New York, and Tokyo, including immersive events.',
    editorialAccent: 'text-zinc-900 font-serif'
  },
  {
    key: 'shop',
    label: 'SHOP',
    description: 'Curated luxury collectibles, bespoke leather accessory harnesses, custom unbleached flax linens, and exclusive printed archive editions.',
    editorialAccent: 'text-neutral-950 font-serif'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'magazines',
    title: 'The Architecture of Silence: Inside The New Era of Minimalist Restraint',
    excerpt: 'In an epoch of constant digital clamor, contemporary design houses are finding sanctuary in the absolute quietude of sculptural linens, unbleached silks, and radical sartorial restraint.',
    content: [
      'The current state of global high fashion is a study in friction. As algorithmic noise reaches a deafening peak, a rare, quiet pocket of the industry is opting out of the spectacle. Instead, they are finding strength in architectural silence: tailoring that requires a second glance, textures that whisper rather than scream, and structural details that exist purely for the wearers intimate experience.',
      'From Paris to Tokyo, designers are peeling back the protective wallpaper of excessive logomania. What is left is a stunningly direct language. Sculptural drapes in organic unbleached canvas, coats built with the structural precision of brutalist architecture, and clean tailored edges that float with an otherworldly grace in movement.',
      '“It is easy to make a loud noise,” remarks creative director Sophia Sterling. “It takes a lifetime of courage to produce a garment that stands completely still in a crowded room and command absolute focus.” This season, we look at the leaders of this quiet revolution and analyze how they are restructuring the luxury experience by designing for quiet, meditative moments.'
    ],
    author: {
      name: 'Sofia van der Post',
      role: 'Editorial Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    photographer: 'Alistair Cole',
    featured: true,
    subCategory: 'Seasonal Narratives',
    tags: ['Minimalism', 'Couture', 'Silent Luxury', 'Tailoring'],
    quote: 'True luxury lies in the space between the threads—where the body moves in complete lightness without the burden of pretense.',
    quoteAuthor: 'Sophia Sterling'
  },
  {
    id: 'art-2',
    category: 'news',
    title: 'Phoebe Philo Alum Named Creative Director of Historic Italian Couture House',
    excerpt: 'In a seismic shift for the Milanese house, a quiet visionary steps from the shadows of French luxury backrooms to redefine modern Italian heritage.',
    content: [
      'The speculation is officially over. This morning, modern heritage monolith Maison Valentino-Rosso announced the appointment of Julian Vance as its new Artistic Director. Vance, most recognizable for his transformative decade alongside Phoebe Philo and his quiet, intellectual work at Bottega Veneta, represents a return to classical, sophisticated, high-investment wardrobe curation.',
      'The appointment marks a dramatic departure from the logo-driven streetwear alignments that defined the preceding five years. Vance is widely celebrated for his masterly handle on fluid fabrications, structural shoulders, and deep, poetical color palettes of charcoal, dried sage, and sun-baked earth.',
      'His inaugural collection is scheduled for September during Milan Fashion Week. Insiders suggest he has already closed down several loud auxiliary lines to centralize attention on bespoke eveningwear and the houses legendary, historical ready-to-wear silhouettes.'
    ],
    author: {
      name: 'Marc Dupond',
      role: 'Senior Fashion Reporter',
      avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 19, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Marta Rossi',
    subCategory: 'Industry Moves',
    tags: ['Appointments', 'Valentino-Rosso', 'Creative Directors', 'Milan']
  },
  {
    id: 'art-3',
    category: 'runway',
    title: 'Drape and Devotion: The Haunting Monastic Lines of the Fall/Winter Collection',
    excerpt: 'Set against the damp concrete arches of a suburban Parisian basilica, the collection recontextualized sacred historical silhouettes for the secular modern age.',
    content: [
      'Under cold dripping stone and the soft drone of medieval cello suites, the Autumn/Winter collection unfolded as a spiritual encounter. The visual language was austere, referencing Benedictine habits and ecclesiastical wraps but reinterpreted in heavy, cascading double-faced cashmere and silk gabardine.',
      'High cowls that mask the neck entirely, wrap-around belts reminiscent of monks cords, and structured floor-grazing overcoats walked the damp concrete floor with cathedral authority. Color stayed strictly to monastic cream, raw slate gray, carbon black, and a solitary flash of medieval cardinal red.',
      'While the severity was palpable, the drape offered an incredibly soft counterweight. Soft gathered backs on tailored wool jackets moved like fluid liquid, highlighting a sophisticated approach to volume and proportion that will define the tailoring conversations for months to come.'
    ],
    author: {
      name: 'Elena Rostova',
      role: 'Chief Runway Critic',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Jean-Pierre Laurent',
    subCategory: 'Paris Haute Couture',
    tags: ['Paris F/W', 'Monastic', 'Cashmere', 'Draping'],
    quote: 'We wanted to evoke the feeling of stepping out of the modern digital storm and entering a quiet cathedral built of heavy wool.'
  },
  {
    id: 'art-4',
    category: 'runway',
    title: 'Rare Archival Dior and Bespoke Brutalist Armor Win the Met Gala Screen',
    excerpt: 'As fashion luminaries gathered under the theme of "Heavy Glass and Light Thread," ancient textiles and metallic armor stole the visual discourse.',
    content: [
      'The Met Gala continues to serve as the ultimate playground for sculptural, gravity-defying, historical curation. This year, the red carpet was polarized between the ethereal, weightless poetry of vintage lace and the rigid defense of brutalist metallic armor.',
      'Standout moments included a pristine 1952 Christian Dior cocoon coat retrieved from the archives of a private European estate, styled with minimal jewelry and a raw, architectural swept-back hairstyle. On the opposite side of the spectrum, high-polished silver armor chest plates hand-forged by Japanese sculpture artists paired with dramatic silk organza train closures.',
      'These choices signify a larger cultural trend: red carpet dressing is moving away from the simple, hyper-glamourous commercial gown and entering the territory of museum-grade, protective, and performative art assets.'
    ],
    author: {
      name: 'Aiden Montgomery',
      role: 'Red Carpet Editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Christopher Wilde',
    subCategory: 'Gala Review',
    tags: ['Met Gala', 'Christian Dior', 'Archival Fashion', 'Sculptural']
  },
  {
    id: 'art-5',
    category: 'trends',
    title: 'Deconstructing the Sculptured Leather Collar: A New Armor for the Post-Work World',
    excerpt: 'No longer confined to traditional outerwear, deep-molded leather neck pieces and starched leather collars emerge as the defining standalone garment of 2026.',
    content: [
      'We are witnessing a fascinating mutation of office tailoring. The soft, breathable lapels of traditional casual suits are being replaced by high-sculpted, deep-molded leather collars that frame the face with strict, military-like precision.',
      'This trend, gaining high-fashion momentum from Milan to London, abstracts the collar from the coat. Molded individually using vegetable-tanned Italian leathers, these accessory harnesses are layered over delicate sheer silk blouses or sheer knit shirts, building a beautiful contrast of fragile vs. indestructible.',
      'Visually provocative yet surprisingly wearable, the sculpted collar represents a physical reinforcement of personal boundary. It is professional armor designed for an era where the boundary between work, digital self-presentation, and personal sanctuary has been permanently erased.'
    ],
    author: {
      name: 'Clara Sterling',
      role: 'Fashion Trend forecaster',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Alistair Cole',
    subCategory: 'Silhouette Analysis',
    tags: ['Leather Couture', 'Post-Work Tailoring', 'Sartorial Trends']
  },
  {
    id: 'art-6',
    category: 'insights',
    title: 'The Algae Weavers: Harvesting High Fashion from Regenerative Aquatic Kelp',
    excerpt: 'How a tiny maritime cooperative off the coast of Ireland is supplying Paris couture houses with biodegradable, shimmering liquid-like ocean yarn.',
    content: [
      'In a remote coastal inlet in western Ireland, sea-farmers and textile scientists are growing the future of Haute Couture on floating kelp ropes. This aquatic kelp, harvested in harmony with local marine lifecycles, is processed without toxic chemicals into a shimmering, resilient filament known as Pelagia Silk.',
      'The yarn holds a striking natural luster, mimicking the behavior and fluid glide of traditional silk organza, yet it requires zero fresh water, zero pesticides, and zero land resources to cultivate. Furthermore, it absorbs carbon and nitrogen directly from the sea as it grows.',
      'This carbon-negative textile made its initial runway debut last month in a stunning sheer, wet-look gown crafted by a premier French atelier. The industry is watching closely. Major conglomerates have already committed to initial funding to expand these offshore algae farms into a commercial-scale circular manufacturing pipeline.'
    ],
    author: {
      name: 'Niall O’Connor',
      role: 'Sustainability Specialist',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 08, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Fiona Kelly',
    subCategory: 'Materials Evolution',
    tags: ['Kelp Fiber', 'Marine Bio-tech', 'Paris Couture', 'Circular Luxury']
  },
  {
    id: 'art-7',
    category: 'insights',
    title: 'Mergers and Metaphor: The Slow-Fashion Consolidation of High Luxury Capital',
    excerpt: 'Why the worlds formidable luxury conglomerates are shifting capital away from rapid hyper-volume sub-brands to invest in ultra-exclusive bespoke craftsmanship shops.',
    content: [
      'For over three decades, the corporate playbook of luxury conglomerates was centered around aggressive expansion: scale up production, democratize entry-level luxury products, and generate massive volume. However, the first quarter of 2026 signals a definitive, generational pivot.',
      'New financial disclosures reveal a severe cooling in entry-tier accessory segments, whilst high-net-worth bespoke divisions saw a record surge of 32% year-on-year. In response, holding groups are consolidating, acquiring ancient independent family-owned weaving mills, leather tanneries, and custom metal workshops.',
      'This is a defensive yet brilliant move. By centralizing control over the rare physical materials and traditional artisans that make true luxury possible, these conglomerates are building an impenetrable wall around ultra-luxury. The future of luxury is no longer about high-volume distribution; it is about absolute scarcity.'
    ],
    author: {
      name: 'Leonard Sterling',
      role: 'Bureau Chief, Fashion & Business',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 05, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Marc Dupond',
    subCategory: 'Corporate Strategy',
    tags: ['Acquisitions', 'Market Intelligence', 'Craft Preservation', 'Luxury Conglomerates']
  },
  {
    id: 'art-8',
    category: 'magazines',
    title: 'Echoes of the Atelier: Photog Hedi Shlansky Captures the Solitude of Fitting Rooms',
    excerpt: 'An intimate black-and-white series strips back the high-fashion marketing glare to reveal the vulnerable, raw minutes of artistic correction.',
    content: [
      'In his latest campaign titled "Echoes", legendary photographer Hedi Shlansky avoids the dramatic ocean cliffs and sun-drenched estates that typically serve as high-fashion backdrops. Instead, he positions his heavy analog format camera inside the silent, dust-flecked fitting room of a Parisian studio.',
      'The images, printed in high-contrast graphite monochrome, capture raw moments: a designer pinned down by the hem of a wool coat, a model breathing quietly before stepping onto the stage, and cascades of scrap silk lying discarded on the wooden floorboards.',
      'The campaign is a gorgeous triumph of understatement. It serves as a love letter to the absolute physical work of garment construction, validating that the poetry of fashion lies not in the final celebrity Instagram post, but in the long, vulnerable hours of collective creation.'
    ],
    author: {
      name: 'Sofia van der Post',
      role: 'Editorial Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    date: 'May 02, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Hedi Shlansky',
    subCategory: 'Visual Portfolios',
    tags: ['Black & White', 'Atelier Fitting', 'Artistic Process', 'Hedi Shlansky']
  },
  {
    id: 'art-9',
    category: 'news',
    title: 'The Re-Emergence of Haute Couture in the Middle East: Riyadh Design Hub Launched',
    excerpt: 'A historic multi-million dollar foundation kicks off in Saudi Arabia to fund and preserve historic Arabian hand-weaving and embroidery crafts.',
    content: [
      'Riyadh is quickly positioning itself as an essential node on the global couture map. Today, the Kingdom’s Ministry of Culture announced the establishment of the Riyadh Haute Heritage Foundation, backed by an initial endowment of $450 million.',
      'The foundation plans to build a world-class physical campus featuring ultra-modern fashion research laboratories alongside ancient wool-spinning workshops, gold-thread embroidery schools, and natural plant-based dye-gardens.',
      'Several prominent European fashion curators have joined the advisory board. This initiative aims to preserve endangered regional artisanal skills while providing local talent with the funding, supply chains, and international connections to compete at the absolute highest levels of Parisian luxury.'
    ],
    author: {
      name: 'Anas Al-Mansoori',
      role: 'Middle East Correspondent',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    date: 'April 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Kareem Ahmed',
    subCategory: 'Cultural Investments',
    tags: ['Riyadh Hub', 'Artisanal Preservation', 'Embroidery', 'Saudi Arabia']
  },
  {
    id: 'art-10',
    category: 'runway',
    title: 'The Sands of Saint-Tropez: Marine Serre Reinterprets Riviera Glamour',
    excerpt: 'Ditching the concrete grids for the golden Mediterranean dunes, Saint-Tropez witnesses a futuristic and conscious resort wear spectacle.',
    content: [
      'The cruise and resort runways are moving towards highly immersive landscapes. This week, fashion crowds and yacht decks were treated to an unconventional maritime dreamscape on a pristine, isolated beach in Saint-Tropez.',
      'Garments moved fluidly with the ocean breeze, employing recycled sail-cloth structured coats, intricate laser-cut leather dresses reminiscent of coral structures, and sweeping oceanic blue silk drapes that met the tide with an elegant wet-look hem.',
      'The combination of extreme luxury aesthetics with sustainable engineered fishing net fibers proves that modern getaway fashion can be both incredibly stylish and highly protective of our oceans.'
    ],
    author: {
      name: 'Elena Rostova',
      role: 'Chief Runway Critic',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
    },
    date: 'April 25, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Julien Lambert',
    subCategory: 'Resort 2027',
    tags: ['Resort Wear', 'Saint-Tropez', 'Recycled Materials', 'Riviera']
  },
  {
    id: 'art-11',
    category: 'runway',
    title: 'The Cannes Film Festival Embraces Ethereal Vintage Lace and Liquid Metamorphosis',
    excerpt: 'On the red-carpeted steps facing the Mediterranean sea, historical archival gowns and custom sustainable liquid-silk designs stole the limelight.',
    content: [
      'The continuous dialogue between history, environment, and star glamour found its ultimate canvas at Cannes. This week, we witnessed a stellar showcase of sustainable liquid fabrics alongside breathtaking vintage items from the 1960s.',
      'Most notably, a custom liquid-celluloid gold drape made entirely out of plant-resin cellulose walked the red carpet. It glimmered under the coastal sun like molten gold, flowing like a natural stream around the actress silhouette.',
      'Cannes has confirmed that the global elite are turning to intelligent materials that challenge historical limitations, signaling a future where red carpets celebrate high-grade science alongside high-glamour art.'
    ],
    author: {
      name: 'Aiden Montgomery',
      role: 'Red Carpet Editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    date: 'April 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000',
    photographer: 'Sarah Jenkins',
    subCategory: 'Cannes Chronicles',
    tags: ['Cannes Film Festival', 'Liquid Silk', 'Vintage', 'Sustainable Glamour']
  }
];

export const CALENDAR_EVENTS = [
  {
    city: 'MILAN',
    season: 'S/S 2027 Ready-To-Wear',
    dates: 'Sept 16 - Sept 22, 2026',
    location: 'Palazzo Reale & City Chambers'
  },
  {
    city: 'PARIS',
    season: 'Spring Haute Couture',
    dates: 'Sept 24 - Oct 02, 2026',
    location: 'Carrousel du Louvre & Ateliers'
  },
  {
    city: 'TOKYO',
    season: 'A/W 2027 Tokyo Lab',
    dates: 'Oct 12 - Oct 18, 2026',
    location: 'Shibuya Hikarie & Ginza Vaults'
  },
  {
    city: 'NEW YORK',
    season: 'Resort 2028 Collectives',
    dates: 'Nov 02 - Nov 07, 2026',
    location: 'Chelsea Highline Studios'
  }
];

export const BRAND_MEMBERS = [
  { name: 'VOGUE Italia', quote: 'A gorgeous masterclass in digital luxury layout.' },
  { name: 'Business of Fashion', quote: 'THE Debut represents the clean future of custom content hubs.' },
  { name: 'Le Figaro', quote: 'A brilliant return to heavy editorial prose and beautiful typography.' }
];
