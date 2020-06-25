<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card min-width="50%" class="transitionX">
          <v-card-text>
                <p class="display-1 text-center">Register</p>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                        class="px-5"
                    >
                        <v-row>
                            <v-col cols="2" class="py-0">
                               <v-icon color="#e91e63" style="font-size: 36px;">mdi-chart-timeline-variant</v-icon>
                            </v-col>
                            <v-col cols="10" class="py-0">
                               <h3 class="my-2">Marketing</h3>
                               <p>We've created the marketing campaign of the website. It was a very interesting collaboration.</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="py-0">
                               <v-icon color="#9c27b0" style="font-size: 36px;">mdi-code-tags</v-icon>
                            </v-col>
                            <v-col cols="10" class="py-0">
                               <h3 class="my-2">Marketing</h3>
                               <p>We've created the marketing campaign of the website. It was a very interesting collaboration.</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="py-0">
                               <v-icon color="#00bcd4" style="font-size: 36px;">mdi-account-group</v-icon>
                            </v-col>
                            <v-col cols="10" class="py-0">
                               <h3 class="my-2">Marketing</h3>
                               <p>We've created the marketing campaign of the website. It was a very interesting collaboration.</p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                        class="px-5"
                    >
                        <v-form ref="form" class="text-center">
                            <div class="mb-3">
                                <v-btn class="mx-2" fab dark elevation="0" small color="rgb(29, 161, 242)">
                                    <v-icon dark>mdi-twitter</v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark elevation="0"  small color="rgb(234, 76, 137)">
                                    <v-icon dark>mdi-dribbble</v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark elevation="0"  small color="rgb(59, 89, 152)">
                                    <v-icon dark>mdi-facebook-box</v-icon>
                                </v-btn>
                            </div>
                            <p >Or Be Classical</p>
                            <v-text-field placeholder="First Name"
                                v-model="email"
                                :rules="[
                                    v => !!v || 'First name is required',
            
                                ]"
                                required
                            >
                                <v-icon slot="prepend" >mdi-account-circle-outline</v-icon>
                            </v-text-field>
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
                            <v-checkbox v-model="checkbox1">
                                <template v-slot:label>
                                    I agree to the 
                                    <a
                                        target="_blank"
                                        href="http://vuetifyjs.com"
                                    >
                                        Vuetify
                                    </a>
                                </template>
                            </v-checkbox>
                            <v-btn rounded  color="#4caf50" class="my-3">Register</v-btn>
                        </v-form>
                    </v-col>
                </v-row>
          </v-card-text>
      </v-card>

    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Register',
  data: () => ({
    checkbox1: false,
    email: '',
    password: '',
  }),
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
    }
  }
};
</script>
