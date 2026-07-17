import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Article, Faq, Product } from "@/engine/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-voleador.png`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function productSchema(product: Product, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.shortDescription,
    image: `${SITE_URL}${product.images[0]}`,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${path}`,
      priceCurrency: product.currency,
      price: product.onSale && product.salePrice ? product.salePrice : product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };
}

export function articleSchema(article: Article, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.excerpt,
    image: `${SITE_URL}${article.coverImage}`,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-voleador.png` },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
}

export function reviewSchema(product: Product, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Product", name: product.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.editorRating,
      bestRating: 10,
    },
    author: { "@type": "Organization", name: SITE_NAME },
    reviewBody: product.editorReview,
    url: `${SITE_URL}${path}`,
    datePublished: product.publishedAt,
    dateModified: product.updatedAt,
  };
}
