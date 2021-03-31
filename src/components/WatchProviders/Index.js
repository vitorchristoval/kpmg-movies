import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import API from '../../API'

function Index(props) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [providers, setProviders] = useState()
    const [loading, setLoading] = useState(true)
    const [language, setLanguage] = useState(localStorage.getItem('language'))
    useEffect(() => {

        API.get(`movie/${props.movie_id}/watch/providers?api_key=${apiKey}`)
            .then(async response => {
                // If request is good...

                var lang = language.split('-')
                setProviders(response.data.results[lang[1]])
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })



    }, []);

    if (loading) {
        return (<small>Loading..</small>)
    } else if (providers != undefined && providers.flatrate) {
        return (
            <>
                <div className='streamings-desk d-md-block d-lg-block d-lg-block d-none'>
                    <h6>Streaming available on</h6>
                    <div className='row stream'>
                        {providers.flatrate.map((item, i) => {
                            return (
                                <div className='col-3'>
                                    <img src={'https://image.tmdb.org/t/p/w500/' + item.logo_path} alt={'Watch now on' + item.provider_name} />
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className='streamings-mobile d-md-none d-lg-none d-lg-none d-block'>
                    <h6>Streaming available on</h6>
                    <div className='row stream d-flex justify-content-center'>
                        {providers.flatrate.map((item, i) => {
                            return (
                                <div className='col-3'>
                                    <img src={'https://image.tmdb.org/t/p/w500/' + item.logo_path} alt={'Watch now on' + item.provider_name} />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </>
        );
    }
    else {
        return (<>
            <small>Streaming not available in your country</small>
        </>)
    }


}
export default Index