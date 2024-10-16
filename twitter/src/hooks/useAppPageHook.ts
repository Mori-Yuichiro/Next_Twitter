import { useState } from "react";

export default function useAppPageHook() {
    const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);

    return {
        isGithubLoading,
        setIsGithubLoading,
        openRegisterModal,
        setOpenRegisterModal
    };
}