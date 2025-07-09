"use client"

import React, { useMemo } from 'react'
import { useState } from 'react'
import { tasks } from '@/app/generated/prisma'
import ShowTasks from './ShowTasks'
import AddTask from '../../components/core/AddTask'
import { createTask } from '@/lib/actions'
import { deleteTask } from '@/lib/actions'
import { Calendar } from '@/components/ui/calendar'
import {usePathname} from "next/navigation";

type TaskListProps = {
  initTasks: tasks[]
}

export default function MainToDoModule( { initTasks } : TaskListProps) {

    const [taskList, setTaskList] = useState<tasks[]>(initTasks);
    // const [currentTasks, setCurrentTasks] = useState<tasks[]>(initTasks);
    const [displayDate, setDisplayDate] = useState<Date | undefined>(new Date(Date.now()))
    const pathname = usePathname();

    const dateFilteredTasks = useMemo(() => {
        if(!displayDate) return taskList;

        return taskList.filter(task => {
            if(!task.dueDate) return false;

            return task.dueDate.toDateString() === displayDate.toDateString()
        });
    }, [taskList, displayDate])

    async function handleCreateTask(detail: string, dueDate?: Date) {
        const due = dueDate ? new Date(dueDate) : null;

        // setDisplayDate(due || undefined);

        const newTask = {
            id: Date.now(),
            detail: detail,
            dueDate: due,
            complete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        setTaskList(t => [...t, newTask]);
        await createTask(detail, pathname, due || undefined )
    }

    async function handleDeleteTask(id: number) {
        setTaskList(t => t.filter(task => task.id !== id))
        await deleteTask(id, pathname);
    }

    return (
        <div className='flex max-w-3/4 flex-auto mx-auto my-10 font-mono'>
            <div className='flex'>
                <Calendar
                    required
                    mode="single"
                    selected={displayDate}
                    onSelect={setDisplayDate}
                    className="rounded-md border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                    captionLayout="dropdown"
                    />
            </div>
            <div className="flex flex-col flex-auto p-5">
                <div className=''>
                    <AddTask onAddTask={handleCreateTask}
                        displayDate={displayDate}
                        ></AddTask>
                </div>
                <div className="">
                    <h3 className="text-center mt-10 mb-5">Tasks for {displayDate?.toLocaleDateString()}</h3>
                    <div className=''>
                        <ShowTasks tasks={dateFilteredTasks} onDeleteTask={handleDeleteTask}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
