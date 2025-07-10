"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

type AddTaskProps = {
  onAddTaskAction: (detail: string) => void,
}

export default function AddTask( { onAddTaskAction } : AddTaskProps){

    const [newDetail, setNewDetail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(newDetail.trim()) {
            onAddTaskAction(newDetail);
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
    )
}
