"use client";

import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavItem {
    name: string;
    path: string;
}

const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Inovice", path: "/invoice" },
    {name:"Analyze", path:"/analyze"},
    { name: "Contact", path: "/contact" },
    {name:"Demo",path:"/demo"},
];





const Nav: FC = () => {
    const pathname = usePathname();

    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map((item) => (
                        <NavigationMenuItem key={item.path}>
                            <Link href={item.path} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    // 可选：添加活动状态样式
                                    active={pathname === item.path}
                                >
                                    {item.name}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            
            </div>

    )
}
export default Nav;