'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createTask(detail: string, revalPath: string, dueDate?: Date ) {

    await prisma.tasks.create({
        data: {
            detail: detail,
            ...(dueDate && {
                dueDate: dueDate
            })
        }
    })

    revalidatePath(revalPath);
}

export async function deleteTask(id: number, revalPath: string) {

    await prisma.tasks.delete({
        where: { id }
    })

    revalidatePath(revalPath);

}

export async function updateTask(id: number, revalPath: string, updatedDetail?: string, updatedDueDate?: Date) {

    await prisma.tasks.update({
        where: { id },
        data: {
            detail: updatedDetail,
            dueDate: updatedDueDate
        }
    })

    revalidatePath(revalPath);

}