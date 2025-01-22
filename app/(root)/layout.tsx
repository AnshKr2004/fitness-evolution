import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdminProvider } from "@/context/admin";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminProvider>
            <Navbar />
            <Sidebar />
            {children}
        </AdminProvider>
    );
}
