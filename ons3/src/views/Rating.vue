<template>
  <div>
    <v-form ref="rating" lazy-validation v-model="valid" >
      <v-container grid-list-md  justify-center text-xs-center  :class="{'ma-0 pa-1 mt-5': $vuetify.breakpoint.smAndDown}">

           <v-layout  justify-center xs12 mb-3>
    <div class="ptitle">
					<div class="ptext">Топ страховых компаний</div>
				</div>				
				</v-layout>
        
        
          
            <v-layout column>
              <v-data-table
    :headers="headers"
    :items="$store.state.rating"
    class="elevation-1"
    hide-actions
  >
    <template v-slot:items="props" >
      <td class="title font-weight-regular" ><b>{{ props.index+1}}</b></td>
      <td class="title font-weight-regular text-xs-left">{{ props.item.name}}</td>
      <td class="title font-weight-regular text-xs-right">{{ props.item.rate}}</td>
    </template>
  </v-data-table>
            </v-layout>
          
        
      </v-container>
    </v-form>
  </div>
</template>
<script>
	export default {
    name: 'Rating',
    data() {
    	return {
    errors: [],
    headers: [
          {
            text: '#',
            align: 'left',
            value: 'index',
            sortable: false,
            class: "headline"
          },
          { text: 'Страховая компания', sortable: false, value: 'name',  class: "headline", color: 'black'},
          { text: 'Рейтинг', value: 'rate',  class: "headline text-xs-right", color: 'black'}
        ],
}
},
    mounted(){
      this.$api.get(`/companies`)
            .then(response => {
                this.$store.state.rating = response.data
            })
            .catch( e => {
               // alert(e)
            });
    }
}
</script>
