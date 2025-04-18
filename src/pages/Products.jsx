
import React, { useState, useEffect } from 'react';
import { toast } from '../components/ui/sonner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Boxes', 'Pallets', 'Decorative', 'Custom'];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again later.');
        // Fallback to sample data if API fails
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
    
  // Sample products as fallback
  const sampleProducts = [
    { id: 1, name: 'Standard Wooden Box', category: 'Boxes', description: 'Our standard wooden box for general packaging needs', price: 450, image: 'https://placehold.co/300x200/D2B48C/333?text=Standard+Box' },
    { id: 2, name: 'Premium Wooden Box', category: 'Boxes', description: 'Premium quality wooden box with secure closing mechanism', price: 750, image: 'https://placehold.co/300x200/D2B48C/333?text=Premium+Box' },
    { id: 3, name: 'Heavy Duty Pallet', category: 'Pallets', description: 'Industrial grade wooden pallet for heavy loads', price: 1200, image: 'https://placehold.co/300x200/D2B48C/333?text=Heavy+Pallet' },
    { id: 4, name: 'Decorative Jewelry Box', category: 'Decorative', description: 'Handcrafted decorative box for jewelry storage', price: 950, image: 'https://placehold.co/300x200/D2B48C/333?text=Jewelry+Box' },
    { id: 5, name: 'Custom Size Shipping Box', category: 'Custom', description: 'Customizable wooden box built to your specifications', price: 'Varies', image: 'https://placehold.co/300x200/D2B48C/333?text=Custom+Box' },
    { id: 6, name: 'Light Duty Pallet', category: 'Pallets', description: 'Lightweight wooden pallet for standard loads', price: 800, image: 'https://placehold.co/300x200/D2B48C/333?text=Light+Pallet' }
  ];
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-wood border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-2 text-wood-dark">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Browse our collection of high-quality wooden boxes, pallets, and custom wooden solutions.
        </p>
      </div>
      
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category 
                ? 'bg-wood text-white' 
                : 'bg-secondary text-foreground hover:bg-wood/50'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="card-wooden overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-wood-dark">₹{product.price}</span>
                  <button className="btn-wooden">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
