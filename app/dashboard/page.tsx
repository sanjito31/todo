import React from 'react'
import prisma from '@/lib/prisma'
import MainToDoModule from '@/components/core/MainToDoModule'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function Home() {

    const session = await auth()
    if(!session) redirect("/login")

    const tasks = await prisma.tasks.findMany({
        orderBy: { createdAt: 'asc' }
    })

    return (
        <div>
            <MainToDoModule initTasks={tasks}></MainToDoModule>
        </div>
    )
}