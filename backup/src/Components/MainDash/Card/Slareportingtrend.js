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

const Slareportingtrend = (props) => {
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
        let CPVar = [0];
        let PBVar = [0];
        let TOTAL_RATES_102109 = [0];
        let TOTAL_CURRENCIES_BC5_106954 = [0];
        let SINGAPORE_MKT_TREASURY_ALCO_SD_113592 = [0];
        let STM_FUNDING_SG_SD_113716 = [0];
        let CMU_Currencies_SB_115412 = [0];
        let Local_Markets_India_102535 = [0];
        let Spotlite_Report_VaR_SVaR_HSVaR_By_Node = [0];
        let Spotlite_Report_Cusip_level_PLAFs = [0];
        let ASbreachlowerlimit = [6];
        let breachupperlimit = [18];
        let LN1breachlowerlimit = [8];
        // let LN1breachupperlimit = [];
        let LN2breachlowerlimit = [9];
        // let LN2breachupperlimit = [];
        let USbreachlowerlimit = [15];
        console.log(props.trendurl + "startdate=" + st + "&enddate=" + ed)

        axios
            .get(props.trendurl + "startdate=" + st + "&enddate=" + ed)
            .then((res) => {
                console.log("reporting data fetch start is here")
                for (const dataObj of res.data) {
                    xValues.push(dataObj.business_date);
                    CPVar.push(dataObj.CPVar);
                    PBVar.push(dataObj.PBVar);
                    TOTAL_RATES_102109.push(dataObj.TOTAL_RATES_102109);
                    TOTAL_CURRENCIES_BC5_106954.push(dataObj.TOTAL_CURRENCIES_BC5_106954);
                    SINGAPORE_MKT_TREASURY_ALCO_SD_113592.push(dataObj.SINGAPORE_MKT_TREASURY_ALCO_SD_113592);
                    STM_FUNDING_SG_SD_113716.push(dataObj.STM_FUNDING_SG_SD_113716);
                    CMU_Currencies_SB_115412.push(dataObj.CMU_Currencies_SB_115412);
                    Local_Markets_India_102535.push(dataObj.Local_Markets_India_102535);
                    Spotlite_Report_VaR_SVaR_HSVaR_By_Node.push(dataObj.Spotlite_Report_VaR_SVaR_HSVaR_By_Node);
                    Spotlite_Report_Cusip_level_PLAFs.push(dataObj.Spotlite_Report_Cusip_level_PLAFs);
                    ASbreachlowerlimit.push(6);
                    breachupperlimit.push(18);
                    LN1breachlowerlimit.push(8);
                    // LN1breachupperlimit.push(18);
                    LN2breachlowerlimit.push(9);
                    // LN2breachupperlimit.push(18);
                    USbreachlowerlimit.push(15);

                }
                console.log("Reporting Trending: ", res.data);
                setUSData({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },

                    datasets: [
                        {
                            label: "Spotlite_Report_VaR_SVaR_HSVaR_By_Node",
                            data: Spotlite_Report_VaR_SVaR_HSVaR_By_Node,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "Spotlite_Report_Cusip_level_PLAFs",
                            data: Spotlite_Report_Cusip_level_PLAFs,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
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
                            label: "TOTAL_RATES_102109",
                            data: TOTAL_RATES_102109,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "TOTAL_CURRENCIES_BC5_106954",
                            data: TOTAL_CURRENCIES_BC5_106954,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
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
                            label: "CPVar",
                            data: CPVar,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "PBVar",
                            data: PBVar,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
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
                            label: "SINGAPORE_MKT_TREASURY_ALCO_SD_113592",
                            data: SINGAPORE_MKT_TREASURY_ALCO_SD_113592,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "STM_FUNDING_SG_SD_113716",
                            data: STM_FUNDING_SG_SD_113716,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
                            borderWidth: 2
                        },
                        {
                            label: "CMU_Currencies_SB_115412",
                            data: CMU_Currencies_SB_115412,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Orange",
                            borderWidth: 2
                        },
                        {
                            label: "Local_Markets_India_102535",
                            data: Local_Markets_India_102535,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "lime",
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

            <h6>Asia Reporting (SLA 6:00 AM)</h6>
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

            <h6>London Reporting (SLA 8:00 AM)</h6>
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

            <h6>London Reporting (SLA 9:00 AM)</h6>
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

            <h6>US Reporting (SLA 3:00 PM)</h6>
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

export default Slareportingtrend
