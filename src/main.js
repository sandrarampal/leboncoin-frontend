import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(router)

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
)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
