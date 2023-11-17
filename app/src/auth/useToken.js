import { useState } from "react";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    const [isLoading, setIsLoading] = useState(false);

    const setToken = newToken => {
        setIsLoading(true);
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
        setIsLoading(false);
    }

    return [token, setToken, isLoading]

}
