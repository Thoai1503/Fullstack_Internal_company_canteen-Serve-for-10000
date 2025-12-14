import React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
const BarCharts = ({
  dataKeys,
  dataValues,
}: {
  dataKeys: string[];
  dataValues: number[];
}) => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

  console.log("pData length: " + dataKeys.length);
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <BarChart
        series={[
          { data: dataValues, label: "pv", id: "pvId" },
          //  { data: uData, label: "uv", id: "uvId" },
        ]}
        xAxis={[{ data: dataKeys }]}
        yAxis={[{ width: 50 }]}
      />
    </Box>
  );
};

export default BarCharts;
