import React from 'react'

interface IStatusTypes {
    status : string
}
const StatusTypes : React.FC<IStatusTypes> = (props) => {
    switch (props.status) {
        case "Pending":
            return <div>Pending</div>
        case "Pre-Approved":
            return <div>Pre-Approved</div>
        case "Approved":
            return <div>Approved</div>
        case "Rejected":
            return <div>Rejected</div>
        case "Initiated":
            return <div>Initiated</div>
        case "Paid":
            return <div>Paid</div>
        default:
            return <div>StatusTypes</div>
    }

}

export default StatusTypes