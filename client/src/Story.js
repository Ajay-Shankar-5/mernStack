import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import './Story.css'

const Story = () => {
	const navigate = useNavigate()
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')



    async function populateQuote(){
        const req = await fetch ('http://localhost:1337/api/story',{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data =await req.json()

        if(data.status === 'ok'){
            setQuote(data.quote)
        } else{
            alert(data.error)
        }

        console.log(data)
    }
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate("/login", { replace: true })
			} else {
				populateQuote()
			}
		}
	}, [])


    async function updateQuote(event){
        event.preventDefault()

        const req = await fetch ('http://localhost:1337/api/story',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote:tempQuote,
            }),
        })

        const data = await req.json()

        if(data.status === 'ok'){
            setQuote(tempQuote)
            setTempQuote('')
            
        } else{
            alert(data.error)
        }

    }

	

	return (
		<div className='story'>
            <h1 className='head'>your story : {quote || 'No quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input className='text'
                type = 'text'
                placeholder='your story here'
                value={tempQuote}
                onChange={(e)=> setTempQuote(e.target.value)}
                />
                <br/>
                <input type="submit" className='submit' value="Update story" />
            </form>
		</div>
	)
}

export default Story