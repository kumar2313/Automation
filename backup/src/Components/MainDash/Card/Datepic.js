import React, { useState } from 'react'
// import {DatePicker} from 'react-bootstrap-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

// var DatePicker = require("react-bootstrap-date-picker");

const Datepic = () => {
    
    const d = new Date();
    let [data,setDate] = useState(new Date())
    console.log(data);
//     data = moment().format('YYYYMMDD');
// console.log(data);
    // let text = data.toString();
    // var temp = text.split(' ');
    
    //     console.log(temp[1] + '/' + temp[0] + '/' + temp[2]);
    // console.log(data.getFullYear(),data.getMonth(),data.getDate())
    if(data){
        let adata = moment(data).format('YYYYMMDD'); 
        console.log("data is",adata);
        console.log(typeof adata)
    }
  return (
    <>
        {/* <ControlLabel>Label</ControlLabel> */}
        {/* <h1>{data}</h1> */}
        
      <DatePicker id="example-datepicker" 
        selected={data}
        onChange={(date, event) => setDate(date)}
        // dateFormat="YYYYMMdd"
        dateFormat="MM/dd/yyyy"  
        minDate={new Date()}  
        // maxDate={addDays(new Date(), 7)}  
      />
      {/* <HelpBlock>Help</HelpBlock> */}
    </>
  )
}

export default Datepic
