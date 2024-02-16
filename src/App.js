import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { useState } from 'react';

function App() {

  const [imageURL, setIMAGE_URL] = useState('');
  const [input, setInput] = useState('');
  const [box, setBox] = useState([{}]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  };

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
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
        .then(response => response.json())
        .then(result => {
          if (result) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              setUser({...user, entries: count});
            })
          }
          displayFaceBox(calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }

  function onRouteChange(route){
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <>
        <div>
          <ParticlesBg type="cobweb" num={20} bg={true} className="particles"/>
        </div>
      </>
     <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
     { 
     route === 'home' 
      ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm 
          handleChange={handleChange} 
          onButtonSubmit={onButtonSubmit} 
          />
          <FaceRecognition 
          box={box} 
          imageURL={imageURL}
          />
        </div> 
     : (
        route === 'signin'
        ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
        : (
          route === 'signout'
          ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )
     ) 
      }
    </div>
  );
}

export default App;

// test images
// https://images.unsplash.com/photo-1687825520449-e7fc1a144cb2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://plus.unsplash.com/premium_photo-1707403865913-d8ca5c2962dd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://images.unsplash.com/photo-1706550632858-6216ce4e61a7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D