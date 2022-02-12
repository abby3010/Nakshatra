import React, { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('');
    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&q=${keyword.split(' ').join('')}&limit=1`);
            const { data } = await response.json();
            setGifUrl(data[0].images?.downsized_medium.url);

        } catch (error) {
            console.log(error);
            // Set the url to demo gif url
            setGifUrl('https://giphy.com/embed/B2FetdprxEgXxXc0yL');
        }
    }

    useEffect(() => { 
        if(keyword) {
            fetchGifs();
        }

    }, [keyword]);

    return gifUrl;
}

export default useFetch;