import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";

export function NavBar() {


    return (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <NavigationMenuLink>
                <Link href="/about">About</Link>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <ModeToggle />
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
    )
}