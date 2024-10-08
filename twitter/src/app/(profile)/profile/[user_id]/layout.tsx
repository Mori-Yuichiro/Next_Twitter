import LightSidebar from "@/components/LightSideBar";
import Sidebar from "@/components/Sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex px-0 lg:px-28 md:px-20 sm:px-10">
            <Sidebar />
            <main className="w-2/3 max-lg:ml-20 ml-60 max-md:border-r max-md:border-black max-sm:border-l max-sm:mx-auto">{children}</main>
            <LightSidebar />
        </div>
    );
}