import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createNewUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SignUp() {

    return (
        <div className="flex w-1/4 mx-auto justify-center">
            <form action={async(formData: FormData) => {
                "use server";

                const email = formData.get("email") as string;
                const name = formData.get("name") as string;
                const password = formData.get("password") as string;

                const newUser = createNewUser(email, password, name)
                if(newUser !== null) {
                    redirect("/login")
                }
            }}>
                <Label 
                    htmlFor="name"
                    className="flex flex-auto m-2">Name</Label>
                <Input 
                    required 
                    className=""
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Example" />

                <Label 
                    htmlFor="email"
                    className="m-2">Email</Label>
                <Input 
                    required 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com" />

                <Label 
                    htmlFor="password"
                    className="m-2">Password</Label>
                <Input 
                    required 
                    id="password"
                    name="password"
                    type="password"
                     />
                <Button 
                    type="submit"
                    className="my-4"
                    >Create Account</Button>
            </form>
        </div>
    )
}