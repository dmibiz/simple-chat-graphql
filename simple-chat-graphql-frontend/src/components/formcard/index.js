import Form from '../form';

const FormCard = ({ children, errors }) => {
    return (
        <div className="card col-lg-3 col-md-6 mx-auto mt-lg-5">
            <div className="card-body">
                <Form errors={errors}>
                    {children}
                </Form>
            </div>
        </div>
    );
}

export default FormCard;