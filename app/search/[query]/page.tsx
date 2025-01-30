import { Metadata } from "next";

interface SearchPageProps {
  params: { query: string };
}

export const generateMetadata = ({ params }: SearchPageProps): Metadata => ({
  title: `Search Results for &quot;${params.query}&quot;`, // Escaped quotes
  description: `View search results for ${params.query}`,
});

interface SearchResult {
  _id: string;
  name: string;
  category: string;
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const { query } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?search=${encodeURIComponent(query)}`
  );
  const { results }: { results: SearchResult[] } = await res.json(); // Typed the results properly

  // Since Next.js expects a synchronous return of JSX, wrap async call in a proper function
  if (!results) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: &quot;{query}&quot; {/* Escaped quotes */}
      </h1>
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item._id} className="mb-3">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for &quot;{query}&quot;.</p> 
      )}
    </div>
  );
};

export default SearchPage;
