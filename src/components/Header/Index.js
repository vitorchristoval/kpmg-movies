import React, { useState, useEffect } from 'react';
import API from '../../API'

function Index() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const apiKey = '890580ebea281a7322da2043724cab0f';
    const [language, setLanguage] = useState(localStorage.getItem('language'))
    function handleChange(e) {
        setSearch(e.target.value)

        API.get(`search/movie?api_key=${apiKey}&language=${language}&query=${e.target.value}&page=1`)
            .then(async response => {
                // If request is good..
                setResults(response.data.results)

            })
            .catch((error) => {
                console.log(error)

            })
        if (e.target.value == '' || e.target.value == null) {
            setResults([])
        }
    }

    function selectLanguage(lang) {
        localStorage.setItem('language', lang)
        window.location.reload()
    }
    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0  mr-lg-5 text-white text-decoration-none">
                            <img src='/logo1.png' width='120px' />
                        </a>

                        <ul className="nav ml-lg-3 col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">


                            <a href="/dashboard" className="nav-link px-2 text-white">Dashboard</a>

                        </ul>
                        <div className='language'>
                            <span className={localStorage.getItem('language') == 'pt-BR' ? 'select' : null} onClick={() => selectLanguage('pt-BR')}><img src='/img/brazil-flag.png' width='30px' /></span>
                            <span className={localStorage.getItem('language') == 'en-US' ? 'select' : null} onClick={() => selectLanguage('en-US')}><img src='/img/usa-flag.png' width='40px' /></span>
                        </div>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">

                            <input type="search" onChange={handleChange} className="form-control search form-control-dark" placeholder="Search Movie..." />

                        </form>
                        {results.length > 0 ?
                            <div className='results'>
                                {results.map((item, i) => {
                                    return (
                                        <div className='row result-item' onClick={() => window.location.href = '/details/' + item.id}>
                                            <div className='col-3'>
                                                <img src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} height='100' />
                                            </div>
                                            <div className='col-8'>
                                                <h5>{item.title}</h5>
                                                <p>{item.overview}</p>
                                            </div>
                                        </div>
                                    )
                                })}


                            </div> : null
                        }

                    </div>
                </div>
            </header>
        </>
    );

}
export default Index