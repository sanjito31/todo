import React from 'react'
import prisma from '@/lib/prisma'
import MainToDoModule from './MainToDoModule'

export default async function New() {

    const tasks = await prisma.tasks.findMany({
        orderBy: { createdAt: 'asc' }
    })


    return (
        <div>
            <MainToDoModule initTasks={tasks}></MainToDoModule>
        </div>
    )
}
