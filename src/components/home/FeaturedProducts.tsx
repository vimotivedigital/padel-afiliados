import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold">Productos destacados</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
