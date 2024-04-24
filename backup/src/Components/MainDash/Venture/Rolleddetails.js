import React, { useEffect, useState } from 'react'
import './Mdbtable.css'
// import useSWR from 'swr';
import DataTable from 'react-data-table-component';
import { GoXCircle } from "react-icons/go";
import axios from "axios";
import Draggable from 'react-draggable';
import { CSVLink, CSVDownload } from "react-csv";
import { GoDesktopDownload } from "react-icons/go";

const Rolleddetails = (props) => {
    // const [showhide,showHide]=useState(props.classuse)
    // console.log("showhide",showhide)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [filtereddata, setFilterdata] = useState([])

    const fetchInfo = async() => {
        return axios.get(process.env.REACT_APP_ROLLED_BY_SOURCE_DET + "source=" + props.data.description)
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
            return dt.book_id.toLowerCase().match(search.toLowerCase())
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
            name: 'Source ID',
            selector: row => row.source_id,
            sortable: true,
            wrap: true,
            width: '100px'

        },
        {
            name: 'Source',
            selector: row => row.description,
            wrap: true,
            width: '150px'


        },
        {
            name: 'Business Date',
            selector: row => row.business_date,
            wrap: true,
            width: '150px'

        },
        {
            name: 'Instance',
            selector: row => row.instance,
            wrap: true,
            width: '80px'


        },
        {
            name: 'File ID',
            selector: row => row.file_id,
            wrap: true,
            width: '80px'

        },
        {
            name: 'Hierarchy ID',
            selector: row => row.hierarchy_id,
            // wrap: true,
            width: '80px'

        },
        {
            name: 'status',
            selector: row => row.status,
            wrap: true,
            width: '80px'

        },
        {
            name: 'Rolled Reason',
            selector: row => row.roll_reason,
            wrap: true,
            width: '100px'

        },
        {
            name: 'Book ID',
            selector: row => row.book_id,
            wrap: true,
            width: '150px'
        },
        {
            name: 'Component',
            selector: row => row.component,
            wrap: true,
            width: '150px'

        },
        {
            name: 'File Name',
            selector: row => row.file_name,
            wrap: true,
            width: '400px'
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

    // useEffect(() => {
    //     setData(tradedata)
    //   }, []);


    // if (props.data.status=="COMPLETE")
    // {
    //     props.setshow(false)
    //     return (
    //         null
    //       )
    // }
    // else{
    //     props.setshow(true)
    return (
        <Draggable>
        <div className="datadetails">
            {/* <button onClick={()=>showHide("datahidedetails")}>Close</button> */}
            <div className="headshow">
                <h6 className="heads">Rolled - Details</h6>
                <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>;
                <button className="closebutton" onClick={() => props.setShow()}><GoXCircle className="clsbtn" /></button>
            </div>

            <DataTable
            
                className="loadDetails"
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
                    <input type="text" placeholder="Book ID"
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
    // }

}

export default Rolleddetails