
import { Link } from 'react-router-dom';
import { Package, Truck, Search, Award, ArrowRight } from 'lucide-react';

const Home = () => {
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Premium Teak Wood Box', 
      description: 'Handcrafted from premium teak wood with intricate carvings.',
      image: 'https://images.unsplash.com/photo-1605478822413-ca876dd07dc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹1200'
    },
    { 
      id: 2, 
      name: 'Wooden Pallets (Industrial)', 
      description: 'Heavy-duty wooden pallets perfect for industrial use.',
      image: 'https://images.unsplash.com/photo-1519677584237-752f8853252e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹850'
    },
    { 
      id: 3, 
      name: 'Decorative Storage Box', 
      description: 'Elegant storage solution with traditional Gujarat designs.',
      image: 'https://images.unsplash.com/photo-1609590981063-d197950921b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹1500'
    }
  ];

  const features = [
    { 
      icon: <Package size={40} />, 
      title: 'Premium Materials', 
      description: 'Crafted from high-quality woods including teak, rosewood, and mahogany.' 
    },
    { 
      icon: <Truck size={40} />, 
      title: 'Fast Delivery', 
      description: 'Quick nationwide shipping with special care for wooden products.' 
    },
    { 
      icon: <Search size={40} />, 
      title: 'Custom Orders', 
      description: 'Bespoke wooden solutions tailored to your specific requirements.' 
    },
    { 
      icon: <Award size={40} />, 
      title: 'Quality Guarantee', 
      description: 'Each product undergoes strict quality control before delivery.' 
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden card-wooden">
        <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/90 to-wood/70"></div>
        <div className="relative z-10 px-6 py-12 md:py-24 md:px-12 max-w-5xl mx-auto text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Handcrafted Wooden Excellence Since 1985
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Bapa Sitaram Wooden Box specializes in premium wooden boxes, pallets, and custom wooden solutions 
            for both decorative and industrial applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-wooden px-6 py-3">
              Browse Products
            </Link>
            <Link to="/inquiry" className="bg-white text-wood hover:bg-wood-light hover:text-white transition-colors duration-300 rounded-md px-6 py-3">
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Explore our most popular wooden creations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card-wooden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 w-full h-48 bg-muted overflow-hidden">
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
                  <Link 
                    to={`/products#product-${product.id}`} 
                    className="text-sm flex items-center text-primary hover:underline"
                  >
                    View Details <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products" className="btn-wooden inline-flex items-center">
            View All Products <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Choose Us</h2>
          <p className="text-muted-foreground mt-2">What makes our wooden products special</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-background rounded-xl text-center">
              <div className="text-wood-dark dark:text-wood-light mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="wood-texture rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-wood-dark dark:text-white mb-4">
            Need Custom Wooden Solutions?
          </h2>
          <p className="text-wood-dark dark:text-white mb-6">
            Contact us today for bespoke wooden boxes, pallets, or any custom woodworking projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inquiry" className="btn-wooden px-6 py-3">
              Submit Inquiry
            </Link>
            <Link to="/contact" className="bg-white text-wood hover:bg-wood-light hover:text-white transition-colors duration-300 rounded-md px-6 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
