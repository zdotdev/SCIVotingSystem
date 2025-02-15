import { start_mongo } from "$db/db";
import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';

// Start MongoDB
start_mongo()
    .then(() => {
        console.log("Server Running...");
    })
    .catch((err: Error) => {
        console.error(err);
    }); 

// Custom type for response-like objects
interface ResponseLike {
    headers: Headers;
}

// Implementing CORS manually
function handleCors(request: Request, response: ResponseLike) {
    const allowedOrigins = ['http://localhost:6900', 'http://localhost:5173'];
    const origin = request.headers.get('origin');

    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    if (request.method === 'OPTIONS') {
        return json(null, { status: 204, headers: response.headers });
    }
}

// Implementing Helmet-like security headers manually
function setSecurityHeaders(response: Response): void {
    response.headers.set(
        'Content-Security-Policy',
        `
            default-src 'self';
            connect-src 'self' http://localhost:6900;
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-inline';
        `.replace(/\s{2,}/g, ' ').trim()
    );
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
}

// Main hook to handle requests
export const handle: Handle = async ({ event, resolve }) => {
    const { request } = event;

    // Create a response object to manipulate headers
    const responseHeaders = new Headers();

    // Handle CORS
    const corsResponse = handleCors(request, { headers: responseHeaders });
    if (corsResponse) return corsResponse;

    // Log request details
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);

    // Parse cookies
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    event.locals = {
        ...event.locals,
        cookies,
        timestamp: new Date().toISOString()
    };

    // Resolve the request
    const response = await resolve(event);

    // Add security headers
    setSecurityHeaders(response);

    // Add the accumulated response headers
    for (const [key, value] of responseHeaders.entries()) {
        response.headers.set(key, value);
    }

    return response;
};
