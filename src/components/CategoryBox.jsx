import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryBox = ({ category, isHovered, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate(); 

  const handleCategoryClick = () => {
    navigate(`/category/?categoryId=${category.slug}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => onMouseEnter(category.id)}
      onMouseLeave={onMouseLeave}
      onClick={handleCategoryClick} 
    >
      <div className="relative h-64">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } flex items-center justify-center`}
        >
          <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
            Shop Now
          </button>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <a
          href="#"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          onClick={handleCategoryClick} // You can also add the same navigation here
        >
          Explore {category.name}
          <span className="ml-2">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default CategoryBox;
