const Errors = ({ errors }) => {
    return (
        <div>
            {errors && errors.map((error, index) => <p key={index} className="text-danger">{error}</p>)}
        </div>
    );
}

export default Errors;