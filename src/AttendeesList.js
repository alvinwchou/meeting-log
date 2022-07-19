import { getDatabase, ref, remove } from "firebase/database";
import { GoTrashcan } from "react-icons/go";
import firebase from "./firebase";


function AttendeesList({ attendeesList, userId, adminUser, meetingId }) {
    const admin = adminUser === userId ? true : false;

    const deleteAttendee = (whichMeeting, whichAttendee) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${userId}/${whichMeeting}/attendees/${whichAttendee}`)

        remove(dbRef);
    }

    return (
        <div className="row justify-content-center">
            {attendeesList.map(attendee => {
                return (
                    <div
                        className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
                        key={attendee.attendeeId}>
                        <div className="card ">
                            <div className={
                                'card-body px-3 py-2 d-flex align-items-center ' +
                                (admin ? '' : 'justify-content-center')
                            }>
                                {admin && (
                                    <div className="btn-group pr-2">
                                        <button
                                            className="btn btn-sn btn-outline-secondary"
                                            title="Delete Attendee"
                                            onClick={() => deleteAttendee(meetingId, attendee.attendeeId)}
                                        >
                                            <GoTrashcan />
                                        </button>
                                    </div>
                                )}
                                <div>{attendee.attendeeName}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AttendeesList