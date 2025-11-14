"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart({ data }: { data: any[] }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
