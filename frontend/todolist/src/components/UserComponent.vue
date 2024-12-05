<!-- <script>
import axios from "axios";
export default {
  props: {
    user: Object,
    isAdmin: Boolean,
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4000/get-users", {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        });
        this.users = response.data.data;
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async deleteUser(id) {
      try {
        const response = await axios.post(
          "http://localhost:4000/delete-user",
          { id },
          {
            headers: {
              "Content-Type": "application/json",
              authToken: localStorage.getItem("authToken"),
            },
          }
        );
        if (response.data.success) {
        //   this.data = this.data.filter((item) => item._id !== id);
          alert(response.data.message);
        }
        this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
};
</script> -->

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  user: Object,
  isAdmin: Boolean,
});

const users = ref(null);

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/get-user", {
      withCredentials: true,
    });

    users.value =  response.data.data
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const deleteUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/admin/delete-user",
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      alert(response.data.message);
    }
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="card">
    <h2 class="text-3xl font-bold">{{ user.name }}</h2>
    <p class="text-xl">{{ user.email }}</p>
    <p><strong>Role:</strong> {{ user.role }}</p>
    <p>
      <strong>Joined At:</strong>
      {{
        new Date(user.date).toLocaleString({
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </p>
    <div class="flex gap-10 item-center mt-4">
      <button
        @click="deleteUser(user._id)"
        class="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
