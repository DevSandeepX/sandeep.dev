"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

type Props = {
    data: {
        date: string
        total: number
    }[]
}

export default function UserChart({ data }: Props) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip cursor={{ stroke: "#8884d8", strokeWidth: 2 }} />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}// ✅ hover pe bada circle
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
