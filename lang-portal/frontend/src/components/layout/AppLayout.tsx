
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="container max-w-7xl">
            <SidebarTrigger className="mb-6" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
