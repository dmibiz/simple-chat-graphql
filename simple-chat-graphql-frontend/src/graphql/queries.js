import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
    query messages {
        messages {
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