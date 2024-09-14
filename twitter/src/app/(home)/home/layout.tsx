import LightSidebar from "@/app/components/LightSideBar";
import Sidebar from "@/app/components/Sidebar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen px-32 flex">
            <Sidebar />
            <main className="w-2/3 max-lg:ml-20 ml-60 max-md:border-r max-md:border-black">{children}</main>
            <LightSidebar />
        </div>
    );
}