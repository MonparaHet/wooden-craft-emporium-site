
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center wood-texture">
      <div className="bg-card p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-wood-dark">404 - Page Not Found</h1>
        <p className="mb-6 text-muted-foreground">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link 
          to="/home" 
          className="btn-wooden inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
