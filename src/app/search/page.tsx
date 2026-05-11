import ProductCard from "@/component/ProductCard";
import { searchProducts } from "@/lib/db";
import { ogImageUrl, siteUrl } from "@/lib/site";

// SEO
const baseUrl = siteUrl;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  if (!query) {
    return {
      title: "Tìm kiếm hoa tươi tại Vũng Tàu",
      description: "Tìm kiếm nhanh các mẫu hoa tươi đẹp tại Tiệm Hoa Vũng Tàu",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const products = await searchProducts(query);
  const topProducts = products.slice(0, 10).map((p) => p.name.toLowerCase());

  return {
    title: `Top ${products.length} mẫu ${query} đẹp nhất tại Vũng Tàu`,
    description: `Top ${products.length} mẫu ${query} đẹp nhất tại Tiệm Hoa Vũng Tàu. Hoa tươi mỗi ngày, giao nhanh nội thành.`,
    keywords: [
      "hoa tươi Vũng Tàu",
      "shop hoa Vũng Tàu",
      "đặt hoa online",
      `${query}`,
      `mẫu ${query} đẹp`,
      `mua ${query} tại Vũng Tàu`,
      ...topProducts,
    ],

    openGraph: {
      title: `Top ${products.length} mẫu ${query} đẹp nhất tại Vũng Tàu`,
      description: `Khám phá các mẫu ${query} được yêu thích tại Tiệm Hoa Vũng Tàu. Hoa tươi mỗi ngày, giao nhanh nội thành.`,
      url: `${baseUrl}/search?q=${encodeURIComponent(query)}`,
      siteName: "Tiệm Hoa Vũng Tàu",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Top ${products.length} mẫu ${query} đẹp nhất tại Vũng Tàu`,
        },
      ],
      locale: "vi_VN",
      phoneNumbers: "098789456",
      type: "website",
      emails: "tiemhoavungtau@gmail.com",
      countryName: "Việt Nam",
    },

    alternates: {
      canonical: `${baseUrl}/search?q=${encodeURIComponent(query)}`,
    },

    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = await searchProducts(query);

  return (
    <main className="category-container">
      <h1 className="category-title">Kết quả cho: &quot;{query}&quot;</h1>
      <p className="category-description">
        Top {products.length} sản phẩm {query} đẹp nhất dành cho bạn.
      </p>

      {products && products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">
          Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa &quot;
          {query}&quot;.
        </p>
      )}
    </main>
  );
}
