const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function BusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: "Tiệm Hoa Vũng Tàu",
    image: `${baseUrl}/hoa.jpg`,
    url: baseUrl,
    telephone: "+84-987-894-56",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vũng Tàu",
      addressRegion: "Bà Rịa - Vũng Tàu",
      addressCountry: "VN",
    },
    areaServed: "Vũng Tàu",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
