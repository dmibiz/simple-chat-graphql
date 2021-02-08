import React, { useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../../layout';
import Input from '../../input';
import Button from '../../button';
import FormCard from '../../formcard';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../../graphql/mutations';
import { SAVE_AUTHENTICATION } from '../../../redux/actions';

const Login = ({ dispatch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted({ login }) {
            const authData = {
                token: login.token,
                user: login.user
            };

            dispatch({ type: SAVE_AUTHENTICATION, payload: authData});
        },
        onError({ graphQLErrors }) {
            let errorMessages = [];

            if (graphQLErrors) {
                errorMessages = graphQLErrors.map(error => error.message);
            } else {
                errorMessages.push('Error loggin in. Please try again later')
            }

            setErrors(errorMessages);
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        login({
            variables: {
                loginInput: {
                    email,
                    password
                }
            }
        });
    }

    return (
        <Layout>
            <FormCard errors={errors}>
                <Input
                    id="loginEmailInput"
                    type="text"
                    label="E-mail"
                    value={email}
                    onChange={({target: {value}}) => setEmail(value)}
                />
                <Input
                    id="loginPasswordInput"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}
                />
                <Button
                    label="Sign in"
                    onClick={(e) => handleLogin(e)}
                    isLoading={loading}
                    disabled={!email || !password}
                />
            </FormCard>
        </Layout>
    );
}

export default connect()(Login);