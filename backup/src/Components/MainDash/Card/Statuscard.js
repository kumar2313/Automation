import React, { useState } from 'react'
import './Statuscard.css'
import useSWR from 'swr';
import Drilldownlevel1 from './Drilldownlevel1';
import { GoGraph } from "react-icons/go";
import Currentdate from '../Utility/Currentdate';

import DynamicChart from './DynamicChart';
import Dateminusdays from '../Utility/Dateminusdays';
import DbChart from './DbChart';

const Statuscard = (props) => {


  // const [showdetails, showDetails] = useState(false)
  // const [showdetailsdata, showDetailsdata] = useState({status:"COMPLETE"})
  const [show, setShow] = useState(false)
  const [drilldatal1, setDrillL1] = useState()
  const [disktrend, setDisktrend] = useState(false)
  const [showdb, setDBShow] = useState(false)
  const [dbtrend, setDBtrend] = useState(false)
  let enddate=Currentdate()
  let startdate=Dateminusdays(5)

  function showdetails(drill1) {
    console.log(drill1)
    // console.log("Inside shiow details",disktrend)
    
    setShow(true)
    setDrillL1(drill1)
    
  }


  function Trenddetails() {
    // console.log(drill1)
    setDisktrend(true)
    // alert("I am here")
    setShow(false)
    // setDrillL1(drill1)
  }


  function DBTrenddetails() {
    // console.log(drill1)
    setDBtrend(true)
    // alert("I am here")
    setShow(false)
    // setDrillL1(drill1)
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: data,
    error,
    isValidating,
  } = useSWR(props.url, fetcher, {
    refreshInterval: 600000,
    revalidateOnFocus: true,
    revalidateOnReconnect: false
  });

  if (error) return <div className="btnsta">{props.cardheading} {error.message} </div>
  if (isValidating) return <div className="btnsta">{props.cardheading} Loading </div>
  let clsname = "btnbggreen";
  console.log("data value is here",data, props.url)
  // if (data.length>0){
  if (data[0].count > 0) {
    if (props.colortoadd == "red") {
      clsname = "btnbgred"
    }
    else {
      clsname = "btnbgblue"
    }
  }
// }
  let template = <div className={'btnsta ' + clsname}><div className="txthead">{props.cardheading}</div>   <div className="txtcount">{data[0].count}</div></div>
  if (props.sla == "Yes") {
    template = <div className={'btnsta ' + clsname}><div className="txthead">{props.cardheading}</div>   <div className="txtcount">{data[0].count}</div> {data[0].sla}</div>
  }
  if (props.drilldown == "Yes" && data[0].count > 0 ) {
    if (props.sla == "Yes") {
      template = <div className={'btnsta ' + clsname} ><div className="txthead">{props.cardheading}</div>   <div className="txtcount" onClick={() => showdetails(props.drillcomp)}>[{data[0].count}]</div>{data[0].sla}</div>
    }
    else {
      template = <div className={'btnsta ' + clsname} > <div className="txthead">{props.cardheading}</div>  <div className="txtcount" onClick={() => showdetails(props.drillcomp)}>{data[0].count}</div></div>
    }
  }

  if (props.cardheading=="Disk Space"){
    template = <div className={'btnsta ' + clsname} > <div className="txtheadtrend">{props.cardheading}</div> <div className="trendbutton" onClick={()=>{Trenddetails()}}><GoGraph /></div>  <div className="txtcount" onClick={() => showdetails(props.drillcomp)}>{data[0].count}</div></div>
  }

  if (props.cardheading=="DB Space"){
    template = <div className={'btnsta ' + clsname} > <div className="txtheadtrend">{props.cardheading}</div> <div className="trendbutton" onClick={()=>{DBTrenddetails()}}><GoGraph /></div>  <div className="txtcount" onClick={() => showdetails(props.drillcomp)}>{data[0].count}</div></div>
  }

  return (
    // <div class="container">
    <>
    {/* <DbChart */}
    {disktrend && <DynamicChart startdate={startdate} enddate={enddate} trendurl={process.env.REACT_APP_DISK_SPACE_HIST} setShow={() => setDisktrend(false)}/>}
    {dbtrend && <DbChart startdate={startdate} enddate={enddate} trendurl={process.env.REACT_APP_DB_SPACE_HIST} setShow={() => setDBtrend(false)}/>}
      {show && <Drilldownlevel1
        headingl1={props.headingl1}
        drilllevelone={drilldatal1}
        columns={props.datacolumn}
        keyfield={props.keyfield}
        keyfield1={props.keyfield1}
        filterfield={props.filterfield}
        setShow={() => setShow(false)}
        drilldown2={props.drilldown2}
        drillcomp2={props.drillcomp2}
        datacolumn2={props.datacolumn2}
        filterfield2={props.filterfield2}
        keyfield2={props.keyfield2}
        headingl2={props.headingl2}
        namel2={props.namel2}
      />}
      {template}
    </>
    // <div className={'btn ' + clsname}>{props.cardheading} <p className="txtcount">( {data[0].count} )</p></div>

    // </div> 

  )
}

export default Statuscard