<template>
  <div
    class="h-screen w-full bg-slate-200 flex flex-col pt-10 items-center gap-10"
  >
    <h1 class="text-4xl font-bold">Become an user</h1>
    <form class="flex flex-col gap-4" @submit.prevent="signup()">
      <div class="w-full flex flex-col gap-2 items-start">
        <label for="description">Full Name: </label>
        <input
          type="text  "
          v-model="formData.name"
          class="w-[300px] h-[30px]"
          required
        />
      </div>
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
        Submit
      </button>
    </form>
  </div>
</template>

<!-- <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          name: "",
          email: "",
          password: "",
        },
      };
    },
    methods: {
      async signup() {
        try {
          const response = await axios.post(
            "http://localhost:4000/signup",
            this.formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
  
          this.formData.name = "";
          this.formData.email = "";
          this.formData.password = "";
          this.$router.push("/login");
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      },
    },
  };
  </script>
   -->

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const formData = ref( {
  name: "",
  email: "",
  password: "",
});

const router = useRouter();

const signup = async () => {
  try {
    const response = await axios.post("http://localhost:4000/auth/signup", formData.value, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);

    formData.value.name = "";
    formData.value.email = "";
    formData.value.password = "";
    router.push("/login");

  } catch (error) {
    console.error("Error submitting form:", error);
    
  }
}

</script>
