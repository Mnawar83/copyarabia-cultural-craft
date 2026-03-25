import { Link } from "react-router-dom";
import { type BlogPost, formatBlogDate } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="rounded-xl border border-border/70 bg-card/40 p-5 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/blog/${post.slug}`} className="block">
          <h2 className="text-xl font-serif leading-tight hover:text-primary transition-colors">{post.title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground leading-6">{post.excerpt}</p>
        <div className="text-xs text-muted-foreground flex items-center justify-between">
          <span>{formatBlogDate(post.date)}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
