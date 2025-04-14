import api from "@/services/api"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem("token"))
  const user = ref(localStorage.getItem("user"))
  const isAuth = ref(false);
  //const user = ref(JSON.parse(localStorage.getItem("user")));

  function setToken(tokenValue: any) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userCheck: any) {
    localStorage.setItem('user', JSON.stringify(userCheck))
    user.value = userCheck
  }

  function setIsAuth(auth: boolean) {
    isAuth.value = auth
  }

  const isAuthenticated = computed(() => {
    return token.value
  })

  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
      const { data } = await api.get('/users/me', {
        headers: {
          Authorization: tokenAuth
        }
      })

      setUser(data.user)

      setIsAuth(true)

      return data;
    } catch (error) {
      isAuth.value = false
    }
  }

  async function clean() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = ''
    user.value = ''
  }

  return {
    token,
    setToken,
    checkToken,
    clean,
    isAuth,
    setIsAuth,
    isAuthenticated,
    setUser,
    user
  }
})
