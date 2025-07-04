"use client"

// import AddToDoItem from "@/components/ui/AddToDoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
// import { Form } from "@/components/ui/form";
import { useState } from "react";

type FormFields = {
    task: string;
  }

export default function Home() {

  const [tasks, setTasks] = useState<string[]>([]);
  
  const {register, handleSubmit, reset} = useForm<FormFields>();
  
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if(data.task) {
      setTasks(t => [...t, data.task]);
    }
    reset();
  }

  function removeTask(index: number){
    const updatedTasks = tasks.filter((element, i) => (i != index))
    setTasks([...updatedTasks])
  }

  return (
    <div className="flex flex-col items-center my-10 font-mono">

       {/* ------ add a to do item ------*/}
      <div className="flex flex-auto mx-6 w-1/2 justify-center">
          {/* <div className="flex flex-auto max-w-1/5"></div> */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-auto mx-2">
            <Input
                  {...register("task")}
                  autoFocus 
                  type="text"
                  placeholder="what would you like to do?" 
                  className="mr-3"      
                  />
              <Button type="submit" className="">
                  Add
              </Button>
          </form>
          {/* <div className="flex flex-auto max-w-1/5"></div> */}
        </div>

        {/* ------ to do list ------*/}
        <div className="flex flex-col flex-auto mx-6 p-2 w-1/2 justify-center">
          <h3 className="flex flex-auto items-center font-bold text-lg my-5">My Tasks:</h3>
          <div>
            <ul>
              {tasks.map((e, i) => 
                  <div key={i} className="flex">
                    <li className="flex-auto">{e}</li>
                    <Button className="justify-end" 
                            onClick={() => removeTask(i)}
                            variant="ghost" 
                            >complete</Button>
                  </div>
              )}
            </ul>
          </div>
        </div>
    </div>
  );
}
