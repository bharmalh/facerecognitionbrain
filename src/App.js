import React, { Component, useState  } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
// import Particles from 'react-particles-js';
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


function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const [boxes, setBoxes] = useState([]);

  const onImageSubmit = (event) => {
    event.preventDefault()
    setImageUrl(input)
    const app = new Clarifai.App({
      apiKey: '3c90c27a92f6444dbb9bb2c7571ac974'
    })
    if(input !== imageUrl) {
      app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.toJSON())
      })
    }
  }
  return (
    <div className="App">
      <div>
        <ImageLinkForm onInputChange={e => setInput(e.target.value)} onImageSubmit={onImageSubmit} />
        {/* <FaceRecognition imageUrl={imageUrl} boxes={boxes} /> */}
      </div>
    </div>
  );

}







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
//   app.models.
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

export default App;
  