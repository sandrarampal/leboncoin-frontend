import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ref } from 'vue'
import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHeart, faClock, faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faMapMarkerAlt,
  faCheckDouble,
  faSearch,
  faCircle,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(router)

app.use(VueCookies)

const userInfos = ref($cookies.get('userInfos') || null)
const updateUser = (username, userToken) => {
  if (username && userToken) {
    userInfos.value = {
      username: username,
      userToken: userToken,
    }
    $cookies.set('userInfos', userInfos.value)
  } else {
    userInfos.value = null
    $cookies.remove('userInfos')
  }
}

app.provide('GlobalStore', { userInfos: userInfos, updateUser: updateUser })

library.add(
  faHeart,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faPlusSquare,
  faSearch,
  faUser,
  faCircle,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
