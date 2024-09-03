import pService from '/src/services/persons'

const Individual = ({ id, name, number, setPersons}) => {

    const deletePerson = () => {
        console.log('delete ', id)
        pService.deleteSomething(id)
        confirm(`Delete ${name} ?`)
        pService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }

    return (
        <>
            <p>{name} {number}
                <button onClick={deletePerson}>delete</button>
            </p>
        </>
    )
}

export default Individual