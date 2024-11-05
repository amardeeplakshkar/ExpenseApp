import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-dvh min-w-dvh overflow-hidden flex justify-center items-center bg-slate-900">
            {children}
        </main>
    );
}
