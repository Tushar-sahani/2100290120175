// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjE4NzQyLCJpYXQiOjE3MTcyMTg0NDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY5NDg1Mzg3LTVlMTUtNDRjYi05MWQyLTU4YWFkMzRlOTQ2YSIsInN1YiI6InR1c2hhci4yMTI1Y3MxMDcyQGtpZXQuZWR1In0sImNvbXBhbnlOYW1lIjoiS0lFVCBHcm91cCBvZiBJbnN0aXR1dGlvbnMiLCJjbGllbnRJRCI6IjY5NDg1Mzg3LTVlMTUtNDRjYi05MWQyLTU4YWFkMzRlOTQ2YSIsImNsaWVudFNlY3JldCI6InRzZFNjREdMaWxVQ0FvQVAiLCJvd25lck5hbWUiOiJUdXNoYXIgU2FoYW5pIiwib3duZXJFbWFpbCI6InR1c2hhci4yMTI1Y3MxMDcyQGtpZXQuZWR1Iiwicm9sbE5vIjoiMjEwMDI5MDEyMDE3NSJ9.IeGrKfEnFQmt5lau1hXIsZ9HYSA7vn1cb1gFWLrkHzo", // Replace with your access token
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <h1 className="text-3xl font-semibold mb-4">Top Products</h1>
            }
          />
          <Route exact path="/" element={<ProductList products={products} />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
