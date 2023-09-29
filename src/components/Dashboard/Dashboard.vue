<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-title> {{ this.vcard.balance }}€ </ion-title>
      <ion-grid>
        <ion-row id="row">
          <ion-text> Balance </ion-text>
        </ion-row>
      </ion-grid>

      <ion-card v-if="hasTransactions">
        <ion-title>Last Transaction</ion-title>
        <ion-card-header>
          <ion-grid>
            <ion-row>
              <ion-col id="col">
                <ion-card-subtitle>{{
                  this.mostRecentTransaction.date
                }}</ion-card-subtitle>
              </ion-col>
              <ion-col>
                <div v-if="this.mostRecentTransaction.type == 'D'">
                  <ion-card-title color="danger">
                    - {{ this.mostRecentTransaction.value }}€</ion-card-title
                  >
                </div>
                <div v-else>
                  <ion-card-title color="success">
                    + {{ this.mostRecentTransaction.value }}€</ion-card-title
                  >
                </div>
              </ion-col>
              <ion-card-content> </ion-card-content>
            </ion-row>
            <ion-row>
              <div v-if="this.mostRecentTransaction.type !== 'D'">
                <ion-card-subtitle class="transaction"
                  >Para: {{ this.transactionFrom }}</ion-card-subtitle
                >
              </div>
              <div v-else>
                <ion-card-subtitle class="transaction"
                  >De: {{ this.transactionFrom }}</ion-card-subtitle
                >
              </div>
            </ion-row>
          </ion-grid>
        </ion-card-header>
      </ion-card>
      <div class="ion-text-center no-transactions" v-if="!hasTransactions">
        <h4>Utilizador não tem transações</h4>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonText,
  //IonCard,
  //IonButton,
  //IonCol,
  //IonCardTitle,
  //IonCardSubtitle,
  //IonCardHeader,
  //IonCardContent,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonText,
    //IonCard,
    //IonButton,
    //IonCol,
    //IonCardTitle,
    //IonCardSubtitle,
    //IonCardHeader,
    //IonCardContent,
  },
  data() {
    return {
      vcard: {},
      transactions: [],
      mostRecentTransaction: "",
      transactionFrom: "",
      hasTransactions: true,
    };
  },

  methods: {},

  mounted() {
    this.vcard = {};
    this.$axios
      .get("vcards/" + this.$route.params.id)
      .then((response) => {
        this.vcard = response.data.data;
        //console.log(this.vcard);
      })
      .catch((error) => {
        console.log(error);
      });

    this.$axios
      .get("vcards/" + this.$route.params.id + "/transactions")
      .then((response) => {
        if (response.data.data == "") {
          this.hasTransactions = false;
        } else {
          this.hasTransactions = true;
          this.transactions = response.data.data;
          this.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.mostRecentTransaction = this.transactions[0];

          this.transactionFrom =
            this.mostRecentTransaction.pair_vcard == null
              ? "Utilizador indefinido"
              : this.mostRecentTransaction.pair_vcard.name;
          //console.log(this.transactionFrom);
          //console.log(this.mostRecentTransaction)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {},
});
</script>
<style scoped>
ion-title {
  text-align: center;
}

ion-card-title {
  text-align: right;
}

#row {
  justify-content: center;
}

.transaction {
  justify-content: left;
}

.no-transactions {
  color: red;
}
</style>