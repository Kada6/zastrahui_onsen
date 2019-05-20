<template>
  <div>
    <v-form ref="health" lazy-validation v-model="valid" >
      <v-container grid-list-md  justify-center  :class="{'ma-0 mt-5 pa-1': $vuetify.breakpoint.smAndDown}">

         <v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="picon">
						<img src="static/img/insurance-pic3.png" alt="">
					</div>
					<div class="ptext">Страхование жизни</div>
				</div>				
				</v-layout>
        
        <v-card >
          <v-container fluid grid-list-md justify-center text-xs-center>
            <v-layout column px-3 py-3 mt-3>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2>
                <v-layout column text-xs-left>        
                  <p class="title font-weight-regular">Возраст страхуемого:</p>
                  
                  <v-text-field v-model="$store.state.health.age" :rules="healthRules" placeholder="от 0 до 74 лет" type="number" outline single-line required></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm4 md4 pl-2 pr-2 mb-0>
                <v-layout column text-xs-left>
                  <p class="title font-weight-regular">Страховая сумма:</p>
                  <v-select v-model="$store.state.health.price" :items="price_options" :rules="healthRules" :item-text="name"  placeholder="Выберите сумму" item-value="value" color="primary" cache-items="true" outline single-line></v-select>
                  </v-layout>
                </v-flex>
                
                <v-flex d-flex xs12 sm4 md4  align-self-start pl-2 pr-2>
                <v-layout align-end justify-center text-xs-center>
            <div class="text-xs-center">
                  <v-switch v-model="$store.state.health.is_working" color="primary" :label="`Сдаётся в аренду`"></v-switch>
                  </div>
                  </v-layout>
                </v-flex>
              </v-layout>
                  <v-flex xs4>
              <v-btn round  :disabled="isOffline" :loading="isOffline" color="primary" large v-on:click="saveData">Найти страховку</v-btn>
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
	name: 'Health',
	data()
	{
		return {
			error: '',
			is_calculating: false,
			healthRules: [
        v => !!v || 'Поле обязательно для заполнения'
      ],
			price_options: [
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
			},
			{
				text: 'более 1 000 000 руб.',
				value: '1100000'
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
      if (this.$refs.health.validate())
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
				this.$api.post(`/lives`)
				.then(response =>
				{
					if (response && response.status == 200) {
						this.$store.state.health.id = response.data.id;
						
						this.$api.patch(`/lives/` + response.data.id,
						{
							age: this.$store.state.health.age,
							insurance_price: this.$store.state.health.price,
							is_working: this.$store.state.health.is_working
						})
						.then(resp =>
						{
							this.getResults();
						})
						.catch(e =>
						{
							//alert(e)
						});
					}
					
				})
				.catch(e =>
				{
					
				});
				
			}
		 }
		},
		getResults: function()
		{
			this.$api.post(`/lives/` + this.$store.state.health.id + `/calculate`,
				{})
				.then(resp =>
				{
					//вызов дергалки
					this.$router.push('/health/results')
				});
		}
	}
}
</script>