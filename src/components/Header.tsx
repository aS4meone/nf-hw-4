import Link from "next/link"

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <span className="text-lg font-semibold">OLX</span>
            </Link>
            <Link
                href="/create"
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                Подать обьявление
            </Link>
        </header>
    )
}

