export type BlogFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  author: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTime: number;
};

const blogModules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const FALLBACK_IMAGE = "/placeholder.svg";

const requiredKeys: Array<keyof BlogFrontmatter> = [
  "title",
  "slug",
  "excerpt",
  "date",
  "author",
  "tags",
  "seoTitle",
  "seoDescription",
];

const parseFrontmatter = (raw: string): { frontmatter: BlogFrontmatter; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid markdown frontmatter format");
  }

  const [, block, content] = match;
  const lines = block.split("\n");

  const data: Record<string, unknown> = {};

  for (const line of lines) {
    if (!line.trim()) continue;

    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key.trim()] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
      continue;
    }

    data[key.trim()] = value.replace(/^"|"$/g, "");
  }

  for (const key of requiredKeys) {
    if (!data[key]) {
      throw new Error(`Missing required frontmatter key: ${key}`);
    }
  }

  return {
    frontmatter: {
      title: String(data.title),
      slug: String(data.slug),
      excerpt: String(data.excerpt),
      date: String(data.date),
      coverImage: data.coverImage ? String(data.coverImage) : FALLBACK_IMAGE,
      author: String(data.author),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      seoTitle: String(data.seoTitle),
      seoDescription: String(data.seoDescription),
    },
    content: content.trim(),
  };
};

const calculateReadingTime = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

const allPosts = Object.values(blogModules)
  .map((raw) => {
    const { frontmatter, content } = parseFrontmatter(raw);

    return {
      ...frontmatter,
      coverImage: frontmatter.coverImage || FALLBACK_IMAGE,
      content,
      readingTime: calculateReadingTime(content),
    } satisfies BlogPost;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getAllPosts = () => allPosts;

export const getPostBySlug = (slug: string) => allPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (post: BlogPost, maxItems = 3) => {
  const targetTags = new Set(post.tags.map((tag) => tag.toLowerCase()));

  return allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const overlapCount = candidate.tags.filter((tag) => targetTags.has(tag.toLowerCase())).length;
      return { candidate, overlapCount };
    })
    .filter((item) => item.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, maxItems)
    .map((item) => item.candidate);
};

export const formatBlogDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
