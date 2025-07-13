import { auth } from "@/lib/auth"
import Image from "next/image"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
        { session?.user?.image && 
            <Image 
                src={session.user.image} 
                alt="User Avatar" 
                height={32} 
                width={32}
                className="rounded-[50%]" />}
    </div>
  )
}