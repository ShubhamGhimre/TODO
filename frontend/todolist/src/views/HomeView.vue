<template>
  <div>
    <!-- get user data from api -->
    <h1 v-if="userData" class="text-5xl font-bold text-center my-4">
      Hello {{ userData.name }}
    </h1>
    <!-- {{ userData  }} -->
    <div v-if="data" class="grid grid-cols-3 gap-10 px-10 mt-10">
      <div v-for="item in data" :key="item._id" class="card">
        <h2 class="text-3xl font-bold">{{ item.title }}</h2>
        <p class="text-xl">{{ item.description }}</p>
        <p><strong>Completed:</strong> {{ item.completed }}</p>
        <p>
          <strong>Created At:</strong>
          {{
            new Date(item.created_at).toLocaleString({
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <div class="flex flex-col gap-2 my-2">
          <p class="text-md" v-if="item.posted_by">{{ item.posted_by.name }}</p>
          <p v-if="item.posted_by">{{ item.posted_by.email }}</p>
        </div>
        <!-- option to edit and delete -->
        <div class="flex gap-10 item-center mt-4">
          <button
            v-if="item.completed === false"
            @click="markAsCompleted(item._id)"
            class="bg-green-400 text-white px-4 py-2 rounded-md"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <router-link
            :to="`/edit/${item._id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
            ><i class="fa-solid fa-pen-to-square"></i
          ></router-link>

          <button
            @click="deletePost(item._id)"
            class="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p v-if="error">An error occurred: {{ error.message }}</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<!-- using Options API -->
<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      data: null,
      error: null,
    };
  },
  mounted() {
    this.fetchUser();
    this.fetchData();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:4000/get-user", {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        });
        this.userData = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/read", {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        });

        this.data = response.data.data;
      } catch (error) {
        this.error = error;
        console.error(error);
      }
    },

    async deletePost(id) {
      try {
        const response = await axios.post(
          `http://localhost:4000/delete`,
          { id },
          {
            headers: {
              "Content-Type": "application/json",
              authToken: localStorage.getItem("authToken"),
            },
          }
        );
        if (response.data.success) {
          this.data = this.data.filter((item) => item._id !== id);
          alert(response.data.message);
        }
        this.fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    async markAsCompleted(id) {
      try {
        const response = await axios.post(
          "http://localhost:4000/mark-completed",
          { id }
          ,{
            headers: {
              "Content-Type": "application/json",
              authToken: localStorage.getItem("authToken"),
            },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          this.fetchData();
        }
      } catch (error) {
        console.error("Error marking as completed:", error);
      }
    },
  },
};
</script> -->

<!-- using Composition API -->
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const data = ref(null);
const userData = ref(null);
const error = ref(null);

// Fetch user data
const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/get-user", {
      withCredentials: true,
    });
    userData.value = response.data;
    // console.log(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

// Fetch post Data
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/posts/read", {
      withCredentials: true,
    });
    data.value = response.data.data;
  } catch (error) {
    this.error = error;
    console.error(error);
  }
};

// delete posts
const deletePost = async (id) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/posts/delete`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.data.success) {
      data.value = data.value.filter((item) => item._id !== id);
      alert(response.data.message);
    }
    fetchData();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// mark posts as marked
const markAsCompleted = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/posts/mark-completed",
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
      fetchData();
    }
  } catch (error) {
    console.error("Error marking as completed:", error);
  }
};

onMounted(() => {
  fetchUser();
  fetchData();
});

// return {
//   data,
//   userData,
//   error,
//   deletePost,
//   markAsCompleted,
// };
</script>

<style>
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
