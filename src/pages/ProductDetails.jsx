import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getSingleProduct } from "../services/api";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSingleProduct(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="p-6 text-center">Loading product...</p>;
  }

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8">
      
      {/* Image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-gray-600 mt-2 capitalize">
          Category: {product.category}
        </p>

        <p className="text-xl font-bold mt-4">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-700">
          {product.description}
        </p>

        <button
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              image: product.image,
            });
            toast.success("Added to cart ✅");
          }}
          className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;