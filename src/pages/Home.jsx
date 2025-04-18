
import React from 'react';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Premium Wooden Box', description: 'Handcrafted premium wooden box with intricate designs', image: 'https://placehold.co/300x200/D2B48C/333?text=Wooden+Box' },
    { id: 2, name: 'Wooden Pallet', description: 'Industrial-grade wooden pallets for shipping and storage', image: 'https://placehold.co/300x200/D2B48C/333?text=Wooden+Pallet' },
    { id: 3, name: 'Decorative Box', description: 'Artistic wooden box for decoration and storage', image: 'https://placehold.co/300x200/D2B48C/333?text=Decorative+Box' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bapa Sitaram Wooden Box</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crafting quality wooden boxes and pallets for generations. Our commitment to craftsmanship and excellence makes us the preferred choice for wooden packaging solutions.
          </p>
        </div>
        
        <div className="wood-texture rounded-lg p-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="card-wooden overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-wooden p-6">
            <h3 className="text-xl font-semibold mb-4">Quality Craftsmanship</h3>
            <p className="text-muted-foreground">Our boxes are handcrafted by skilled artisans with decades of experience in woodworking.</p>
          </div>
          
          <div className="card-wooden p-6">
            <h3 className="text-xl font-semibold mb-4">Sustainable Materials</h3>
            <p className="text-muted-foreground">We use responsibly sourced wood and follow eco-friendly practices in our manufacturing process.</p>
          </div>
          
          <div className="card-wooden p-6">
            <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
            <p className="text-muted-foreground">We offer tailor-made wooden packaging solutions to meet your specific requirements.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
