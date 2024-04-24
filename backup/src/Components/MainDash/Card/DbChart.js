import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chartdraw from "./Chartdraw";
import './Chartdraw.css'
import Draggable from 'react-draggable';
import { GoXCircle } from "react-icons/go";
const DbChart = (props) => {
    const [chartData, setChartData] = useState({});
    const [showdata, setShowdata] = useState(false)

    const Chart = (st,ed) => {
        let xValues = [];
        let MR_KPI = [];
        let lima = [];
        let lis=[];
        let load_db=[];
        let mrcadd=[];
        let nwo=[];
        let rf_data = [];
        let rf_data_history = [];
        let risk = [];
        let venture_audit = [];
        let breachlowerlimit = [];
        let breachupperlimit = [];
        

        axios
            .get(props.trendurl+"startdate=" + st + "&enddate=" + ed)
            .then((res) => {
                for (const dataObj of res.data) {
                    xValues.push(dataObj.createdon);
                    MR_KPI.push(dataObj.MR_KPI);
                    lima.push(dataObj.lima);
                    lis.push(dataObj.lis);
                    load_db.push(dataObj.load_db);
                    mrcadd.push(dataObj.mrcadd);
                    nwo.push(dataObj.nwo);
                    rf_data.push(dataObj.rf_data);
                    rf_data_history.push(dataObj.rf_data_history);
                    risk.push(dataObj.risk);
                    venture_audit.push(dataObj.venture_audit);
                    breachlowerlimit.push(90);
                    breachupperlimit.push(100);

                }
                console.log("disk space history: ", res.data);

                setChartData({
                    labels: xValues,

                    options: {
                        legend: { display: true }
                    },
                    
                    datasets: [
                        {
                            label: "MR_KPI",
                            data: MR_KPI,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "lima",
                            data: lima,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
                            borderWidth: 2
                        },
                        {
                            label: "lis",
                            data: lis,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Orange",
                            borderWidth: 2
                        },
                        {
                            label: "load_db",
                            data: load_db,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "lime",
                            borderWidth: 2
                        },
                        {
                            label: "mrcadd",
                            data: mrcadd,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Olive",
                            borderWidth: 2
                        },
                        {
                            label: "nwo",
                            data: nwo,
                            // backgroundColor: "Brown",
                            borderColor: "Brown",
                            borderWidth: 2
                        },
                        {
                            label: "rf_data",
                            data: rf_data,
                            // backgroundColor: "Brown",
                            borderColor: "SteelBlue",
                            borderWidth: 2
                        },
                        {
                            label: "rf_data_history",
                            data: rf_data_history,
                            // backgroundColor: "Brown",
                            borderColor: "olive",
                            borderWidth: 2
                        },
                        {
                            label: "risk",
                            data: risk,
                            // backgroundColor: "Brown",
                            borderColor: "purple",
                            borderWidth: 2
                        },
                        {
                            label: "venture_audit",
                            data: venture_audit,
                            // backgroundColor: "Brown",
                            borderColor: "teal",
                            borderWidth: 2
                        },
                        {
                            label: "Breach",
                            data: breachlowerlimit,
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
                setShowdata(true)
            })

            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        Chart(props.startdate,props.enddate);
    }, []);





    console.log("Todays date", chartData)



    return (
        <Draggable>
    <div className="chartdetails">
    <div className="charthead">
        <h6 className="cheads">Trends - DB Usage</h6>
        {/* <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>; */}
        <button className="cclosebutton" onClick={() => props.setShow()}><GoXCircle className="clsbtn" /></button>
    </div>
        {/* <div className="Chardata"> */}
            {/* <h1>{b}</h1> */}
            {/* <div className="crehead">{today} </div> */}
            {showdata && 
            <Chartdraw chartData={chartData} refChart={Chart} />
            }
            


        </div>
        </Draggable>
    );
};
export default DbChart;
