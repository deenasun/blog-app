const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>{message}</div>
    )

}

const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    fontStyle: 'italic',
    fontSize: 20
}


export default Notification