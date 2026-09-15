// These are public widget identifiers, never passwords or API secrets.
interface SiteConfig {
  title: string;
  description: string;
  github: string;
  giscus: { repo: string; repoId: string; category: string; categoryId: string };
  goatcounter: string;
}
export const site: SiteConfig = {
  title: 'Kadir Aksoy',
  description: '',
  github: 'https://github.com/kadir014',
  giscus: {
    repo: 'kadir014/kadir014.github.io',
    repoId: 'MDEwOlJlcG9zaXRvcnkyMjM3NjQ3OTI=',
    category: 'Blog comments',
    categoryId: 'DIC_kwDODVZhOM4DFq6Y',
  },
  goatcounter: 'https://kadir014.goatcounter.com',
};
