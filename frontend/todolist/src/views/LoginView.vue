<template>
  <div>
    <div
      class="h-screen w-full bg-slate-200 flex flex-col pt-10 items-center gap-10"
    >
      <h1 class="text-4xl font-bold">Login IN</h1>
      <form class="flex flex-col gap-4" @submit="login()">
        <div class="w-full flex flex-col gap-2 items-start">
          <label for="title">Email</label>
          <input
            type="email"
            v-model="formData.email"
            required
            class="w-[300px] h-[30px]"
          />
        </div>
        <div class="w-full flex flex-col gap-2 items-start">
          <label for="description">password: </label>
          <input
            type="password"
            v-model="formData.password"
            class="w-[300px] h-[30px]"
            required
          />
        </div>

        <button type="submit" class="px-5 py-3 text-white bg-green-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<!-- use Options API -->
<!-- <script>
import { data } from "autoprefixer";
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              authToken: data.authToken,
            },
          }
        );
        console.log(response.data);
        console.log(response.data.authToken);
        localStorage.setItem("authToken", response.data.authToken);
        this.$emit("loginSuccess");
        alert("Login Successful");
        this.$router.push("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script> -->

<!-- using Composition API -->
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import Navbar from "@/components/Navbar.vue";
const apiURl = process.env.VUE_APP_API_URL;

const formData = ref({
  email: "",
  password: "",
});

const router = useRouter();

const login = async () => {
  try {
    await axios.post(`${apiURl}/auth/login`, formData.value, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    alert("Login Successful");
    // this.$router.push("/admin");

    // Redirect after login
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>
