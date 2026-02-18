import { gql } from '@apollo/client';

export const USERS_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    whatsapp
    instagram
    tiktok
    logo
    brandColor
    isRoundedLogo
    status
    role
    createdAt
    updatedAt
    domain
    terms
  }
`;
