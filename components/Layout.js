import Link from "next/link"

const Layout = ({children}) => {
    return (
        <div>
            <nav className="border-b flex font-semibold py-4 w-fit mx-auto">
                <Link href="/home"><a className="w-fit mx-12">PLAY</a></Link>
                <Link href="/scores"><a className="w-fit mx-12">HIGH SCORES</a></Link>
                <Link href="/profile"><a className="w-fit mx-12">PROFILE</a></Link>
            </nav>
            <div>{children}</div>
        </div>
    )
}

export default Layout