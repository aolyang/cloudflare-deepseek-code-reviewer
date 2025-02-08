export function jp<T>(str: string): T | null
export function jp<T>(str: string, defaults: T): T
export function jp<T>(str: string, defaults?: T) :T | null {
    try {
        return JSON.parse(str || "")
    } catch {
        return defaults ?? null
    }
}
