import { getDatabase, ref, remove } from 'firebase/database'
import firebase from './firebase';
import {GoListUnordered, GoTrashcan} from 'react-icons/go'
import { useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';

function MeetingsList({ meetings, userId }) {
    
    const deleteMeeting = (whichMeeting) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${userId}/${whichMeeting}`);

        remove(dbRef);
    }

    let navigate = useNavigate()
    return (
        <div className="text-center mt-4">
            <p>meeting</p>
            {meetings.map(meeting => {
                return (
                    <div className='list-group-item d-flex' key={meeting.meetingId}>

                        <section className="btn-group align-self-center" role=''>
                            <button className="btn btn-sm btn-outline-secondary"
                            title="Delete Meeting"
                            onClick={() => deleteMeeting(meeting.meetingId)}>
                                <GoTrashcan />
                            </button>

                            <button className="btn btn-sm btn-outline-secondary"
                            title="Check In"
                            onClick={() => navigate(`/checkIn/${userId}/${meeting.meetingId}`)}>
                                <FaLink />
                            </button>

                            <button className="btn btn-sm btn-outline-secondary"
                                title="Attendees List"
                                onClick={() => navigate(`/attendees/${userId}/${meeting.meetingId}`)}>
                                <GoListUnordered />
                            </button>
                        </section>

                        <section className='pl-3 text-left align-self-center'>
                        {meeting.meetingName}
                        </section>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default MeetingsList