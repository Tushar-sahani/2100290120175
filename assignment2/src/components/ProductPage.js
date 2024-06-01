// components/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144/test/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-cover mb-4"
      />
      <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
      <p className="text-gray-500">{product.company}</p>
      <p className="text-gray-800">${product.price}</p>
      <p className="text-gray-600">Rating: {product.rating}</p>
      <p className="text-gray-600">Discount: {product.discount}%</p>
      <p className="text-gray-600">
        Availability: {product.availability ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default ProductPage;
