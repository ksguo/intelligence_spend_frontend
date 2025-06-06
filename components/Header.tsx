import Nav from "./Nav"
import LoginButton from "./LoginButton"
import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"

const Header = () => {
    return (
        <div>
            <header className="container flex items-center w-full max-w-7xl px-4 py-4 mx-auto border-b border-gray-200">
                <div className="flex items-center mr-12">
                    <Link href="/">
                        <div className="w-[200px] h-[50px] relative">
                            <Image 
                                src="/logo.svg" 
                                alt="Intelligence Spend Logo" 
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                <MobileNav />
                </div>
                <Nav />
                <div className="hidden lg:flex flex-1 justify-end">
                <LoginButton />
                </div>
            </header>
        </div>
    )
}

export default Header