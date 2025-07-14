import React from 'react'
import prisma from '@/lib/prisma'
import MainToDoModule from '@/components/core/MainToDoModule'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
// import { revalidatePath } from 'next/cache'

export default async function Dashboard() {

    const session = await auth()
    const ownerID = session?.user?.id;
    // revalidatePath("/dashboard")
    if(!session || !ownerID) redirect("/login")
    
    const tasks = await prisma.tasks.findMany({
        where: { ownerID: ownerID },
        orderBy: { createdAt: 'asc' }
    })        

    return (
        <div>
            <MainToDoModule initTasks={tasks} ownerID={ownerID}></MainToDoModule>
        </div>
    )
}