<template>
  <div>
    <v-form ref="kasko_step2" lazy-validation v-model="valid">
      <v-container grid-list-md  justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">
      <v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic1.png" alt="">
					</div>
					<div class="ptext">Страхование КАСКО</div>
				</div>				
				</v-layout>
        
        <v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}" >
          <v-container fluid grid-list-md justify-center text-xs-center>
            <v-layout column px-3 py-3>

              <v-flex  my-2>
              	 <v-layout text-xs-left align-start justify-start row wrap>
              <template v-for="(driver, index) in $store.state.kasko.drivers"  >
                <v-btn round outline color="primary" @click="changeDriver(index)" v-if="active_driver != index" class="text-capitalize py-0">
       {{ driverAbbr(index,driver.second_name, driver.first_name, driver.last_name) }}
      <v-icon right @click="deleteDriver(index)">{{ deleteIcon }}</v-icon>
    </v-btn>
    <v-btn round class="text-capitalize py-0" color="primary" @click="changeDriver(index)" v-if="active_driver == index">
       {{ driverAbbr(index,driver.second_name, driver.first_name, driver.last_name) }}
      <v-icon right @click="deleteDriver(index)">{{ deleteIcon }}</v-icon>
    </v-btn>


                </template>
                
                <v-btn flat icon outline color="primary"  v-if="$store.state.kasko.drivers.length < 5" v-on:click="addDriver">
      <v-icon dark>add</v-icon>
    </v-btn>
                
                 </v-layout>
                     <v-divider class="mt-4"></v-divider>
              </v-flex>
              </v-flex>
              <v-flex xs12 mt-2>
                <v-flex xs12 v-if="active_driver == index" v-for="(driver, index) in $store.state.kasko.drivers" :key="index">
                  <v-layout row wrap >
                    <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Дата рождения:</p>
                      <v-menu v-model="date_menu" :close-on-content-click="false" lazy transition="scale-transition" :nudge-right="-50" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="driver.birth_date" :rules="ageRules" prepend-inner-icon="event" readonly outline single-line v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="driver.birth_date" @input="date_menu = false" full-width locale="ru-ru"></v-date-picker>
                      </v-menu>
                      </v-layout>
                    </v-flex>
                        <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Водительский стаж:</p>
                      <v-text-field v-model="driver.experience" :rules="kaskoRules" type="number" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Пол:</p>
                  <v-select v-model="driver.male" :items="males" :rules="kaskoRules" placeholder="Выберите пол" color="primary" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                  </v-layout>
                </v-flex>          
                </v-flex>
              </v-flex>
               <v-flex xs4 mt-0 pt-0>
              <v-btn round color="primary"  :disabled="isOffline" :loading="isOffline" large v-on:click="calculateOsago">Рассчитать</v-btn>
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
  name: 'OsagoDrivers',
  data()
  {
    return {
      is_done: false,
      active_driver: 0,
      date_menu: false,
      is_calculating: false,
      males: ["мужской","женский"],
      kaskoRules: [
        v => !!v || 'Поле обязательно для заполнения'
      ],
      ageRules: [
        v => !!v || 'Поле обязательно для заполнения',
        v => this.getAge(v) >= 16 || 'Возраст водителя должен быть более 16 лет'
      ]
    }
  },
  computed:
  {
    deleteIcon () 
    {
      if (this.$store.state.kasko.drivers.length >= 2)
      return "clear";
      else return "";
    },
  },
  watch:
  {
    isOffline (val) {
      if(val) this.is_calculating = false;
    },
  },
  methods:
  {
   
    validate()
    {
      if (this.$refs.kasko_step2.validate())
      {
        this.is_done = true;
      }
    },
    driverAbbr: function(index, sname, fname, lname)
    {
      var ind = index + 1;
      if (sname != '') 
		return sname+' '+fname.charAt(0)+'.'+lname.charAt(0)+'.';
	  else 
		return 'Водитель '+ind;
    },
    getAge: function(birth_date)
    {
      var today = new Date();
      var birthDate = new Date(birth_date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
      {
        age--;
      }
      return age;
    },
    addDriver: function()
    {
      this.$store.state.kasko.drivers.push(
      {
        first_name: '',
        second_name: '',
        last_name: '',
        birth_date: '',
        doc_number: '',
        doc_serial: '',
        experience: '',
        male: ''
      });
      this.active_driver = this.$store.state.kasko.drivers.length - 1;
    },
    deleteDriver: function(driver)
    {
      if (this.$store.state.kasko.drivers.length >= 2)
      {
         if (this.$store.state.kasko.drivers.length <= 2) this.active_driver = 0;
        var index = this.$store.state.kasko.drivers.indexOf(driver);
        this.$store.state.kasko.drivers.splice(index, 1);
      }
    },
    changeDriver: function(index)
    {
      this.active_driver = index;
    },
    calculateOsago: function()
    {
      this.validate();
      this.$store.commit('loading');
      if (!this.is_calculating)
      {
        if (this.is_done == true)
        {
          //this.$store.commit('showCalculating');
          this.is_calculating = true;
          this.$api.post(`/kasko`)
            .then(response =>
            {
              this.$store.state.kasko.id = response.data.id;
              this.$api.patch(`/kasko/` + response.data.id,
                {
                    power: this.$store.state.kasko.power,
		            capacity: this.$store.state.kasko.capacity,
		            car_mark_id: this.$store.state.kasko.car_mark_id,
		            car_model_id: this.$store.state.kasko.car_model_id,
		            car_year: this.$store.state.kasko.car_year,
		            car_price: this.$store.state.kasko.car_price,
		            is_credit: this.$store.state.kasko.is_credit,
		            has_mileage: this.$store.state.kasko.has_mileage,
		            is_guarantee: this.$store.state.kasko.is_guarantee,
		            gearbox_type: this.$store.state.kasko.gearbox_type,
                })
                .then(resp =>
                {
               
                    var drv = this.$store.state.kasko.drivers.length;
                    //   async.each(this.drivers, function(driver, callback){
                    this.$store.state.kasko.drivers.forEach((driver) =>
                    {
                      drv -= 1;
                      this.$api.post(`/kasko/` + this.$store.state.kasko.id + `/drivers`,
                        {
                          birth_date: driver.birth_date,
                          male: driver.male,            
                          experience: driver.experience
                        })
                        .then(resp =>
                        {
                          //callback();
                          if (drv === 0)
                          {
                            /*this.$api.post(`/osago/` + this.$store.state.osago.id + `/calculate`,
                              {})
                              .then(resp =>
                              {
                                //вызов дергалки
                                //this.$router.push('/kasko/results');
                              })
                              .catch(e =>
                              {
                                alert(e)
                              });*/
                          }
                        })
                        .catch(e =>
                        {
                          alert(e);
                        });
                    })
                })
                .catch(e =>
                {
                  alert(e)
                });
            })
            .catch(e =>
            {});
        }
      }
    }
  }
}
</script>