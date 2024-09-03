import { useState } from 'react'
import axios from 'axios'
import pService from '/src/services/persons'

const Form = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotificationMessage}) => {

    const addInfo = (event) => {
        event.preventDefault()
        if (checkDuplicate(newName)) {
            alert(`${newName} is already added to the phonebook`)
            setNewName('')
            return
        }
        console.log(newName, newNumber)
        const p = {
            name: newName,
            number: newNumber
        }

        pService
            .create(p)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })
        
        setNotificationMessage('New person added')
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const checkDuplicate = (temp) => {
        let names = persons.map(p => p.name)
        return names.includes(temp)
    }
    
    return (
        <form onSubmit={addInfo}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form