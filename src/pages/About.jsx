
import { MapPin, Calendar, Users, Award, Star } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '1985', event: 'Founded by Mr. Sitaram Patel in a small workshop in Gujarat' },
    { year: '1992', event: 'Expanded operations and moved to larger manufacturing facility' },
    { year: '2000', event: 'Started exporting wooden products internationally' },
    { year: '2008', event: 'Received ISO 9001 certification for quality management' },
    { year: '2015', event: 'Celebrated 30 years with introduction of premium product line' },
    { year: '2020', event: 'Modernized production with advanced woodworking equipment' },
    { year: '2023', event: 'Expanded product range to include eco-friendly wooden alternatives' }
  ];

  const team = [
    { 
      name: 'Rajesh Patel', 
      role: 'Managing Director',
      bio: 'Son of founder Sitaram Patel, leading the company since 2005 with a focus on innovation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Anita Sharma', 
      role: 'Production Manager',
      bio: 'Expert in woodworking with 15 years of experience ensuring quality in every product.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Vijay Kumar', 
      role: 'Head of Design',
      bio: 'Creative expert who combines traditional craftsmanship with modern design principles.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden card-wooden">
        <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/90 to-wood/70"></div>
        <div className="relative z-10 px-6 py-12 md:py-16 max-w-4xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-lg">
            For over 35 years, Bapa Sitaram Wooden Box has been crafting premium wooden products 
            that combine traditional craftsmanship with modern manufacturing techniques. 
            From humble beginnings in a small workshop to becoming a recognized name in wooden 
            packaging solutions, our journey has been built on quality, integrity, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-wooden p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
            <Star className="mr-2 text-wood-dark dark:text-wood-light" size={28} />
            Our Mission
          </h2>
          <p className="text-muted-foreground">
            To provide high-quality, sustainable wooden products that meet the diverse needs 
            of our customers while preserving traditional woodworking craftsmanship and embracing 
            innovative manufacturing techniques.
          </p>
        </div>
        <div className="card-wooden p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-foreground">
            <Star className="mr-2 text-wood-dark dark:text-wood-light" size={28} />
            Our Vision
          </h2>
          <p className="text-muted-foreground">
            To be recognized globally as a leading manufacturer of premium wooden packaging 
            solutions, known for our commitment to quality, sustainability, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Company Timeline */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Journey</h2>
          <p className="text-muted-foreground mt-2">Key milestones in our history</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-wood/30 transform md:translate-x-px"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8 md:pl-0 pl-8 pb-8 md:pb-0">
                  <div className={`w-full md:max-w-sm card-wooden p-4 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <div className="flex items-center mb-2">
                      <Calendar className="text-wood-dark dark:text-wood-light mr-2" size={18} />
                      <span className="font-bold text-foreground">{milestone.year}</span>
                    </div>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-4 md:top-6 w-6 h-6 rounded-full bg-wood-dark border-4 border-card transform -translate-x-1/2"></div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Values</h2>
          <p className="text-muted-foreground mt-2">The principles that guide our work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-background rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Quality</h3>
            <p className="text-muted-foreground">
              We maintain the highest standards in our materials, craftsmanship, and final products,
              ensuring durability and customer satisfaction.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Sustainability</h3>
            <p className="text-muted-foreground">
              We are committed to responsible sourcing of wood and environmentally friendly
              manufacturing processes to minimize our ecological footprint.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Innovation</h3>
            <p className="text-muted-foreground">
              While respecting traditional woodworking techniques, we continuously seek
              innovative ways to improve our products and processes.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Leadership Team</h2>
          <p className="text-muted-foreground mt-2">The people behind our success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="card-wooden overflow-hidden">
              <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-muted overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-wood-dark dark:text-wood-light text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="card-wooden p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Our Certifications</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center bg-background p-3 rounded-lg">
            <Award className="text-wood-dark dark:text-wood-light mr-2" size={24} />
            <span>ISO 9001 Certified</span>
          </div>
          <div className="flex items-center bg-background p-3 rounded-lg">
            <Award className="text-wood-dark dark:text-wood-light mr-2" size={24} />
            <span>FSC Certified Wood</span>
          </div>
          <div className="flex items-center bg-background p-3 rounded-lg">
            <Award className="text-wood-dark dark:text-wood-light mr-2" size={24} />
            <span>Eco-Friendly Manufacturing</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
