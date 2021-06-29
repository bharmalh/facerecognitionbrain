import React, {useState} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/rank/Rank';
import './App.css';


  const particleParams= 
    {
      particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 800
        }
      }
    }
  }





const App = ()=> {


//This is called a STATE HOOK. It is similar to using this.state if we used CLASS-based component
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [boxes, setBoxes] = useState([])
    const [route, setRoute] = useState('signIn')
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [users, setUser] = useState({
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: new Date()
	});

const loadUser=(data) => {
	setUser({
		id: data.id,
		name: data.name,
		email: data.email,
		entries: data.entries,
		joined: data.dateJoined
	})
}

/*	We just used this to test if the front end is communicating with the backend. useEffect is the same as componentDidMount in class-based Apps

	useEffect(() => {
		fetch('http://localhost:3004/')
		.then(response=>response.json())
		.then(data=>console.log(data))
	}, [])
*/



//This function deals with the event of image submit. 
    const onImageSubmit = (event) => {
      event.preventDefault()
      setImageUrl(input)
      const app = new Clarifai.App({apiKey: '3c90c27a92f6444dbb9bb2c7571ac974',})
      
      if (input !== imageUrl) {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
          .then(response => {
            if(response) {
				fetch('http://localhost:3004/image/', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({id: users.id})
				})
				.then(response=>response.json())
				.then(count=>{
					setUser(Object.assign(users, {entries: count}))
				})
			}
            const totalFaces = response.outputs[0].data.regions;
            console.log(totalFaces.length, 'faces detected');
  
            setBoxes(
              totalFaces.map(face =>
                calculateFaceLocation(face))
            )
          })
          .catch(err => {
            console.log(err.toJSON())
          })
      }
    }


//This function calculates the coordinates for the FaceBox. It is called in the ImageSubmit Function above.
    const calculateFaceLocation = (data) => {
      const clarifaiFace = data.region_info.bounding_box
      const image = document.getElementById('inputImage')
      const width = Number(image.width)
      const height = Number(image.height)
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }  
	

const ChangeTheRoute = (theRoute)=>{
	if(theRoute==='signOut'){
		setIsSignedIn(false);
	} else if (theRoute==='home') {
		setIsSignedIn(true);
	}
  setRoute(theRoute);
}


    return (
      <div className="App">
        <div>
          <Particles className='particles' params={particleParams} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={ChangeTheRoute}/>
        {route==='home' ? 
          <div> 
            {/* <Logo /> */}
            <Rank name={users.name} entries={users.entries}/>
            <ImageLinkForm onInputChange={e => setInput(e.target.value)} onImageSubmit={onImageSubmit} />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </div> 
    : (
		route==='signIn'
		?   <Signin loadUser={loadUser} onRouteChange={ChangeTheRoute} />
		:   <Register loadUser={loadUser} onRouteChange={ChangeTheRoute} />
	) 
  
        }
        </div>
      </div>
    );
      }


  export default App;

