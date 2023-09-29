<template>
  <ion-page>
    <ion-tabs
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" @click="goDashboard()">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="transactions" @click="goTransactions()">
          <ion-icon :icon="listOutline"></ion-icon>
          <ion-label>Transactions</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="transaction" @click="makeTransaction()">
          <ion-icon :icon="sendOutline"></ion-icon>
          <ion-label>Make Transaction</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="piggyBank" @click="goPiggyBank()">
          <ion-icon :icon="walletOutline"></ion-icon>
          <ion-label>PiggyBank</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/vue";
import { walletOutline } from "ionicons/icons";
import { listOutline } from "ionicons/icons";
import { homeOutline } from "ionicons/icons";
import { sendOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonRouterOutlet,
  },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    };
    const afterTabChange = () => {
      // do something after tab change
    };
    return {
      beforeTabChange,
      afterTabChange,
      walletOutline,
      listOutline,
      homeOutline,
      sendOutline,
    };
  },
  data() {
    return {
      //estou a ir buscar ao local storage
      username: localStorage.getItem("phone_number"),
    };
  },
  methods: {
    goDashboard() {
      this.$router.push({
        name: "Dashboard",
        params: {
          id: this.username,
        },
      });
    },
    goTransactions() {
      this.$router.push({
        name: "Transactions",
        params: {
          id: this.username,
        },
      });
    },
    makeTransaction() {
      this.$router.push({
        name: "MakeTransaction",
        params: {
          id: this.username,
        },
      });
    },
    goPiggyBank() {
      this.$router.push({
        name: "PiggyBank",
        params: {
          id: this.username,
        }
      });
    }
  },
});
</script>