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
  const [box, setBox] = useState([{}]);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  };

  const returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '361358e1cff94b8fbd688eb16ec82151';
    const USER_ID = 'kevinhoffmannlu';       
    const APP_ID = 'SmartBrain';  
    const IMAGE_URL = imageURL;
    
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
        .then(result => displayFaceBox(calculateFaceLocation(result)))
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
     <FaceRecognition box={box} imageURL={imageURL}/>
    </div>
  );
}

export default App;
