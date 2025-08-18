import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h2>Page not found</h2>
            <p>How about a start over? <Link href="/">Homepage</Link></p>
        </div>
    )
}
