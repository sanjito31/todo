"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

type AddTaskProps = {
  onAddTask: (detail: string) => void
} 

export default function AddTask( { onAddTask } : AddTaskProps) {

    const [newDetail, setNewDetail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(newDetail.trim()) {
            onAddTask(newDetail);
            setNewDetail("");
        }
    }

    return (
        <div className="flex flex-auto mx-6 w-1/2 justify-center">
            <form onSubmit={handleSubmit} className="flex flex-auto mx-2">
                <Input
                    autoFocus 
                    type="text"
                    name="detail"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="what would you like to do?" 
                    className="mr-3"      
                    />
                <Button type="submit">
                    Add
                </Button>
            </form>
        </div>
    )
}
