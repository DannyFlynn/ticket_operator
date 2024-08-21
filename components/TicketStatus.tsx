"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";


type Props = {
    status: boolean
} 



const TicketStatus = ({status } : Props) => {

    const [selectedStatus, setSelectedStatus] = useState(status ? "complete" : "open");

  return (
    <Select  value={selectedStatus} onValueChange={setSelectedStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedStatus} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="complete">Complete</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TicketStatus;
