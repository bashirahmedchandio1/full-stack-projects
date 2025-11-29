"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SearchInput } from "./SearchInput";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cart-store";

const Header = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCartStore();
  const [cartCount, setCartCount] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setCartCount(getItemCount());
  }, [getItemCount]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">MWK Store</span>
          </Link>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/store/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                {cartCount}
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.image || "/placeholder-user.jpg"}
                      alt={user.name || "@user"}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.name || "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/store/user-settings">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/store/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                {cartCount}
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="grid gap-6 py-6">
                <div className="grid gap-2">
                  {user ? (
                    <>
                      <Link
                        href="/store/user-settings"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        Orders
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start px-0 text-lg font-semibold text-red-500"
                        onClick={async () => {
                          await logout();
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/sign-in">
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
