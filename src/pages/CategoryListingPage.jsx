import React, { useState, useEffect } from 'react';
import CategoryBox from '../components/CategoryBox';
import { fetchCategories } from '../api/Category'; // Import fetchCategories
import Loader from '../components/Loader';

export default function CategoryListingPage() {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) return <Loader/>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 text-center mb-10">
          Explore Our Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryBox
              key={category.id}
              category={category}
              isHovered={hoveredCategory === category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
