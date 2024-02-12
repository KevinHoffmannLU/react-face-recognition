import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import { useState } from 'react';

function App() {

  const [imageURL, setIMAGE_URL] = useState('');
  const [input, setInput] = useState('');

  const returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '361358e1cff94b8fbd688eb16ec82151';
    const USER_ID = 'kevinhoffmannlu';       
    const APP_ID = 'SmartBrain';  
    const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
  }
  function handleChange(event){
    setInput(event.target.value);
  }

  function onButtonSubmit() {
    setIMAGE_URL(input);
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(imageURL))
        .then(response => response.json())
        .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
  }
  return (
    <div className="App">
      <>
        <div>
        <ParticlesBg type="cobweb" num={20} bg={true} className="particles"/>
        </div>
      </>
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm 
     handleChange={handleChange} 
     onButtonSubmit={onButtonSubmit} 
     />
     <FaceRecognition imageURL={imageURL}/>
    </div>
  );
}

export default App;
