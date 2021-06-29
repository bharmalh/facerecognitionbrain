import React, {useState} from 'react';

const Register = ({loadUser, onRouteChange})=> {

const [regName, setRegName] = useState('');
const [regEmail, setRegEmail] = useState('');
const [RegPassword, setRegPassword] = useState('');

  const onNameReg = (event) => {
	  setRegName(event.target.value)
  }

  const onEmailReg = (event) => {
	  setRegEmail(event.target.value)
  }

  const onPasswordReg = (event) => {
	setRegPassword(event.target.value)
}


const onSubmitReg = () => {
	const loginDetails={
		
	}
	fetch('http://localhost:3004/register', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
      name: regName,
			email: regEmail,
			password: RegPassword
		})
	})
	.then(response=>response.json())
	.then(user=>{
		if(user){
      loadUser(user);
			onRouteChange('home');
		}
	})
	
}






	return (
<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
	  <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input onChange={onNameReg} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={onEmailReg} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={onPasswordReg} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={onSubmitReg}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"
      />
    </div>
  </div>
</main>
</article>
);
}

export default Register;