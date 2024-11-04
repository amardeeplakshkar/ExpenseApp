import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DockComponent } from "@/components/app-with-dock";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <div className="flex flex-col h-dvh">
          <Navbar/>
          <div className="p-2">
            {children}
          </div>
          <DockComponent />
        </div>
        <Toaster ExplorePage={undefined} />
            </ThemeProvider>
      </body>
    </html>
  );
}
