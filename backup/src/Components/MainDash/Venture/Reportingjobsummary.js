import React, { useEffect, useState } from 'react'
import './Mdbtable.css'
// import useSWR from 'swr';
import DataTable from 'react-data-table-component';
import { GoXCircle } from "react-icons/go";
import axios from "axios";
import Draggable from 'react-draggable';
import { CSVLink, CSVDownload } from "react-csv";
import { GoDesktopDownload } from "react-icons/go";

const Reportingjobsummary = (props) => {

        // const [showhide,showHide]=useState(props.classuse)
    // console.log("showhide",showhide)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [filtereddata, setFilterdata] = useState([])

    const fetchInfo = () => {
        console.log(process.env.REACT_APP_REPORT_FAILURE)
        return axios.get(process.env.REACT_APP_REPORT_FAILURE + "instance='" + props.data.instance+"'")
        .then((res) => {
            setData(res.data)
            setFilterdata(res.data)
        });
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    useEffect(() => {
        // fetchInfo();
        const result = data.filter(dt => {
            return dt.job_id.toLowerCase().match(search.toLowerCase())
        })
        setFilterdata(result)
    }, [search]);
    // const fetcher = (...args) => fetch(...args).then((res) => res.json());

    // const {
    //     data: tradedata,
    //     error,
    //     isValidating,
    // } = useSWR(process.env.REACT_APP_FEED_DET+"BatchName="+props.data.batch_name+"&instance="+props.data.instance, fetcher, {
    //     refreshInterval: 600000,
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false
    // });

    // if (error) return <div className="datadetails">failed to load {error.message}</div>
    // if (isValidating) {return <div className="datadetails">loading...</div>}
    // else{setData(tradedata)}
    // if (!tradedata)
    // {
    //     return <div className="datadetails">loading...</div>
    // }
    // else{
    //     setData(tradedata)
    // }


    const columns = [
        {
            name: 'COB Date',
            selector: row => row.business_date,
            sortable: true,
            wrap: true,
            width: '150px',
            // key: row => row.id
            // key: 'engine',

        },
        {
            name: 'job_id',
            selector: row => row.job_id,
            wrap: true,
            width: '60px',
            // key: 'engine',


        },
        {
            name: 'id',
            selector: row => row.id,
            wrap: true,
            width: '70px'

        },
        {
            name: 'stream_id',
            selector: row => row.stream_id,
            wrap: true,
            width: '60px'


        },
        {
            name: 'status',
            selector: row => row.status,
            wrap: true,
            width: '60px'

        },
        {
            name: 'pid',
            selector: row => row.pid,
            wrap: true,
            width: '60px'

        },
        {
            name: 'instance',
            selector: row => row.instance,
            wrap: true,
            width: '60px'

        },
        {
            name: 'run_order',
            selector: row => row.run_order,
            wrap: true,
            width: '60px'

        },
        {
            name: 'Created Time',
            selector: row => row.created_time,
            wrap: true,
            width: '150px'

        },
        {
            name: 'started_time',
            selector: row => row.started_time,
            wrap: true,
            width: '150px'

        },
        {
            name: 'distributed_time',
            selector: row => row.distributed_time,
            wrap: true,
            width: '150px'
        },
        {
            name: 'no_lines',
            selector: row => row.no_lines,
            wrap: true,
            width: '150px'

        },
        {
            name: 'engine',
            selector: row => row.engine,
            wrap: true,
            width: '300px'
        },
        {
            name: 'id2',
            selector: row => row.id2,
            wrap: true,
            width: '150px'
        },
        {
            name: 'id3',
            selector: row => row.id3,
            wrap: true,
            width: '150px'
        },
        

    ];

    // const data = tradedata;
    // if(tradedata.length>0)
    // {

    // }
    // const conditionalRowStyles = [
    //     {
    //       when: row => row.today_count >500,
    //       style: {
    //         backgroundColor: 'yellow',

    //       },
    //     },

    //   ];

    const EntryHandler = (datadetails) => {
        console.log(datadetails)

    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '20px', // override the row height
                border: '1px',
                borderStyle: 'solid',
                borderColor: 'CornflowerBlue'
            },
        },
        headCells: {
            style: {
                minHeight: '20px',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                textAlign: 'center',
                backgroundColor: 'DeepSkyBlue',
                color: 'white',
                fontSize: '12px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                // width:'90px',
                wordWrap: 'breakWord',
                color: 'blue',
                // borderBottomWidth: '1px',
                // borderStyle: 'dashed',
                // borderLeft:'1px'
            },
        },
    };

  return (
    <Draggable>
    <div className="datadetails">
    {/* <button onClick={()=>showHide("datahidedetails")}>Close</button> */}
    <div className="headshow" >
        <h6 className="heads">Report Failure - Details</h6>
        <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>;
        <button className="closebutton" onClick={() => props.setShow()}><GoXCircle className="clsbtn" /></button>
    </div>

    <DataTable
    // key="func_filter"
        className="loadDetails"
        keyField="engine"
        // title="Movie List"
        columns={columns}
        data={filtereddata}
        // conditionalRowStyles={conditionalRowStyles}
        onRowClicked={EntryHandler}
        Clicked
        customStyles={customStyles}
        highlightOnHover={true}
        // progressPending={isValidating}
        pagination
        subHeader
        subHeaderComponent={
            <input type="text" placeholder="job_id"
                className="form-control w-25"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            // oonKeyDown={(e) => {
            //     if (e.key === "Enter")
            //         handlerFuntion();
            //     }}
            />
        }
        subHeaderAlign="left"
    // expandableRows 
    // selectableRows
    />

</div>
</Draggable>
  )
}

export default Reportingjobsummary