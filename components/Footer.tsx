
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
    return (
        <div>
            <footer className="container flex items-center w-full max-w-7xl px-4 py-4 mx-auto border-t border-gray-200">
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
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Intelligence Spend. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;
