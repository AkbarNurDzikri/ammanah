"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  DayPicker,
  useNavigation,
  useDayPicker,
  CaptionProps,
} from "react-day-picker";
import {
  addYears,
  format,
  getMonth,
  getYear,
  setMonth,
  setYear,
} from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const { fromYear, toYear } = useDayPicker();
  const displayMonth = props.displayMonth;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    goToMonth(setYear(displayMonth, year));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    goToMonth(setMonth(displayMonth, month));
  };

  const years = [];
  const startYear = fromYear || getYear(new Date()) - 100;
  const endYear = toYear || getYear(new Date()) + 10;
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  return (
    <div className="flex justify-between items-center px-2 py-2 mb-4 relative z-20">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => goToMonth(addYears(displayMonth, -1))}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-zinc-200 dark:border-zinc-800"
          )}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-20 border-zinc-200 dark:border-zinc-800"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
        <div className="relative group">
          <select
            value={getMonth(displayMonth)}
            onChange={handleMonthChange}
            className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md px-1.5 py-0.5 cursor-pointer appearance-none transition-colors border-none focus:outline-none focus:ring-0"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i} className="dark:bg-zinc-900">
                {format(new Date(0, i), "MMMM")}
              </option>
            ))}
          </select>
        </div>
        <div className="relative group">
          <select
            value={getYear(displayMonth)}
            onChange={handleYearChange}
            className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md px-1.5 py-0.5 cursor-pointer appearance-none transition-colors border-none focus:outline-none focus:ring-0"
          >
            {years.map((y) => (
              <option key={y} value={y} className="dark:bg-zinc-900">
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-20 border-zinc-200 dark:border-zinc-800"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goToMonth(addYears(displayMonth, 1))}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-zinc-200 dark:border-zinc-800"
          )}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "relative", // Changed from hidden
        caption_label: "hidden",
        nav: "hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex justify-center gap-1",
        dropdown:
          "p-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500",
        dropdown_month: "flex-1",
        dropdown_year: "flex-1",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
