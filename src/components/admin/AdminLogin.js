import React, { Component } from "react";



class AdminLogin extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="loginForm col-md-6 col-lg-4">
                    <div className="card loginFormCard ">
                        <div className="card-header text-center loginHeader">
                            <h2 >Logg inn</h2>
                        </div>
                        <div className="card-body loginFormBody">
                            <form>
                                <div className="form-group">
                                    <label className="labelLoginForm">E-post</label>
                                    <input type="email" className="form-control" placeholder="Skriv inn e-post" />
                                </div>
                                <div className="form-group">
                                    <label className="labelLoginForm" >Passord</label>
                                    <input type="password" className="form-control" placeholder="Passord" />
                                </div>
                                <button type="submit" class="btn pull-right submitFormLogin ">Logg inn</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default AdminLogin;