"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { format, millisecondsToHours } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

export default function CustomDatePicker({
  children,
  onSelect,
  error,
  ...props
}: { children: string; error?: string | boolean } & CalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <span className="text-xs">{children}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500 border"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Selectors setDate={setDate} date={date} />
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day: Date) => {
              setDate(day);
              onSelect?.(day);
            }}
            onNextClick={(month) => setDate(month)}
            onPrevClick={(month) => setDate(month)}
            month={date}
            onMonthChange={(month) => {
              setDate(month);
            }}
            initialFocus
            {...props}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function Selectors({
  setDate,
  date,
}: {
  setDate: Dispatch<SetStateAction<Date>>;
  date: Date;
}) {
  const todaysDate = new Date();
  const firstDate = new Date("1940-01-01");
  const difference = todaysDate.getTime() - firstDate.getTime();
  const hours = millisecondsToHours(difference);
  const years = Math.floor(hours / 24) / 365;
  const yearsArray = Array.from({ length: years }, (_, i) => 1940 + i);
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-row items-center justify-center gap-3 py-2 px-4">
      <DateSelect
        label="Select a year"
        placeholder="Year"
        defaultValue={date.getFullYear().toString()}
        onChange={(value) =>
          setDate((pre) => new Date(pre.setFullYear(Number(value))))
        }
      >
        {yearsArray.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </DateSelect>
      <DateSelect
        label="Select a month"
        placeholder="Month"
        defaultValue={date.getMonth().toString()}
        onChange={(value) =>
          setDate((pre) => new Date(pre.setMonth(Number(value))))
        }
      >
        {monthsArray.map((month, ind) => (
          <SelectItem key={month} value={String(ind)}>
            {month}
          </SelectItem>
        ))}
      </DateSelect>
    </div>
  );
}

function DateSelect({
  children,
  label,
  placeholder,
  onChange,
  defaultValue,
}: {
  children: ReactNode;
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  return (
    <Select onValueChange={onChange} value={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
