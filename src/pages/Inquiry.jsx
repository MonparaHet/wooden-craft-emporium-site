
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Check } from 'lucide-react';

const Inquiry = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productFromQuery = queryParams.get('product');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: productFromQuery || '',
    quantity: '',
    description: '',
    preferredContactMethod: 'email'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (productFromQuery) {
      setFormData(prev => ({
        ...prev,
        product: productFromQuery
      }));
    }
  }, [productFromQuery]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.product.trim()) newErrors.product = 'Product is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          product: '',
          quantity: '',
          description: '',
          preferredContactMethod: 'email'
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Product options
  const productOptions = [
    { value: '', label: 'Select a product' },
    { value: 'Wooden Boxes', label: 'Wooden Boxes' },
    { value: 'Wooden Pallets', label: 'Wooden Pallets' },
    { value: 'Wooden Crates', label: 'Wooden Crates' },
    { value: 'Custom Woodwork', label: 'Custom Woodwork' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Product Inquiry</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to inquire about our wooden products
        </p>
      </div>

      <div className="card-wooden p-6">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Inquiry Submitted Successfully!</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in our products. We will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? 'border-destructive' : 'border-input'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background`}
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? 'border-destructive' : 'border-input'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background`}
                />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.phone ? 'border-destructive' : 'border-input'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background`}
                />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
              </div>

              {/* Product */}
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-foreground mb-1">
                  Product <span className="text-destructive">*</span>
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.product ? 'border-destructive' : 'border-input'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background`}
                >
                  {productOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.product && <p className="mt-1 text-sm text-destructive">{errors.product}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  placeholder="e.g., 10 units, 100 pcs"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-destructive' : 'border-input'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background`}
                placeholder="Please provide details about your requirements..."
              />
              {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Contact Method
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="email"
                    checked={formData.preferredContactMethod === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4 text-wood-dark focus:ring-wood-dark"
                  />
                  <span className="ml-2 text-sm">Email</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="phone"
                    checked={formData.preferredContactMethod === 'phone'}
                    onChange={handleChange}
                    className="w-4 h-4 text-wood-dark focus:ring-wood-dark"
                  />
                  <span className="ml-2 text-sm">Phone</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value="whatsapp"
                    checked={formData.preferredContactMethod === 'whatsapp'}
                    onChange={handleChange}
                    className="w-4 h-4 text-wood-dark focus:ring-wood-dark"
                  />
                  <span className="ml-2 text-sm">WhatsApp</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-wooden px-6 py-3 flex items-center justify-center min-w-[200px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Submit Inquiry
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Why Choose Bapa Sitaram Wooden Box?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check size={20} className="text-wood-dark mr-2 mt-0.5" />
            <span>Premium quality wooden products crafted with attention to detail</span>
          </li>
          <li className="flex items-start">
            <Check size={20} className="text-wood-dark mr-2 mt-0.5" />
            <span>Customization options to meet your specific requirements</span>
          </li>
          <li className="flex items-start">
            <Check size={20} className="text-wood-dark mr-2 mt-0.5" />
            <span>Competitive pricing with bulk order discounts</span>
          </li>
          <li className="flex items-start">
            <Check size={20} className="text-wood-dark mr-2 mt-0.5" />
            <span>Fast production and delivery timelines</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inquiry;
