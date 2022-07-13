import { useEffect, useState } from "react";
import FormError from "./FormError";


function Register() {
    const [register, setRegister ] = useState({
        displayName: '',
        email: '',
        passOne: '',
        passTwo: '',
        errorMessage: null,
    });

    const handleChange = (e) => {
        e.preventDefault();
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setRegister({...register, [itemName]: itemValue })
    }

    useEffect(() => {
        console.log('password')
        if (register.passOne !== register.passTwo) {
            console.log('doesnt match')
            setRegister({ ...register, 'errorMessage': 'Passwords do not match' })
        } else {
            console.log('match')
            setRegister({ ...register, 'errorMessage': null })
        }
    }, [register])

    return (
        <form className="mt-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Register</h3>
                                <div className="form-row">
                                    {register.errorMessage && <FormError theMessage={register.errorMessage} />}
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
                                            value={register.displayName}
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
                                        value={register.email}
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
                                            value={register.passOne}
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
                                            value={register.passTwo}
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