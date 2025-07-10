import Link from "next/link";
import {Button} from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/ModeToggle";

export function NavBar() {


    return (

        <div>
            <nav className="flex max-w-full justify-center p-2 my-5 mx-6">
                <div className="flex flex-auto max-w-1/3 justify-start items-center">
                    <Button variant="outline" className="mx-1.5">
                        <Link href="./" className="text-lg font-mono">Home</Link>
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

    )
}