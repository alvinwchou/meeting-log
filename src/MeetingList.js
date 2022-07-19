

function MeetingsList({ meetings }) {
    console.log(meetings)
    return (
        <div className="text-center mt-4">
            <p>meeting</p>
            {meetings.map(meeting => {
                return (
                    <div className='list-group-item d-flex' key={meeting.meetingId}>
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