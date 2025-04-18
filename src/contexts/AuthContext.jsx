
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // Simulating API call for now
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Basic validation
          if (email === 'admin@example.com' && password === 'password') {
            const user = { 
              id: '1', 
              email, 
              name: 'Admin User',
              role: 'admin'
            };
            const newToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
            setToken(newToken);
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            resolve(user);
          } else if (email && password) {
            const user = { 
              id: '2', 
              email, 
              name: 'Regular User',
              role: 'user'
            };
            const newToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
            setToken(newToken);
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            resolve(user);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
