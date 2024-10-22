export default function GroupMessagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            {/* <Sidebar /> */}
            <main className="w-full max-md:border-r max-md:border-black">{children}</main>
            {/* <LightSidebar /> */}
        </div>
    );
}