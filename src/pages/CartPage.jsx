import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from "../store/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl text-gray-200 font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
            🛒
          </div>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center text-xl font-bold"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="h-8 w-8 bg-gray-200 rounded-full flex justify-center items-center text-xl font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col items-end">
            <div className="text-xl text-gray-200 font-semibold mb-4">
              Total: ${calculateTotal(cartItems)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
