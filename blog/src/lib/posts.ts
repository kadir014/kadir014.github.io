import { getCollection, type CollectionEntry } from 'astro:content';

export async function publishedPosts() {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.slug.localeCompare(b.data.slug));
  const slugs = posts.map((post) => post.data.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error('Each published post must have a unique slug.');
  const topics = new Map<string, string>();
  for (const tag of posts.flatMap((post) => post.data.tags)) {
    const key = tagId(tag);
    if (topics.has(key) && topics.get(key) !== tag) {
      throw new Error(`Use consistent capitalization for the topic "${tag}" (also found "${topics.get(key)}").`);
    }
    topics.set(key, tag);
  }
  return posts;
}
export const postUrl = (post: CollectionEntry<'posts'>) => `/blog/${post.data.slug}/`;
export const tagId = (tag: string) => encodeURIComponent(tag.toLowerCase());
export const tagUrl = (tag: string) => `/blog/topics/${tagId(tag)}/`;
export const formatDate = (date: Date) => date.toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});
