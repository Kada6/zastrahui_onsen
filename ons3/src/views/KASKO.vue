<template>
  <div>
    <v-form ref="kasko_step1" lazy-validation v-model="valid" >
      <v-container grid-list-md  justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">

     <v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic1.png" alt="">
					</div>
					<div class="ptext">Страхование КАСКО</div>
				</div>				
				</v-layout>
        
            <v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}"  >
          <v-container fluid grid-list-md justify-center text-xs-center>
            <v-layout column px-3 py-3 mt-3>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Марка:</p>
                  
                  <v-select v-model="$store.state.kasko.car_mark_id" :items="marks" :rules="kaskoRules" item-text="mark" placeholder="Выберите марку" item-value="id" color="primary" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Модель:</p>
                  <v-select v-model="$store.state.kasko.car_model_id" :items="carModels" :rules="kaskoRules" item-text="model" placeholder="Выберите модель" item-value="id" color="primary" outline no-data-text="Выберите марку автомобиля" single-line></v-select>
                  </v-layout>
                </v-flex>
                     <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Год выпуска авто:</p>
                  <v-select v-model="$store.state.kasko.car_year" :items="years" :rules="kaskoRules" placeholder="Выберите год выпуска авто" color="primary" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Рыночная стоимость:</p>
                  
                  <v-text-field v-model="$store.state.kasko.car_price" :rules="kaskoRules" placeholder="Стоимость (руб.)" type="number" outline single-line required></v-text-field>
                  </v-layout>
                </v-flex>
                 <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Мощность двигателя:</p>
                  <v-text-field v-model="$store.state.kasko.power" :rules="kaskoRules" placeholder="Укажите мощность (л.с.)" type="number" outline single-line required></v-text-field>
                  </v-layout>
                </v-flex>
                 <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Объем двигателя:</p>
                  
                  <v-text-field v-model="$store.state.kasko.capacity" :rules="kaskoRules" placeholder="Укажите объём (л.)" type="number" outline single-line required></v-text-field>
                  </v-layout>
                </v-flex>
                     <v-flex d-flex xs12 sm3 md3 pl-2 pr-2 mb-0>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Коробка передач:</p>
                  <v-select v-model="$store.state.kasko.gearbox_type" :items="gearbox" :rules="kaskoRules" placeholder="Выберите коробку передач" color="primary" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                
                  <v-flex d-flex xs6 sm3 md3 align-self-start pl-2 pr-2 >
                <v-layout align-end justify-center text-xs-center>
            <div class="text-xs-center">
                  <v-switch v-model="$store.state.kasko.is_credit" color="primary" :label="`Авто в кредите`"></v-switch>
                  </div>
                  </v-layout>
                </v-flex>
                  <v-flex d-flex xs6 sm3 md3 align-self-start pl-2 pr-2>
                <v-layout align-end justify-center text-xs-center >
            <div class="text-xs-center">
                  <v-switch v-model="$store.state.kasko.is_guarantee" color="primary" :label="`Авто на гарантии`"></v-switch>
                  </div>
                  </v-layout>
                </v-flex>
                  <v-flex d-flex xs12 sm3 md3 align-self-start pl-2 pr-2 >
                <v-layout align-end justify-center text-xs-center>
            <div class="text-xs-center ">
                  <v-switch v-model="$store.state.kasko.has_mileage" color="primary" :label="`Авто с пробегом`"></v-switch>
                  </div>
                  </v-layout>
                </v-flex>
                   
                
              </v-layout>
                  <v-flex xs4>
              <v-btn round color="primary" large v-on:click="saveData">Продолжить</v-btn>
</v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default
{
  name: 'KASKO',
  props:
  {
    marks: Array,
    models: Array,
    is_disabled: true
  },
  data()
  {
    return {
      years: [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      gearbox: ["механическая", "автоматическая"],
      is_done: false,
      kaskoRules: [
        v => !!v || 'Поле обязательно для заполнения'
      ]
    }
  },
  computed:
  {
  	carModels: function ()
  	{
  	    var t_models =  [];
  		this.models.forEach((model) =>
                    {
                    	if (model.mark_id == this.$store.state.kasko.car_mark_id)
                    	t_models.push(
						  {
						    model: model.model,
							id: model.id
						  });
                    });
           return t_models;
  	}
    
  },
  
  methods:
  {
    saveData: function()
    {
      this.validate();
      this.$store.commit('loading');
      if (this.is_done == true )
      {
        this.$router.push('/kasko/drivers')
      }
    },
    validate()
    {
      if (this.$refs.kasko_step1.validate())
      {
        this.is_done = true;
      }
    },
  },
  
  components:
  {
  },
}
</script>