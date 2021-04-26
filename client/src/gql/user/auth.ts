import gql from 'graphql-tag'

export const CREATED_USER = gql`
    mutation createdUser($userInput: userInput) {
        createdUser(userInput: $userInput)
    }
`

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`
