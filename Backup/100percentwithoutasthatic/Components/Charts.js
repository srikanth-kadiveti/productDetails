import React, { useState,useEffect } from 'react';
import {Pie, Bar} from 'react-chartjs-2';
import './Charts.css';

 
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

  const [stockStats,setStockStats]=useState([0,0,0,0])
  const [expireYears,setExpireYears]=useState([0,0,0,0])
useEffect(()=>{
  let percents=props.stockPercentages();
  let expiries=props.getNearToExpiry();
  // setTimeout(()=>{
    setStockStats(percents);
    setExpireYears(expiries);
// },5000)
},[])

const state = {
  labels: ['Heavy Shortage', 'Near To Shortage', 'Moderate Shortage','Adaquate Quantity'],
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

const stateBar  = {
  labels: ['2022', '2023', '2024','2025+'],
  datasets: [
    {
      label: 'Expiry Details',
      backgroundColor: 'rgba(75,192,192,1)',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      borderWidth:1,
      innerHeight:'10px',
      data: expireYears
    }
  ]
}

    return (
      <div className='container'>
        <h2>Charts On Inventory</h2>

        <div className='charts'>
          <div className='barChart'>
            <Bar 
              data={stateBar}
            />
          </div>
          <div className='pieChart'>
            <Pie
              data={state}
              options = {{
                title: {
                      display: true,
                      text: 'Expiry Products for coming years',
                      fontSize: 20
                  },
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom"
                  },
                }
              }}
              // options={{
              //   title: {
              //     display: true,
              //     text: 'Expiry Products for coming years',
              //     fontSize: 20
              //   },
              //   legend: {
              //     display: true,
              //     position: 'top'
              //   }
              // }}
            />
          </div>
        </div>
      </div>
    );
  }
export default Charts;