import { Hero } from '@/components/home/hero';
import { FeaturedInsights } from '@/components/home/featured-insights';
import { HowWeHelp } from '@/components/home/how-we-help';
import { CareersPreview } from '@/components/home/careers-preview';
import { Features } from '@/components/home/features';
import { Audience } from '@/components/home/audience';
import { ArticlesPreview } from '@/components/home/articles-preview';
import { Cta } from '@/components/home/cta';

import { getArticles } from '@/lib/strapi';

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      <Hero />
      <FeaturedInsights />
      <HowWeHelp articles={articles} />
      <CareersPreview />
      <Features />
      <Audience />
      <ArticlesPreview />
      <Cta />
    </>
  );
}
