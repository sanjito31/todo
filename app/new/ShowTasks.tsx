"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { tasks } from '../generated/prisma'
// import { Popover } from '@/components/ui/popover'
// import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'

type ShowTasksProps = {
  tasks: tasks[]
  onDeleteTask: (id: number) => void
}

export default function ShowTasks({ tasks, onDeleteTask } : ShowTasksProps) {

    return (
        <div>
            {tasks.map(e => (
                <div key={e.id} className="flex mx-2 my-2">
                    <span className="flex-grow">{e.detail}</span>
                    <Button 
                        variant='outline'
                        className=''
                        onClick={() => onDeleteTask(e.id)}>
                            complete</Button>
                </div>
            ))}
        </div>
    )
}
