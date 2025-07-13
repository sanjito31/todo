'use server'

import prisma from "@/lib/prisma";
import { auth } from "./auth";
// import { redirect } from "next/dist/server/api-utils";
// import { revalidatePath } from "next/cache";


export async function createTask(detail: string, dueDate: Date) {
    //, revalPath: string

    const session = await auth();

    if(!session?.user?.id) {
        throw new Error("You must be signed in.")
    } 

    const task = await prisma.tasks.create({
        data: {
            detail: detail,
            dueDate: dueDate,
            ownerID: session.user.id,
        }
    })

    // revalidatePath(revalPath);
    return task;
}

export async function deleteTask(id: number) {

    await prisma.tasks.delete({
        where: { id }
    })
    //, revalPath: string
    // revalidatePath(revalPath);

}

export async function updateTask(id: number, updatedDueDate: Date, updatedDetail: string) {
    //, revalPath: string
    await prisma.tasks.update({
        where: { id },
        data: {
            detail: updatedDetail,
            dueDate: updatedDueDate,
            updatedAt: new Date(),
        }
    })

    // revalidatePath(revalPath);

}

export async function completeTask(id: number) {

    await prisma.tasks.update({
        where: { id },
        data: {
            complete: true,
        }
    })
    //, revalPath: string
    // revalidatePath(revalPath);
}