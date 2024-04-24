import React, { useState } from 'react'
import './Statuscard.css'
import useSWR from 'swr';
import Cremantdrilldown from './Cremantdrilldown';

const Cremant = (props) => {

    const [show, setShow] = useState(false)
    const [drilldatal1, setDrillL1] = useState()
    const [columns, setColumns] = useState()
    const [keyfield, setKeyfield] = useState()
    const [keyfield2, setKeyfield2] = useState()
    const [filterdata, setFilterdata] = useState()
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const fetchermissing = (...args) => fetch(...args).then((res) => res.json());

    function showdetails(drill1, cols, keyf, keyf2, filt) {
        console.log("cremant drill data",drill1)
        setColumns(cols)
        setKeyfield(keyf)
        setFilterdata(filt)
        setShow(true)
        setDrillL1(drill1)
        setKeyfield2(keyf2)

    }

    const {
        data: data,
        error,
        isValidating,
    } = useSWR(props.statuscnt, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    const {
        data: datamissing,
        error: errormiss,
        isValidating: isValidatingmiss,
    } = useSWR(props.mssingcnt, fetchermissing, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    const {
        data: completecnt,
        error: errorcmplete,
        isValidating: isValidatingcomplete,
    } = useSWR(props.completedcnt, fetchermissing, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    

    const {
        data: completesla,
        error: errorsla,
        isValidating: isValidatingsla,
    } = useSWR(props.sladata, fetchermissing, {
        refreshInterval: 600000,
        revalidateOnFocus: true,
        revalidateOnReconnect: false
    });

    

    if (error) return <div className="btnstacra">{props.cardheading} {error.message} </div>
    if (isValidating) return <div className="btnstacra">{props.cardheading} Loading </div>

    if (errormiss) return <div className="btnstacra">{props.cardheading} {error.message} </div>
    if (isValidatingmiss) return <div className="btnstacra">{props.cardheading} Loading </div>

    if (errorcmplete) return <div className="btnstacra">{props.cardheading} {error.message} </div>
    if (isValidatingcomplete) return <div className="btnstacra">{props.cardheading} Loading </div>

    if (errorsla) return <div className="btnstacra">{props.cardheading} {error.message} </div>
    if (isValidatingsla) return <div className="btnstacra">{props.cardheading} Loading </div>
    //   let clsnamemiss = "btnbggreen";
    //   if (datamissing[0].count > 0 || data[0].count > 0) {
    //     if (props.colortoadd == "red") {
    //         clsnamemiss = "btnbgred"
    //     }
    //     else {
    //         clsnamemiss = "btnbgblue"
    //     }
    //   }

    let clsname = "btnbggreen";
    console.log("Data is : ", data.length)
    // if (data.length > 0) {
    //     if ((data[0].count > 0 || datamissing[0].count > 0) && completecnt[0].count <= 0) {
    //         if (props.colortoadd == "red") {
    //             clsname = "btnbblue"
    //         }
    //         else {
    //             clsname = "btnbgblue"
    //         }
    //     }
    //     else {
    //         clsname = "btnbgred"
    //     }

        
    // }
    // else {
        if (completecnt[0].count > 0)
        {
            clsname = "btnbggreen";
        }
        else{
            clsname = "btnbgred"
        }
    // }
        // try {
        //     console.log("Completed count details", completecnt)
        // }
        // catch (e) {
        //     console.log(e)
        // }
        
    // }
    let template=<td style={{ backgroundColor: "white" }} onClick={() => showdetails(props.missingdet, misscolumns, "BookName", "FileName", "BookName")} >{datamissing[0].count}</td>
    if(datamissing[0].count > 0){
    template=<td style={{ color: "coral" }} onClick={() => showdetails(props.missingdet, misscolumns, "BookName", "FileName", "BookName")} >{datamissing[0].count}</td>
    }
    else
    {
        template=<td style={{ backgroundColor: "LightCyan" }}  >{datamissing[0].count}</td>
    }



    const misscolumns = [
        {
            name: 'BookName',
            selector: row => row.BookName,
            sortable: true,
            wrap: true,
            width: '350px'

        },
        {
            name: 'FileName',
            selector: row => row.FileName,
            wrap: true,
            width: '450px',
            sortable: true,


        },
        {
            name: 'Status',
            selector: row => row.Status,
            wrap: true,
            width: '100px',
            sortable: true,

        },
        {
            name: 'HierarchyID',
            selector: row => row.HierarchyID,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'JobID',
            selector: row => row.JobID,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'BookName',
            selector: row => row.AsiaBookName,
            wrap: true,
            width: '200px',
            sortable: true,


        },
        {
            name: 'InWork',
            selector: row => row.InWork,
            wrap: true,
            width: '200px',
            sortable: true,


        },

    ];


    const detcolumns = [
        {
            name: 'BusinessDate',
            selector: row => row.BusinessDate,
            sortable: true,
            wrap: true,
            width: '100px'

        },
        {
            name: 'BookName',
            selector: row => row.BookName,
            wrap: true,
            width: '200px',
            sortable: true,


        },
        {
            name: 'RunningStatus',
            selector: row => row.RunningStatus,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'JobID',
            selector: row => row.JobID,
            wrap: true,
            width: '100px',
            sortable: true,

        },
        {
            name: 'HierarchyID',
            selector: row => row.HierarchyID,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'Status',
            selector: row => row.Status,
            wrap: true,
            width: '100px',
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.Status.includes('E'),
                    style: {
                        backgroundColor: 'Coral',

                    }
                },
                {
                    when: row => row.Status.includes('Y'),
                    style: {
                        backgroundColor: 'PaleGreen',

                    }
                },

            ]


        },
        {
            name: 'Instance',
            selector: row => row.Instance,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'StartedDate',
            selector: row => row.StartedDate,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'StartedTime',
            selector: row => row.StartedTime,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'CreatedDate',
            selector: row => row.CreatedDate,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'CreatedTime',
            selector: row => row.CreatedTime,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'TimeTaken',
            selector: row => row.TimeTaken,
            wrap: true,
            width: '100px',
            sortable: true,


        },
        {
            name: 'PreviousRun',
            selector: row => row.PreviousRun,
            wrap: true,
            width: '200px',
            sortable: true,


        },


    ];

    return (
        <>

            {show && <Cremantdrilldown
                headingl1={props.cardheading}
                drilllevelone={drilldatal1}
                columns={columns}
                keyfield={keyfield}
                keyfield2={keyfield2}
                filterfield={filterdata}
                setShow={() => setShow(false)}

            />}
            <div className="cremantcard">
                <div className={'btnstacra ' + clsname}>
                    <div className="crehead">{props.cardheading} </div>
                    <div className={completesla[0].status}>SLA</div>
                    <div className="cremantstatus">
                        <table className="tbcremant">
                            <tbody>
                                <tr>
                                    <th>Description</th>
                                    <th>Count</th>
                                </tr>
                                <tr key="completed">
                                    <td>COMPLETED</td>
                                    <td style={{ color: "black" }} >{completecnt[0].count}</td>
                                </tr>
                                {data.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.RunningStatus}</td>
                                            <td style={{ backgroundColor: "yellow" }} onClick={() => showdetails(props.statusdet, detcolumns, "HierarchyID", "JobID", "RunningStatus")}>{val.count}</td>
                                        </tr>
                                    )
                                })}
                                <tr key="Missing">
                                    <td>MISSING</td>
                                    {/* <td style={{ backgroundColor: "yellow" }} onClick={() => showdetails(props.missingdet, misscolumns, "BookName", "FileName", "BookName")} >{datamissing[0].count}</td> */}
                                    {template}
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Cremant
