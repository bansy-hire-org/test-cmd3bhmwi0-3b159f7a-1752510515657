<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Task title" v-model="title" />
    <select v-model="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      priority: 'medium',
    };
  },
  emits: ['addTask'],
  methods: {
    handleSubmit() {
      if (this.title.trim() !== '') {
        this.$emit('addTask', {
          id: Date.now(),
          title: this.title,
          completed: false,
          priority: this.priority,
        });
        this.title = '';
      }
    },
  },
};
</script>

<style scoped>
/* Styles for TaskForm component */
</style>