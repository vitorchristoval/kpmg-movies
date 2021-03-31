import React, { useState, useEffect } from 'react';
import API from '../../API';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '../../components/Rating/Index';
import WatchProviders from '../../components/WatchProviders/Index';
import Loading from '../../components/Loading/Index';
function Index(props) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true)
    const [_id, setId] = useState(props.match.params._id)
    const [language, setLanguage] = useState(localStorage.getItem('language'))

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " h" + rminutes + "m.";
    }

    useEffect(() => {

        API.get(`movie/${_id}?api_key=${apiKey}&language=${language}`)
            .then(async response => {
                // If request is good...

                await setMovie(response.data)


                API.get(`movie/${_id}/credits?api_key=${apiKey}&language=${language}`)
                    .then(async response => {
                        // If request is good...

                        await setCast(response.data.cast)
                        await setLoading(false)


                    })
                    .catch((error) => {
                        console.log(error)
                    })


            })
            .catch((error) => {
                console.log(error)
            })





    }, []);



    if (loading) {
        return (<Loading />)
    } else {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (

            <div className='movie-details'>
                <div className='bg-details'>

                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path} />
                </div>
                <div className='content' >
                    <div className='row'>
                        <div className='col-md-4 col-sm-12 poster'>
                            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} />
                            <WatchProviders movie_id={movie.id} />
                        </div>
                        <div className='col-md-8 col-sm-12 infos'>
                            <h1>{movie.title} <small className='year'>({new Date(movie.release_date).getFullYear()})</small></h1>
                            <p>{movie.genres.map((g, i) => {
                                return (<>{g.name + ', '}</>)
                            })}{timeConvert(movie.runtime)}</p>
                            <div className='average'>
                                <img src='/fav.png' height='40px' />
                                {movie.vote_average * 10} %
                            </div>
                            <Rating vote_average={movie.vote_average / 2} _id={_id} />
                            <h5>Overview</h5>
                            <p>{movie.overview}</p>
                            <div className='mt-5'>
                                <h5>Cast</h5>
                                <Slider {...settings}>
                                    {cast.map((item, i) => {
                                        return (
                                            <div className='cast-item'>
                                                {item.profile_path ? <img src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} /> : <img src={'/fav.png'} />}
                                                <h6>{item.name}</h6>
                                                <small>{item.character}</small>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>

                            {movie.production_companies.length > 0 ?
                                <div className='mt-5'>
                                    <h5>Production Companies</h5>
                                    <div className='row '>
                                        {movie.production_companies.map((comp, index) => {
                                            return (
                                                <div className=' col-4 col-md-2 production_companies'>
                                                    <img className='white-filter' src={'https://image.tmdb.org/t/p/w500/' + comp.logo_path} />
                                                    <h6>{comp.name}</h6>
                                                    <small>Country : {comp.origin_country}</small>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div> : null
                            }

                        </div>
                    </div>

                </div>




            </div>
        );
    }


}
export default Index