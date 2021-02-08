const Input = (props) => {
    const { id, type, label, value, onChange } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input type={type} className="form-control" id={id} value={value} onChange={onChange}/>
        </div>
    );
}

export default Input;