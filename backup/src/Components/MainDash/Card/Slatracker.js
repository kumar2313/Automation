import React, { useState, useEffect,useContext } from 'react'
import './Slatracker.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { GoAlertFill } from "react-icons/go";
import { GoCheckCircleFill } from "react-icons/go";
import axios from "axios";
import Slacomment from './Slacomment';
import { GoXCircle } from "react-icons/go";
import { GoPencil  } from "react-icons/go";
import { NameContext } from '../../../RouterApp';

const Slatracker = (props) => {
    // let a = 10
    let [sdata, setStartdate] = useState(new Date())
    let [edata, setEnddate] = useState(new Date())
    const [data, setData] = useState([])
    const [filtereddata, setFilterdata] = useState([])
    const [show, setShow] = useState(false)
    const [bd, setBd] = useState("")
    const [jira, setJira] = useState("")
    const [incident, setIncident] = useState("")
    const [comment, setComment] = useState("")
    const [heading, setHeading] = useState("")
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const { setShowRouter, setalertMessage, setalertHeader, setalertVariant } = useContext(NameContext)

    const fetchInfo = async(st,ed) => {
        // console.log(props.drilllevelone)
        return axios.get(props.trendurl+"startdate=" + st + "&enddate=" + ed)
            .then((res) => {
                setData(res.data)
                setFilterdata(res.data)
            });
    };

    useEffect(() => {
        fetchInfo(props.startdate,props.enddate);
    }, []);


    function submitdata() {
        console.log("I am here")
        let std = moment(sdata).format('YYYY-MM-DD');
        let etd = moment(edata).format('YYYY-MM-DD');
        console.log("Dates are : ", std, etd)
        if (etd < std) {
            // alert("!! Start Date should be less than End Date !!")
            setalertHeader("Selection Error")
            setalertVariant("danger")
            setalertMessage("!! Start Date should be less than End Date !!")
            setShowRouter(true)

        }
        else {
            fetchInfo(std, etd)
            setalertHeader("SLA Data Refreshed")
            setalertVariant("success")
            setalertMessage("SLA Data Refreshed")
            setShowRouter(true)
        }
    }


    function editrecord(bd,jira,incident,comment) {
        console.log("I am here")
        // setShow(false)
        setBd(bd)
        setJira(jira)
        setIncident(incident)
        setComment(comment)
        setHeading("Update Commentary : "+bd)
        setButtonDisabled(true);
        // alert(bd)
        setShow(true)
    }


    return (
        
        <div>
            {show && <Slacomment fetchInfo={()=>{fetchInfo(props.startdate,props.enddate)}} setEnablebutton={()=>{setButtonDisabled(false) }} bd={bd} jira={jira} incident={incident} comment={comment} heading={heading} setShow={() => setShow(false)}/>}
            <div className="grid-container">
                <div className="grid-child">
                    <DatePicker className="datePicker"
                        selected={sdata}
                        onChange={(date, event) => setStartdate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    />
                </div>
                <div className="grid-child">
                    End Date:
                </div>
                <div className="grid-child">
                    <DatePicker className="datePicker"
                        selected={edata}
                        onChange={(date, event) => setEnddate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    // maxDate={addDays(new Date(), 7)}  
                    />
                </div>
                <div className="grid-child">
                    <button className="button-8" onClick={() => { submitdata() }}>Filter</button>
                </div>
            </div>
            <br />

            <div className="fixed_header">
                <table>
                    {/* <thead> */}
                    <tr key="tophead" className="mainheader">
                        <th rowSpan="3">Business Date</th>
                        <th className="repheader" colSpan={10}>Reporting</th>

                        <th colSpan={12}>Feed Loading</th>
                        <th className="repheader" colSpan={4}>Commentary</th>
                    </tr>
                    <tr  key="midhead" className="mainheader1">
                        {/* <th></th> */}
                        <th>CPVar</th>
                        <th>PBVar</th>
                        <th>TOTAL_RATES 102109</th>
                        <th>TOTAL_CURRENCIES BC5 106954</th>
                        <th>SINGAPORE_MKT_TREASURY ALCO SD_113592</th>
                        <th>STM_FUNDING SG_SD_113716</th>
                        <th>CMU_Currencies SB_115412</th>
                        <th>Local_Markets India_102535</th>
                        <th>Spotlite_Report VaR_SVaR_HSVaR_By_Node</th>
                        <th>Spotlite_Report Cusip_level_PLAFs</th>
                        <th>GFXLN</th>
                        <th>GTE</th>
                        <th>ICE</th>
                        <th>INST_LDN</th>
                        <th>LDN</th>
                        <th>MNH</th>
                        <th>RONLL</th>
                        <th>SYSTEMX</th>
                        <th>SYSX_LDN</th>
                        <th>TRADE</th>
                        <th>Asia</th>
                        <th>LDN</th>
                        <th>RCA</th>
                        <th>Incident</th>
                        <th>Comments</th>
                        <th>Action</th>
                    </tr>
                    <tr  key="lowhead" className="mainheader2">
                        {/* <th></th> */}
                        <th className="headregion" colSpan={4}>LDN</th>
                        <th className="headregion2" colSpan={4}>Asia</th>
                        <th className="headregion" colSpan={2}>US</th>
                        <th className="headregion2" colSpan={10}>Foundry</th>
                        <th className="headregion" colSpan={2}>TMS</th>
                        <th colSpan={4}></th>
                    </tr>
                    {/* </thead> */}
                    {/* <tbody> */}
                    {
                        filtereddata.map((item) => {
                            return (
                                <>
                                    <tr key={item.business_date} className="tabrow">
                                        <td>{item.business_date}</td>
                                        <td> {item.CPVar > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.PBVar > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.TOTAL_RATES_102109 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.TOTAL_CURRENCIES_BC5_106954 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.SINGAPORE_MKT_TREASURY_ALCO_SD_113592 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.STM_FUNDING_SG_SD_113716 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.CMU_Currencies_SB_115412 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.Local_Markets_India_102535 > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.Spotlite_Report_VaR_SVaR_HSVaR_By_Node > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.Spotlite_Report_Cusip_level_PLAFs > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_GFXLN > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_GTE > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_ICE > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_INST_LDN > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_LDN > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_MNH > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_RONLL > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_SYSTEMX > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FNDRY_SYSX_LDN > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.FOUNDRY_TRADE > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.TMS_AS > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.TMS_LN > 0 ? <GoAlertFill className="alertdata" /> : <GoCheckCircleFill className="tickdata" />}</td>
                                        <td> {item.rca }</td>
                                        <td> {item.incident }</td>
                                        <td> {item.comments }</td>
                                        <td><button disabled={isButtonDisabled} className="closebutton" onClick={() => editrecord(item.business_date,item.rca,item.incident,item.comments)}><GoPencil  className="clsbtn1" /></button></td>
                                        
                                    </tr>
                                </>
                            )
                        }
                        )
                    }



                    {/* </tbody> */}
                </table>
            </div>
        </div>
    )
}

export default Slatracker
