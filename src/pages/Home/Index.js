import React, { useState, useEffect, useCallback, useReducer } from 'react';
import API from '../../API';
import Card from '../../components/Card/Index';
import Loading from '../../components/Loading/Index';
import LoadingMovies from '../../components/LoadingMovies/Index';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function Index({ alertOnBottom }) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [movies, setMovies] = useState([]);
    const [newMovies, setNewMovies] = useState();
    var pagina = 1
    const [loading, setLoading] = useState(true)
    const [loadingMovies, setLoadingMovies] = useState(false)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [language, setLanguage] = useState(localStorage.getItem('language'))
    function hadleUpdate() {
        forceUpdate();

    }

    useEffect(() => {
        if (localStorage.getItem('language') == null) {
            localStorage.setItem('language', window.navigator.language)
        }

        API.get(`movie/top_rated?api_key=${apiKey}&language=${language}&page=${pagina}`)
            .then(async response => {
                // If request is good...
                await setMovies(response.data.results)
                await setLoading(false)


            })
            .catch((error) => {
                console.log(error)
            })





    }, []);
    const handleOnDocumentBottom = useCallback(() => {
        getMoreMovies()
    }, [alertOnBottom]);


    /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
    useBottomScrollListener(handleOnDocumentBottom);



    function getMoreMovies() {
        setLoadingMovies(true)
        pagina = pagina + 1
        var newPage = pagina

        try {
            API.get(`movie/top_rated?api_key=${apiKey}&language=${language}&page=${pagina}`)
                .then(async response => {
                    // If request is good...

                    var itens = response.data.results
                    var mov = movies
                    await itens.map((i, index) => {
                        return (mov.push(i))
                    })
                    await setMovies(mov)
                    setLoadingMovies(false)

                    hadleUpdate()
                })
                .catch((error) => {
                    console.log(error)
                })



        } catch (err) {

        }
    }
    if (loading) {
        return (<Loading />)
    } else {
        return (
            <div >
                <h3 className='title'><img src='/img/favorite.png' alt='Icon' />Top Rated Movies</h3>
                <div className='row' >
                    {movies.map((mov, index) => {
                        return (<Card movie={mov} i={index} key={index} />)
                    })}
                </div>
                <div className='row text-center mt-5'>
                    <h6> <i class="fas fa-arrow-circle-down"></i> Scroll down to load more movies <i class="fas fa-arrow-circle-down"></i></h6>
                </div>
                {loadingMovies ? <LoadingMovies /> : null}
            </div>
        );
    }


}
export default Index