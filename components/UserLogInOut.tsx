"use server"

import React from 'react'
import { auth } from '@/lib/auth'
import Link from 'next/link';
import { Button } from './ui/button';
import SignOut from './SignOut';

export default async function UserLogInOut() {

    const session = await auth();

    return (
        <div>
            { session?.user ? <SignOut /> : <Button className="mx-2" variant="default"><Link href="/login">Log In</Link></Button>}
        </div>
    )
}
