import { useState } from "react";
import { auth } from "./firebase";
import FormError from "./FormError";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        errorMessage: null,
    });

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setLoginForm({ ...loginForm, [itemName]: itemValue })
    }

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginInfo = {
            email: loginForm.email,
            password: loginForm.password,
        }

        signInWithEmailAndPassword(
            auth,
            loginInfo.email,
            loginInfo.password
        ).then(() => {
            navigate('/meetings');
        }).catch(error => {
            if (error.message) {
                setLoginForm({ ...loginForm, 'errorMessage': error.message })
            } else {
                setLoginForm({ ...loginForm, 'errorMessage': null })
            }
        })
    }


    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Log in</h3>
                                <section className="form-group">
                                    {loginForm.errorMessage && <FormError theMessage={loginForm.errorMessage} />}
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="Email">
                                        Email
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={loginForm.email}
                                        onChange={handleChange}
                                    />
                                </section>
                                <section className="form-group">
                                    <input
                                        required
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={handleChange}
                                    />
                                </section>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Log in
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

export default Login