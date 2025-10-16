import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder Toast component (replace with your own if needed)
const ToasterPlaceholder = () => null;

/**
 * App Component
 * - Sets up React Router for navigation
 * - Includes placeholder toast/notification components
 * - Handles all unknown routes with NotFound page
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Toast / Notification placeholders */}
      <ToasterPlaceholder />

      {/* Routes */}
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<Index />} />

        {/* Add additional custom routes above the catch-all */}
        {/* Example: <Route path="/about" element={<About />} /> */}

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
