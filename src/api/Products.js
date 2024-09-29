export const fetchAllProducts = async (limit = 197, skip = 0) => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };


// Example fetchAllProducts function
export const fetchAllProduct = async (page = 1, size = 10) => {
  const url = `https://dummyjson.com/products?limit=${size}&skip=${(page-1)*10}`; // Adjust URL accordingly

  try {
    const response = await fetch(url);

   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error("Error fetching products:", error); // Log detailed error information
    throw error; // Rethrow the error to be handled in the calling function
  }
};



  export const fetchProduct = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };
  

  
  export const fetchProductsByQuery = async (query) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    return data.products || [];
  };
  