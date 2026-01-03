"use client";

import React, { useState, useRef, useEffect } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { ChevronDown, Search, Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { cn } from "@/lib/utils";

interface ComboboxProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  form: UseFormReturn<T, any, any>;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  allowCustom?: boolean;
}

export const FormCombobox = <T extends FieldValues>({
  name,
  label,
  form,
  options,
  placeholder = "Select option...",
  className,
  allowCustom = true,
}: ComboboxProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <FormItem className={cn("relative", className)} ref={containerRef}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 border rounded-xl bg-white dark:bg-zinc-900 transition-all hover:cursor-pointer",
                  form.formState.errors[name]
                    ? "border-red-500 shadow-sm shadow-red-100"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                )}
              >
                <span
                  className={
                    selectedOption || field.value
                      ? "text-zinc-900 dark:text-zinc-100 font-medium"
                      : "text-zinc-400"
                  }
                >
                  {selectedOption
                    ? selectedOption.label
                    : field.value || placeholder}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-transform duration-200",
                    isOpen ? "rotate-180" : ""
                  )}
                />
              </button>
            </FormControl>

            {isOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2 px-3 border-b border-zinc-100 dark:border-zinc-800">
                  <Search size={16} className="text-zinc-400" />
                  <input
                    className="w-full py-3 bg-transparent outline-none text-sm dark:text-zinc-100"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => {
                          field.onChange(opt.value);
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                      >
                        <span
                          className={cn(
                            field.value === opt.value
                              ? "font-bold text-emerald-600"
                              : "text-zinc-700 dark:text-zinc-300"
                          )}
                        >
                          {opt.label}
                        </span>
                        {field.value === opt.value && (
                          <Check size={16} className="text-emerald-600" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="flex flex-col">
                      <div className="px-4 py-3 text-sm text-zinc-500 text-center border-b border-zinc-100 dark:border-zinc-800">
                        No options found
                      </div>
                      {allowCustom && (
                        <button
                          type="button"
                          className="flex items-center justify-between w-full px-4 py-3 text-left text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                          onClick={() => {
                            field.onChange(searchTerm);
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <span className="text-zinc-700 dark:text-zinc-300">
                            Use{" "}
                            <span className="font-bold text-emerald-600">
                              "{searchTerm}"
                            </span>
                          </span>
                          <Check size={16} className="text-emerald-600" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
