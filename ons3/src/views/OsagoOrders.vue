<template>
  <div>
  <v-dialog
      v-if="is_sent"
      v-model="is_sent"
      max-width="600"
      :full-width="$vuetify.breakpoint.smAndDown"
    >
      <v-card px-3 py-3 >
        
        <v-card-text text-xs-center justify-center>
             
          <v-container grid-list-md text-xs-center>
          <v-layout column>
                     <v-layout>
                <v-flex tag="h1" xs 12 class="title" my-2>
              		Ваша заявка принята<br>Ожидайте звонка нашего специалиста
               </v-flex>
                     </v-layout>
                           </v-layout>
          </v-container>
        </v-card-text>
   
      </v-card>
    </v-dialog>
    <OrderPopup :dialog="show_popup" :id='popup_id' :sendMessage="sendMessage" :hidePopup="hidePopup"></OrderPopup>
    <v-container grid-list-md justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">
              <v-layout  justify-center xs12>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic1.png" alt="">
					</div>
					<div class="ptext">Страхование ОСАГО</div>
				</div>				
				</v-layout>
      <v-layout xs12 align-center text-xs-left row>
        <v-flex tag="h1" class="title" mt-3 mb-5 pl-2>
          Найденные предложения:</v-flex>
      </v-layout>
      <v-layout column>
<v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}"  mt-2 v-if="is_calculated && results.length == 0">
            <v-container fluid text-xs-center>
              <v-layout column py-3 px-3 text-xs-center>
        
                  <p style="headline">К сожалению мы не можем подобрать предложения по указанным Вами данным</p>
              </v-layout>
            </v-container>
          </v-card>
        <v-flex xs12 v-for="(result, index) in results" :key="index">
          <v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}"  mt-2>
            <v-container fluid text-xs-center>
              <v-layout column py-3 px-3>
                <v-layout column text-xs-left>
                  <v-flex d-flex xs12 sm3 md3 mb-4 mx-2>
                    <v-img v-bind:src="'static'+result.image_url" position="center" width="50" height="50" contain></v-img>
                  </v-flex>
                  <v-layout column mb-0 pb-0>
                    <v-flex xs12 pb-0 mb-0>
                      <v-layout row>
                        <v-flex align-self-end d-flex xs6 sm6 md6  tag="h5" class="text-xs-left" style="title">
                          <p> Сумма страховки:</p>
                        </v-flex>
                        <v-flex align-self-end pb-0 class="text-xs-right" d-flex xs6 sm6 md6 tag="h3" style="headline">
                          <p> {{ result.osago_summ }} ₽</p>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 mt-0 pt-0>
                      <v-layout row mt-0 pt-0>
                        <v-flex align-self-end  class="text-xs-left" d-flex xs6 sm6 md6 mt-0 tag="h5" style="title">
                          <p> Стоимость полиса:</p>
                        </v-flex>
                        <v-flex align-self-end pb-0 d-flex xs6 sm6 md6 mt-0 tag="h2" class="text-xs-right" style="headline">
                          <p> {{ result.osago_price }} ₽</p>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-layout>
                <v-flex xs4>
                  <v-btn round color="primary" large @click="showPopup(result.id)">Оформить за {{ result.osago_price }} ₽</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <br>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import OrderPopup from '@/components/OrderPopup';
export default
{
  name: 'OsagoOrders',
  components:
  {
    OrderPopup
  },
  data()
  {
    return {
      errors: [],
      popup_id: '',
      results: [],
      //details: [],
      is_sent: false,
      show_popup: false,
      is_calculated: false,
    }
  },
  created()
  {
    this.$api.get(`/osago/` + this.$store.state.osago.id + `/info`)
      .then(response =>
      {
        this.details = response.data;
        if (response.data.is_calculated === 0)
          this.$store.commit('showCalculating');
        else
        {
          this.$api.get(`/osago/` + this.$store.state.osago.id + `/results`)
            .then(resp =>
            {
              if (resp && resp.status == 200)
              {
                this.is_calculated = true;
                this.$store.commit('hideCalculating');
                this.results = resp.data;
              }
            })
            .catch(e =>
            {
              //alert(e)
            });
        }
      })
      .catch(e =>
      {
        alert(e)
      });
    var rc = setInterval(() =>
    {
      if (this.is_calculated == false)
      {
        this.$api.get(`/osago/` + this.$store.state.osago.id + `/results`)
          .then(resp =>
          {
            if (resp && resp.status == 200)
            {
              this.is_calculated = true;
              this.$store.commit('hideCalculating');
              this.results = resp.data;
            }
          })
          .catch(e =>
          {
            //alert(e)
          });
      }
    }, 5000);
  },
  methods:
  {
    sendMessage: function(id, name, phone)
    {
      this.$api.post(`/osago/orders`,
        {
          name: name,
          phone: phone,
          osago_results_id: id
        })
        .then(resp =>
        {
        this.$router.push('/');
          //alert(resp.data)
        })
        .catch(e =>
        {
          alert(e)
        });
      this.show_popup = false;
      //this.is_sent = true;
    },
    showPopup: function(id)
    {
      this.show_popup = true;
      this.popup_id = id;
      this.is_srnt = false;
    },
    hidePopup: function()
    {
      this.show_popup = false;
      this.popup_id = '';
      this.is_sent = false; 
    }
  }
}
</script>