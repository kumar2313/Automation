import React from 'react'
import Draggable from 'react-draggable';
// import { GoTasklist } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import './Summary.css'
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import useSWR from 'swr';


// import { GoFlame } from "react-icons/go";

// https://react-bootstrap.netlify.app/docs/components/alerts
// https://react-icons.github.io/react-icons/icons/go/

const Summary = (props) => {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const apiUrl = process.env.REACT_APP_SUMMARY_LOADER;
    console.log(`API URL: ${apiUrl}`);

    const {
        data: summarydata,
        error,
        isValidating,
    } = useSWR(`${process.env.REACT_APP_SUMMARY_LOADER}/v2/all`, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (error) 
    {
        return (
            <Draggable>
                <Toast className="AlertMessage" onClose={props.switch} show={true} >
                <Toast.Header >
                        {/* <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        /> */}
                        <GoAlert className="myicon" />
                        <strong className="me-auto myicon2"> Eror Loading Summary</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>
                        
                    <h5>{error.message}</h5>
                    </Toast.Body>
                </Toast>
            </Draggable>
                );
    }
    
    if (isValidating) {
        return (
            <Draggable>
                <Toast key="TA1" className="AlertMessage" onClose={props.switch} show={true} >
                <Toast.Header key="TH1">
                        {/* <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        /> */}
                        <GoAlert className="myicon" />
                        <strong className="me-auto myicon2"> Waiting - Alert Summary</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body key="TB1">
                        
                    <h5 key="TH5">  Loading Data ...</h5>
                    </Toast.Body>
                </Toast>
            </Draggable>
                );
    }
   
    // return (
    //     <Draggable>
    //         <Toast className="AlertMessage" onClose={props.switch} show={true} >
    //         <Toast.Header >
    //                 {/* <img
    //                     src="holder.js/20x20?text=%20"
    //                     className="rounded me-2"
    //                     alt=""
    //                 /> */}
    //                 <GoAlert className="myicon" />
    //                 <strong className="me-auto myicon2"> Alert Summary</strong>
    //                 {/* <small>11 mins ago</small> */}
    //             </Toast.Header>
    //             <Toast.Body>
    //             Data Loading
    //             </Toast.Body>
    //         </Toast>
    //     </Draggable>
    //         );

    return (
        <Draggable>
            {/* <div className='summary'>
                <div className='summaryhead'>
                    <span className="myicon"><GoTasklist /></span>
                    <span>Header</span>
                </div>
                <div>Body</div>
            </div> */}

            <Toast key="TA" className="AlertMessage" onClose={props.switch} show={true} >
                <Toast.Header key="TH">
                    {/* <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    /> */}
                    <GoAlert className="myicon" />
                    <strong className="me-auto myicon2"> Alert Summary</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body key="TB">

                    <div className="impitems" key="IA">
                        {/* <div className="p-2 alerterror"> <GoAlert className='alerticon' />First item</div> */}

                        {/* {[
                            'primary',
                            'secondary',
                            'success',
                            'danger',
                            'warning',
                            'info',
                            'light',
                            'dark',
                        ].map((variant) => (
                            <Alert key={variant} variant={variant} dismissible>
                                This is a {variant} alert with{' '}
                                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
                                you like.
                            </Alert>
                        ))} */}

                        {
                            summarydata.map((dataset, index) => (
                                // <>
                                <Alert key={index} variant="danger" dismissible>
                                    {dataset.name}
                                </Alert>
                                // </>
                                ))
                        }
                    </div>

                </Toast.Body>
            </Toast>

        </Draggable>
    )
}

export default Summary