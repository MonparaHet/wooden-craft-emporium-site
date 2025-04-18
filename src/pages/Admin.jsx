
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Package, Users, MessageSquare, Settings, 
  PlusCircle, Edit, Trash2, Search, FilterX, Eye 
} from 'lucide-react';

const Admin = () => {
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Mock data
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Teak Wood Box', price: '₹1,200', stock: 45, category: 'boxes', image: 'https://images.unsplash.com/photo-1605478822413-ca876dd07dc9' },
    { id: 2, name: 'Wooden Pallets (Industrial)', price: '₹850', stock: 120, category: 'pallets', image: 'https://images.unsplash.com/photo-1519677584237-752f8853252e' },
    { id: 3, name: 'Decorative Storage Box', price: '₹1,500', stock: 30, category: 'boxes', image: 'https://images.unsplash.com/photo-1609590981063-d197950921b1' },
    { id: 4, name: 'Export Quality Wooden Pallet', price: '₹950', stock: 85, category: 'pallets', image: 'https://images.unsplash.com/photo-1575986767340-5d17ae0de1d9' },
    { id: 5, name: 'Rosewood Jewelry Box', price: '₹2,200', stock: 15, category: 'boxes', image: 'https://images.unsplash.com/photo-1594761051656-134e494f8b3d' }
  ]);
  
  const [inquiries, setInquiries] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', product: 'Wooden Pallets', status: 'new', date: '2023-04-15', message: 'I need a quote for 50 wooden pallets for my factory.' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', product: 'Jewelry Box', status: 'responded', date: '2023-04-12', message: 'Do you have any customized jewelry boxes with traditional Gujarati designs?' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', product: 'Custom Crates', status: 'pending', date: '2023-04-10', message: 'We are looking for custom wooden crates for shipping electronics. Can you provide some samples?' },
    { id: 4, name: 'Sneha Desai', email: 'sneha@example.com', product: 'Gift Boxes', status: 'closed', date: '2023-04-05', message: 'I need 100 small gift boxes for corporate gifting. Do you offer bulk discounts?' }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', lastLogin: '2023-04-15 09:45' },
    { id: 2, name: 'Sales Manager', email: 'sales@example.com', role: 'manager', lastLogin: '2023-04-14 16:30' },
    { id: 3, name: 'Support Staff', email: 'support@example.com', role: 'support', lastLogin: '2023-04-15 11:20' }
  ]);

  const filteredData = () => {
    if (!searchTerm) {
      switch (activeTab) {
        case 'products': return products;
        case 'inquiries': return inquiries;
        case 'users': return users;
        default: return [];
      }
    }

    const term = searchTerm.toLowerCase();
    
    switch (activeTab) {
      case 'products':
        return products.filter(product => 
          product.name.toLowerCase().includes(term) || 
          product.category.toLowerCase().includes(term)
        );
      case 'inquiries':
        return inquiries.filter(inquiry => 
          inquiry.name.toLowerCase().includes(term) || 
          inquiry.email.toLowerCase().includes(term) || 
          inquiry.product.toLowerCase().includes(term) ||
          inquiry.status.toLowerCase().includes(term)
        );
      case 'users':
        return users.filter(user => 
          user.name.toLowerCase().includes(term) || 
          user.email.toLowerCase().includes(term) || 
          user.role.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setSelectedItem(null);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (activeTab) {
        case 'products':
          setProducts(products.filter(product => product.id !== id));
          break;
        case 'inquiries':
          setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
          break;
        case 'users':
          setUsers(users.filter(user => user.id !== id));
          break;
        default:
          break;
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Render different forms based on active tab
  const renderForm = () => {
    if (!showAddModal) return null;
    
    switch (activeTab) {
      case 'products':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{selectedItem ? 'Edit Product' : 'Add New Product'}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background">
                    <option value="boxes" selected={selectedItem?.category === 'boxes'}>Wooden Boxes</option>
                    <option value="pallets" selected={selectedItem?.category === 'pallets'}>Wooden Pallets</option>
                    <option value="crates" selected={selectedItem?.category === 'crates'}>Wooden Crates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.price || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.stock || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.image || ''}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-wooden"
                    onClick={handleCloseModal}
                  >
                    {selectedItem ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'inquiries':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{selectedItem ? 'Edit Inquiry' : 'Add New Inquiry'}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.email || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Product</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.product || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background">
                    <option value="new" selected={selectedItem?.status === 'new'}>New</option>
                    <option value="pending" selected={selectedItem?.status === 'pending'}>Pending</option>
                    <option value="responded" selected={selectedItem?.status === 'responded'}>Responded</option>
                    <option value="closed" selected={selectedItem?.status === 'closed'}>Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.message || ''}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-wooden"
                    onClick={handleCloseModal}
                  >
                    {selectedItem ? 'Update Inquiry' : 'Add Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{selectedItem ? 'Edit User' : 'Add New User'}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    defaultValue={selectedItem?.email || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background">
                    <option value="admin" selected={selectedItem?.role === 'admin'}>Admin</option>
                    <option value="manager" selected={selectedItem?.role === 'manager'}>Manager</option>
                    <option value="support" selected={selectedItem?.role === 'support'}>Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder={selectedItem ? '••••••••' : ''}
                  />
                  {selectedItem && (
                    <p className="text-xs text-muted-foreground mt-1">Leave blank to keep current password</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-wooden"
                    onClick={handleCloseModal}
                  >
                    {selectedItem ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // View modal
  const renderViewModal = () => {
    if (!showViewModal || !selectedItem) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'products' ? 'Product Details' : 
             activeTab === 'inquiries' ? 'Inquiry Details' : 'User Details'}
          </h2>
          
          <div className="space-y-3">
            {Object.entries(selectedItem).map(([key, value]) => {
              // Skip id
              if (key === 'id') return null;
              
              // Format key for display
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              
              return (
                <div key={key}>
                  <span className="font-medium">{formattedKey}: </span>
                  {key === 'image' ? (
                    <div className="mt-2">
                      <img 
                        src={`${value}?w=300&h=200&fit=crop`} 
                        alt={selectedItem.name} 
                        className="rounded-md border"
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground">{value}</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              type="button" 
              className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, <span className="font-medium text-foreground">{currentUser?.name}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-6">
          <button
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'products'
                ? 'border-wood-dark text-wood-dark dark:border-wood-light dark:text-wood-light'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('products')}
          >
            <div className="flex items-center">
              <Package size={18} className="mr-2" />
              Products
            </div>
          </button>
          <button
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'inquiries'
                ? 'border-wood-dark text-wood-dark dark:border-wood-light dark:text-wood-light'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('inquiries')}
          >
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Inquiries
            </div>
          </button>
          <button
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'users'
                ? 'border-wood-dark text-wood-dark dark:border-wood-light dark:text-wood-light'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              Users
            </div>
          </button>
          <button
            className={`py-3 px-1 border-b-2 font-medium ${
              activeTab === 'settings'
                ? 'border-wood-dark text-wood-dark dark:border-wood-light dark:text-wood-light'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <div className="flex items-center">
              <Settings size={18} className="mr-2" />
              Settings
            </div>
          </button>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full sm:w-80 pl-10 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={handleClearSearch}
            >
              <FilterX size={18} className="text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        {activeTab !== 'settings' && (
          <button
            className="btn-wooden w-full sm:w-auto flex items-center justify-center"
            onClick={handleAddNew}
          >
            <PlusCircle size={18} className="mr-2" />
            {activeTab === 'products' && 'Add Product'}
            {activeTab === 'inquiries' && 'Add Inquiry'}
            {activeTab === 'users' && 'Add User'}
          </button>
        )}
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === 'products' && (
        <div className="overflow-x-auto card-wooden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredData().map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={`${product.image}?w=40&h=40&fit=crop`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 50 ? 'bg-green-100 text-green-800' : 
                      product.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleView(product)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found
            </div>
          )}
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="overflow-x-auto card-wooden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredData().map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-0">
                        <div className="text-sm font-medium text-foreground">{inquiry.name}</div>
                        <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {inquiry.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {inquiry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                      inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      inquiry.status === 'responded' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleView(inquiry)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleEdit(inquiry)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleDelete(inquiry.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No inquiries found
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="overflow-x-auto card-wooden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredData().map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleView(user)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-muted"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit size={16} />
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-muted"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-wooden p-6">
            <h2 className="text-lg font-semibold mb-4">Company Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue="Bapa Sitaram Wooden Box"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue="info@bapasitaram.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue="+91 99999 99999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue="123 Wood Lane, Carpenter's District, Gujarat, India 380001"
                />
              </div>
              <button type="button" className="btn-wooden">
                Save Changes
              </button>
            </form>
          </div>
          
          <div className="card-wooden p-6">
            <h2 className="text-lg font-semibold mb-4">Your Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue={currentUser?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  defaultValue={currentUser?.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  placeholder="Enter new password"
                />
              </div>
              <button type="button" className="btn-wooden">
                Update Account
              </button>
            </form>
          </div>
          
          <div className="card-wooden p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Website Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-2">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Site Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                      defaultValue="Bapa Sitaram Wooden Box - Premium Wooden Packaging Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <textarea 
                      rows={2}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                      defaultValue="Premium wooden boxes, pallets, and crates manufacturer in Gujarat, India. Quality wooden packaging solutions for industrial and decorative use."
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Social Media Links</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <input 
                      type="url" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                      defaultValue="https://facebook.com/bapasitaram"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input 
                      type="url" 
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                      defaultValue="https://instagram.com/bapasitaram"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button type="button" className="btn-wooden">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {renderForm()}
      
      {/* View Modal */}
      {renderViewModal()}
    </div>
  );
};

export default Admin;
