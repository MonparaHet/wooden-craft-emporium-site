
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useState, useEffect } from "react";

// Page imports
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Inquiry from "./pages/Inquiry";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center wood-texture">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-wood-dark">Bapa Sitaram Wooden Box</h1>
          <div className="animate-pulse text-xl text-wood-dark">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/inquiry" element={<Inquiry />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
