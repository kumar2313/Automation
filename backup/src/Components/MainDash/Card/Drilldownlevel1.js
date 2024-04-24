import React, { useEffect, useState } from 'react'
import '../Venture/Mdbtable.css'
// import useSWR from 'swr';
import DataTable from 'react-data-table-component';
import { GoXCircle } from "react-icons/go";
import axios from "axios";
import Draggable from 'react-draggable';
import Drilldownlevel2 from './Drilldownlevel2';
import { CSVLink, CSVDownload } from "react-csv";
import { GoDesktopDownload } from "react-icons/go";

const Drilldownlevel1 = (props) => {

        // const [showhide,showHide]=useState(props.classuse)
    // console.log("showhide",showhide)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [filtereddata, setFilterdata] = useState([])
    const [showl2, setShowl2] = useState(false)
    const [drilldata,setDrill]=useState()
    const kf1=props.keyfield
    const kf2=props.keyfield2

    const fetchInfo = () => {
        console.log(props.drilllevelone)
        return axios.get(props.drilllevelone)
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
        if (props.drilldown2 =="Yes")
        {
            setDrill(datadetails)
            setShowl2(true)
        }

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
      <>
      {showl2 && <Drilldownlevel2
        headingl1={props.headingl2}
        drilllevelone={props.drillcomp2}
        columns={props.datacolumn2}
        keyfield={props.keyfield2}
        filterfield={props.filterfield2}
        setShow={() => setShowl2(false)} 
        drilldown2={props.drilldown2}
        drilldata={drilldata}
        namel2={props.namel2}
        />}

    <Draggable>
    <div className="datadetails">
    {/* <button onClick={()=>showHide("datahidedetails")}>Close</button> */}
    <div className="headshow">
        <h6 className="heads">{props.headingl1}</h6>
        <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>;
        <button className="closebutton" onClick={() => props.setShow()}><GoXCircle className="clsbtn" /></button>
    </div>

    <DataTable
        // keyField={props.keyfield}
        keyField={kf1+kf2}
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
</>
  )


}

export default Drilldownlevel1
