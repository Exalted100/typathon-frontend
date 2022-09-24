import Link from "next/link"
import { Router } from "next/router";
import { useCookies } from "react-cookie"
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";

const Layout = ({children}) => {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

    const checkForAccess = useCallback(() => {
        if (cookies.accessToken.split(".").length !== 2 && cookies.accessToken !== "guest") {
            Router.push("/")
        }
    }, [cookies.accessToken])

    useEffect(() => checkForAccess(), [checkForAccess])

    return (
        <div>
            <nav className="border-b flex font-semibold py-4 w-fit mx-auto">
                <Link href="/home"><a className="w-fit mx-12">PLAY</a></Link>
                {cookies.accessToken !== "guest" && (<><Link href="/scores"><a className="w-fit mx-12">HIGH SCORES</a></Link>
                <Link href="/profile"><a className="w-fit mx-12">PROFILE</a></Link></>)}
            </nav>
            <div>{children}</div>
        </div>
    )
}

export default Layout