'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createTask(detail: string, dueDate?: Date) {

    // const detail = formData.get("detail") as string;

    await prisma.tasks.create({
        data: { 
            detail: detail,
            ...(dueDate && {
                dueDate: dueDate
            })
        }
    })

    revalidatePath("/new");
}

export async function deleteTask(id: number) {

    await prisma.tasks.delete({
        where: { id }
    })

    revalidatePath("/new");

}

export async function updateTask(id: number, updatedDetail?: string, updatedDueDate?: Date) {

    await prisma.tasks.update({
        where: { id },
        data: {
            detail: updatedDetail,
            dueDate: updatedDueDate
        }
    })

    revalidatePath("/new");

}