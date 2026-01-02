import React, { useEffect, useState } from "react";
import Weather from ".";
import { ENV } from "../../../config/env";
import '../../../assets/css/pages/projects/weather.css';

const WeatherFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);    
    const [zipcode, setZipcode] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const validateZipcode = (zip) => {
        // US zipcodes 12345 or 12345-6789
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zip);
    };


    const fetchWeather = async (zip) => {
        if (!validateZipcode(zip)) {
            setError('Please enter a valid US zipcode (e.g., 12345 or 12345-6789)');
            return;
        }
        setError('');

        try {        
            const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
            const params = new URLSearchParams({
                key: ENV.projects.weather.apiKey,
                q: zip,
                days: 5,
                api: 'no',
                alerts: 'no'
            });

            const resp = await fetch(`${baseUrl}?${params.toString()}`);
            const result = await resp.json();
            if (result.error) {
                setError(result.error.message || 'Unable to find weather data for this Zipcode');
                setData(null);
            } else {
                setData(result);
                setZipcode(zip);
            }
        } catch (err) {
            console.error('Error fetching API Data: ', err);
            setError('Failed to fetch weather data. Please try again.');
            setData(null);
        } finally {
            setIsLoading(false);
        }        
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(inputValue);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^[\d-]*$/.test(value)) {
            setInputValue(value);
            setError('');
        }
    }

    useEffect(() => {
        fetchWeather(zipcode);
    },[zipcode]);

    return (<>
        <form onSubmit={handleSearch} className="weather-search">
            <div className="search-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Zipcode (e.g., 98765)"
                    className="zipcode-input"
                />
                <button
                    type='submit'
                    className="search-button"
                >
                    Search
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
        <Weather data={data} isLoading={isLoading} />
    </>);

}

export default WeatherFetch;
