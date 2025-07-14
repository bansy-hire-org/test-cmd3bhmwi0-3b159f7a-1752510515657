<template>
  <div class="app">
    <h1>Vue Task Manager</h1>
    <TaskForm @addTask="addTask" />
    <div>
      <label for="priorityFilter">Filter by Priority:</label>
      <select id="priorityFilter" v-model="filterPriority">
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <TaskList :tasks="filteredTasks" @deleteTask="deleteTask" @toggleComplete="toggleComplete" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  components: {
    TaskList,
    TaskForm,
  },
  data() {
    return {
      tasks: [],
      filterPriority: 'all',
    };
  },
  mounted() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      deep: true,
    },
  },
  computed: {
    filteredTasks() {
      if (this.filterPriority === 'all') {
        return this.tasks;
      }
      return this.tasks.filter((task) => task.priority === this.filterPriority);
    },
  },
  methods: {
    addTask(newTask) {
      this.tasks.push(newTask);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    toggleComplete(taskId) {
      this.tasks = this.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    },
  },
};
</script>

<style scoped>
.app {
  font-family: sans-serif;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>