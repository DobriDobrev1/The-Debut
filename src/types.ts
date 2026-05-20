export interface Article {
  id: string;
  category: 'news' | 'insights' | 'magazines' | 'runway' | 'trends' | 'calendar' | 'shop';
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs to build beautiful multi-blocked premium paragraphs
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  photographer?: string;
  featured?: boolean;
  subCategory?: string;
  tags?: string[];
  quote?: string;
  quoteAuthor?: string;
}

export type CategoryKey = 'news' | 'insights' | 'magazines' | 'runway' | 'trends' | 'calendar' | 'shop';

export interface CategorySpec {
  key: CategoryKey;
  label: string;
  description: string;
  editorialAccent: string;
}
