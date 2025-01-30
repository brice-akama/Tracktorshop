



import { Metadata } from "next";

interface SearchPageProps {
  params: { query: string };
}

export const generateMetadata = ({ params }: SearchPageProps): Metadata => ({
  title: `Search Results for "${params.query}"`,
  description: `View search results for ${params.query}`,
});

const SearchPage = async ({ params }: SearchPageProps) => {
  const { query } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?search=${encodeURIComponent(
      query
    )}`
  );
  const { results } = await res.json();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: "{query}"
      </h1>
      {results.length > 0 ? (
        <ul>
          {results.map((item: any) => (
            <li key={item._id} className="mb-3">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
