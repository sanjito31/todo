"use client"

import React from 'react'
import { useState } from 'react'
import { tasks } from '@/app/generated/prisma'
import ShowTasks from './ShowTasks'
import AddTask from '@/components/core/AddTask'
import {createTask, deleteTask, completeTask, updateTask} from '@/lib/actions'
import { Calendar } from '@/components/ui/calendar'
// import {usePathname} from "next/navigation";
import {formatDateWithOrdinal} from "@/lib/utils";
import CheckButton from "@/components/custom/CheckButton";
import DeleteButton from "@/components/custom/DeleteButton";
import {CheckIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

type TaskListProps = {
  initTasks: tasks[]
}

export default function MainToDoModule( { initTasks } : TaskListProps) {

    const [taskList, setTaskList] = useState<tasks[]>(initTasks.filter(t => !t.complete));
    const [completedTasks, setCompletedTasks] = useState<tasks[]>(initTasks.filter(t => t.complete));
    const [displayDate, setDisplayDate] = useState<Date>(new Date())
    // const pathname = usePathname();

    async function handleCreateTask(detail: string) {
        const tempID = Math.floor(Math.random() * 1000000);
        const newTask = {
            id: tempID,
            detail: detail,
            dueDate: displayDate,
            complete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        setTaskList(t => [...t, newTask]);
        //, pathname
        const realTask = await createTask(detail, displayDate);
        setTaskList(t => t.filter(task => task.id !== tempID));
        setTaskList(t => [...t, realTask]);
    }

    async function handleDeleteTask(id: number) {
        setTaskList(t => t.filter(task => task.id !== id))
        setCompletedTasks(c => c.filter(task => task.id !== id))
        //, pathname
        void deleteTask(id);
    }

    async function handleCompleteTask(id: number) {
        const completedTask = taskList.find(task => task.id === id)
        if(completedTask) {
            setCompletedTasks(c => [...c, completedTask])
            setTaskList(t => t.filter(task => task.id !== id))
        }
        //, pathname
        void completeTask(id);
    }

    async function handleEditTask(id: number, dueDate: Date, detail: string) {

        const updatedTasks = taskList.map(task => {
            if(task.id === id) {
                const toEditTask = task;
                toEditTask.dueDate = dueDate;
                toEditTask.detail = detail;
                toEditTask.updatedAt = new Date();
                return toEditTask;
            } else
                return task;
        })
        setTaskList(updatedTasks);
        // pathname,
        void updateTask(id, dueDate, detail);
    }

    return (
        <div className="flex flex-col font-mono">
            <div className='flex w-3/4 mx-auto my-10 font-mono'>
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
                        <AddTask
                            onAddTaskAction={handleCreateTask}
                            ></AddTask>
                    </div>
                    <div className="">
                        <h3 className="text-center font-bold mt-10 mb-5">Tasks for {formatDateWithOrdinal(displayDate)}</h3>
                        <div className=''>

                            <ShowTasks
                                tasks={taskList.filter(task => task.dueDate.toDateString() === displayDate.toDateString())}
                                editTaskAction={handleEditTask}>
                                {(task) => (
                                    <CheckButton buttonAction={handleCompleteTask} ID={task.id}></CheckButton>
                                )}
                            </ShowTasks>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-auto w-3/4 m-auto'>
                <h3 className="font-bold my-5">Completed</h3>
                <ShowTasks
                    tasks={completedTasks.filter(task => task.dueDate.toDateString() === displayDate.toDateString())}
                    editTaskAction={handleEditTask}>
                    {(task) => (
                        <DeleteButton buttonAction={handleDeleteTask} ID={task.id}></DeleteButton>
                    )}
                </ShowTasks>
            </div>
        </div>
    )
}
