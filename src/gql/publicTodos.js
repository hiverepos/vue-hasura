import gql from "graphql-tag";

export const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription notifyNewPublicTodos {
    todos(
      where: { is_public: { _eq: true } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      id
      title
      created_at
    }
  }
`;

export const GET_OLD_PUBLIC_TODOS = gql`
  query getOldPublicTodos($oldestTodoId: Int) {
    todos(
      where: { is_public: { _eq: true }, id: { _lt: $oldestTodoId } }
      limit: 7
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_public
      user {
        name
      }
    }
  }
`;

export const GET_NEW_PUBLIC_TODOS = gql`
  query getNewPublicTodos($latestVisibleId: Int!) {
    todos(
      where: { is_public: { _eq: true }, id: { _gt: $latestVisibleId } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_public
      user {
        name
      }
    }
  }
`;
