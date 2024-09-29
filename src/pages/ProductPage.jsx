import { useState, useEffect } from "react";
import { fetchProduct } from "../api/Products";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart } from "../store/cartSlice"; // Import addToCart action

export default function ProductPage() {
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id'); 
  const [tab, setTab] = useState('specs');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null); 
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProduct(productId); 
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (productId) {
      loadProduct();
    }
  }, [productId]); 

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ 
        id: product.id, 
        name: product.title, 
        description: product.description, 
        price: product.price, 
        image: product.images[0], 
        rating: product.rating 
      }));
    }
  };

  if (isLoading) {
    return <Loader/>; 
  }

  if (!product) {
    return <div>Product not found</div>; 
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-white relative">
          <img
            src={product.images[0]} 
            alt={product.title}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl text-gray-100 font-bold">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15.273l-6.364 3.33 1.227-7.155L.227 6.636l7.273-1.06L10 0l2.5 5.576 7.273 1.06-4.636 4.812 1.227 7.155z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-200">({product.reviews.length} reviews)</span>
          </div>
          <p className="text-xl text-gray-100 font-bold">${product.price}</p>
          <p className="text-gray-200">{product.description}</p>
          <div className="flex items-center space-x-2">
            <span className={`py-1 px-2 rounded-md ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-sm text-gray-200">SKU: {product.sku}</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center">
              <span className="mr-2">🛒</span> Add to Cart
            </button>

          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-4 border-b">
          {['specs', 'warranty', 'reviews', 'policies'].map(tabValue => (
            <button
              key={tabValue}
              className={`py-2 px-4 text-sm font-medium ${tab === tabValue ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-200'}`}
              onClick={() => setTab(tabValue)}
            >
              {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'specs' && (
          <div className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">Product Details</h3>
                <ul className="list-disc text-gray-100 list-inside space-y-1">
                  <li>Brand: {product.brand}</li>
                  <li>Category: {product.category}</li>
                  <li>Minimum Order Quantity: {product.minimumOrderQuantity}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">Dimensions & Weight</h3>
                <ul className="list-disc text-gray-100 list-inside space-y-1">
                  <li>Weight: {product.weight}g</li>
                  <li>Dimensions: {product.dimensions.width} x {product.dimensions.depth} x {product.dimensions.height} cm</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'warranty' && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-200 mb-2">Warranty Information</h3>
            <p className="text-gray-100">{product.warrantyInformation}</p>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-200 mb-2">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className={`w-4 h-4 ${j < review.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15.273l-6.364 3.33 1.227-7.155L.227 6.636l7.273-1.06L10 0l2.5 5.576 7.273 1.06-4.636 4.812 1.227 7.155z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-50">{review.reviewerName}</span>
                  </div>
                  <p className="text-sm text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'policies' && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-200 mb-2">Return Policy</h3>
            <p className="text-gray-400">{product.returnPolicy}</p>
          </div>
        )}
      </div>
    </div>
  );
}
