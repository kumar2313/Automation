import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chartdraw from "./Chartdraw";
import './Chartdraw.css'
import Draggable from 'react-draggable';
import { GoXCircle } from "react-icons/go";
const DynamicChart = (props) => {
    const [chartData, setChartData] = useState({});
    const [showdata, setShowdata] = useState(false)

    const Chart = (st,ed) => {
        let xValues = [];
        let ventadm2 = [];
        let reports2 = [];
        let VenProdTradePlafs=[];
        let forestprod=[];
        let ventopr=[];
        let ventureftp=[];
        let reports = [];
        let breachlowerlimit = [];
        let breachupperlimit = [];
        console.log(props.trendurl+"startdate=" + st + "&enddate=" + ed)

        axios
            .get(props.trendurl+"startdate=" + st + "&enddate=" + ed)
            .then((res) => {
                for (const dataObj of res.data) {
                    xValues.push(dataObj.createdon);
                    ventadm2.push(dataObj.ventadm2);
                    reports2.push(dataObj.reports2);
                    reports.push(dataObj.reports);
                    ventopr.push(dataObj.ventopr);
                    ventureftp.push(dataObj.ventureftp);
                    forestprod.push(dataObj.forestprod);
                    VenProdTradePlafs.push(dataObj.VenProdTradePlafs);
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
                            label: "ventureftp",
                            data: ventureftp,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "blue",
                            borderWidth: 2
                        },
                        {
                            label: "ventopr",
                            data: ventopr,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "deeppink",
                            borderWidth: 2
                        },
                        {
                            label: "forestprod",
                            data: forestprod,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Orange",
                            borderWidth: 2
                        },
                        {
                            label: "VenProdTradePlafs",
                            data: VenProdTradePlafs,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "lime",
                            borderWidth: 2
                        },
                        {
                            label: "ventadm2",
                            data: ventadm2,
                            // backgroundColor: "MediumSpringGreen",
                            borderColor: "Olive",
                            borderWidth: 2
                        },
                        {
                            label: "reports2",
                            data: reports2,
                            // backgroundColor: "Brown",
                            borderColor: "Brown",
                            borderWidth: 2
                        },
                        {
                            label: "reports",
                            data: reports,
                            // backgroundColor: "Brown",
                            borderColor: "yellow",
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
        <h6 className="cheads">Trends - Disk Usage</h6>
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
export default DynamicChart;
