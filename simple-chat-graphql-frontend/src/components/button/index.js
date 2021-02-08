const Button = (props) => {
    const { label, onClick, isLoading, disabled } = props;
    
    return (
        <button type="submit" className="btn btn-primary" onClick={onClick} disabled={isLoading || disabled}>
            {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {isLoading ? 'Loading...' : label}
        </button>
    );
}

export default Button;