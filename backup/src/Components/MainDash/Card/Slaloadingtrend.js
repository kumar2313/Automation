import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Chartdraw from "./Chartdraw";
import './Chartdraw.css'
import Draggable from 'react-draggable';
import { GoXCircle } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { NameContext } from '../../../RouterApp';

const Slaloadingtrend = (props) => {
    const [chartASData, setASData] = useState({});
    const [chartLN1Data, setLN1Data] = useState({});
    const [chartLN2Data, setLN2Data] = useState({});
    const [chartUSData, setUSData] = useState({});
    const [showdata, setShowdata] = useState(false);

    // const chartRef = useRef(null);
    const { setShowRouter, setalertMessage, setalertHeader, setalertVariant } = useContext(NameContext)
    const d = new Date();
    let [sdata, setStartdate] = useState(new Date())
    let [edata, setEnddate] = useState(new Date())
    console.log(sdata);

    function submitdata() {
        // const base64Image = chartRef.current.base64Image()
        let std = moment(sdata).format('YYYY-MM-DD');
        let etd = moment(edata).format('YYYY-MM-DD');
        console.log("Dates are : ", std, etd)
        if (etd < std) {
            // alert("!! Start Date should be less than End Date !!")
            setalertHeader("Trending Error")
            setalertVariant("danger")
            setalertMessage("!! Start Date should be less than End Date !!")
            setShowRouter(true)

        }
        else {
            Chart(std, etd)
            setalertHeader("Trending Refreshed")
            setalertVariant("success")
            setalertMessage("Trending Data Refreshed")
            setShowRouter(true)
        }
    }

    const Chart = (st, ed) => {


        let xValues = [0];
        let FNDRY_GFXLN = [0];
        let FNDRY_GTE = [0];
        let FNDRY_ICE = [0];
        let FNDRY_INST_LDN = [0];
        let FNDRY_LDN = [0];
        let FNDRY_MNH = [0];
        let FNDRY_RONLL = [0];
        let FNDRY_SYSTEMX = [0];
        let FNDRY_SYSX_LDN = [0];
        let FOUNDRY_TRADE = [0];
        let TMS_AS = [0];
        let TMS_LN = [0];
        let ASbreachlowerlimit = [3];
        let breachupperlimit = [18];
        let LN1breachlowerlimit = [6];
        // let LN1breachupperlimit = [];
        let LN2breachlowerlimit = [2];
        // let LN2breachupperlimit = [];
        let USbreachlowerlimit = [5];
        console.log(props.trendurl + "startdate=" + st + "&enddate=" + ed)

        axios
            .get(props.trendurl + "startdate=" + st + "&enddate=" + ed)
            .then((res) => {
                console.log("reporting data fetch start is here")
                for (const dataObj of res.data) {
                    xValues.push(dataObj.business_date);
                    FNDRY_GFXLN.push(dataObj.FNDRY_GFXLN);
                    FNDRY_GTE.push(dataObj.FNDRY_GTE);
                    FNDRY_ICE.push(dataObj.FNDRY_ICE);
                    FNDRY_INST_LDN.push(dataObj.FNDRY_INST_LDN);
                    FNDRY_LDN.push(dataObj.FNDRY_LDN);
                    FNDRY_MNH.push(dataObj.FNDRY_MNH);
                    FNDRY_RONLL.push(dataObj.FNDRY_RONLL);
                    FNDRY_SYSTEMX.push(dataObj.FNDRY_SYSTEMX);
                    FNDRY_SYSX_LDN.push(dataObj.FNDRY_SYSX_LDN);
                    FOUNDRY_TRADE.push(dataObj.FOUNDRY_TRADE);
                    TMS_AS.push(dataObj.TMS_AS);
                    TMS_LN.push(dataObj.TMS_LN);
                    ASbreachlowerlimit.push(3);
                    breachupperlimit.push(18);
                    LN1breachlowerlimit.push(6);
                    // LN1breachupperlimit.push(18);
                    LN2breachlowerlimit.push(2);
                    // LN2breachupperlimit.push(18);
                    USbreachlowerlimit.push(5);

                }
                console.log("Reporting Trending: ", res.data);
                setUSData({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },

                    datasets: [
                        {
                            label: "FOUNDRY_TRADE",
                            data: FOUNDRY_TRADE,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        
                        {
                            label: "Breach",
                            data: LN2breachlowerlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "white",
                            fill: true
                        },
                        {
                            label: "Breach",
                            data: breachupperlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "PeachPuff",
                            fill: true
                        }


                    ]
                });

                setLN2Data({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },

                    datasets: [
                        {
                            label: "FNDRY_GFXLN",
                            data: FNDRY_GFXLN,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        
                        {
                            label: "Breach",
                            data: LN2breachlowerlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "white",
                            fill: true
                        },
                        {
                            label: "Breach",
                            data: breachupperlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "PeachPuff",
                            fill: true
                        }


                    ]
                });


                setLN1Data({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },

                    datasets: [
                        {
                            label: "FNDRY_INST_LDN",
                            data: FNDRY_INST_LDN,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_LDN",
                            data: FNDRY_LDN,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_MNH",
                            data: FNDRY_MNH,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Orange",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_RONLL",
                            data: FNDRY_RONLL,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "lime",
                            borderWidth: 2
                        },
                        {
                            label: "Breach",
                            data: LN1breachlowerlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "white",
                            fill: true
                        },
                        {
                            label: "Breach",
                            data: breachupperlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "PeachPuff",
                            fill: true
                        }


                    ]
                });

                setASData({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },

                    datasets: [
                        {
                            label: "FNDRY_GTE",
                            data: FNDRY_GTE,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_ICE",
                            data: FNDRY_ICE,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_SYSTEMX",
                            data: FNDRY_SYSTEMX,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Orange",
                            borderWidth: 2
                        },
                        {
                            label: "FNDRY_SYSX_LDN",
                            data: FNDRY_SYSX_LDN,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Brown",
                            borderWidth: 2
                        },
                        {
                            label: "TMS_AS",
                            data: TMS_AS,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "DarkCyan",
                            borderWidth: 2
                        },
                        {
                            label: "TMS_LN",
                            data: TMS_LN,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "MediumSpringGreen",
                            borderWidth: 2
                        },
                        {
                            label: "Breach",
                            data: ASbreachlowerlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "white",
                            fill: true
                        },
                        {
                            label: "Breach",
                            data: breachupperlimit,
                            borderColor: "PeachPuff",
                            backgroundColor: "PeachPuff",
                            fill: true
                        }


                    ]
                });
                console.log("Ready for display trend")
                setShowdata(true)
            })

            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        Chart(props.startdate, props.enddate);
    }, []);

    return (
        <div className="reporthistorysla">

<div class="grid-container">
                <div class="grid-child">
                    Start Date:
                </div>

                <div class="grid-child">
                    <DatePicker className="datePicker"
                        selected={sdata}
                        onChange={(date, event) => setStartdate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    />
                </div>
                <div class="grid-child">
                    End Date:
                </div>
                <div class="grid-child">
                    <DatePicker className="datePicker"
                        selected={edata}
                        onChange={(date, event) => setEnddate(date)}
                        // dateFormat="YYYYMMdd"
                        dateFormat="MM/dd/yyyy"
                    // minDate={new Date()}
                    // maxDate={addDays(new Date(), 7)}  
                    />
                </div>
                <div class="grid-child">
                    <button className="button-8" onClick={() => { submitdata() }}>Filter</button>
                </div>

            </div>

            <h6>Feed Loading (SLA 3:00 AM)</h6>
            {showdata &&
                <Line
                    height="20%"
                    width="100%"
                    data={chartASData}
                    // ref={chartRef}
                    options={{
                        responsive: true,
                        title: { text: "Disk Space", display: true },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />}

            <h6>Feed Loading (SLA 6:00 AM)</h6>
            {showdata &&
                <Line
                    height="20%"
                    width="100%"
                    data={chartLN1Data}
                    // ref={chartRef}
                    options={{
                        responsive: true,
                        title: { text: "Disk Space", display: true },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />}

            <h6>Feed Loading (SLA 2:00 AM)</h6>
            {showdata &&
                <Line
                    height="20%"
                    width="100%"
                    data={chartLN2Data}
                    // ref={chartRef}
                    options={{
                        responsive: true,
                        title: { text: "Disk Space", display: true },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />}

            <h6>Feed Loading (SLA 5:00 AM)</h6>
            {showdata &&
                <Line
                    height="20%"
                    width="100%"
                    data={chartUSData}
                    // ref={chartRef}
                    options={{
                        responsive: true,
                        title: { text: "Disk Space", display: true },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />}
        </div>
    )
}

export default Slaloadingtrend
