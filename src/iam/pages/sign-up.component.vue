<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignUp() {
      let authenticationStore = useAuthenticationStore();
      let signUpRequest = new SignUpRequest(this.username, this.password);
      authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div>
    <h3>Sign Up</h3>
    <p>Please enter the required fields in order to sign up.</p>
  </div>
  <div>
    <form @submit.prevent="onSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="username">Username</label>
            <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username}"/>
            <small v-if="!username" class="p-invalid">Username is required</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="password">Password</label>
            <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password" />
            <small v-if="!password" class="p-invalid">Password is required</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <button type="submit" class="p-button p-button-primary">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>