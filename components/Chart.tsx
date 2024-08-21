"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Tickets as TicketProps } from "@/types";

const Chart = ({ data } : any) => {
  const trueCount = data.filter((ticket: TicketProps) => ticket.status === true).length;

  const falseCount = data.filter((ticket: TicketProps) => ticket.status === false).length;

  // console.log(data);
  const statusCount = [
    { name: "completed", status: trueCount },
    { name: "open", status: falseCount },
  ];

 const barFillColor = `hsl(var(--chart-3))`;
  const darkModeBarFillColor = `hsl(var(--chart-1))`;

  return (
    <div className="h-72 lg:my-12 w-4/5 lg:w-2/12">
      Chart
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={statusCount} width={48} height={48}>
          <YAxis />
          <XAxis dataKey="name"  />
          <Bar dataKey="status" fill={barFillColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
