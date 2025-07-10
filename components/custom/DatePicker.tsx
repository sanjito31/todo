"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

type DatePickerProps = {
    // label: string
    dateToPick: Date;
    onChangeAction: (date: Date) => void
}

export default function DatePicker({ dateToPick, onChangeAction}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>(dateToPick);
  const [month, setMonth] = React.useState<Date>(dateToPick)
  const [value, setValue] = React.useState(formatDate(date))


    // function handleDateChange(newDate: string) {
    //   setValue(newDate);
    //
    // }

    return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Subscription Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
              onChangeAction(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                  if(date) {
                      setDate(date)
                      onChangeAction(date)
                      setValue(formatDate(date))
                      setOpen(false)
                  }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
