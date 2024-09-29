import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory } from '../api/Category'; // Import the fetch function
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CategoryPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const categoryId = queryParams.get('categoryId'); 
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductsByCategory(categoryId);
        setProductList(data);
        setHasMore(data.length > 0); // Check if there are more products
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  const fetchMoreData = async () => {
    if (isLoading) return; // Prevent multiple fetches
    setIsLoading(true);
    
    try {
      const newProducts = await fetchProductsByCategory(categoryId, currentPage, productsPerPage); // Fetch the next page of products
      setProductList((prev) => [...prev, ...newProducts]); // Append new products to the existing list
      setHasMore(newProducts.length > 0); // Update the hasMore state
      setCurrentPage((prev) => prev + 1); // Increment the page number
    } catch (err) {
      setError('Failed to load more products. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-bold mb-4 sm:mb-0">
          {categoryId ? `Products in ${categoryId} Category` : 'Our Products'}
        </h1>
      </div>

      {isLoading && productList.length === 0 ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <InfiniteScroll
          dataLength={productList.length} // This is important field to render the next data
          next={fetchMoreData} // Function that fetches the next set of data
          hasMore={hasMore} // If true, it will fetch more data
          loader={<Loader />} // Loading spinner
          endMessage={<p className="text-white text-center">No more products to show.</p>} // End message
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.title}
                price={product.price}
                image={product.images[0]}
                rating={product.rating}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
