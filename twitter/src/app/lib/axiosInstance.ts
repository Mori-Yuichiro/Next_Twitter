import axios from "axios";

export default function axiosInstance() {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    return { instance };
}