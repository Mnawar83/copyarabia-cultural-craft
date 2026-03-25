import { Link, Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatBlogDate, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  usePageMetadata({
    title: post?.seoTitle || "Blog",
    description:
      post?.seoDescription ||
      "Expert Arabic copywriting and transcreation insights for GCC and MENA campaigns.",
    image: post?.coverImage,
    type: "article",
  });

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <article className="space-y-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <header className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif leading-tight">{post.title}</h1>

            <p className="text-lg text-muted-foreground leading-7">{post.excerpt}</p>

            <div className="text-sm text-muted-foreground flex flex-wrap gap-3 items-center">
              <span>{post.author}</span>
              <span>•</span>
              <time>{formatBlogDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full rounded-xl border border-border/60 max-h-[420px] object-cover"
          />

          <div className="space-y-5 text-base">{renderMarkdown(post.content)}</div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border/60">
            <h2 className="text-2xl font-serif mb-6">Related posts</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="rounded-xl border border-border/70 bg-card/30 p-5 hover:border-primary/60 transition-colors"
                >
                  <p className="text-xs text-muted-foreground mb-2">{formatBlogDate(relatedPost.date)}</p>
                  <h3 className="text-lg font-serif mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
