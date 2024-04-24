import React, { useState,useContext } from 'react'
import { GoXCircle } from "react-icons/go";
import './Slatracker.css'
import Draggable from 'react-draggable';
import axios from "axios";
import { NameContext } from '../../../RouterApp';

const Slacomment = (props) => {
    const [jira, setJira] = useState(props.jira)
    const [incident, setIncident] = useState(props.incident)
    const [comment, setComment] = useState(props.comment)
    const [bd, setBd] = useState(props.bd)
    const [waiter, setWaiter] = useState(false)
    const { setShowRouter, setalertMessage, setalertHeader, setalertVariant } = useContext(NameContext)
    let buttonstate=props.setEnablebutton;
    
    function clsbuttonclicked(){
        props.setShow()
        props.setEnablebutton()
        props.fetchInfo()
    }
    function updateData() {
        const userId = bd;
        const newData = {
            jira: jira,
            incident: incident,
            comment: comment
        };
        // {process.env.REACT_APP_SLA_UPDATE_MAIN}
        axios.put(`${process.env.REACT_APP_SLA_UPDATE_TEMP}/${userId}`, newData)
            .then(response => {
                // Handle the response
                console.log("response is ", response.data.msg)
                
            })
            .catch(error => {
                setalertHeader("Data Updated")
            setalertVariant("danger")
            setalertMessage(error)
            setShowRouter(true)
                // Handle errors
            });

        axios.put(`${process.env.REACT_APP_SLA_UPDATE_MAIN}/${userId}`, newData)
            .then(response => {
                // Handle the response
                console.log("response is ", response.data.msg)
                setalertHeader("Data Updated")
            setalertVariant("success")
            setalertMessage("!! Data Updated Successfully !!")
            setShowRouter(true)
                props.fetchInfo()
            })
            .catch(error => {
                setalertHeader("Data Updated")
            setalertVariant("danger")
            setalertMessage(error)
            setShowRouter(true)
                // Handle errors
            });
            
            props.setEnablebutton()
            props.setShow()
            
            
    }
    // setJira(props.jira)
    // setIncident(props.incident)
    // setComment(props.comment)
    // setWaiter(true)

    return (
        //   <>
        //   {waiter &&
        <Draggable>
            <div className="datadetailsf">
                {/* <button onClick={()=>showHide("datahidedetails")}>Close</button> */}
                <div className="headshowf">
                    <h6 className="heads">{props.heading}</h6>
                    {/* <CSVLink className="closebutton" data={filtereddata}><GoDesktopDownload className="clsbtn" /></CSVLink>; */}
                    <button className="closebutton" onClick={() => clsbuttonclicked()}><GoXCircle className="clsbtn" /></button>
                </div>
                <div class="formalign">
                    <div >
                        <label for="rca">RCA:</label>
                    </div >
                    <div >
                        <input type="text" id="rca" name="rca" value={jira} onChange={(e) => setJira(e.target.value.toUpperCase())} />
                    </div>

                    <div >
                        <label for="incident">Incident:</label>
                    </div >
                    <div >
                        <input type="text" id="incident" name="incident" value={incident} onChange={(e) => setIncident(e.target.value.toUpperCase())} />
                    </div>
                    <div >
                        <label for="comment">Comment:</label>
                    </div >
                    <div >
                        <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <div >
                        <button onClick={() => updateData()} className="button-8">Update</button>
                    </div>
                </div>

            </div>
        </Draggable>
        //   }
        //   </>
    )
}

export default Slacomment
