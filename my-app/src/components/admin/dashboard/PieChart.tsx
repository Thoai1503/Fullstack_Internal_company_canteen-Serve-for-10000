"use client";
import { Box } from "@mui/material";
import {
  DefaultizedPieValueType,
  pieArcLabelClasses,
  PieChart,
} from "@mui/x-charts";
import React from "react";

const PieCharts = ({ foodTypeObject }: { foodTypeObject: any[] }) => {
  const desktopOS = [
    {
      label: "Windows",
      value: 72.72,
    },
    {
      label: "OS X",
      value: 16.38,
    },
    {
      label: "Linux",
      value: 3.83,
    },
    {
      label: "Chrome OS",
      value: 2.42,
    },
    {
      label: "Other",
      value: 4.65,
    },
  ];

  const valueFormatter = (item: { value: number }) => `${item.value}%`;
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <PieChart
        series={[
          {
            data: foodTypeObject,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={200}
        width={200}
      />
    </Box>
  );
};

export default PieCharts;
