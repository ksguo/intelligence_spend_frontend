"use client"

import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react"; // Import Menu icon

const mobileNavItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Invoice", path: "/invoice" },
    { name: "Analyze", path: "/analyze" },
    { name: "Contact", path: "/contact" },
    { name: "Demo", path: "/demo" },
];

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                    <Menu className="h-5 w-5 mr-2" />
                    Menu
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle>Menu</SheetTitle>
                <ul className="flex flex-col gap-2 mt-4">
                    {mobileNavItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                              href={item.path} 
                              className={`block p-2 rounded-md transition-colors ${
                                pathname === item.path 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;