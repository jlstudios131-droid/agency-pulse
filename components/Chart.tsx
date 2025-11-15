"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({
  data,
  title,
}: {
  data: any[];
  title?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 w-full">
      {title && (
        <h3 className="text-sm font-semibold text-gray-600 tracking-wide uppercase mb-4">
          {title}
        </h3>
      )}

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={3}
            />
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
