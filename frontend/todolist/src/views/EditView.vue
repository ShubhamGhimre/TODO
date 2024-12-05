<template>
  <div class="h-screen w-full bg-slate-200 flex flex-col pt-10 items-center gap-10">
    <h1 class="text-4xl font-bold">Edit Post</h1>
    <form @submit.prevent="updatePost" class="flex flex-col gap-4">
      <div class="w-full flex flex-col gap-2 items-start">
        <label for="title">Title:</label>
        <input
          v-model="post.title"
          type="text"
          class="w-[300px] h-[30px]"
          id="title"
        />
      </div>
      <div class="w-full flex flex-col gap-2 items-start">
        <label for="description">Description:</label>
        <textarea
          v-model="post.description"
          class="w-[300px] h-[100px]"
          id="description"
        ></textarea>
      </div>
      <div class="w-full flex gap-2 items-center">
        <label for="completed">Completed:</label>
        <input type="checkbox" id="completed" class="w-4 h-5" v-model="post.completed" />
      </div>
      <div class="flex gap-10 items-center justify-center">
        <button type="submit" class="py-2 px-3 bg-green-500">Update</button>
        <button type="button" @click="cancelEdit" class="py-2 px-3 bg-red-500">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<!-- 
<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      post: {
        title: '',
        description: '',
      },
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:4000/read/${this.id}` , {
        headers: {
          'authToken': localStorage.getItem('authToken'),
        },
      });
      this.post = response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  },
  methods: {
    async updatePost() {
      try {
        const response = await axios.put(`http://localhost:4000/update/${this.id}`, this.post , {
          headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('authToken'),
          },
        });
        if (response.data.success) {
          alert('Post updated successfully');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
  },
};
</script> -->

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const post = ref({
    title: '',
    description: '',
  })

  const id = route.params.id;

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/posts/read/${id}` , {
       withCredentials  : true,
      });
      post.value = response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/posts/update/${id}`, post.value , {
        headers: {
          'Content-Type': 'application/json',
          
        },
        withCredentials: true,
      });
      if (response.data.success) {
        alert('Post updated successfully');
        router.push('/');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  onMounted(fetchPost);

</script>
