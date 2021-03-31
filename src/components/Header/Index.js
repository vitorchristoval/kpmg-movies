import React, { useState, useEffect } from 'react';


function Index() {




    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0  mr-lg-5 text-white text-decoration-none">
                           <img src='/logo1.png' width='120px'/>
      </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                      
                            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control form-control-dark" placeholder="Search Movie..." />
                        </form>

                       
                    </div>
                </div>
            </header>
        </>
    );

}
export default Index