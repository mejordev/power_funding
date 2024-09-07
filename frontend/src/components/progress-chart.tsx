"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartContainer } from "@/components//ui/chart";

export default function Component() {
  return (
    <ChartContainer
      config={{
        exercise: {
          label: "Exercise",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="aspect-square w-full max-w-[20%]"
    >
      <RadialBarChart
        margin={{
          left: -10,
          right: -10,
          top: -10,
          bottom: -10,
        }}
        data={[
          {
            activity: "exercise",
            value: (46 / 60) * 100,
            fill: "var(--color-exercise)",
          },
        ]}
        innerRadius="20%"
        barSize={12}
        startAngle={90}
        endAngle={450}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          dataKey="value"
          tick={false}
        />
        <RadialBar dataKey="value" background cornerRadius={5} />
      </RadialBarChart>
    </ChartContainer>
  );
}
