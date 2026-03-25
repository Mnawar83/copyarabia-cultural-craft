import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/blog";
import { usePageMetadata } from "@/hooks/use-page-metadata";

const Blog = () => {
  const posts = getAllPosts();

  usePageMetadata({
    title: "Blog",
    description:
      "Expert Arabic copywriting and transcreation insights for GCC and MENA campaigns. Practical playbooks, localization advice, and market-ready examples.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="space-y-6 mb-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">CopyArabia Blog</h1>
            <p className="text-muted-foreground leading-7">
              Actionable guides for Arabic transcreation, GCC localization, and multilingual marketing campaigns in
              Saudi Arabia, the UAE, and across MENA.
            </p>
          </div>
        </div>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
