import React, { useState, useEffect, useCallback, useReducer } from 'react';
import API from '../../API';
import Card from '../../components/Card/Index';
import Loading from '../../components/Loading/Index';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function Index({ alertOnBottom }) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [movies, setMovies] = useState([]);
    const [newMovies, setNewMovies] = useState();
    var pagina = 1
    const [loading, setLoading] = useState(true)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function hadleUpdate() {
        forceUpdate();

    }

    useEffect(() => {

        API.get(`movie/top_rated?api_key=${apiKey}&language=en-US&page=${pagina}`)
            .then(async response => {
                // If request is good...
                await setMovies(response.data.results)
                console.log(movies)
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
        //setLoading(true)
        pagina = pagina + 1
        var newPage = pagina

        console.log(pagina)
        console.log(newPage)
        try {
            API.get(`movie/top_rated?api_key=${apiKey}&language=en-US&page=${pagina}`)
                .then(async response => {
                    // If request is good...

                    var itens = response.data.results

                    var mov = movies

                    await itens.map((i, index) => {
                        return (mov.push(i))
                    })
                    console.log(mov)
                    await setMovies(mov)

                    //setLoading(false)
                    hadleUpdate()
                })
                .catch((error) => {
                    console.log(error)
                })



        } catch (err) {

        }
    }
    if (loading) {
        return (<Loading/>)
    } else {
       console.log(movies)

        return (

            <div >
                <h3 className='title'><img src='/img/favorite.png' alt='Icon' />Top Rated Movies</h3>

                <div className='row' >
                    {movies.map((mov, index) => {
                        return (<Card movie={mov} i={index} key={index} />)
                    })}
                </div>

            </div>
        );
    }


}
export default Index