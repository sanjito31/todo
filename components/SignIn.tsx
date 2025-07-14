import { Button } from "./ui/button"
import Link from "next/link"
 
export default function SignIn() {
  return (
      <Button className="mx-2" variant="default"><Link href="/login">Log In</Link></Button>
  )
} 