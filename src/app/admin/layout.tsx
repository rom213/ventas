import Sidebar from "@/components/admin/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

            <div
                className={`antialiased h-full flex`}
            >
                <div>
                    <Sidebar />
                </div>
                <div className="h-full w-full bg-[#f6f7fa]">
                    {children}
                </div>
            </div>
    );
}
