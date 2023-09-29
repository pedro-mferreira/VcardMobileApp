<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Transactions</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-card-content>
      <div class="mx-2 mt-2 flex-grow-1 filter-div">
        <ion-item>
          <ion-label>Filters</ion-label>

          <ion-select
            v-model="this.filterOptions"
            multiple="true"
            ok-text="Apply"
            value="4"
            class="form-select selectOptions"
            id="selecFilter"
            placeholder="Choose Filter"
          >
            <ion-select-option value="0">Credit</ion-select-option>
            <ion-select-option value="1">Debit</ion-select-option>
            <ion-select-option value="2"
              >Biggest ammount first</ion-select-option
            >
            <ion-select-option value="3">Most recent first</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-datetime
                  display-format="DD MM YYYY"
                  placeholder="Start Date"
                  v-model="startDate"
                ></ion-datetime>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-datetime
                  display-format="DD MM YYYY"
                  placeholder="End Date"
                  v-model="endDate"
                ></ion-datetime>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button expand="block" @click="reset"> Reset Filters</ion-button>
      </div>
    </ion-card-content>

    <ion-content class="ion-padding">
      <div v-for="item in paginatedTransactions" :key="item.id">
        <ion-card>
          <ion-card-header>
            <ion-grid>
              <ion-row>
                <ion-col id="col">
                  <ion-card-subtitle>{{ item.date }}</ion-card-subtitle>
                </ion-col>
                <ion-col id="col">
                  <div v-if="item.type == 'D'">
                    <ion-card-title color="danger">
                      - {{ item.value }}€</ion-card-title
                    >
                  </div>
                  <div v-else>
                    <ion-card-title color="success">
                      + {{ item.value }}€</ion-card-title
                    >
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-header>

          <ion-card-content>
            <div v-if="item.category_id !== null">
              {{ item.category_id.name }}
            </div>
            {{ item.description }}
          </ion-card-content>
        </ion-card>
      </div>
      <ion-grid>
        <ion-row id="row">
          <ion-button
            color="light"
            @click="loadMore"
            v-if="currentPage * maxPerPage < transactions.length"
          >
            load more
          </ion-button>
        </ion-row>
      </ion-grid>
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
  IonCard,
  IonButton,
  IonCol,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonItem,
  IonLabel,
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
    IonCard,
    IonButton,
    IonCol,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      transactions: [],
      filteredTransactions: [],
      currentPage: 1,
      maxPerPage: 10,
      filterOptions: [],
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    loadMore() {
      this.currentPage += 1;
    },
    filterBySelection() {
      this.filteredTransactions = this.transactions.slice();
      if (
        this.filterOptions.includes("0") &&
        this.filterOptions.includes("1")
      ) {
        console.log("entrou no 0 e 1");
        this.filteredTransactions = this.transactions;
      } else {
        if (this.filterOptions.includes("0")) {
          console.log("entrou no credito");
          this.filteredTransactions = this.filteredTransactions.filter(
            (transaction) => {
              return transaction.type === "C";
            }
          );
        }
        if (this.filterOptions.includes("1")) {
          console.log("entrou no debito");
          this.filteredTransactions = this.filteredTransactions.filter(
            (transaction) => {
              return transaction.type === "D";
            }
          );
        }
      }
      if (
        this.filterOptions.includes("2") &&
        this.filterOptions.includes("3")
      ) {
        this.$toast.error("Estes filtros não podem ser usados em simultâneo");
        this.filteredTransactions = this.transactions;
        this.filterOptions = "4";
      } else {
        if (this.filterOptions.includes("2")) {
          console.log("entrou no value first");
          this.filteredTransactions = this.filteredTransactions.sort(function (
            a,
            b
          ) {
            return b.value - a.value;
          });
        }
        if (this.filterOptions.includes("3")) {
          console.log("entrou no most recent first");
          this.filteredTransactions = this.filteredTransactions.sort(function (
            a,
            b
          ) {
            return new Date(b.datetime) - new Date(a.datetime);
          });
        }
      }
      if (
        this.startDate != "" &&
        this.endDate != "" &&
        this.startDate != null &&
        this.endDate != null
      ) {
        this.filterByDate();
      }
    },
    filterByDate() {
      if (this.startDate < this.endDate) {
        if (!this.filteredTransactions || this.filterOptions.length == 0) {
          console.log("entrou aqui");
          this.filteredTransactions = this.transactions;
        }

        this.filteredTransactions = this.filteredTransactions.filter(
          (item) => item.date >= this.startDate && item.date <= this.endDate
        );
        console.log("filtrou por data");
        if (this.filterOptions && !this.filterOptions.includes("2")) {
          console.log("vai ordenar do mais recente");
          this.filteredTransactions = this.filteredTransactions.sort(function (
            a,
            b
          ) {
            return new Date(b.datetime) - new Date(a.datetime);
          });
        }
      }
    },
    reset() {
      this.startDate = null;
      this.endDate = null;
      this.filterOptions = "4";
    },
  },
  mounted() {
    this.$axios
      .get("vcards/" + this.$route.params.id + "/transactions")
      .then((response) => {
        this.transactions = response.data.data;
        this.filteredTransactions = this.transactions;
        console.log(this.filteredTransactions);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    paginatedTransactions() {
      return this.filteredTransactions.slice(
        0,
        this.currentPage * this.maxPerPage
      );
    },
  },

  watch: {
    startDate: function () {
      if (this.endDate) {
        this.filterBySelection();
        //this.filterByDate();
      }
    },
    endDate: function () {
      if (this.startDate) {
        this.filterBySelection();
        //this.filterByDate();
      }
    },
    filterOptions: function () {
      this.filterBySelection();

      /*
      switch (this.filterOptions) {
        case "-1":
          this.$axios
            .get("vcards/" + this.$route.params.id + "/transactions")
            .then((response) => {
              this.transactions = response.data.data;
              this.filteredTransactions = this.transactions;
              console.log(this.filteredTransactions);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case "0":
          this.filteredTransactions = this.transactions.filter(
            (transaction) => {
              return transaction.type === "C";
            }
          );
          break;
        case "1":
          this.filteredTransactions = this.transactions.filter(
            (transaction) => {
              return transaction.type === "D";
            }
          );
          break;
        case "2":
          this.filteredTransactions = this.transactions.sort(function (a, b) {
            return b.value - a.value;
          });
          break;
        case "3":
          this.filteredTransactions = this.transactions.sort(function (a, b) {
            return new Date(b.datetime) - new Date(a.datetime);
          });
          break;
        default:
          console.log(this.filterOptions);
          console.log("Out of options");
      }*/
    },
  },
});
</script>

<style>
ion-title {
  text-align: center;
}

ion-card-title {
  text-align: right;
}

.selectOptions {
  margin-left: 20px;
}
</style>