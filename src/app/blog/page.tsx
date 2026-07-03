import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllArticles } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RecentArticles } from "@/components/home/RecentArticles";

export const metadata: Metadata = buildMetadata({
  title: "Blog de pádel",
  description: "Guías, consejos y noticias sobre material y técnica de pádel.",
  path: "/blog",
});

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <h1 className="text-3xl font-extrabold">Blog</h1>
      {articles.length === 0 ? <p className="text-muted">Muy pronto, nuevos artículos.</p> : <RecentArticles />}
    </div>
  );
}
