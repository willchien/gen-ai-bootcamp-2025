
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import StudyActivities from "./pages/StudyActivities";
import Words from "./pages/Words";
import Groups from "./pages/Groups";
import StudySessions from "./pages/StudySessions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/study_activities"
            element={
              <AppLayout>
                <StudyActivities />
              </AppLayout>
            }
          />
          <Route
            path="/words"
            element={
              <AppLayout>
                <Words />
              </AppLayout>
            }
          />
          <Route
            path="/groups"
            element={
              <AppLayout>
                <Groups />
              </AppLayout>
            }
          />
          <Route
            path="/study_sessions"
            element={
              <AppLayout>
                <StudySessions />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
