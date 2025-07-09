"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import {usePathname} from "next/navigation";
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

type AddTaskProps = {
  onAddTask: (detail: string, due?: Date) => void,
  displayDate: (Date | undefined),
//   onDateChange: (date: Date | undefined) => void
} 
// , onDateChange

export default function AddTask( { onAddTask, displayDate } : AddTaskProps){

    const [newDetail, setNewDetail] = useState<string>("");
    // const [date, setDate] = React.useState<Date | undefined>(new Date())

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(newDetail.trim()) {
            if(displayDate !== undefined) {
                onAddTask(newDetail, displayDate);
            } else {
                onAddTask(newDetail);
            }
            setNewDetail("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-auto">
                <Input
                    autoFocus 
                    type="text"
                    name="detail"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="what would you like to do?" 
                    className="mr-5 py-6"      
                    />
                <Button type="submit" className= "py-6">
                    Add
                </Button>
            </form>
        // <div className="flex flex-auto mx-6 my-10 w-3/4 justify-center">
        //     {/* <Calendar
        //         required
        //         mode="single"
        //         selected={displayDate}
        //         onSelect={onDateChange}
        //         className="rounded-md border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
        //         captionLayout="dropdown"
        //         /> */}
        //     <form onSubmit={handleSubmit} className="flex flex-auto my-12 mx-20">
        //         <Input
        //             autoFocus 
        //             type="text"
        //             name="detail"
        //             value={newDetail}
        //             onChange={(e) => setNewDetail(e.target.value)}
        //             placeholder="what would you like to do?" 
        //             className="mr-5 py-6"      
        //             />
        //         <Button type="submit" className= "py-6">
        //             Add
        //         </Button>
        //     </form>
        // </div>
    )
}
