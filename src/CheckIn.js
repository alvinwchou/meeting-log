import { useState } from "react";
import firebase from "./firebase";
import { useParams } from "react-router-dom";
import { getDatabase, push, ref } from "firebase/database";

function CheckIn() {
    const [checkinForm, setCheckinForm] = useState({
        displayName: '',
        email: '',
    });

    const { userId: userId } = useParams();
    const { meetingId: meetingId} = useParams();

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setCheckinForm({ ...checkinForm, [itemName]: itemValue })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const database = getDatabase(firebase);
        const dbRef = ref(database, `meetings/${userId}/${meetingId}/attendees`)

        push(dbRef, {
            'attendeeName': checkinForm.displayName,
            'attendeeEmail': checkinForm.email
        })
    }


    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Check in</h3>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="displayName"
                                    >
                                        Name
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        placeholder="Name"
                                        value={checkinForm.displayName}
                                        onChange={handleChange}
                                    />
                                </section>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="Email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={checkinForm.email}
                                        onChange={handleChange}
                                    />
                                </section>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Check in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CheckIn