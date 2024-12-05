<template>
  <div class="h-screen w-full bg-slate-200 flex flex-col pt-10 items-center gap-10">
    <h1 class="text-4xl font-bold">Create an new list</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <div class="w-full flex flex-col gap-2 items-start">
        <label for="title">Title</label>
        <input type="text" v-model="formData.title" required class="w-[300px] h-[30px]" />
      </div>
      <div class="w-full flex flex-col gap-2 items-start">
        <label for="description">Description: </label>
        <input type="text" v-model="formData.description" class="w-[300px] h-[30px]" required />
      </div>
      <button type="submit" class="px-5 py-3 text-white bg-green-600">Submit</button>
    </form>
  </div>
</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return{
                formData: {
                    title: '',
                    description: ''
                }
            };
        },
        methods: {
            async submitForm() {
                try {
                    const response = await axios.post('http://localhost:4000/posts/create', this.formData , {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    });
                    console.log(response.data);

                    this.formData.title = '';
                    this.formData.description = '';
                    this.$router.push('/');
                } catch (error) {
                    console.error("Error submitting form:", error);
                }
            }
        }
    }
</script>
