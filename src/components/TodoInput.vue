<template>
  <div class="formInput">
    <input
      class="input"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <i class="downArrow fa fa-angle-right" />
  </div>
</template>

<script>
import { ADD_TODO, GET_MY_TODOS } from "../gql/todos";
export default {
  props: ["type"],
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo: function () {
      // insert new todo into db
      const title = this.newTodo.trim();
      const isPublic = this.type === "public" ? true : false;
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          todo: title,
          isPublic,
        },
        update: (cache, { data: { insert_todos } }) => {
          try {
            if (this.type === "private") {
              const data = cache.readQuery({
                query: GET_MY_TODOS,
              });
              const inserted = insert_todos.returning;
              data.todos.splice(0, 0, inserted[0]);
              cache.writeQuery({
                query: GET_MY_TODOS,
                data,
              });
            }
          } catch (error) {
            console.error(error);
          }
        },
      });
      this.newTodo = "";
    },
  },
};
</script>
