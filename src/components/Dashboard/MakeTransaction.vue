<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Make Transaction</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Contacto</ion-label>
        <ion-input
          inputmode="numeric"
          required="true"
          type="number"
          max="999999999"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Montante</ion-label>
        <ion-input></ion-input>
      </ion-item>
      
      <ion-list style="margin-top: 50px">
        <ion-title> Contact List: </ion-title>
        <ion-item @click="debug">
          <ion-label>Pokémon Yellow</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Mega Man X</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>The Legend of Zelda</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Pac-Man</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Super Mario World</ion-label>
        </ion-item>
      </ion-list>
      <ion-button expand="block" @click="send"> Send</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  methods:{
    debug(){
      console.log("tau")
    }
  }
});
</script>

<style>
</style>