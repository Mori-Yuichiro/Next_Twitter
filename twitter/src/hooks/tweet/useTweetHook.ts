import { TweetType } from "@/app/types/tweet";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default function useTweetHook(tweet: TweetType) {
    const pathName = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return {
        pathName,
        openMenu,
        setOpenMenu,
    }
}