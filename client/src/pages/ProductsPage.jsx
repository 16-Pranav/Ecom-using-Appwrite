import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, Categories, productsData } from "../assets/assets";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import db from "../config/databases";
import {
  getEffectivePrice,
  hasDiscount,
  getOriginalPrice,
} from "../utils/priceUtils";
import {
  FaAppleAlt,
  FaCarrot,
  FaBreadSlice,
  FaCheese,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaLeaf,
  FaWineBottle,
} from "react-icons/fa";

const ProductsPage = () => {
  // TO hold products in an array.
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // Cart Context to manage cart operations
  const { increaseQuantity, decreaseQuantity, getItemQuantity } =
    useContext(CartContext);
  useEffect(() => {
    initDb();
  }, []); // Filter products when categories or products change
  useEffect(() => {
    let filtered = [...products]; // Create a copy to avoid mutating original array

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        // Create a mapping between filter categories and database categories
        const categoryMapping = {
          Fruits: "Fruit",
          Vegetables: "Vegetable",
          Dairy: "Dairy",
          Groceries: "Grocery",
        };

        // Handle case-insensitive comparison and ensure category exists
        return (
          product.category &&
          selectedCategories.some((cat) => {
            const mappedCategory = categoryMapping[cat] || cat;
            return (
              mappedCategory.toLowerCase() === product.category.toLowerCase()
            );
          })
        );
      });
    }

    // Sort products
    if (sortBy === "price-low") {
      filtered = filtered.sort(
        (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
      );
    } else if (sortBy === "price-high") {
      filtered = filtered.sort(
        (a, b) => getEffectivePrice(b) - getEffectivePrice(a)
      );
    } else if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, sortBy]);

  // Initialize filtered products when products are first loaded
  useEffect(() => {
    if (products.length > 0 && filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [products]);
  // Helper function to get item quantity from cart
  const initDb = async () => {
    const response = await db.products.list();
    setProducts(response.documents);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      Fruits: <FaAppleAlt className="text-red-500" />,
      Vegetables: <FaCarrot className="text-orange-500" />,
      Bakery: <FaBreadSlice className="text-yellow-600" />,
      Dairy: <FaCheese className="text-yellow-500" />,
      Beverages: <FaWineBottle className="text-purple-500" />,
      Organic: <FaLeaf className="text-green-500" />,
    };
    return iconMap[category] || <FaLeaf className="text-green-500" />;
  };

  // decrease increase functions:
  const handleIncrease = (product) => {
    increaseQuantity(product);
  };

  const handleDecrease = (productId) => {
    decreaseQuantity(productId);
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {" "}
            <div>
              <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-900 ">
                All <span className="text-lime-600">Products</span> (
                {products.length > 0 ? filteredProducts.length : 0})
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              {/* Hide Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFilter className="text-sm" />
                <span className="text-sm font-medium">
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </span>
                {showFilters ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-6 py-6 px-4 sm:px-6 lg:px-8">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Filters
                </h2>

                {/* Categories Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {Categories.map((category, index) => (
                      <label
                        key={`category-${index}-${category}`}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                              selectedCategories.includes(category)
                                ? "bg-lime-600 border-lime-600"
                                : "border-gray-300 group-hover:border-lime-400"
                            }`}
                          >
                            {selectedCategories.includes(category) && (
                              <svg
                                className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          {getCategoryIcon(category)}
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                            {category}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}{" "}
        {/* Products Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4">
                <FaLeaf className="mx-auto text-6xl text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Loading products...
              </h3>
              <p className="text-gray-500">
                Please wait while we fetch the latest products.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4">
                <FaLeaf className="mx-auto text-6xl text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => {
                const currentQuantity = getItemQuantity(product.$id);
                return (
                  <div
                    key={product.$id}
                    className="h-[420px] w-[250px] bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg mx-auto"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[225px] border border-gray-300 overflow-hidden object-cover"
                    />

                    {/* Product Details */}
                    <div className="mt-3 px-4 flex flex-col">
                      {" "}
                      <h1 className="font-semibold text-xl text-fit whitespace-nowrap overflow-clip">
                        {product.name}
                      </h1>
                      <h2 className="mt-2 text-xl font-semibold">
                        {hasDiscount(product) ? (
                          <>
                            Rs. {getEffectivePrice(product)}/kg{" "}
                            <span className="line-through text-red-500">
                              Rs. {getOriginalPrice(product)}
                            </span>
                          </>
                        ) : (
                          `Rs. ${getEffectivePrice(product)}`
                        )}
                      </h2>
                      {/* Add to Cart Section */}
                      <div className="flex gap-2 mt-3 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-2">
                        {currentQuantity > 0 ? (
                          <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 w-full justify-center">
                            <button
                              onClick={() => handleDecrease(product.$id)}
                              className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xs font-bold"
                            >
                              −
                            </button>
                            <span className="font-medium text-sm min-w-[20px] text-center">
                              {currentQuantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(product)}
                              className="w-7 h-7 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 transition-colors text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleIncrease(product)}
                            className="bg-lime-600 text-white px-4 py-2 rounded-md"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
