<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="dialog" max-width="600" transition="scale-transition" :full-width="$vuetify.breakpoint.smAndDown">
      <v-card px-3 py-3>
      <v-toolbar dark color="primary" class="elevation-2">
          <v-toolbar-title>Оформление полиса</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="hidePopup" icon>
            <v-icon large color="white">clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form ref="popup" lazy-validation v-model="valid">
          <v-card-text text-xs-center justify-center>
            <v-container grid-list-md text-xs-center>
              <v-layout column>
                <v-layout row wrap>
                  <v-flex tag="h1" xs 12 class="headline" my-1>
                    <b>Хотите оформить полис?</b>
                  </v-flex>
                  <v-flex tag="h1" xs 12 class="title" my-1>
                    Оставьте свои контактные данные и наш специалист в ближайшее время свяжется с вами</v-flex>
                  <v-flex d-flex xs12 sm6 md6 pr-2 mt-2>
                    <v-layout column text-xs-left>
                      <p class="title">Ваше имя:</p>
                      <v-text-field v-model="name" :rules="popupRules" outline single-line required></v-text-field>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex xs12 sm6 md6 pr-2>
                    <v-layout column text-xs-left>
                      <p class="title">Ваш телефон:</p>
                      <v-text-field v-model="phone" :rules="popupRules" mask="phone" outline single-line required></v-text-field>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-flex xs4>
                  <v-btn v-btn :disabled="isOffline" :loading="isOffline" round color="primary" large @click="validate">Заказать звонок</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default
{
  name: 'OrderPopup',
  props:
  {
    id: [String, Number],
    sendMessage: Function,
    dialog: Boolean,
    hidePopup: Function
  },
  data()
  {
    return {
      errors: [],
      phone: '',
      name: '',
      popupRules: [
        v => !!v || 'Поле обязательно для заполнения'
      ],
    }
  },
  methods:
  {
    validate()
    {
      if(this.$refs.popup.validate())
      {
        this.sendMessage(this.id, this.name, this.phone);
      }
    }
  }
}
</script>
<style>
.scale-transition-leave-active {
  transition: all 3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>