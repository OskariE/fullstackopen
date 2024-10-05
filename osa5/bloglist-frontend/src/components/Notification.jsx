const Notification = ({notificationMessage}) => {
    if (notificationMessage) {
        return (
            <div className='notificationMessage'>
                {notificationMessage}
            </div>
        )
    }
}

export default Notification