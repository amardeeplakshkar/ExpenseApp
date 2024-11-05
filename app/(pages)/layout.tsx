import type { Metadata } from "next";
import { DockComponent } from "@/components/app-with-dock";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col max-h-dvh min-h-dvh">
            <Navbar />
            <div className="flex-grow p-2">{children}</div>
            <DockComponent />
        </div>
    );
}