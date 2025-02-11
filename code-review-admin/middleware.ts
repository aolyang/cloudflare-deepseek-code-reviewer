export { auth as middleware } from "@/src/utils/auth"

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
    ]
}
