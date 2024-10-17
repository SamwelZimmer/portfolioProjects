import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "./ui/button";
import Icon from "./common/Icon";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Tooltip>
      <Button
        variant="secondary"
        onClick={() => router.push("/")}
        className={cn(
          "text-muted-foreground hover:text-accent-foreground p-0 aspect-square border border-border rounded-2xl rounded-bl-sm",
          className
        )}
      >
        <TooltipTrigger className="w-full h-full flex items-center justify-center">
          <Icon name="chevron" className="text-inherit rotate-90" />
        </TooltipTrigger>
      </Button>
      <TooltipContent>
        <span>Back to projects</span>
      </TooltipContent>
    </Tooltip>
  );
}
