import { AiFillCheckCircle, AiOutlineCalendar } from "react-icons/ai";
import { GiSinkingShip } from "react-icons/gi";

import { StatusType } from "@/app/page";

interface StatusIndicatorProps {
    status: StatusType;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="">{status}</span>
            <div style={{ color: statusIcons.colour[status] }} >
                {statusIcons.icon[status]}
            </div>
        </div>
    );
};

const statusIcons: {
    icon: Record<StatusType, JSX.Element>;
    colour: Record<StatusType, string>;
} = {
    "icon": {
        "completed": <AiFillCheckCircle size={20} />,
        "abandoned": <GiSinkingShip size={20} />,
        "postponed": <AiOutlineCalendar size={20} />
    },
    "colour": {
        "completed": "#05472A",
        "abandoned": "#8B0000",
        "postponed": "orange",
    }
};
