import React,{useEffect,useState} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';
// import { lightBlue } from '@material-ui/core/colors';

const Chart=({data:{confirmed, deaths , recovered },country})=>{
    const [dailyData,setDailyData] = useState([]);


useEffect(()=>{
    const fetchAPI = async()=>{
       setDailyData(await fetchDailyData());
    }



    fetchAPI();
},[]) ;

const lineChart=(
    dailyData.length
    ?(
    <Line
        data={{
            labels:dailyData.map(({date})=>date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'#3333ff',
                backgroundColor:'grey',
                fill:true,
            },{
                data:dailyData.map(({deaths})=>deaths),
                label:'deaths',
                borderColor:'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true,
            }],
        }}
    />):null

);
console.log(confirmed,recovered,deaths);

const barChart=(
    confirmed
    ?(
        <Bar
    data={{
        labels:['Infected', 'Recovered', 'Deaths'],
        datasets:[{
            label:'People',
            backgroundColor:[
                'blue',
                'green',
                'red',
            ],
            data:[confirmed.value,recovered.value,deaths.value],
        }]
    }}
    option={{
        legend:{display:false},
        title:{display:true ,text:`Current state in ${country}`},
    }}

        />

    ):null
);


    return(
       <div className={styles.container}>
        {country?barChart:lineChart}
       </div>
    )
}


export default Chart;