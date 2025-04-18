
import { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Placeholder product data
  const products = [
    {
      id: 1,
      name: 'Premium Teak Wood Box',
      description: 'Handcrafted from premium teak wood with intricate carvings.',
      price: '₹1,200',
      image: 'https://images.unsplash.com/photo-1605478822413-ca876dd07dc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'boxes'
    },
    {
      id: 2,
      name: 'Wooden Pallets (Industrial)',
      description: 'Heavy-duty wooden pallets perfect for industrial use.',
      price: '₹850',
      image: 'https://images.unsplash.com/photo-1519677584237-752f8853252e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'pallets'
    },
    {
      id: 3,
      name: 'Decorative Storage Box',
      description: 'Elegant storage solution with traditional Gujarat designs.',
      price: '₹1,500',
      image: 'https://images.unsplash.com/photo-1609590981063-d197950921b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'boxes'
    },
    {
      id: 4,
      name: 'Export Quality Wooden Pallet',
      description: 'Sturdy pallets designed for international shipping standards.',
      price: '₹950',
      image: 'https://images.unsplash.com/photo-1575986767340-5d17ae0de1d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'pallets'
    },
    {
      id: 5,
      name: 'Rosewood Jewelry Box',
      description: 'Exquisite jewelry box with multiple compartments and fine finish.',
      price: '₹2,200',
      image: 'https://images.unsplash.com/photo-1594761051656-134e494f8b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'boxes'
    },
    {
      id: 6,
      name: 'Wooden Crate for Fruits',
      description: 'Lightweight yet durable wooden crates for fruit packaging.',
      price: '₹600',
      image: 'https://images.unsplash.com/photo-1591438252948-fa5dd3701c2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'crates'
    },
    {
      id: 7,
      name: 'Wine Bottle Wooden Case',
      description: 'Elegant wooden case for wine bottle gifting and storage.',
      price: '₹1,100',
      image: 'https://images.unsplash.com/photo-1588710277537-126980e8d44e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'boxes'
    },
    {
      id: 8,
      name: 'Industrial Heavy-Duty Pallet',
      description: 'Extra strong wooden pallets for warehouse and factory use.',
      price: '₹1,250',
      image: 'https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'pallets'
    },
    {
      id: 9,
      name: 'Designer Wooden Gift Box',
      description: 'Beautiful wooden gift box with customizable engraving options.',
      price: '₹950',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'boxes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'boxes', name: 'Wooden Boxes' },
    { id: 'pallets', name: 'Wooden Pallets' },
    { id: 'crates', name: 'Wooden Crates' }
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Our Products</h1>
        <p className="text-muted-foreground mt-2">Browse our collection of quality wooden products</p>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-muted-foreground" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-wood text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} id={`product-${product.id}`} className="card-wooden hover:shadow-lg transition-shadow">
            <div className="aspect-w-4 aspect-h-3 w-full h-48 bg-muted overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-wood-dark dark:text-wood-light">{product.price}</span>
                <div className="flex space-x-2">
                  <Link 
                    to={`/inquiry?product=${encodeURIComponent(product.name)}`} 
                    className="btn-wooden py-1 px-3 text-sm"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <button 
            className="mt-4 btn-wooden"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Custom Order CTA */}
      <div className="bg-gradient-to-r from-wood to-wood-dark text-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Need a Custom Wooden Product?</h2>
        <p className="mb-4">We offer custom woodworking solutions tailored to your specific requirements.</p>
        <Link to="/inquiry" className="inline-block bg-white text-wood-dark hover:bg-wood-light hover:text-white transition-colors duration-300 rounded-md px-4 py-2">
          Request a Quote
        </Link>
      </div>
    </div>
  );
};

export default Products;
