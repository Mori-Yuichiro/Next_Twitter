import axios from "axios";
import { headers } from "next/headers";

export default function axiosInstance() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: Object.fromEntries(headers())
    });

    return { instance };
}