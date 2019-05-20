<template>
  <div>
    <v-form ref="realty" lazy-validation v-model="valid" >
      <v-container grid-list-md  justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">

     <v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic4.png" alt="">
					</div>
					<div class="ptext">Страхование недвижимости</div>
				</div>				
				</v-layout>
        
        <v-card :class="{'ma-0 xs12': $vuetify.breakpoint.smAndDown}" >
          <v-container fluid grid-list-md justify-center text-xs-center>
            <v-layout column px-3 py-3 mt-3>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Выберите город:</p>
                  
                  <v-select v-model="$store.state.realty.region_id" :items="property_regions" :rules="propertyRules" item-text="name" placeholder="Выберите город" item-value="id" color="primary" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2 mb-0>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Внутренняя отделка:</p>
                  <v-select v-model="$store.state.realty.price" :items="price_options" :rules="propertyRules" :item-text="name"  placeholder="Выберите сумму" item-value="value" color="primary" cache-items="true" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                
                <v-flex d-flex xs12 sm4 md4  align-self-start pl-2 pr-2>
                <v-layout align-end justify-center text-xs-center>
            <div class="text-xs-center">
                  <v-switch v-model="$store.state.realty.is_rented" color="primary" :label="`Сдаётся в аренду`"></v-switch>
                  </div>
                  </v-layout>
                </v-flex>
              </v-layout>
                  <v-flex xs4>
              <v-btn round color="primary" large  :disabled="isOffline" :loading="isOffline" v-on:click="saveData">Найти страховку</v-btn>
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
	name: 'Realty',
	props:
	{
		property_regions: Array
	},
	data()
	{
		return {
			error: '',
			is_calculating: false,
			propertyRules: [
        v => !!v || 'Поле обязательно для заполнения'
      ],
			price_options: [
			{
				text: '30 000 руб.',
				value: '30000'
			},
			{
				text: '50 000 руб.',
				value: '50000'
			},
			{
				text: '100 000 руб.',
				value: '100000'
			},
			{
				text: '250 000 руб.',
				value: '250000'
			},
			{
				text: '500 000 руб.',
				value: '500000'
			},
			{
				text: '1 000 000 руб.',
				value: '1000000'
			}],
			is_done: false
		}
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
      if (this.$refs.realty.validate())
      {
        this.is_done = true;
      }
    },
		saveData: function()
		{
		this.$store.commit('loading');
		 if(!this.is_calculating) {
			this.validate();
			if (this.is_done == true )
			{
				this.is_calculating = true;
				this.$store.commit('showCalculating');
				this.$api.post(`/properties`)
				.then(response =>
				{
					if (response && response.status == 200) {
						this.$store.state.realty.id = response.data.id;
						this.$api.patch(`/properties/` + response.data.id,
						{
							property_region_id: this.$store.state.realty.region_id,
							decoration_price: this.$store.state.realty.price,
							is_rented: this.$store.state.realty.is_rented
						})
						.then(resp =>
						{
							this.getResults();
						})
						.catch(e =>
						{
							alert(e)
						});
					}
					
				})
				.catch(e =>
				{
					//alert(e);
				});
				
			}
		 }
		},
		getResults: function()
		{
			this.$api.post(`/properties/` + this.$store.state.realty.id + `/calculate`,
				{})
				.then(resp =>
				{
					//вызов дергалки
					this.$router.push('/realty/results')
				})
				.catch(e =>
				{
					alert(e)
				});
		}
	}
}
</script>