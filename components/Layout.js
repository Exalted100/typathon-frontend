import Link from "next/link"
import { Router } from "next/router";
import { useCookies } from "react-cookie"
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";

const Layout = ({children}) => {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

    const checkForAccess = useCallback(() => {
        console.log(cookies.accessToken)
        if (!cookies.accessToken || (cookies.accessToken?.split(".")?.length !== 3 && cookies.accessToken !== "guest")) {
            router.push("/")
        }
    }, [cookies.accessToken, router])

    useEffect(() => checkForAccess(), [checkForAccess])

    const onButtonClick = () => {
        removeCookie("accessToken", []);
        router.push("/");
    };

    return (
        <div>
            <button
            className="mb-5 px-4 rounded border h-12 bg-typathon-green text-white font-semibold cursor-pointer absolute top-2 right-10"
            onClick={onButtonClick}
          >
            Log Out
          </button>
            <nav className="border-b flex font-bold py-4 w-fit mx-auto">
                <Link href="/home"><a className={`w-fit mx-12 ${router.pathname.includes("home") ? "text-black" : "text-typathon-grey"}`}>PLAY</a></Link>
                {cookies.accessToken !== "guest" && (<><Link href="/scores"><a className={`w-fit mx-12 ${router.pathname.includes("scores") ? "text-black" : "text-typathon-grey"}`}>HIGH SCORES</a></Link>
                <Link href="/profile"><a className={`w-fit mx-12 ${router.pathname.includes("profile") ? "text-black" : "text-typathon-grey"}`}>PROFILE</a></Link></>)}
            </nav>
            <div className="mx-20 my-10">{children}</div>
        </div>
    )
}

export default Layout