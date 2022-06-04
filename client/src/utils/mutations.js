import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = qgl`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = qgl`
    mutation saveBook($bookId: String!, $authors: [String], $description: String!, $title: String, $image: String, $link: String) {
        saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link)
    {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK = qgl`
    mutation removeBook($BookId: String!) {
        removeBook(bookId: $bookId) {
            {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }

        }
    }
`