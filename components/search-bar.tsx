"use client";

import { useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onChange: (value: string) => void;
}

export function SearchBar({ onChange }: SearchBarProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const value = e.target.value;
      timeoutRef.current = setTimeout(() => {
        onChange(value);
      }, 300);
    },
    [onChange]
  );

  return (
    <div className="relative mb-2">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="이름으로 검색..."
        onChange={handleInput}
        className="pl-9"
      />
    </div>
  );
}
