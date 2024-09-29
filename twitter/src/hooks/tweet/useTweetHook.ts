import { usePathname } from "next/navigation";

export default function useTweetHook() {
    const pathName = usePathname();

    return { pathName }
}