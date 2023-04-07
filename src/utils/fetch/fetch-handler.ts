export async function fetchHandler<T> (url: string, method: string = "GET", body?: T, asJson?: boolean, contentType?: string): Promise<Response> {
    if (!body) {
        return await fetch(url, {
            method: method,
            credentials: 'include',
            headers:
                contentType ? {
                    "Content-Type": contentType,
                } : {},
        });
    } else {
        return await fetch(url, {
            method: method,
            credentials: 'include',
            headers:
                contentType ? {
                    "Content-Type": contentType,
                } : {},
            body: body ? (asJson ? JSON.stringify(body as BodyInit) : body as BodyInit) : null,
        });
    }
}