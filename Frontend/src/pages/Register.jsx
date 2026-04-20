import { useState } from "react";
import { utilService } from "../services/util.service"

export function Register() {
    const [user, setUser] = useState({})
    function onSignUp(ev) {
        ev.preventDefault()
        console.log(user);

    }
    return (
        <section className="register-page">
            <div className="register">
                <h1>Create an account</h1>
                <form method="post" onSubmit={onSignUp}>
                    <div className="field-container">
                        <div className="label-container">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                        </div>
                        <input name="email" type="email" required />
                    </div>
                    <div className="field-container">
                        <div className="label-container">
                            <label htmlFor="username">Username <span className="required">*</span></label>
                        </div>
                        <input name="username" type="text" required />
                    </div>
                    <div className="field-container">
                        <div className="label-container">
                            <label htmlFor="password">Password <span className="required">*</span></label>
                        </div>
                        <input name="password" required type="password" />
                    </div>
                    <div className="field-container">
                        <div className="label-container">
                            <label htmlFor="date">Date of birth <span className="required">*</span></label>
                        </div>
                        <div className="dates-container">
                            <div className="select-wrapper">
                                <select>
                                    {utilService.getMonths().map((month, idx) =>
                                        <option key={idx + 1} value={idx + 1}>{month}</option>
                                    )}
                                </select>
                                <ArrowDown />
                            </div>
                            <div className="select-wrapper">
                                <select>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                <ArrowDown />
                            </div>
                            <div className="select-wrapper">
                                <select>
                                    {Array.from({ length: 2023 - 1900 + 1 }, (_, i) => {
                                        const year = 2023 - i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                                <ArrowDown />
                            </div>

                        </div>


                    </div>
                    <button className="register-btn">Create Account</button>
                </form>
            </div>
        </section>
    )
}
function ArrowDown() {
    return (
        <svg className='select-arrow' aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"
            width="20" height="20" fill="white" viewBox="0 0 24 24"><path fill="currentColor"
                d="M3.3 8.3a1 1 0 0 1 1.4 0l7.3 7.29 7.3-7.3a1 1 0 1 1 1.4 1.42l-8 8a1
          1 0 0 1-1.4 0l-8-8a1 1 0 0 1 0-1.42Z"></path></svg>
    )
}