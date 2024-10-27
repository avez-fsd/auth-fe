import { jwtDecode, JwtPayload } from "jwt-decode";

export const getErrorMessage = (error: any) => {
    if(typeof error === "string") {
        return error;
    } else if(Array.isArray(error)) {
        return error[0];
    }
    return error;
}

export const isAuthenticated = () => {

    const token = localStorage.getItem('token');
    if(!token) return false;
    try {
        const decodedToken = jwtDecode(token) as JwtPayload;
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            return false;
        }
    } catch (error) {
        return false;
    }

    return true;
}