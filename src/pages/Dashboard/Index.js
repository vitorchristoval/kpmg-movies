import React, { useState, useEffect, useCallback, useReducer } from 'react';
import API from '../../API';

import Loading from '../../components/Loading/Index';
import { CanvasJSChart } from 'canvasjs-react-charts'

function Index({ alertOnBottom }) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [genreIds, setGenreIds] = useState([])
    const [genresList, setGenresList] = useState([])
    const [genresRepits, setGenresRepits] = useState({})
    const [loading, setLoading] = useState(true)
    const [language, setLanguage] = useState(localStorage.getItem('language'))
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function hadleUpdate() {
        forceUpdate();

    }

    useEffect(() => {
        API.get(`genre/movie/list?api_key=${apiKey}&language=${language}`)
            .then(async response => {
                // If request is good...
                setGenresList(response.data.genres)

            })
            .catch((error) => {
                console.log(error)
            })

        for (var i = 1; i <= 5; i++) {
            API.get(`movie/top_rated?api_key=${apiKey}&language=${language}&page=${i}`)
                .then(async response => {
                    // If request is good...
                    response.data.results.map((item, i) => {
                        item.genre_ids.map((genre, key) => {
                            genreIds.push(genre)
                        })
                    })

                    //Conta a quantidade de generos que se repetem
                    let contador = {};
                    for (let i in genreIds) {
                        if (!contador[genreIds[i]]) {
                            contador[genreIds[i]] = 0;
                        }

                        contador[genreIds[i]]++;
                    }
                    setGenresRepits(contador)
                    hadleUpdate()


                    setLoading(false)

                })
                .catch((error) => {
                    console.log(error)
                })

        }

    }, []);

    //Cria let de dados com labels e valor baseado nos generos existentes e
    //os que se repetiram no 100 Top Rated
    let dataGenres = []
    for (let o in genresRepits) {
        genresList.map((item, i) =>{
            if(item.id == o){
                dataGenres.push({
                    label: item.name,
                    y: genresRepits[o]
                });
            }
        })
       
    }

    const options = {
        title: {
            text: "Genres 100 Top Rated Movies"
        },
        data: [
            {
                type: "column",
                dataPoints: dataGenres
            }
        ]
    }

    if (loading) {
        return (<Loading />)
    } else {

        return (
            <div>
                <div className='row' >
                    <div className='col-12'>
                    <CanvasJSChart options={options} />
                    </div>
                </div>
            </div>
        );
    }


}
export default Index