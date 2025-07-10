import React from 'react'
import { tasks } from '@/app/generated/prisma'
import EditTask from '@/components/core/EditTask'

type ShowTasksProps = {
    tasks: tasks[];
    editTaskAction: (id: number, changeDueDate: Date, changeDetail: string) => void;
    children: (task: tasks) => React.ReactNode;
}

export default function ShowTasks({ tasks, editTaskAction, children } : ShowTasksProps) {

    return (
        <div>
            {tasks.map((e) => (
                <div key={e.id} className="flex mx-2 my-2">
                    <span className="flex-grow">{e.detail}</span>
                    <EditTask
                        toEdit={e}
                        handleEditAction={editTaskAction}>
                    </EditTask>
                    <div className="flex mx-2"></div>
                    {children(e)}
                </div>
            ))}
        </div>
    )
}
