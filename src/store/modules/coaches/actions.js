export default {
  async registerCoach(context, data){
      
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.fname,
      lastName: data.lname,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const token = context.rootGetters.token;
    const response = await fetch(`https://vue-http-demo-d1250-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token,{
      method: 'PUT',
      body: JSON.stringify(coachData)
    });
    
    // const responseData  = response.json();
    if(!response.ok){
      // error
      const error = new Error(response.message || 'Failed to fetch');
      throw error;
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },

  async loadCoaches(context, payload){
    if(!payload.forceRefresh && !context.getters.shouldUpdate){
      return;
    }
    const responseData = await fetch(`https://vue-http-demo-d1250-default-rtdb.firebaseio.com/coaches.json`)
    const response = await responseData.json();
    console.log(responseData);
    console.log(response);
    if(!response.ok){
      // error handling
    }

    const coaches = [];

    for (const key in response) {
        const coach = {
          id: key,
          firstName: response[key].firstName,
          lastName: response[key].lastName,
          description: response[key].description,
          hourlyRate: response[key].hourlyRate,
          areas: response[key].areas
        }
        coaches.push(coach);
        
    }
    console.log(coaches);

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  }
};