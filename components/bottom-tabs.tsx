"use client";

import { Train, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabType } from "@/lib/types";

interface BottomTabsProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomTabs({ selectedTab, onTabChange }: BottomTabsProps) {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex w-full border-t bg-background">
      <Button
        variant={selectedTab === "기관사" ? "secondary" : "ghost"}
        className={cn(
          "h-12 flex-1 rounded-none text-sm font-bold",
          selectedTab === "기관사" && "border-b-3 border-blue-500"
        )}
        onClick={() => onTabChange("기관사")}
      >
        <Train className="mr-1.5 h-4 w-4" />
        기관사
      </Button>
      <Button
        variant={selectedTab === "차장" ? "secondary" : "ghost"}
        className={cn(
          "h-12 flex-1 rounded-none text-sm font-bold",
          selectedTab === "차장" && "border-b-3 border-blue-500"
        )}
        onClick={() => onTabChange("차장")}
      >
        <UserCheck className="mr-1.5 h-4 w-4" />
        차장
      </Button>
    </div>
  );
}
