import { useSelector } from "react-redux";
export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemslength = cartItems.length;
    return (
      <>  
      <nav className="bg-white fixed w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="./Logo.png" alt="Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800">EShop</span>
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </a>
              <a href="/cart" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemslength}
                </span>
                <span className="sr-only">Cart</span>
              </a>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile menu, show/hide based on menu state */}
        <div className="sm:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Categories
            </a>
            <a
              href="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Cart {cartItemslength}
            </a>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
      </>
    )
  }