import * as jose from 'jose';

export const verifyJWT = async (token: string, JWT_SECRET: string) => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        return payload;
    } catch (error) {
        // Re-throw the error to be caught by the middleware
        throw error;
    }
}