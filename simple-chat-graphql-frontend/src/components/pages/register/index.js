import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom';
import { ModalManager } from 'react-dynamic-modal';
import Layout from '../../layout';
import Input from '../../input';
import Button from '../../button';
import FormCard from '../../formcard';
import Modal from '../../modal';
import { LOGIN_ROUTE_PATH } from '../../../constants';
import { CREATE_USER_MUTATION } from '../../../graphql/mutations';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const resetInputValues = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatedPassword('');
    }

    const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted() {
            resetInputValues();
            ModalManager.open(<SuccesfulRegistrationModal />);
        },
        onError({ graphQLErrors }) {
            let errorMessages = [];

            if (graphQLErrors) {
                errorMessages = graphQLErrors.map(error => error.message);
            } else {
                errorMessages.push('Error creating user. Please try again later')
            }

            setErrors(errorMessages);
        }
    });

    const isEmailValid = (email) => {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setErrors([]);
        let errorMessages = [];

        if (!isEmailValid(email)) {
            errorMessages.push('E-mail is not valid');
        }

        if (password !== repeatedPassword) {
            errorMessages.push('Passwords don\'t match')
        }

        if (errorMessages.length) {
            setErrors(errorMessages);
            return;
        }

        createUser({
            variables: {
                createUserInput: {
                    username,
                    email,
                    password
                }
            }
        });
    }

    const redirectToLogin = (e) => {
        e.preventDefault();
        ModalManager.close();
        history.push(LOGIN_ROUTE_PATH);
    }

    const SuccesfulRegistrationModal = () => {
        return (
            <Modal
                title="Registration successful"
            >
                {/* Redirect programmatically because router links cannot be used inside modal as it is not a part of the router */}
                <Button label="Sign in" onClick={(e) => redirectToLogin(e)}>Login</Button>
            </Modal>
        );
    }

    return (
        <Layout>
            <FormCard errors={errors}>
                <Input
                    id="registerEmailInput"
                    type="text"
                    label="E-mail"
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
                <Input
                    id="registerUsernameInput"
                    type="text"
                    label="Username"
                    value={username}
                    onChange={({target: {value}}) => setUsername(value)}
                />
                <Input
                    id="registerPasswordInput"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}
                />
                <Input
                    id="registerRepeatedPasswordInput"
                    type="password"
                    label="Repeat password"
                    value={repeatedPassword}
                    onChange={({target: {value}}) => setRepeatedPassword(value)}
                />
                <Button
                    label="Register"
                    onClick={(e) => handleRegister(e)}
                    isLoading={loading}
                    disabled={!email || !username || !password || !repeatedPassword}
                />
            </FormCard>
        </Layout>
    );
}

export default Register;