import { createStore  } from 'vuex';
import CoachesModule from './modules/coaches';
import RequestsModule from './modules/requests';
import AuthModule from './modules/auth';


export default createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule,
    auth: AuthModule
  },  
})