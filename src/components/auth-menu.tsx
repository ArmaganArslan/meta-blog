"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Plus } from "lucide-react";
import Link from "next/link";

export function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button variant="ghost" size="sm" disabled>Loading...</Button>;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant="ghost" size="sm" onClick={() => signIn()}>
        <User className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2">
      <Link href="/blog/create">
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4" />
          <span className="ml-1">B</span>
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={session.user.image || "/default-avatar.jpg"} 
                alt={session.user.name || "User"} 
              />
              <AvatarFallback>
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session.user.name && (
                <p className="font-medium">{session.user.name}</p>
              )}
              {session.user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-muted-foreground cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 