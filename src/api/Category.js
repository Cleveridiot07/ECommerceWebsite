

export const fetchCategories = async () => {
    try {

      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
  
      return data.map((category, index) => ({
        slug:category.slug,
        id: index + 1, 
        name: category.name,
        description: `Explore the ${category.name} category!`, 
        image: `./Categories/${category.slug}.jpeg` || './Logo.png', 
        url: category.url,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  

  

  export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await response.json();
    return data.products || [];
  };