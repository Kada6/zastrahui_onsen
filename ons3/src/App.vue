<template>
<div id="app">
  <v-ons-page>
    <v-ons-splitter>
      <v-ons-splitter-side swipeable width="300px" collapse="" side="right" :open.sync="menuIsOpen">
        <v-ons-page>
          <v-ons-list>
            <v-ons-list-item tappable @click="$store.state.pageStack.push('OSAGO'); $store.state.menu_toggle=false;">
              <div class="center">
                <img src="static/img/insurance-pic1.png" height="35" style="margin-right: 10px;"></v-img>
                ОСАГО
              </div>
            </v-ons-list-item>
            <v-ons-list-item tappable @click="currentPage = 'OSAGO';  $store.state.menu_toggle=false;">
              <div class="center">
                <img src="static/img/insurance-pic1.png" height="35" style="margin-right: 10px;"></v-img>
                КАСКО
              </div>
            </v-ons-list-item>
            <v-ons-list-item tappable @click="currentPage = 'OSAGO';  $store.state.menu_toggle=false;">
              <div class="center">
                <img src="static/img/insurance-pic3.png" height="35" style="margin-right: 10px;"></v-img>
                Недвижимость
              </div>
            </v-ons-list-item>
            <v-ons-list-item tappable @click="currentPage = 'OSAGO';  $store.state.menu_toggle=false;">
              <div class="center">
                <img src="static/img/insurance-pic4.png" height="35" style="margin-right: 10px;"></v-img>
                Жизнь и здоровье
              </div>
            </v-ons-list-item>
            <v-ons-list-item tappable @click="currentPage = 'OSAGO'; $store.state.menu_toggle=false;">
              <div class="center">
                Рейтинг страховых компаний
              </div>
            </v-ons-list-item>
            <v-ons-list-item tappable @click="currentPage = 'OSAGO';  $store.state.menu_toggle=false;">
              <div class="center">
                Политика конфиденциальности
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </v-ons-page>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <v-ons-navigator :page-stack="$store.state.pageStack" :options="options" @postpush="setOptions({})">
          <component v-for="page in $store.state.pageStack" @push="$store.state.pageStack.push($event)" @pop="pop" :is="page" :key="page" :marks="$store.state.marks" :models="$store.state.models" :regions="$store.state.regions" :property_regions="$store.state.property_regions"></component>
        </v-ons-navigator>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
  </div>
</template>
<script>
import LoadingPopup from '@/components/LoadingPopup'
import Index from './views/Index.vue'
import About from './views/About.vue'
import Rating from './views/Rating.vue'
import OSAGO from './views/OSAGO.vue'
import OsagoOrders from './views/OsagoOrders.vue'
import OsagoDrivers from './views/OsagoDrivers.vue'
import KASKO from './views/KASKO.vue'
import KaskoDrivers from './views/KaskoDrivers.vue'
import Health from './views/Health.vue'
import HealthOrders from './views/HealthOrders.vue'
import Realty from './views/Realty.vue'
import RealtyOrders from './views/RealtyOrders.vue'
import Confidential from './views/Confidential.vue'
export default
{
  name: 'App',
  components:
  {
    LoadingPopup,
    Index,
    OSAGO
  },
  data: () => (
  {
    errors: [],
    is_authorized: false,
    menu_toggle: false,
    options:
    {}
  }),
  methods:
  {
    pop()
    {
      this.$store.commit('popPage');
    },
    setOptions(newOptions)
    {
      this.options = newOptions;
    }
  },
  computed:
  {
    menuIsOpen: function()
    {
      return this.$store.state.menu_toggle;
    }
  },
  watch:
  {
    isOffline(val)
    {
      if(val) this.$store.commit('hideCalculating');
    }
  },
  created()
  {
    this.$store.state.pageStack = [Index];
  },
  mounted()
  {
    if(this.$store.state.authorized == false)
    {
      this.$api.post(`/apitokens`)
        .then(response =>
        {
          this.$store.state.token = response.data.access_token;
          this.$store.commit('authorize', response.data.access_token);
          this.is_authorized = true;
          // alert(response.data.access_token);
        })
        .catch(e =>
        {
          this.errors.push(e)
        });
    }
    else
    {
      this.$store.commit('authorize', this.$store.state.token);
      this.is_authorized = true;
    }
    var rc = setInterval(() =>
    {
      this.$store.commit('loading');
      if(this.$store.state.authorized == false)
      {
        this.$api.post(`/apitokens`)
          .then(response =>
          {
            this.$store.commit('authorize', response.data.access_token);
            this.is_authorized = true;
          })
          .catch(e =>
          {
            //this.errors.push(e)
          });
      }
    }, 5000);
    this.$api.get(`/cars/vendors`)
      .then(response =>
      {
        this.$store.state.marks = response.data
        //window.alert(response.data)
      })
      .catch(e =>
      {
        //alert(e)
      });
    this.$api.get(`/cars/models`)
      .then(response =>
      {
        this.$store.state.models = response.data
        //window.alert(response.data)
      })
      .catch(e =>
      {
        // alert(e)
      });
    this.$api.get(`/osago/regions`)
      .then(response =>
      {
        this.$store.state.regions = response.data
        //window.alert(response.data)
      })
      .catch(e =>
      {
        //alert(e)
      });
    this.$api.get(`/properties/regions`)
      .then(response =>
      {
        this.$store.state.property_regions = response.data
        //window.alert(response.data)
      })
      .catch(e =>
      {
        //alert(e)
      });
    this.$api.get(`/companies`)
      .then(response =>
      {
        this.$store.state.rating = response.data
      })
      .catch(e =>
      {
        // alert(e)
      });
    this.$store.commit('loading');
  }
}
</script>
<style>
</style>