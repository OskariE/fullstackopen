const Error = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div className='errorMessage'>
        {errorMessage}
      </div>
    )
  }
}
export default Error