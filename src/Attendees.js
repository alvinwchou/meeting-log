import { useState } from "react";
import firebase from "./firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import AttendeesList from "./AttendeesList";

function Attendees({ adminUser }) {
    const [attendees, setAttendees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')

    const { userId: userId } = useParams();
    const { meetingId: meetingId } = useParams();


    useState(() =>{
        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${userId}/${meetingId}/attendees`)

        onValue(dbRef, res => {
            const data = res.val();
            let attendeesList = [];

            for(let item in data) {
                attendeesList.push({
                    attendeeId: item,
                    attendeeName: data[item].attendeeName,
                    attendeeEmail: data[item].attendeeEmail,
                    star: data[item].star
                })
            }

            setAttendees(attendeesList)
        })
    }, [])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredAttendees = attendees.filter(attendee => (attendee.attendeeName.toLowerCase().match(searchQuery.toLowerCase())))

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                        Attendees
                    </h1>
                    <div className="card bg-light mb-4">
                        <div className="card-body text-center">
                            <input
                                type="text"
                                name="searchQuery"
                                placeholder="Search Attendees"
                                className="form-control"
                                value={searchQuery}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AttendeesList
                attendeesList={filteredAttendees}
                userId={userId}
                adminUser={adminUser}
                meetingId={meetingId}/>
        </div>
    )
}

export default Attendees