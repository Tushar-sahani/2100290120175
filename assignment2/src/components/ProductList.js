// components/ProductList.js
import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.company}</p>
            <p className="text-gray-800">${product.price}</p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <p className="text-gray-600">Discount: {product.discount}%</p>
            <p className="text-gray-600">
              Availability: {product.availability ? "In Stock" : "Out of Stock"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
