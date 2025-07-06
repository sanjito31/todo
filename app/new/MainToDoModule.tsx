"use client"

import React from 'react'
import { useState } from 'react'
import { tasks } from '../generated/prisma'
import ShowTasks from './ShowTasks'
import AddTask from './AddTask'
import { createTask } from './actions'
import { deleteTask } from './actions'

type TaskListProps = {
  initTasks: tasks[]
}

export default function MainToDoModule( { initTasks } : TaskListProps) {

    const [taskList, setTaskList] = useState(initTasks);

    async function handleCreateTask(detail: string) {
        const newTask = {
            id: Date.now(),
            detail: detail,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        setTaskList(t => [...t, newTask]);
        createTask(detail)
    }

    async function handleDeleteTask(id: number) {
        setTaskList(t => t.filter(task => task.id !== id))
        deleteTask(id);
    }

    return (
        <div className="flex flex-col items-center my-10 font-mono">
            <AddTask onAddTask={handleCreateTask}></AddTask>
            <div className="flex flex-col flex-auto mx-6 p-2 w-1/2 justify-center">
                <h3 className="flex flex-auto items-center font-bold text-lg my-5">My Tasks:</h3>
                <ShowTasks tasks={taskList} onDeleteTask={handleDeleteTask}/>
            </div>
        </div>
    )
}
