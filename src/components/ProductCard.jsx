import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ id, name, description, price, image, rating }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductView = () => {
    navigate(`/product?id=${id}`); 
  }

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    const product = { id, name: description, price, image, rating, quantity: 1}; 
    console.log(product);
    dispatch(addToCart(product)); 
  };

  return (
    <div
      key={id}
      className="max-w-sm bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductView}
    >
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={image}
          alt={name}
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{name}</h2>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-800 font-bold text-lg">${price}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .587l3.668 7.431 8.215 1.19-5.941 5.787 1.4 8.184L12 18.896l-7.342 3.864 1.4-8.184L.117 9.208l8.215-1.19z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
