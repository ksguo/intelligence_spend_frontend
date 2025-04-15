"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, User, LogOut } from "lucide-react";

const LoginButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Function to check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || "User");
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  // Check login status when component mounts
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for login/logout events
    window.addEventListener("login-state-changed", checkLoginStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener("login-state-changed", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    
    // Update state
    setIsLoggedIn(false);
    setUsername(null);
    
    // Dispatch event for other components
    window.dispatchEvent(new Event("login-state-changed"));
    
    // Navigate to home
    router.push("/");
  };

  // Show login button if not logged in
  if (!isLoggedIn) {
    return (
      <Button asChild variant="ghost" size="sm">
        <Link href="/login" className="flex items-center gap-1">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  // Show user dropdown if logged in
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{username || "User"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/analyze">My Analyses</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginButton;