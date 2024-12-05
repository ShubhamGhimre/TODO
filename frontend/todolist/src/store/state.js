import { ref, watch } from "vue";
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('useCounter',()=>{
  const authState = ref({
    isAuthenticated: false,
    isAdmin: false,
  });
  // watch the state for changes
  watch(authState, (newVal) => {
    console.log("authState changed", newVal);
  });
  
  const setAuthState = (authenticated, role) => {
    authState.value.isAuthenticated = authenticated;
    authState.value.isAdmin = role === "admin";
  };
  
  const resetAuthState = () => {
    authState.value.isAuthenticated = false;
    authState.value.isAdmin = false;
  };

return{
  resetAuthState,
  setAuthState,
  authState
}
})