<template>
<v-dialog
        v-model="this.$store.getters.isCalculating"
        transition="scale-transition"
        persistent
        max-width="600"
        
      >
        <v-card px-3 py-3 text-xs-center justify-center >
          <v-container>
          <v-layout column text-xs-center justify-center px-2 py-2>
 <v-flex xs12 tag="h1" xs 12 class="title font-weight-regular" my-3>
            Запрашиваем индивидуальные предложения от страховых компаний. <br><br><b> Время ожидания составляет: {{ getTimer }} секунд </b>
   </v-flex>  
   <v-progress-linear :indeterminate="true" color="primary" ></v-progress-linear>
<v-flex xs12>
              <v-btn round color="primary" large v-on:click="$store.commit('hideCalculating')">
                Отмена</v-btn>
</v-flex>
           
            
            </v-layout>
 </v-container>

        </v-card>
      </v-dialog>
</template>

<script>

  export default {
    name: 'OrderPopup',
    data() {
    	return {
               timer: 30
	}
   },
   created(){
           var tm = setInterval( () => {
                       if (!this.$store.getters.isCalculating){
                       	clearInterval(tm);
                       	return;
                       }
						if (this.timer > 0) {
							 this.timer--;
						} else {
							this.timer = 30;
						}
						
				  }, 1000 );
    },
    computed: {
    getTimer () {
   		let time = this.timer
      return time;
    }
   }
 }
</script>
