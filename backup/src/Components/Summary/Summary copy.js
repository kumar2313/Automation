import React from 'react'
import Draggable from 'react-draggable';
import { GoTasklist } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import './Summary.css'
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import useSWR from 'swr';
import Summaryloader from './Summaryloader';

// https://react-bootstrap.netlify.app/docs/components/alerts
// https://react-icons.github.io/react-icons/icons/go/

const Summary = (props) => {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());


    const {
        data: summarydata,
        error,
        isValidating,
    } = useSWR('https://restcountries.com/v2/all', fetcher, {
        refreshInterval: 300000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (error) 
    {
        <Summaryloader message={error.message}/>
    }
    else if (isValidating) {
        <Summaryloader message="Loading Data"/>
    }
    else{

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

            <Toast className="AlertMessage" onClose={props.switch} show={true} >
                <Toast.Header >
                    {/* <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    /> */}
                    <GoAlert className="myicon" />
                    <strong className="me-auto myicon2"> Alert Summary</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>

                    <div className="impitems">
                        {/* <div className="p-2 alerterror"> <GoAlert className='alerticon' />First item</div> */}

                        {[
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
                        ))}
                    </div>

                </Toast.Body>
            </Toast>

        </Draggable>
    )
}

export default Summary