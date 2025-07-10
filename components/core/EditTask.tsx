import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {tasks} from "@/app/generated/prisma";
import React from "react";
import {EllipsisIcon} from "lucide-react";
import DatePicker from "@/components/custom/DatePicker";
import {useState} from "react";

type EditTaskProps = {
    toEdit: tasks
    handleEditAction: (id: number, changeDueDate: Date, changeDetail: string) => void
}

export default function EditTask({ toEdit, handleEditAction}: EditTaskProps) {

    const taskID = toEdit.id;
    const currentDescription = toEdit.detail;
    // const currentDueDate = toEdit.dueDate;
    const [currentDueDate, setCurrentDueDate] = useState<Date>(toEdit.dueDate);

    function onSubmit(formData: FormData) {

        const newDescription = (formData.get("description") as string) || currentDescription;
        // const newDueDate = formData.get("dueDate") ?
        //                                             new Date(formData.get("dueDate") as string)
        //                                             : currentDueDate;
        const newDueDate = currentDueDate || toEdit.dueDate;

        handleEditAction(taskID, newDueDate, newDescription);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                  <EllipsisIcon />
              </Button>
            </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                      <form action={onSubmit}>
                          <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                            <DialogDescription>
                              Make changes to your task here. Click save when you&apos;re
                              done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 my-5">
                            <div className="grid gap-3">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                  required
                                  id="description"
                                  name="description"
                                  type="text"
                                  defaultValue={currentDescription} />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="dueDate">Due Date</Label>
                              <DatePicker
                                dateToPick={currentDueDate}
                                onChangeAction={setCurrentDueDate}
                                    ></DatePicker>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button type="submit">Save changes</Button>
                            </DialogClose>
                          </DialogFooter>
                      </form>
                </DialogContent>
        </Dialog>
    )
}