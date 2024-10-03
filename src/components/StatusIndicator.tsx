import { AiFillCheckCircle, AiOutlineCalendar } from "react-icons/ai";
import { GiSinkingShip } from "react-icons/gi";
import { CgSandClock } from "react-icons/cg";

import { StatusType } from "@/app/page";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Icon from "./common/Icon";
import { IconMap } from "@/lib/icon-map";

interface StatusIndicatorProps {
  status: StatusType;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <Tooltip>
      <TooltipTrigger className="h-min">
        <div className="flex items-center">
          <div style={{ color: statusIcons.colour[status] }}>
            <Icon
              name={statusIcons.icon[status]}
              className="w-4 text-muted-foreground"
              size={20}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span className="capitalize">{status}</span>
      </TooltipContent>
    </Tooltip>
  );
}

const statusIcons: {
  icon: IconMap;
  colour: Record<StatusType, string>;
} = {
  icon: {
    completed: "badge-check",
    abandoned: "waste",
    postponed: "delivery-delay",
    ongoing: "timer",
  },
  colour: {
    completed: "#05472A",
    abandoned: "#8B0000",
    postponed: "#d97614",
    ongoing: "#1616a8",
  },
};
