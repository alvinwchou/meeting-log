import { getDatabase, ref, remove } from 'firebase/database'
import firebase from './firebase';
import {GoTrashcan} from 'react-icons/go'

function MeetingsList({ meetings, userId }) {
    
    const deleteMeeting = (e, whichMeeting) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${userId}/${whichMeeting}`);

        remove(dbRef);
    }

    return (
        <div className="text-center mt-4">
            <p>meeting</p>
            {meetings.map(meeting => {
                return (
                    <div className='list-group-item d-flex' key={meeting.meetingId}>

                        <section className="btn-group align-self-center" role=''>
                            <button className="btn btn-sm btn-outline-secondary"
                            title="Delete Meeting"
                            onClick={e => deleteMeeting(e, meeting.meetingId)}>
                                <GoTrashcan />
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