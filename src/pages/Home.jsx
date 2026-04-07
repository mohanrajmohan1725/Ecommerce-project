import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { SearchContext } from "../context/SearchContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const { search } = useContext(SearchContext);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    );
  }

  return (
    <div className="w-full py-6 animate-fadeIn">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 md:p-8 rounded-xl mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Big Sale 🔥</h1>
        <p className="mt-1">Up to 50% off</p>
      </div>

      {/* CATEGORY */}
      <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
        {[
          "All",
          "men's clothing",
          "women's clothing",
          "electronics",
          "jewelery",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              category === cat
                ? "bg-black text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.title,
                    price: item.price,
                    image: item.image,
                    rating: item.rating?.rate || 4,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No products found 😢
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Home;