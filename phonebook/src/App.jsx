import { useState, useEffect } from 'react'
import Form from './components/Form'
import Information from './components/Information'
import Notification from './components/Notification'
import pService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const hook = () => {
    pService
      .getAll()
      .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  console.log('persons.length:', persons.length)

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <h3>add a new</h3>
      <Form persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setNotificationMessage={setNotificationMessage} />

      <Information persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App