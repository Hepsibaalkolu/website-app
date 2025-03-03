import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState()
  const [age , setAge] = useState()

  useEffect(()=> {
    // axios.get('http://localhost:4800/getUser')
    axios.get('https://website-app-server.vercel.app/getUser', { withCredentials: true })
    .then((users) =>{
      setUsers(users.data)
    })
    .catch(err => console.log(err))
  },[])

  const Submit = () => {
    // axios.post('http://localhost:4800/createUser', {name, age})
    axios.post('https://website-app-server.vercel.app/createUser', { withCredentials: true }, {name, age})
    .then((users) =>{
      console.log(users)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='center' >
    <h2>First Mern App(Mongodb, Express, React, Node)</h2>
      {
        users.map(user => {
          return <div>
            <h3>Name : {user.name}</h3>
            <h3>Age :{user.age}</h3>
            <hr></hr>
          </div>
        })
      }
      <br/>
        <input type="text" onChange={(e)=> setName(e.target.value)}/>
        <input type='text' onChange={(e)=> setAge(e.target.value)} />
        <button onClick={Submit}>Create User</button>
    </div>
  )
}

export default App
