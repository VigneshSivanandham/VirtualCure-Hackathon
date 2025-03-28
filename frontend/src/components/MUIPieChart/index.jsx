/* eslint-disable */
import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export const MUIPieChart = (props) => {
  const pieData = props?.doCal ? props?.data?.map((i, idx) => {return {id: idx, value: 100/props?.data?.length, label: i};}) : props?.data;
  console.log("___2", props, pieData)

  const params = {
    series:[
      {
        data: pieData,
        arcLabel: (item) => `${item.value}%`,
        arcLabelMinAngle: 35,
        arcLabelRadius: '60%'
      },
    ],
    sx:{
      [`& .${pieArcLabelClasses.root}`]: {
        fontWeight: 'bold',
      },
    },
    width:600,
    height:200
  };

  if(props?.colors) {
    params.colors =  props?.colors;
  }

  return (
    <PieChart
      {...params}
    />
  );
};

export default MUIPieChart;
