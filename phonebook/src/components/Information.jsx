import Individual from './Individual'

const Information = ({ persons, setPersons}) => {
    return (
        <div>
        <h2>Numbers</h2>
            {persons.map(p => <Individual key={p.id} id={p.id} name={p.name} number={p.number} setPersons={setPersons} />)}
        </div>
    )
}

export default Information