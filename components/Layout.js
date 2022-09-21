import Link from "next/link"

const Layout = ({children}) => {
    return (
        <div>
            <nav className="border-b grid grid-cols-2 gap-8 font-semibold py-4 w-fit mx-auto">
                <Link href="/home"><a className="w-fit">PLAY</a></Link>
                <Link href="/scores"><a className="w-fit">HIGH SCORES</a></Link>
            </nav>
            <div>{children}</div>
        </div>
    )
}

export default Layout