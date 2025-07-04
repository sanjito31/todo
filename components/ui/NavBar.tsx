// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { Button } from "./button";
import { ModeToggle } from "@/components/ui/ModeToggle";
// import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

export function NavBar() {


    return (
        
        <div>
            <nav className="flex max-w-full justify-center p-2 my-5 mx-6">
                <div className="flex flex-auto max-w-1/3 justify-start items-center">
                    <Button variant="secondary" className="mx-1.5">
                        <Link href="./" className="text-lg font-mono">Home</Link>
                    </Button>
                    <Button variant="outline"  className="mx-1.5">
                        <Link href="./about" className="text-lg font-mono">About</Link>
                    </Button>
                </div>
                <div className="flex flex-auto max-w-1/3 justify-center items-center">
                    <h1 className="font-mono text-4xl">_toDo.List()</h1>
                </div>
                <div className="flex flex-auto max-w-1/3 justify-end items-center pr-4">
                    <ModeToggle></ModeToggle>
                </div>
                    
                
            </nav>
        </div>

        // <div className="flex max-w-full">
        //     <div className="flex border flex-grow justify-center">
        //         <p>col 1</p>
        //     </div>
        //     <div className="flex border flex-grow justify-center">
        //         <p>col 2</p>
        //     </div>
        //     <div className="flex border flex-grow justify-center">
        //         <p>col 3</p>
        //     </div>
        // </div>





        // <nav className="w-full">
        //     <div className="max-w-7xl mx-auto px-4 h-16 grid grid-cols-3 items-center">
        //         <NavigationMenu viewport={false}>
        //             <NavigationMenuList>
        //                 <div>
        //                     <p>1st column</p>
        //                 </div>

        //                 <div className="flex justify-center space-x-6">
        //                     <NavigationMenuItem>
        //                         <NavigationMenuLink asChild>
        //                             <Link href="/">Home</Link>
        //                         </NavigationMenuLink>
        //                     </NavigationMenuItem>
        //                     <NavigationMenuItem>
        //                         <NavigationMenuLink asChild>
        //                             <Link href="/about">About</Link>
        //                         </NavigationMenuLink>
        //                     </NavigationMenuItem>
        //                 </div>
                        
                            
        //                 <div className="flex justify-end">
        //                     <NavigationMenuItem>
        //                         <ModeToggle />
        //                     </NavigationMenuItem>
        //                 </div>
        //             </NavigationMenuList>
        //         </NavigationMenu>
        //     </div>
        // </nav>
    )
}