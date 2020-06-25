<template>
    <div class="bg-login">
        <v-toolbar id="toolbar" flat>
            <v-container>
                <v-row
                    align="center"
                >
                    <v-toolbar-title style="color: #fff;">Title</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn to="/guest/register" exact color="white" style="height: 36px!important;" text active-class="active">
                            <v-icon left>mdi-account-plus</v-icon>register
                        </v-btn>
                        <v-btn to="/guest/login" exact color="white" style="height: 36px!important;" text active-class="active">
                            <v-icon left>mdi-fingerprint</v-icon>Login
                        </v-btn>
                    </v-toolbar-items>
                </v-row>
            </v-container>
        </v-toolbar>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'Auth',

  data: () => ({

  }),
};
</script>

<style>
    a{
        text-decoration: none;
        color: white!important;
    }
    .bg-login{
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/login.d6d3bb09.jpg);
        background-position: center center;
        height: 100vh;
    }
    #toolbar {
        background-color: #fff0!important;
    }

    .material_heading{
        width: 100%;
        padding: 28px;
        background: #4caf50;
        margin-top: -50px;
    }
    .transitionX{
        animation: 0.5s ease-out 0s 1 slideInFromLeft;
    }
    @keyframes slideInFromLeft {
        0% {
            transform: translateY(-80%);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>