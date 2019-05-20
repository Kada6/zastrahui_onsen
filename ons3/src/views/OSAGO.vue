<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Назад</v-ons-back-button>
      </div>
      <div class="center">
        <img position="right" height="30" style="vertical-align: middle;" src="static/img/shield.png">
        <b>ЗАСТРАХУЙ</b>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="$store.state.menu_toggle=!$store.state.menu_toggle" icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div class="ptitle">
      <div class="picon">
        <img src="static/img/insurance-pic1.png" alt="">
      </div>
      <div class="ptext">Страхование ОСАГО</div>
    </div>
    <v-ons-card>
    <form>
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item modifier="nodivider">
          <label for="Регион">Регион регистрации авто:</label>
          <select
            v-model="$store.state.osago.power"
            id="Регион"
            name="Регион"
            class="form-control"
            v-validate="'required'"
                  >   <option v-for="option in regions" v-bind:value="option.id" :disabled="option.coefficient==null">
                &zwnj;{{ regionName(option.parent_id, option.name) }}
              </option>
  </select>
          <div class="invalid-feedback">{{ errors.first("Регион") }}</div>
          <br>
              <label for="power">Мощность двигателя:</label>
            <v-ons-select  class="form-control" id="power" name="Мощность двигателя" autofocus v-validate="'required'"  v-model="$store.state.osago.power" width="100%">
              <option v-for="item in power_options" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
            <div class="invalid-feedback">{{ errors.first("Мощность двигателя") }}</div>
          </v-ons-list-item>
          <v-ons-list-item modifier="nodivider">
            Регион регистрации авто:
            <v-ons-select required v-model="$store.state.osago.region_id" modifier="material" width="50%">
              <option disabled value="">Выберите регион</option>
              <option v-for="option in regions" v-bind:value="option.id" :disabled="option.coefficient==null">
                &zwnj;{{ regionName(option.parent_id, option.name) }}
              </option>
            </v-ons-select>
          </v-ons-list-item>
          <v-ons-list-item modifier="nodivider">
            <label class="center" for="switch1">
              Без ограничения по количеству водителей
            </label>
            <div class="right">
              <v-ons-switch input-id="switch1" v-model="$store.state.osago.is_multidrive">
              </v-ons-switch>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">
              <v-ons-button @click="saveData">Продолжить</v-ons-button>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
      </form>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
export default
{
  name: 'OSAGO',
  props:
  {
    regions: Array
  },
  data()
  {
    return {
      power_options: [
      {
        text: 'До 50 включительно',
        value: '40'
      },
      {
        text: 'Свыше 50 до 70 включительно',
        value: '60'
      },
      {
        text: 'Свыше 70 до 100 включительно',
        value: '90'
      },
      {
        text: 'Свыше 100 до 120 включительно',
        value: '110'
      },
      {
        text: 'Свыше 120 до 150 включительно',
        value: '130'
      },
      {
        text: 'Свыше 150',
        value: '160'
      }],
      is_done: false
    }
  },
  methods:
  {
    saveData: function()
    {
      this.validate();
      this.$store.commit('loading');
      if(this.is_done == true)
      {
        //this.$router.push('/osago/drivers')
      }
    },
    regionName: function(parent_id, name)
    {
      if(parent_id === null) return name;
      else return '  - ' + name;
    },
    validate()
    {
		this.$validator.validate().then((result) => {
        if (result) {
          this.is_done=true;
          return;
        }
        this.is_done=false;
    });
   }
  },
  watch:
  {
    $route(to, from)
    {
      if(to.name != "osagoorders")
        this.$store.commit('hideCalculating');
    }
  }
}
</script>