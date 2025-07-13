
import { signOut } from "@/lib/auth"
import { Button } from "./ui/button"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button type="submit" variant="outline">Log Out</Button>
    </form>
  )
} 