const ErrorMessage = ({errorMessage}) => {
    if (errorMessage === null) {
        return null
    }

    return (
        <div className='errorMessage'>
            {errorMessage}
        </div>
    )
}

export default ErrorMessage