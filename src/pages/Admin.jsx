
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/ui/sonner';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''
  });
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data based on active tab
        if (activeTab === 'products') {
          const response = await fetch('/api/products', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProducts(data);
        } 
        else if (activeTab === 'inquiries') {
          const response = await fetch('/api/inquiries', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch inquiries');
          const data = await response.json();
          setInquiries(data);
        }
        else if (activeTab === 'users') {
          const response = await fetch('/api/users', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch users');
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        toast.error(`Failed to load ${activeTab}. Please try again.`);
        
        // Set sample data for demonstration
        if (activeTab === 'products') {
          setProducts(sampleProducts);
        } else if (activeTab === 'inquiries') {
          setInquiries(sampleInquiries);
        } else if (activeTab === 'users') {
          setUsers(sampleUsers);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);
  
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct._id}` 
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productFormData)
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      
      toast.success(`Product ${editingProduct ? 'updated' : 'added'} successfully!`);
      
      // Update local state
      if (editingProduct) {
        setProducts(products.map(p => 
          p._id === editingProduct._id ? { ...p, ...productFormData } : p
        ));
      } else {
        // For demo purposes, we'll just add with a dummy ID
        setProducts([...products, { _id: Date.now().toString(), ...productFormData }]);
      }
      
      // Reset form
      setProductFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        image: ''
      });
      setEditingProduct(null);
      setShowProductForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    }
  };
  
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image
    });
    setShowProductForm(true);
  };
  
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      toast.success('Product deleted successfully!');
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };
  
  const handleMarkInquiryAsResponded = async (inquiryId) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}/respond`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to update inquiry');
      
      toast.success('Inquiry marked as responded!');
      setInquiries(inquiries.map(inq => 
        inq._id === inquiryId ? { ...inq, responded: true } : inq
      ));
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast.error('Failed to update inquiry. Please try again.');
    }
  };
  
  // Sample data for demonstration
  const sampleProducts = [
    { _id: '1', name: 'Standard Wooden Box', category: 'Boxes', description: 'Our standard wooden box for general packaging needs', price: 450, image: 'https://placehold.co/100x100/D2B48C/333?text=Box' },
    { _id: '2', name: 'Premium Wooden Box', category: 'Boxes', description: 'Premium quality wooden box with secure closing mechanism', price: 750, image: 'https://placehold.co/100x100/D2B48C/333?text=Box' },
    { _id: '3', name: 'Heavy Duty Pallet', category: 'Pallets', description: 'Industrial grade wooden pallet for heavy loads', price: 1200, image: 'https://placehold.co/100x100/D2B48C/333?text=Pallet' }
  ];
  
  const sampleInquiries = [
    { _id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543210', productType: 'Wooden Boxes', quantity: '50', specifications: '10x10x5 inches', message: 'Need these for packaging electronics.', responded: false, createdAt: '2024-04-15T10:30:00Z' },
    { _id: '2', name: 'Priya Sharma', email: 'priya@example.com', phone: '8765432109', productType: 'Wooden Pallets', quantity: '20', specifications: 'Standard size', message: 'For our warehouse storage.', responded: true, createdAt: '2024-04-14T09:15:00Z' },
    { _id: '3', name: 'Amit Singh', email: 'amit@example.com', phone: '7654321098', productType: 'Custom Solutions', quantity: '10', specifications: 'Custom size needed', message: 'Looking for custom wooden boxes for gift packaging.', responded: false, createdAt: '2024-04-13T14:45:00Z' }
  ];
  
  const sampleUsers = [
    { _id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: '2024-03-01T10:00:00Z' },
    { _id: '2', name: 'Sales Rep', email: 'sales@example.com', role: 'staff', createdAt: '2024-03-15T11:30:00Z' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Welcome back, {user?.name || 'Admin'}!
        </p>
      </div>
      
      <div className="card-wooden mb-8">
        <div className="flex overflow-x-auto">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'products' ? 'bg-wood text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleTabChange('products')}
          >
            Products
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'inquiries' ? 'bg-wood text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleTabChange('inquiries')}
          >
            Inquiries
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'users' ? 'bg-wood text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleTabChange('users')}
          >
            Users
          </button>
        </div>
      </div>
      
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <button 
              className="btn-wooden"
              onClick={() => {
                setEditingProduct(null);
                setProductFormData({
                  name: '',
                  category: '',
                  description: '',
                  price: '',
                  image: ''
                });
                setShowProductForm(!showProductForm);
              }}
            >
              {showProductForm ? 'Cancel' : 'Add New Product'}
            </button>
          </div>
          
          {showProductForm && (
            <div className="card-wooden p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Product Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productFormData.name}
                      onChange={handleProductChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={productFormData.category}
                      onChange={handleProductChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Category</option>
                      <option value="Boxes">Boxes</option>
                      <option value="Pallets">Pallets</option>
                      <option value="Decorative">Decorative</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={productFormData.description}
                      onChange={handleProductChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                      Price (₹)*
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={productFormData.price}
                      onChange={handleProductChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1">
                      Image URL*
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={productFormData.image}
                      onChange={handleProductChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-wooden"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-wood border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.length > 0 ? (
                    products.map(product => (
                      <tr key={product._id} className="hover:bg-muted/50">
                        <td className="p-4">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="p-4">{product.name}</td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="px-3 py-1 bg-wood/80 text-white rounded-md hover:bg-wood"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-3 py-1 bg-destructive/80 text-white rounded-md hover:bg-destructive"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-muted-foreground">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'inquiries' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Customer Inquiries</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-wood border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">Loading inquiries...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {inquiries.length > 0 ? (
                inquiries.map(inquiry => (
                  <div key={inquiry._id} className={`card-wooden p-6 ${inquiry.responded ? 'border-l-4 border-l-wood/30' : 'border-l-4 border-l-wood'}`}>
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold mb-2">{inquiry.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${inquiry.responded ? 'bg-wood/20 text-wood-dark' : 'bg-wood text-white'}`}>
                        {inquiry.responded ? 'Responded' : 'New'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {new Date(inquiry.createdAt).toLocaleDateString()} - {inquiry.email} - {inquiry.phone}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium">Product Type:</span>
                        <p>{inquiry.productType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Quantity:</span>
                        <p>{inquiry.quantity}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Specifications:</span>
                        <p>{inquiry.specifications}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-sm font-medium">Message:</span>
                      <p className="mt-1 text-muted-foreground">{inquiry.message}</p>
                    </div>
                    {!inquiry.responded && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleMarkInquiryAsResponded(inquiry._id)}
                          className="btn-wooden"
                        >
                          Mark as Responded
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No inquiries found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-wood border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user._id} className="hover:bg-muted/50">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-wood text-white' : 'bg-secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-muted-foreground">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
