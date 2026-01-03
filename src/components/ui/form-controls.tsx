"use client";

import React, { ReactNode, useState } from "react";
import {
  UseFormReturn,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Switch } from "./switch";
import { Checkbox } from "./checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseProps<T extends FieldValues> {
  form: UseFormReturn<T, any, any>;
  name: Path<T>;
  label?: ReactNode;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  placeholder?: string;
  className?: string;
}

/**
 * FormInput Component
 */
export const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  description,
  placeholder,
  className,
  prefixIcon,
  suffixIcon,
  type = "text",
  readOnly,
  ...props
}: BaseProps<T> & {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  readOnly?: boolean;
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "form" | "name" | "type" | "placeholder" | "readOnly"
  >) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn("w-full mb-3", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div className="relative flex items-center">
              {prefixIcon && (
                <span className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
                  {prefixIcon}
                </span>
              )}

              <Input
                {...props}
                {...field}
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
                className={cn(
                  "rounded-xl h-11",
                  prefixIcon && "pl-10",
                  suffixIcon && "pr-10"
                )}
              />

              {suffixIcon && (
                <span className="absolute right-3 text-gray-400 flex items-center pointer-events-none">
                  {suffixIcon}
                </span>
              )}
            </div>
          </FormControl>

          {description && (
            <FormDescription className="-mt-1">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * FormSelect Component
 */
export const FormSelect = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  options,
  description,
  placeholder,
  className,
}: BaseProps<T> & {
  options: { label: string; value: string }[];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn("w-full mb-3", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="rounded-xl h-11 w-full">
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && (
            <FormDescription className="-mt-1">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * FormCheckbox Component
 */
export const FormCheckbox = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  description,
  className,
}: BaseProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center space-x-3 space-y-0 rounded-xl border p-4 mb-3",
            className
          )}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && (
              <FormDescription className="-mt-1">{description}</FormDescription>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * FormSwitch Component
 */
export const FormSwitch = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  description,
  className,
}: BaseProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-xl border p-4 mb-3",
            className
          )}
        >
          <div className="space-y-0.5">
            {label && <FormLabel className="text-base">{label}</FormLabel>}
            {description && (
              <FormDescription className="-mt-1">{description}</FormDescription>
            )}
          </div>
          <FormControl className="hover:cursor-pointer">
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * FormTextArea Component
 */
export const FormTextArea = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  description,
  placeholder,
  className,
  ...props
}: BaseProps<T> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "form" | "name">) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn("w-full mb-3", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <textarea
              {...field}
              {...props}
              placeholder={placeholder}
              className={cn(
                "flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </FormControl>
          {description && (
            <FormDescription className="-mt-1">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * FormDatePicker Component
 */
export const FormDatePicker = <T extends FieldValues>({
  form,
  name,
  label,
  rules,
  description,
  placeholder,
  className,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: BaseProps<T> & {
  fromYear?: number;
  toYear?: number;
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn("w-full mb-3 flex flex-col", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  type="button"
                  className={cn(
                    "w-full pl-3 text-left font-normal rounded-xl h-11 border-zinc-200 dark:border-zinc-700",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(e) => {
                  field.onChange(e);
                  setIsCalendarOpen(false);
                }}
                fromYear={fromYear}
                toYear={toYear}
                disabled={(date) =>
                  date > new Date() || date < new Date(`${fromYear}-01-01`)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="-mt-1">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
