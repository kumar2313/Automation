import React, { useEffect, useState } from 'react'
import '../Venture/Mdbtable.css'
// import useSWR from 'swr';
import DataTable from 'react-data-table-component';
import { GoXCircle } from "react-icons/go";
import axios from "axios";
import Draggable from 'react-draggable';
import { CSVLink, CSVDownload } from "react-csv";
import { GoDesktopDownload } from "react-icons/go";

const Drilldownlevel2 = (props) => {

        // const [showhide,showHide]=useState(props.classuse)
    // console.log("showhide",showhide)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [filtereddata, setFilterdata] = useState([])

    const fetchInfo = async () => {

        // drilldata

        if(props.namel2=="reportdrill2")
        {
            return axios.get(props.drilllevelone+ "source=" + props.drilldata.source + "&book_id=" + props.drilldata.book_id)
        .then((res) => {
            setData(res.data)
            setFilterdata(res.data)
        });
        }
        console.log(props.drilllevelone)
        
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    useEffect(() => {
        // fetchInfo();
        const filter=props.filterfield;
        const result = data.filter(dt => {
            return dt[filter].toLowerCase().match(search.toLowerCase())
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
        console.log("Drill level 1",datadetails)

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
    <div className="datadetailsdrill">
    {/* <button onClick={()=>showHide("datahidedetails")}>Close</button> */}
    <div className="headshowdrill">
        <h6 className="heads">{props.headingl1}</h6>
        <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>;
        {/* <CSVDownload data={filtereddata} target="_blank" />; */}
        <button className="closebutton" onClick={() => props.setShow()}><GoXCircle className="clsbtn" /></button>
    </div>

    <DataTable
        keyField={props.keyfield}
        className="loadDetails"
        // title="Movie List"
        columns={props.columns}
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
            <input type="text" placeholder={props.filterfield}
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

export default Drilldownlevel2
