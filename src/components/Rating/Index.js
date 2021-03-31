import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import API from '../../API'
import { toast } from 'react-toastify';

function Index(props) {
    const apiKey = '890580ebea281a7322da2043724cab0f'
    const [rating, setRating] = useState(props.vote_average)
    const [guest_session_id, setGuest] = useState('')

    useEffect(() => {

        API.get(`authentication/guest_session/new?api_key=${apiKey}`)
            .then(async response => {
                // If request is good...
                setGuest(response.data.guest_session_id)
            })
            .catch((error) => {
                console.log(error)
            })



    }, []);

    function newRating(value){
        var body = {
            value: value
        }
     
        API.post(`movie/${props._id}/rating?api_key=${apiKey}&guest_session_id=${guest_session_id}`, body, { headers: { ContentType: 'application/json;charset=utf-8'} } )
        .then(async response => {
            // If request is good...
            toast.success('Success...Your rating has been saved')
            
        })
        .catch((error) => {
            console.log(error)
            //Erro acontece normalmente por causa do CORS
            toast.error('An error has occurred, please contact support')
        })
    }

    const configs = {
        size: 20,
        isHalf: true,
        char: "♥",
        value: rating,
        onChange: newValue => {
            newRating(newValue)
        }
    };


    return (
        <ReactStars {...configs} />
    );

}
export default Index