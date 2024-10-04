"use client";

import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAppContext } from "@/components/providers/app-provider";
import Icon from "@/components/common/Icon";

interface ChipProps {
  text: string;
  onButtonClick?: (index: number) => void;
  index: number;
  className?: string;
}

export const FilterChip = ({ text, index, className }: ChipProps) => {
  const { activeCategories, setActiveCategories } = useAppContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    let newCategories = activeCategories;
    if (!activeCategories.includes(text)) {
      newCategories = [...activeCategories, text];
      setActiveCategories(newCategories);
    }
  };

  return (
    <span
      onClick={handleClick}
      id="badge-dismiss-default"
      className={cn(
        "inline-flex w-max hover:underline cursor-pointer items-center px-2.5 py-1 mr-2 text-xs font-medium border border-border rounded-full bg-muted hover:bg-input",
        className
      )}
    >
      {text}
    </span>
  );
};

export const AppliedFiltersChip = ({ text, index, className }: ChipProps) => {
  const { activeCategories, setActiveCategories } = useAppContext();

  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    let newCategories = activeCategories;
    if (activeCategories.includes(text)) {
      newCategories = activeCategories.filter((category) => category !== text);
      setActiveCategories(newCategories);
    }

    if (newCategories.length === 0) {
      router.push(`/`);
    } else {
      router.push(`/?categories=${newCategories.join(",")}`);
    }
  };

  return (
    <span
      onClick={handleClick}
      id="badge-dismiss-default"
      className={cn(
        "inline-flex w-max hover:underline cursor-pointer items-center px-2.5 py-1 mr-2 gap-1 text-xs font-medium border border-border rounded-full bg-foreground hover:bg-accent-foreground text-muted",
        className
      )}
    >
      {text}

      <Icon
        name="cancel"
        size={12}
        className="text-muted-foreground hover:text-accent"
      />
    </span>
  );
};
