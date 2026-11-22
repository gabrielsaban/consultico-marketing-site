import { DEFAULT_AUTHOR, type ArticleAuthor } from './types';

/**
 * Everyone who can put their name on an article. Frontmatter refers to people by
 * slug (`author: leona-wade`) so a role change is one edit here rather than one
 * per article. The content linter reads the keys of this object, so an unknown
 * slug fails the build instead of silently falling back to Paul.
 */
export const AUTHORS = {
  'paul-wilson': DEFAULT_AUTHOR,
  'leona-wade': {
    slug: 'leona-wade',
    name: 'Leona Wade',
    role: 'Account Manager, Consultico',
    image: '/team/leona_wade.png',
  },
} satisfies Record<string, ArticleAuthor>;

export type AuthorSlug = keyof typeof AUTHORS;

export function authorSlugOf(author: ArticleAuthor): string {
  return (
    author.slug ??
    author.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}

export function resolveAuthor(value: ArticleAuthor | string | undefined): ArticleAuthor {
  if (!value) return DEFAULT_AUTHOR;
  if (typeof value === 'string') {
    const found = (AUTHORS as Record<string, ArticleAuthor>)[value];
    if (!found) throw new Error(`Unknown author "${value}". Add them to src/lib/articles/authors.ts.`);
    return found;
  }
  return { ...value, slug: authorSlugOf(value) };
}
