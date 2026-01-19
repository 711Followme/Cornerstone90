import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "@/pages/Index";
import Reading from "@/pages/Reading";
import Workout from "@/pages/Workout";
import Disciplines from "@/pages/Disciplines";
import Brotherhood from "@/pages/Brotherhood";
import Progress from "@/pages/Progress";
import Profile from "@/pages/Profile";
import VisionSetup from "@/pages/VisionSetup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarInset className="flex-1 w-full min-w-0">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/reading" element={<Reading />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/disciplines" element={<Disciplines />} />
                    <Route path="/brotherhood" element={<Brotherhood />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/vision-setup" element={<VisionSetup />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
