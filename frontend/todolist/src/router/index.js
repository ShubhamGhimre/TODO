import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateView from "@/views/CreateView.vue";
import EditView from "@/views/EditView.vue";
import AdminView from "@/views/AdminView.vue";
import GuestView from "@/views/GuestView.vue";
import axios from "axios";
import SignupView from "@/views/SignupView.vue";
import LoginView from "@/views/LoginView.vue";
import Default from "@/layouts/default.vue";

const routes = [
  
  {
    path: "/", 
    component: Default,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
        meta: { requiresAuth: true, role: "user" },
      },
      {
        path: "/login",
        name: "login",
        component: LoginView,
        meta: { requiresAuth: false , role: ""},
      },
      {
        path: "/register",
        name: "register",
        component: SignupView,
        meta: { requiresAuth: false , role: ""},
    
      },
     
      {
        path: "/new",
        name: "new",
        component: CreateView,
        meta: { requiresAuth: true , role: "user"},
      },
      {
        path: "/edit/:id",
        name: "EditPost",
        component: EditView,
        props: true,
        meta: { requiresAuth: true, role: "user" },
      },

      {
        path: "/admin",
        name: "admin",
        component: AdminView,
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "/guest",
        name: "guest",
        component: GuestView,
        meta: { requiresAuth: false },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem('authToken');

//   if (!token && to.meta.requiresAuth) {
//     return next({ name: 'guest' });
//   }

//   if (token) {
//     try {
//       const response = await axios.get('http://localhost:4000/get-role', {
//         withCredentials: true
//       });

//       const role = response.data.role;

//       // If the user is an admin, they can access all routes
//       if (role === 'admin') {
//         return next();
//       }

//       // If the user is a regular user, allow access to user routes
//       if (role === 'user' && to.meta.role !== 'admin') {
//         return next();
//       }

//       // Redirect unauthorized users based on their role
//       return next(role === 'admin' ? { name: 'admin' } : { name: 'home' });
//     } catch (err) {
//       console.log("Error fetching user role", err);
//       localStorage.removeItem('authToken');
//       return next({ name: 'login' });
//     }
//   }

//   next();
// });

router.beforeEach(async (to, from, next) => {
  try {
    if (to.meta.requiresAuth) {
      // console.log("Requires Auth");
      const response = await axios.get("http://localhost:4000/get-role", {
        withCredentials: true,
      });
      const role = response.data.role;
      // console.log("Role", role);

      if (role === "admin") {
        return next();
      }

      if (role === "user" && to.meta.role !== "admin") {
        return next();
      }

      return next(role === "admin" ? { name: "admin" } : { name: "home" });
    }
    next();
  } catch (error) {
    console.log("Error fetching user role", error);

  }
  // if (to.meta.requiresAuth) {
  //   return next({ name: "login" });
  // }
  next();
});

export default router;
