import React, { Component, useState  } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Particles from 'react-particles-js';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
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
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [boxes, setBoxes] = useState([])
  
    const onImageSubmit = (event) => {
      event.preventDefault()
      setImageUrl(input)
      const app = new Clarifai.App({
        apiKey: '3c90c27a92f6444dbb9bb2c7571ac974',
      })
      if (input !== imageUrl) {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
          .then(response => {
            // console.log(response)
            const totalFaces = response.outputs[0].data.regions
            console.log(totalFaces.length, 'faces detected')
  
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
  
    return (
      <div className="App">
        <div>
          <Particles className='particles' params={particleParams} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={e => setInput(e.target.value)} onImageSubmit={onImageSubmit} />
         
        </div>
      </div>
    );
  }



  export default App;

  // <FaceRecognition imageUrl={imageUrl} boxes={boxes} />



























// class App extends React.Component {
  
//   render(){
//     const [input, setInput] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   // const [boxes, setBoxes] = useState([]);

//   const onImageSubmit = (event) => {
//     event.preventDefault();
//     setImageUrl(input)
//     const app = new Clarifai.App({
//       apiKey: '3c90c27a92f6444dbb9bb2c7571ac974'
//     })
//     if(input !== imageUrl) {
//       app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
//       .then(response => {
//         console.log(response);
//       })
//       .catch(err => {
//         console.log(err.toJSON())
//       })
//     }
//   }
//     return (
//       <div className="App">
//       <div>
// 	  	<Particles className='particles' params={particleParams} />
//       	<Navigation />
//       	<Logo />
//      	<Rank />
//       	<ImageLinkForm onInputChange={e => setInput(e.target.value)} onImageSubmit={onImageSubmit} />
//         {/* <FaceRecognition imageUrl={imageUrl} boxes={boxes} /> */}
//       </div>
//     </div>
//     )
//   }
// }






// class App extends Component {
// constructor() {
//   super();
//   this.state = {
//     input: '',
//   }
// }
// onInputChange = (event) => {
//   console.log(event.target.value);
// }

// onButtonSubmit = () => {
//   console.log('click');
//   App.models.
//   predict(
//   "3c90c27a92f6444dbb9bb2c7571ac974",
//   "https://samples.clarifai.com/face-det.jpg").
//   then(
//   function(response){
//   //do something with response
//    console.log(response);
//   },
//   function(err) {
//   }
//   );
// }
//   render(){
//   return (
//     <div className="App">
//        <Particles className='particles' params={particleParams} />
//       <Navigation />
//       <Logo />
//       <Rank />
//       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
//       {/* 
//       <FaceRecognition /> */}
//     </div>
//   );
// }
// }


  