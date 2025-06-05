import React, { useContext, useEffect, useState } from "react";
import { assets, dealItems } from "../assets/assets";
import { Link } from "react-router-dom";
import db from "../config/databases";
import { CartContext } from "../context/CartContext";

const Deals = () => {
  // Context Management:
  const { increaseQuantity, decreaseQuantity, getItemQuantity } =
    useContext(CartContext);

  // State Management:
  const [products, setProducts] = useState([]);

  // UseEffect Hooks
  useEffect(() => {
    initDb();
  }, []);

  // Various funcitions

  // Initialize the database and fetch products
  const initDb = async () => {
    try {
      const prods = await db.products.list();
      setProducts(prods.documents);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

  // Get the current quantity of a product
  const currentQuantity = (productId) => {
    return getItemQuantity(productId);
  };
  // decrease increase functions:
  const handleIncrease = (product) => {
    increaseQuantity(product);
  };

  const handleDecrease = (productId) => {
    decreaseQuantity(productId);
  };

  return (
    <div className="container mx-auto py-5 px-2 sm:px-4 md:px-6 lg:px-30">
      <div className="py-2 px-4 sm:px-10">
        <h1 className="text-3xl text-center font-bold">
          Daily <span className="text-lime-700">Hot Deals!</span>{" "}
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            // <Link
            //   key={index}
            //   to={`/AboutProduct/${product.id}`}
            //   state={product}
            // >
            <div
              key={product.$id}
              className="h-[420px] w-[250px] bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[225px] border border-gray-300 overflow-hidden"
              />
              <div className="mt-3 px-4 flex flex-col ">
                <h1 className="font-semibold text-xl text-fit whitespace-nowrap overflow-clip ">
                  {product.name}
                </h1>
                <h3 className="mt-2 font-light">{product.speciality}</h3>
                <h2 className="mt-2 text-xl font-semibold">
                  Rs.{product.deal_price}/kg{" "}
                  <span className="line-through text-red-500">
                    Rs.{product.price}
                  </span>
                </h2>
                {/* Add to Cart Section */}
                <div className="flex gap-2 mt-3 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-2">
                  {currentQuantity(product.$id) > 0 ? (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 w-full justify-center">
                      <button
                        onClick={() => handleDecrease(product.$id)}
                        className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xs font-bold mt-4"
                      >
                        −
                      </button>
                      <span className="font-medium text-sm min-w-[20px] text-center mt-4">
                        {currentQuantity(product.$id)}
                      </span>
                      <button
                        onClick={() => handleIncrease(product)}
                        className="w-7 h-7 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 transition-colors text-xs font-bold mt-4"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleIncrease(product)}
                      className="bg-lime-600 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
