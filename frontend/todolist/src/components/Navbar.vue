<template>
  <div>
    <nav class="w-full bg-slate-600 py-6 flex items-center justify-around">
      <router-link to="/" class="nav-items">TODO List</router-link>

      <div ref="authSection">
        <div v-if="!store.authState.isAuthenticated" class="flex gap-5 items-center">
          <router-link to="/login" class="nav-items text-white">Login</router-link>
          <router-link to="/register" class="nav-items text-white">Signup</router-link>
        </div>

        <div v-else class="flex gap-5 items-center">
          <router-link
            to="/new"
            class="nav-items bg-green-500 text-white px-3 rounded-md py-2"
          >
            <i class="fa-solid fa-plus"></i>Create
          </router-link>

          <router-link to="/admin" class="nav-items" v-if="store.authState.isAdmin">View Users</router-link>

          <button @click="logout" class="nav-items text-white">Logout</button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { useCounterStore } from "@/store/state";

const router = useRouter();
const store = useCounterStore(); // Get the Pinia store instance

const checkAuthentication = async () => {
  try {
    const response = await axios.get("http://localhost:4000/get-role", {
      withCredentials: true,
    });

    if (response.data.role) {
      store.setAuthState(true, response.data.role);
      router.push("/");
    } else {
      store.setAuthState(false, null);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    store.setAuthState(false, null);
  }
};

const logout = async () => {
  try {
    await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });

    // Reset authentication state
    store.resetAuthState();

    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

onMounted(() => {
  checkAuthentication();
});
</script>

<style scoped>
.nav-items {
  color: white;
  text-decoration: none;
}
</style>
