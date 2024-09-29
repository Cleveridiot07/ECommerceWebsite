import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import SearchBox from '../components/SearchBox';
import { fetchAllProduct, fetchProductsByQuery } from '../api/Products'; // keep this for initial fetch
import { fetchProductsByCategory } from '../api/Category'; // Import the new category fetch function
import InfiniteScroll from 'react-infinite-scroll-component';

const categories = [
  "All",
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
];

export default function ProductListingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; 
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllProduct(page, productsPerPage);
      if (!data || !data.products) throw new Error("No data returned from fetch");

      setProductList(prevList => [...prevList, ...data.products]);
      setFilteredProducts(prevFiltered => [...prevFiltered, ...data.products]);

      if (data.products.length < productsPerPage) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(`Failed to load products: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = async (query) => {
    if (query) {
      setIsLoading(true);
      try {
        // Fetch products based on search query
        const results = await fetchProductsByQuery(query);
        setFilteredProducts(results);
        setProductList(results); // Update productList to reflect only search results
        setHasMore(false); // No more products to load for search results
      } catch (err) {
        console.error("Failed to search products:", err);
        setError(`Failed to search products: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Reset to show all products when the query is empty
      setFilteredProducts(productList);
      setHasMore(true);
      setCurrentPage(1); // Reset to the first page
    }
  };

  const loadProductsByCategory = async (category) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchProductsByCategory(category);
      setFilteredProducts(results);
      setProductList(results); // Update productList to reflect only category results
      setHasMore(false); // No more products to load for category results
    } catch (err) {
      console.error("Failed to fetch products by category:", err);
      setError(`Failed to load products: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const newFilteredProducts = selectedCategory === 'All'
      ? productList
      : productList.filter((product) => product.category === selectedCategory);

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // Reset to first page when category changes
    setHasMore(true); // Reset hasMore state
  }, [selectedCategory]);

  useEffect(() => {
    searchProducts(searchQuery);
  }, [searchQuery]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === 'All') {
      // Reset to the original product list if "All" is selected
      setFilteredProducts(productList);
      setHasMore(true);
      setCurrentPage(1);
    } else {
      loadProductsByCategory(category); // Load products for the selected category
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-bold mb-4 sm:mb-0">Our Products</h1>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="relative mt-4 sm:mt-0">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={() => setCurrentPage(prev => prev + 1)}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p className="text-white text-center">You have reached the end of the product list.</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.title}
                price={product.price}
                image={product.images[0]}
                rating={product.rating}
              />
            ))
          ) : (
            <p className="text-white col-span-full text-center">No products found in this category.</p>
          )}
        </div>
      </InfiniteScroll>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
