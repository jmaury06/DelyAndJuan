import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import InvitationPage from "./pages/invitacion/[token]";
import PhotoGallery from "./pages/PhotoGallery";
import Admin from "./pages/Admin";

import ItineraryPage from "./pages/itinerario";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Ruta pública - Home page (Demo) */}
              <Route path="/" element={<Index />} />
              
              {/* Ruta protegida - Solo admin */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              
              {/* Rutas públicas - Invitaciones */}
              <Route path="/invitacion/:token" element={<InvitationPage />} />
              <Route path="/photo_collage" element={<PhotoGallery />} />
              <Route path="/itinerario" element={<ItineraryPage />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
