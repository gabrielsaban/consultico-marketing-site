export interface SeoIndustryPainPoint {
  title: string;
  body: string;
}

export interface SeoIndustryCoverageItem {
  title: string;
  body: string;
}

export interface SeoIndustryProcessStep {
  title: string;
  body: string;
}

export interface SeoIndustryProofBlock {
  title: string;
  body: string;
  quote?: string;
  quoteAttribution?: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
}

export interface SeoIndustryUniqueSection {
  title: string;
  paragraphs: string[];
  inlineLinks?: { label: string; href: string }[];
}

export interface SeoIndustryPageData {
  slug: string;
  breadcrumbLabel: string;
  metadata: {
    title: string;
    description: string;
    path: string;
  };
  hero: {
    heading: string;
    subhead: string;
    bullets: string[];
    statCallout?: { stat: string; attribution: string };
  };
  intro: string;
  painHeading: string;
  painIntro: string;
  painPoints: SeoIndustryPainPoint[];
  painOutro?: string;
  coverage: SeoIndustryCoverageItem[];
  proof?: SeoIndustryProofBlock;
  workshopTestimonial?: { quote: string; attribution: string; label: string };
  processSteps: SeoIndustryProcessStep[];
  marginNote?: string;
  faqs: { question: string; answer: string }[];
  uniqueSection?: SeoIndustryUniqueSection;
  cta: { title: string; body: string };
}
