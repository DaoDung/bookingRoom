<template>
  <v-container>
    <v-row align="center" justify="center" style="padding-top:100px;">
      <v-card min-width="350px" class="transitionX">
        <v-card-text>
          <div class="d-flex align-center justify-center" >
            <v-card width="100%">
              <div class="material_heading ">
                <div class="text-center">
                  <h2 class=" font-weight-bold white--text">Login</h2>
                  <v-btn text icon color="white" class="ma-2">
                    <a href="users/auth/facebook"><v-icon>mdi-facebook</v-icon></a>
                  </v-btn>
                  <v-btn text icon color="white" class="ma-2">
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                  <v-btn text icon color="white" class="ma-2">
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </div>
          <v-card-text class="text-center">
            <v-form ref="form"
              
            >
              <p class="text-center">Or Be Classical</p>
              <v-text-field placeholder="Email"
                  v-model="email"
                  :rules="[
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ]"
                  required
                  type="email"
              >
                  <v-icon slot="prepend" >mdi-email</v-icon>
              </v-text-field>
              <v-text-field placeholder="Password"
                  v-model="password"
                  :rules="[
                    v => !!v || 'Password is required',
                  ]"
                  required
                  type="password"
              >
                  <v-icon slot="prepend" >mdi-lock-question</v-icon>
              </v-text-field>


              <button class="button" @click="logInWithFacebook"> Login with Facebook</button>
              
              <v-btn rounded text color="#4caf50" class="my-3" @click="submit()">Let's go</v-btn>
              {{status}}
            </v-form>
          </v-card-text>
        </v-card-text>
      </v-card>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    status: {}
  }),
  created(){
    let vm = this
    vm.$nextTick(async()=>{
      await vm.loadFacebookSDK(document, "script", "facebook-jssdk");
      await vm.initFacebook();
      window.FB.getLoginStatus(function(response) {
          this.status= response
      });
    })
  },
  methods: {
    submit () { 
      if(this.$refs.form.validate()){
        let params = {
          email:  this.email,
          password: this.password
        }
        this.$store.dispatch('auth/login', params).then(
          () => {
            sessionStorage.requiresAuth= true
            this.$router.push({name: 'home'})
          }
        )
      }
    },
    // handleSdkInit({ FB, scope }) {
    //   this.FB = FB
    //   this.scope = scope
      
    // },
   logInWithFacebook() {
      window.FB.login(function(response) {
        if (response.authResponse) {
          alert("You are logged in &amp; cookie set!");
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      }, {scope: 'public_profile,email'});
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "2696152213972891", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
};
</script>

<style>
.button{
  color:white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
