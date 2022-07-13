import { useEffect, useState } from "react";
import { auth } from "./firebase";
import FormError from "./FormError";
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Register({ registerUser }) {
    const [registrationForm, setRegistrationForm ] = useState({
        displayName: '',
        email: '',
        passOne: '',
        passTwo: '',
        errorMessage: null,
    });

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setRegistrationForm({...registrationForm, [itemName]: itemValue })
    }

    useEffect(() => {
        if (registrationForm.passOne !== registrationForm.passTwo) {
            setRegistrationForm({ ...registrationForm, 'errorMessage': 'Passwords do not match' })
        } else {
            setRegistrationForm({ ...registrationForm, 'errorMessage': null })
        }
    }, [registrationForm.passOne, registrationForm.passTwo])

    const handleSubmit = (e) => {
        e.preventDefault();
        const registrationInfo = {
            displayName: registrationForm.displayName,
            email: registrationForm.email,
            password: registrationForm.passOne,
        }


        createUserWithEmailAndPassword(
            auth,
            registrationInfo.email,
            registrationInfo.password
        ).then(() =>{
            registerUser(registrationInfo.displayName);
        }).catch(error => {
            if (error.message) {
                setRegistrationForm({ ...registrationForm, 'errorMessage': error.message })
            } else {
                setRegistrationForm({ ...registrationForm, 'errorMessage': null })
            }
        })
    }

    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Register</h3>
                                <div className="form-row">
                                    {registrationForm.errorMessage && <FormError theMessage={registrationForm.errorMessage} />}
                                    <section className="col-sm-12 form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="displayName"
                                        >
                                            Display Name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="displayName"
                                            placeholder="Display Name"
                                            name="displayName"
                                            required
                                            value={registrationForm.displayName}
                                            onChange={handleChange}
                                        />
                                    </section>
                                </div>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        placeholder="Email Address"
                                        required
                                        name="email"
                                        value={registrationForm.email}
                                        onChange={handleChange}
                                    />
                                </section>
                                <div className="form-row">
                                    <section className="col-sm-6 form-group">
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="passOne"
                                            placeholder="Password"
                                            value={registrationForm.passOne}
                                            onChange={handleChange}
                                        />
                                    </section>
                                    <section className="col-sm-6 form-group">
                                        <input
                                            className="form-control"
                                            type="password"
                                            required
                                            name="passTwo"
                                            placeholder="Repeat Password"
                                            value={registrationForm.passTwo}
                                            onChange={handleChange}
                                        />
                                    </section>
                                </div>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Register
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

export default Register