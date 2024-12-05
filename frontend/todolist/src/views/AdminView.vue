<!-- <script>
// get users and display them
import PostComponent from "@/components/PostComponent.vue";
import UserComponent from "@/components/UserComponent.vue";
import axios from "axios";

export default {
  components: {
    UserComponent,
    PostComponent
  },
  data() {
    return {
      users: null,
      error: null,
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchUser();
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
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4000/get-users", {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        });
        this.users = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
};
</script> -->

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UserComponent from "@/components/UserComponent.vue";
import PostComponent from "@/components/PostComponent.vue";

const users = ref(null);
const userData = ref(null);

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/get-user", {
      withCredentials: true,
    });
    userData.value = response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin/get-users", {
      withCredentials: true,
    });
    users.value = response.data.data.filter((user) => user.role === "user");
    console.log(response.data.data);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

onMounted(() => {
  fetchUser();
  fetchUsers();
});
</script>

<template>
  <section>
    <div class="flex flex-col justify-center items-center my-2">
      <h1 v-if="userData">Welcome {{ userData.name }}</h1>
      <p>This is your Admin page</p>
    </div>
    <!-- display users -->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserComponent v-for="user in users" :key="user._id" :user="user" />

      <PostComponent />
    </div>
  </section>
</template>
