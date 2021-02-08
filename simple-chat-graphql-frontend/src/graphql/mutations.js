import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
    mutation login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            token
            user {
                id
                username
                email
            }
        }
    }
`

export const CREATE_USER_MUTATION = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(userInput: $createUserInput) {
            user {
                id
            }
        }
    }
`

export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($messageInput: CreateMessageInput!) {
        sendMessage(messageInput: $messageInput) {
            id
        }
    }
`