

const Footer = () => {
    return (
        <div>
            <footer className="container flex items-center justify-between w-full max-w-7xl px-4 py-4 mx-auto border-t border-gray-200">
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Intelligence Spend. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;
