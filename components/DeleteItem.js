import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ALL_ITEMS_QUERY } from "./Items";
import gql from "graphql-tag";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
      title
      description
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter the deleted item out of the page
    console.log(data.items);
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    console.log(data.items);
    // 3. Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  handleDelete = (e, deleteItemMutation) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItemMutation();
    }
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={e => this.handleDelete(e, deleteItem)}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
