'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createTask(detail: string) {

    // const detail = formData.get("detail") as string;

    await prisma.tasks.create({
        data: { detail }
    })

    revalidatePath("/new");
}

export async function deleteTask(id: number) {

    await prisma.tasks.delete({
        where: { id }
    })

    revalidatePath("/new");

}