
import axios from "axios";
import React, { useState } from "react"

export default function Input() {
       
    const [pastedLink , setPastedLink] = useState('');
    const [shortenedLink , setShortenedLink] =useState('');
    const [error , setError] = useState('');

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) :void => {
          setPastedLink(e.target.value);
    }

    const handleSubmit =  async(e:React.FormEvent) : Promise <void> => {
        e.preventDefault();
        
        if(!pastedLink) {
            setError('Please enter a valid link');
            return;
        }

        setError('');
        
        try {

           const response = await axios.post('https://api-ssl.bitly.com/v4/shorten' ,
            {long_url : pastedLink},
            {
                headers: {
                    Authorization: `81212549b9613455a40704dd0ce0542fe4cbc566`,  // Replace with your actual token
                    'Content-Type': 'application/json',
                  },
            }
           );
           setShortenedLink(response.data.link)
        }
        catch (err) {
            setError('Error shortening the URL. Please try again.');
        }
        

    }



    return (
      <>
        <div className="container">
          <div className="input-title">
            <p>Paste your link here</p>
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Paste your link here to shorten it....."
              value={pastedLink}
              onChange={handleInput}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {shortenedLink && (
            <div className="shortened-url">
              <p>Shortened URL:</p>
              <input type="text" value={shortenedLink} readOnly />
              <button
                onClick={() => navigator.clipboard.writeText(shortenedLink)}
              >
                Copy
              </button>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <div className="input-description">
            <p>
              LinkShortener is a free tool that lets you shorten links and
              create compact versions. The link shortener makes sharing easier
              by generating shortened links.
            </p>
          </div>
        </div>
      </>
    );
}