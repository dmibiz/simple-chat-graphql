import Errors from '../errors';

const Form = ({ children, errors }) => {
    return (
        <form>
            <Errors
                errors={errors}
            />
            {children}
        </form>
    );
}

export default Form;