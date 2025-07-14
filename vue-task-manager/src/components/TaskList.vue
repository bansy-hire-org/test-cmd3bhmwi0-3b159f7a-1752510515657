<template>
  <ul>
    <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
      <input type="checkbox" :checked="task.completed" @change="toggleComplete(task.id)" />
      {{ task.title }} - Priority: {{ task.priority }}
      <button @click="deleteTask(task.id)">Delete</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  emits: ['deleteTask', 'toggleComplete'],
  methods: {
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
    },
    toggleComplete(taskId) {
      this.$emit('toggleComplete', taskId);
    },
  },
};
</script>

<style scoped>
/* Styles for TaskList component */
</style>