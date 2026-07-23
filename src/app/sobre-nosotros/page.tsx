import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllProducts, getReviewedProducts, getAllBrands } from "@/lib/products";
import { getAllComparisons } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AffiliateDisclosure } from "@/components/product/AffiliateDisclosure";

export const metadata: Metadata = buildMetadata({
  title: "Sobre nosotros y metodología",
  description: "Quién hay detrás de Voleador, cómo verificamos cada producto, cómo calculamos los rankings y cómo nos financiamos.",
  path: "/sobre-nosotros",
});

export default function SobreNosotrosPage() {
  const productCount = getAllProducts().length;
  const brandCount = getAllBrands().length;
  const reviewCount = getReviewedProducts().length;
  const comparisonCount = getAllComparisons().length;

  return (
    <div className="max-w-3xl space-y-8">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Sobre nosotros", path: "/sobre-nosotros" }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Sobre nosotros y metodología</h1>
        <p className="mt-3 text-lg text-muted">
          Voleador es un proyecto independiente de guías y comparativas de material de pádel, gestionado por
          Víctor con ayuda de herramientas de datos (verificación de producto contra Amazon/Keepa, sincronización
          de precios) — no es la web de una redacción con varios periodistas. Esto es lo que hacemos, cómo lo
          hacemos y, sobre todo, lo que no hacemos, para que sepas qué esperar del contenido.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold">Cada producto tiene un ASIN real verificado</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          Cada ficha de producto del catálogo ({productCount} productos de {brandCount} marcas distintas) está
          vinculada a un ASIN real de Amazon, comprobado contra la categoría real que Keepa/Amazon asigna a ese
          producto antes de publicarlo — no basta con que el nombre del producto &ldquo;suene&rdquo; a la categoría esperada.
          El precio, la imagen y la disponibilidad se sincronizan automáticamente contra ese ASIN, así que lo que
          ves reflejado en precio e imagen es el dato real del producto en Amazon en el momento de tu visita, no
          una estimación ni un dato introducido a mano.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Cómo calculamos los rankings</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          La mayoría de nuestras guías ordenan los productos por valoración editorial: una puntuación propia que
          asignamos según las especificaciones técnicas y el perfil de jugador al que se dirige cada producto, no
          por cuánto paga la marca ni por comisión de afiliado. Algunas guías, como las de &ldquo;calidad-precio&rdquo;, usan
          en cambio un criterio distinto: dividimos la valoración editorial entre el precio, lo que prioriza
          matemáticamente productos baratos con una nota decente por encima de productos caros con nota más alta.
          Esto puede llevar a un &ldquo;top pick&rdquo; con pocas reseñas reales si no se filtra explícitamente por ellas —
          nos pasó con nuestra guía de palas calidad-precio, lo detectamos, y desde entonces esas guías exigen
          además un mínimo de reseñas reales de compradores para poder ser el producto destacado, aunque el
          ranking completo siga ordenado por la fórmula de valor.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">El contenido editorial es propio, no copiado de fichas de producto</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          Las descripciones, comparativas, guías de compra y artículos del blog se redactan a partir de las
          especificaciones técnicas públicas de cada producto (forma, balance, peso, materiales, nivel
          recomendado). No copiamos texto de las fichas de Amazon ni de otras tiendas: cada análisis es redacción
          propia, con nuestro propio criterio sobre para qué perfil de jugador tiene sentido cada producto.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Cómo y cada cuánto se actualizan los precios</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          Los precios se sincronizan automáticamente contra la API de Keepa una vez al día, de madrugada. Puede
          pasar que el precio que ves en la ficha no coincida al céntimo con el de Amazon en ese instante exacto
          —los precios de Amazon cambian varias veces al día—, por eso siempre indicamos junto al precio la fecha
          de la última sincronización y remitimos a confirmar el precio final en la propia ficha de Amazon antes
          de comprar.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Ningún dato de actividad o valoración se inventa</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          Las valoraciones y el número de valoraciones que ves junto a cada producto son las de Amazon para ese
          ASIN, marcadas siempre como tales. No mostramos testimonios de usuarios inventados, ni contadores de
          &ldquo;personas viendo esto ahora&rdquo; ni cualquier otra cifra de actividad que no podamos verificar
          con datos reales. Ahora mismo el catálogo tiene {reviewCount} productos con review en profundidad y{" "}
          {comparisonCount} comparativas directas entre productos — son cifras reales del propio catálogo, no una
          cifra de marketing.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Cómo nos financiamos</h2>
        <p className="mt-3 leading-relaxed text-foreground">
          Somos afiliados oficiales del Programa de Afiliados de Amazon. Cuando compras a través de un enlace de
          esta web, podemos recibir una comisión sin ningún coste adicional para ti. Esa relación comercial no
          condiciona qué productos recomendamos ni la valoración editorial que les damos.
        </p>
        <AffiliateDisclosure className="mt-4" />
      </section>
    </div>
  );
}
