import gql from 'graphql-tag';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription newMessage {
        newMessage {
            id
            sender {
                id
                username
            }
            content
            timestamp
        }
    }
`