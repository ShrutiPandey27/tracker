import React from 'react';

import {Cards,Chart,CountryPicker} from './components';

import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/corona.jpg';
import corona from './images/loremipsum.png';




class App extends React.Component {
  state={
    data:{},
    country:'',
  }
  async componentDidMount (){
    const fetchedData = await fetchData();
    this.setState({data:fetchedData})
 }
   handleCountryChange = async (country)=>{

   const fetchedData=await fetchData(country);
     this.setState({data:fetchedData,country:country});
     console.log(fetchedData);

   }
  render(){
    const {data,country} =this.state;
    return(

      <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="Covid-19"/>
      <br/>
      <h1>COVID-19</h1>
      
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <img className={styles.image2} src={corona} alt=""/>
        <Chart data={data} country={country}/>
   
      </div>

    )
    
  }
  
}


export default App;