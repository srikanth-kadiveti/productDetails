import React, { useState,useEffect } from 'react';
import {Pie, Bar, Doughnut} from 'react-chartjs-2';
// import { Chart } from 'react-chartjs-2';
// import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
// import {Chart, ArcElement,CategoryScale} from 'chart.js'
 
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);




const Charts=(props)=>{

  const [stockStats,setStockStats]=useState([])
useEffect(()=>{
  let percents=props.stockPercentages();
  setTimeout(()=>{
    setStockStats(percents);
},5000)
},[])

// useEffect(()=>{
//   // let stockPercents=props.stockPercentages();
//   let percents=props.stockPercentages();
//   // const [heavyShortage,nearToShortage,moderateShortage,adaquateStock]=props.stockPercentages();
//   setStockStats(percents);
// },[])

useEffect(()=>{
  console.log(stockStats)  
},[stockStats])



const state = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Inventory Details',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      borderColor:"#050404",
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: stockStats
    }
  ]
}

const state001 = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Inventory Details',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor:"rgba(0,0,0,1)",
      borderWidth:1,
      // hoverBackgroundColor: [
      // '#501800',
      // '#4B5000',
      // '#175000',
      // '#003350',
      // '#35014F'
      // ],
      data: [20, 8, 40]
    }
  ]
}

    return (
      <div className='chart'>
        <Bar data={state001}/>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            }
          }}
        />

        {/* <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> */}
      </div>
    );
  }
export default Charts;