"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { tasks } from '../generated/prisma'

type ShowTasksProps = {
  tasks: tasks[]
  onDeleteTask: (id: number) => void
}

export default function ShowTasks({ tasks, onDeleteTask } : ShowTasksProps) {

    return (
        <div>
            {tasks.map(e => (
                <div key={e.id} className="flex">
                    <span className="flex-auto">{e.detail}</span>
                    <Button onClick={() => onDeleteTask(e.id)}>complete</Button>
                </div>
            ))}
        </div>
    )
}
