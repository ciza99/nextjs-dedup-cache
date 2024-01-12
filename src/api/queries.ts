import { gql } from "graphql-request";

export const LayoutQuery = gql`
  query {
    layout
  }
`;

export const ProductsListQuery = gql`
  query {
    products {
      slug
    }
  }
`;

export const ProductQuery = gql`
  query ($slug: String!) {
    product(slug: $slug) {
      slug
    }
  }
`;
