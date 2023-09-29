<template >
  <main class="box">
    <div class="ion-text-center">
      <h2 style="margin-bottom: 20px; margin-top: -15px; color: white">
        REGISTER
      </h2>
    </div>
    <form class="fields">
      <div class="form-group">
        <label for="mobileNumber" class="field_label" style="color: white"
          >Mobile Number</label
        >
        <input
          id="mobileNumber"
          placeholder="9 Digits"
          required
          v-model="vcard.phone_number"
          maxlength="9"
          style="margin-bottom: 5px"
        />
        <div class="bar" v-if="usernameError != null">
          <BootstrapIcon
            icon="exclamation-circle-fill"
            variant="danger"
            id="icon"
          />
          {{ usernameError }}
        </div>
      </div>
      <div class="form-group" style="margin-top: 10px">
        <label for="password" class="field_label" style="color: white"
          >Password</label
        >
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          v-model="vcard.password"
          style="margin-bottom: 5px"
        />
        <div class="bar" v-if="passwordError != null">
          <BootstrapIcon
            icon="exclamation-circle-fill"
            variant="danger"
            id="icon"
          />
          {{ passwordError }}
        </div>
      </div>
      <ion-button
        color="success"
        size="default"
        fill="solid"
        class="createButton"
        @click="createVcard"
        >Create VCard
      </ion-button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import { IonButton } from "@ionic/vue";
export default {
  components: {
    IonButton,
  },
  data() {
    return {
      vcard: {
        phone_number: "",
        password: "",
        name: "",
        email: "",
        photo_url: "",
        confirmation_code: "",
      },
      usernameError: null,
      passwordError: null,
    };
  },
  methods: {
    isPasswordValid() {
      if (!this.vcard.password) {
        return "Please enter a password";
      }
      let passwordLen = this.vcard.password.length;
      if (passwordLen < 3 || passwordLen > 255) {
        return "Please enter a password with 3-255 characters";
      }
      return null;
    },
    isPhoneValid() {
      if (isNaN(this.vcard.phone_number) || !this.vcard.phone_number) {
        return "Please enter a number";
      }
      if (
        (this.vcard.phone_number + "").length != 9 ||
        !this.vcard.phone_number.startsWith("9")
      ) {
        return "Please enter a valid number with 9 digits started by 9";
      }
      return null;
    },
    createVcard() {
      this.passwordError = this.isPasswordValid();
      this.usernameError = this.isPhoneValid();
      if (this.passwordError == null && this.usernameError == null) {
        this.vcard.name = "TBD";
        this.vcard.email = "TBD@mail.pt";
        this.vcard.confirmation_code = 1111;
        this.vcard.photo_url = null;
        axios
          .post("/vcards", this.vcard)
          .then((response) => {
            console.log(response.data.data);
            this.$toast.success("Vcard successfully created!");

            this.credentials = {username: '', password: ''}
            this.credentials.username = this.vcard.phone_number
            this.credentials.password = this.vcard.password 

            this.$axios.post("login", this.credentials).then((response) => {
              this.$toast.success(
                "User " +
                  this.credentials.username +
                  " has entered the application."
              );
              console.log(response.data.access_token);
              this.$axios.defaults.headers.common.Authorization =
                "Bearer " + response.data.access_token;
              this.$router.push({
                name: "Dashboard",
                params: { id: this.credentials.username},
              });
            });
            localStorage.setItem("phone_number", this.vcard.phone_number);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 422) {
              this.passwordError = "This number is already registed";
            }
          });
      }
    },
  },
};
</script>

<style>
#icon {
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