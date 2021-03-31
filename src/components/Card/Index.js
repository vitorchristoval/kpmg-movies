import React, { useState, useEffect } from 'react';


function Index(props) {

    return (
        <div className='col-md-3' onClick={() => window.location.href = '/details/' + props.movie.id}>
            <div class="card" >
            
                <img src={'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path} className="card-img-top" alt={props.movie.title} />
                <div className='vote_average'>
                    <img src='/fav.png' height='40px'/>{props.movie.vote_average * 10} %
                </div>
                <div class="card-body">
                    <h5 class="card-title">{props.movie.title}</h5>
                    <p class="card-text">({new Date(props.movie.release_date).getFullYear()})</p>
                    <a href={'/details/' + props.movie.id} class="btn btn-primary">More details</a>
                </div>
            </div>

        </div>
    );

}
export default Index