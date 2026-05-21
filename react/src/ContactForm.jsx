import { useState } from 'react'; 
function ContactForm(){
	const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    function handleAdd(){
    	event.preventDefault()
    	if(name.trim()==''||email.trim()==''||message.trim()==''){
    		setFeedback("COMPLETEAZA!");
    	}
    	else{
    		setFeedback("thank you my nigga "+name);
    		setName("");
    		setEmail("");
    		setMessage("");
    	}
    }
	return(
		<div>
		<form onSubmit={handleAdd}>
			<input 
				type="text"
				value={name}
				onChange={(e)=>setName(e.target.value)}
				placeholder="numele..."/>
			<input 
				type="text"
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
				placeholder="email..."/>
			<textarea
				value={message}
				onChange={(e)=>setMessage(e.target.value)}
				placeholder="mesaj..."/>
				<button type="submit">dai</button>
			</form>
			{feedback && <p>{feedback}</p>}
		</div>
			
		);
}
export default ContactForm; 