<template>
  <div>
    <v-form ref="osago_step2" lazy-validation v-model="valid">
      <v-container grid-list-md  justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">
<v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic1.png" alt="">
					</div>
					<div class="ptext">Страхование ОСАГО</div>
				</div>				
				</v-layout>
        
        <v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}" >
          <v-container fluid grid-list-md justify-center text-xs-center>
            <v-layout column px-3 py-3>

              <v-flex v-if="!$store.state.osago.is_multidrive" my-2>
              	 <v-layout text-xs-left align-start justify-start row wrap>
              <template v-for="(driver, index) in $store.state.osago.drivers"  >
                <v-btn round outline color="primary" @click="changeDriver(index)" v-if="active_driver != index" class="text-capitalize py-0">
       {{ driverAbbr(index,driver.second_name, driver.first_name, driver.last_name) }}
      <v-icon right @click="deleteDriver(driver)">{{ deleteIcon }}</v-icon>
    </v-btn>
    <v-btn round class="text-capitalize py-0" color="primary" @click="changeDriver(index)" v-if="active_driver == index">
       {{ driverAbbr(index,driver.second_name, driver.first_name, driver.last_name) }}
      <v-icon right @click="deleteDriver(driver)">{{ deleteIcon }}</v-icon>
    </v-btn>


                </template>
                
                <v-btn flat icon outline color="primary"  v-if="$store.state.osago.drivers.length < 5" v-on:click="addDriver">
      <v-icon dark>add</v-icon>
    </v-btn>
                
                 </v-layout>
                     <v-divider class="mt-4"></v-divider>
              </v-flex>
              </v-flex>
              <v-flex xs12 mt-2>
                <v-flex xs12 v-if="!$store.state.osago.is_multidrive && active_driver == index" v-for="(driver, index) in $store.state.osago.drivers" :key="index">
                  <v-layout row wrap >
                    <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Фамилия:</p>
                      <v-text-field v-model="driver.second_name" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                   <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Имя:</p>
                      <v-text-field v-model="driver.first_name" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Отчество:</p>
                      <v-text-field v-model="driver.last_name" outline single-line></v-text-field>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex d-flex xs12 sm3 md3 pl-2 pr-2>
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
                      <v-text-field v-model="driver.experience" :rules="nameRules" type="number" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm2 md2 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Серия ВУ:</p>
                      <v-text-field v-model="driver.doc_serial" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                    
                    <v-flex d-flex xs12 sm3 md3 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Номер ВУ:</p>
                      <v-text-field v-model="driver.doc_number" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                
                  </v-layout>
                </v-flex>

                <v-flex xs12 mt-3 v-if="$store.state.osago.is_multidrive">
                  <v-layout row wrap>
                 <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Фамилия:</p>
                      <v-text-field v-model="$store.state.osago.owner.second_name" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                     <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Имя:</p>
                      <v-text-field v-model="$store.state.osago.owner.first_name" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                     <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Отчество:</p>
                      <v-text-field v-model="$store.state.osago.owner.last_name" outline single-line></v-text-field>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                     <v-flex d-flex xs12 sm3 md3 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Дата рождения:</p>
                      <v-menu v-model="date_menu" :close-on-content-click="false" lazy transition="scale-transition" :nudge-right="-50" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="$store.state.osago.owner.birth_date" prepend-inner-icon="event" :rules="ageRules" readonly outline single-line v-on="on">
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="$store.state.osago.owner.birth_date" @input="date_menu = false" full-width locale="ru-ru"></v-date-picker>
                      </v-menu>
                      </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Гос. знак:</p>
                      <v-text-field v-model="$store.state.osago.owner.plate_number" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                     <v-flex d-flex xs12 sm2 md2 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Серия ВУ:</p>
                      <v-text-field v-model="$store.state.osago.owner.doc_serial" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                     <v-flex d-flex xs12 sm3 md3 pl-2 pr-2>
                <v-layout column text-xs-left>
                      <p class="title font-weight-regular">Номер ВУ:</p>
                      <v-text-field v-model="$store.state.osago.owner.doc_number" :rules="nameRules" outline single-line required></v-text-field>
                      </v-layout>
                    </v-flex>
                     
                  </v-layout>
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
      nameRules: [
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
      if (this.$store.state.osago.drivers.length >= 2)
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
      if (this.$refs.osago_step2.validate())
      {
        this.is_done = true;
      }
    },
    driverAbbr: function(index, sname, fname, lname)
    {
      var ind = index + 1;
      var fn = '';
      if (fname != '') fn =fname.charAt(0)+'.';
      var ln = '';
      if (lname != '') ln =lname.charAt(0)+'.';
      if (sname != '') 
		return sname+' '+fn+ln;
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
      this.$store.state.osago.drivers.push(
      {
        first_name: '',
        second_name: '',
        last_name: '',
        birth_date: '',
        doc_number: '',
        doc_serial: '',
        experience: ''
      });
      this.active_driver = this.$store.state.osago.drivers.length - 1;
    },
    deleteDriver: function(driver)
    {
      if (this.$store.state.osago.drivers.length >= 2)
      {
         if (this.$store.state.osago.drivers.length <= 2) this.active_driver = 0;
        var index = this.$store.state.osago.drivers.indexOf(driver);
        this.$store.state.osago.drivers.splice(index, 1);
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
               // alert(JSON.stringify(this.$store.state.osago, null, 4));
      if (!this.is_calculating)
      {
        if (this.is_done == true)
        {
          this.$store.commit('showCalculating');
          this.is_calculating = true;
          this.$api.post(`/osago`)
            .then(response =>
            {
              this.$store.state.osago.id = response.data.id;
              this.$api.patch(`/osago/` + response.data.id,
                {
                  region_id: this.$store.state.osago.region_id,
                  power: this.$store.state.osago.power,
                  is_multidrive: this.$store.state.osago.is_multidrive
                })
                .then(resp =>
                {
                  if (!this.$store.state.osago.is_multidrive)
                  {
                    var drv = this.$store.state.osago.drivers.length;
                    //   async.each(this.drivers, function(driver, callback){
                    this.$store.state.osago.drivers.forEach((driver) =>
                    {
                      drv -= 1;
                      this.$api.post(`/osago/` + this.$store.state.osago.id + `/drivers`,
                        {
                          first_name: driver.first_name,
                          second_name: driver.second_name,
                          last_name: driver.last_name,
                          birth_date: driver.birth_date,
                          doc_serial: driver.doc_serial,
                          doc_number: driver.doc_number,
                          experience: driver.experience
                        })
                        .then(resp =>
                        {
                          //callback();
                          if (drv === 0)
                          {
                            this.$api.post(`/osago/` + this.$store.state.osago.id + `/calculate`,
                              {})
                              .then(resp =>
                              {
                                //вызов дергалки
                                this.$router.push('/osago/results');
                              })
                              .catch(e =>
                              {
                                alert(e)
                              });
                          }
                        })
                        .catch(e =>
                        {
                          alert(e);
                        });
                    })
                  }
                  else
                  {
                    this.$api.post(`/osago/` + this.$store.state.osago.id + `/owners`,
                      {
                        first_name: this.$store.state.osago.owner.first_name,
                        second_name: this.$store.state.osago.owner.second_name,
                        last_name: this.$store.state.osago.owner.last_name,
                        birth_date: this.$store.state.osago.owner.birth_date,
                        doc_serial: this.$store.state.osago.owner.doc_serial,
                        doc_number: this.$store.state.osago.owner.doc_number,
                        plate_number: this.$store.state.osago.owner.plate_number
                      })
                      .then(resp =>
                      {
                        this.$api.post(`/osago/` + this.$store.state.osago.id + `/calculate`,
                          {})
                          .then(resp =>
                          {
                            this.$router.push('/osago/results');
                          })
                          .catch(e =>
                          {
                            alert(e)
                          });
                      })
                      .catch(e =>
                      {
                        alert(e)
                      });
                  }
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