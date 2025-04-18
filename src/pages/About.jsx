
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Bapa Sitaram Wooden Box</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A legacy of craftsmanship and excellence in wooden packaging solutions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 1985, Bapa Sitaram Wooden Box has been a pioneer in the wooden packaging industry for over three decades. What started as a small family-owned workshop has grown into one of the most trusted names in wooden packaging solutions.
          </p>
          <p className="text-muted-foreground mb-4">
            Our journey began with a simple mission: to provide high-quality wooden boxes that meet the diverse needs of our customers. Over the years, we have expanded our product range to include wooden pallets, decorative boxes, and custom wooden packaging solutions.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to uphold the traditions of craftsmanship while embracing modern techniques and sustainable practices to deliver products that exceed customer expectations.
          </p>
        </div>
        
        <div className="order-1 md:order-2">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://placehold.co/600x400/D2B48C/333?text=Our+Workshop" 
              alt="Our Workshop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="card-wooden p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-wood-light inline-flex p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-wood-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">We never compromise on the quality of our products, using only the finest materials and craftsmanship.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-wood-light inline-flex p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-wood-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">We are committed to sustainable practices, using responsibly sourced wood and minimizing waste.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-wood-light inline-flex p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-wood-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
            <p className="text-muted-foreground">We prioritize customer satisfaction, working closely with clients to meet their specific needs.</p>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Rajesh Sharma', role: 'Founder & CEO', image: 'https://placehold.co/300x300/D2B48C/333?text=RS' },
            { name: 'Priya Patel', role: 'Production Manager', image: 'https://placehold.co/300x300/D2B48C/333?text=PP' },
            { name: 'Vijay Singh', role: 'Head Craftsman', image: 'https://placehold.co/300x300/D2B48C/333?text=VS' },
            { name: 'Anita Desai', role: 'Customer Relations', image: 'https://placehold.co/300x300/D2B48C/333?text=AD' }
          ].map(member => (
            <div key={member.name} className="card-wooden overflow-hidden text-center">
              <div className="p-4">
                <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
