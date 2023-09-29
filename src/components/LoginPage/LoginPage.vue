<template>
  <ion-page>
    <ion-content>
      <main class="box">
        <form class="fields">
          <div class="form-group">
            <label for="mobileNumber" class="field_label" style="color: white"
              >Mobile Number</label
            >
            <input
              id="mobileNumber"
              placeholder="9 Digits"
              required
              v-model="credentials.username"
              maxlength="9"
              style="margin-bottom: 5px"
            />
            <div class="bar" v-if="usernameError != null"> <BootstrapIcon icon="exclamation-circle-fill" variant="danger" id="icon" /> {{usernameError}}</div>
          </div>
          <div class="form-group">
            <label for="password" class="field_label" style="color: white"
              >Password</label
            >
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              v-model="credentials.password"
              style="margin-bottom: 5px"
            />
            <div class="bar" v-if="passwordError != null"> <BootstrapIcon icon="exclamation-circle-fill" variant="danger" id="icon" /> {{passwordError}}</div>
            <div class="bar" v-if="authenticationError != null"> <BootstrapIcon icon="exclamation-circle-fill" variant="danger" id="icon" /> {{authenticationError}}</div>
          </div>
          <div class="ion-text: center">
            <ion-button
              color="success"
              size="default"
              fill="solid"
              class="createButton"
              @click="authenticate"
              style="margin-bottom: 20px"
            >
              Login
            </ion-button>
          </div>
          <div class="ion-text: center">
            <ion-button
              color="success"
              size="default"
              fill="solid"
              class="createButton"
              @click="createVcard"
              v-if="usernameError == '' || credentials.username == '' || authenticationError != null"
              >Register
            </ion-button>
          </div>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  data() {
    return {
      credentials:{
        username: localStorage.getItem("phone_number"),
        password: '',
      },
      usernameError: null,
      passwordError: null,
      authenticationError: null
    };
  },
  methods: {
    isPasswordValid() {
      if (!this.credentials.password) {
        return "Please enter a password";
      }
      let passwordLen = this.credentials.password.length;
      if (passwordLen < 3 || passwordLen > 255) {
        return "Please enter a password with 3-255 characters"
      }
      return null;
    },
    isPhoneValid() {
      if(isNaN(this.credentials.username) || !this.credentials.username){
        return "Please enter a number"
      }
      if((this.credentials.username + "").length != 9 || !(this.credentials.username).startsWith("9")){
        return "Please enter a valid number with 9 digits started by 9"
      }
      return null;
    },
    authenticate() {
        this.$axios
        .post("login", this.credentials)
        .then((response) => {
          this.$toast.success(
            "User " +
              this.credentials.username +
              " has entered the application."
          );
          console.log(response.data.access_token);
          this.$axios.defaults.headers.common.Authorization =
            "Bearer " + response.data.access_token;
         
         
         localStorage.setItem("phone_number", this.credentials.username);
         
         
         
         this.$router.push({
            name: "Dashboard",
            params: { id: this.credentials.username },
          });
        }).catch((error) => {
          this.authenticationError = null
          this.passwordError = this.isPasswordValid()
          this.usernameError = this.isPhoneValid()
          if(this.usernameError == null && this.passwordError == null ){
            this.authenticationError = "The credentials were incorrect."
          }
          console.log("Invalid authentication");
          console.dir(error);
        });
        
    },
    createVcard() {
      this.$router.push("Register");
    },
  },
});
</script>

<style>

#icon{
  margin-left: 2px;
}

.bar {
  margin-bottom: 10px;
  color: #ba3939;
  background: #ffe0e0;
  opacity: 0.8;
  border: 1px solid #a33a3a;
  border-radius: 5px;
  font-size: 12px;
  line-height: 15px;
}

#loginbutton {
  margin: 0;
  position: relative;
  top: 50px;
  left: 35%;
}

ion-content {
  --padding-top: 30%;
  --padding-bottom: 20%;
  --padding-end: 20%;
  --padding-start: 20%;
}

.field_label {
  font-size: 1.3rem;
}

.box {
  background-color: rgba(0, 0, 0, 0.603);
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);
  margin-right: auto;
  margin-left: auto;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  width: 80%;
}

.box .form-group input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 30px;
  outline: none;
  padding: 10px 0;
  width: 100%;
  opacity: 0.8;
}
.createButton {
  margin: 0 auto;
  display: block;
}
</style>

