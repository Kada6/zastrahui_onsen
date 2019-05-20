<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        <img position="right" height="30" style="vertical-align: middle;" src="static/img/shield.png">
        <b>ЗАСТРАХУЙ</b>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="$store.state.menu_toggle=!$store.state.menu_toggle" icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div class="ptitle2">
      <div class="ptext">Онлайн-поиск по страхованию
      </div>
    </div>
    <div class="ptitle2">
      <div class="ptext">
        Лучшие предложения от страховых компаний
      </div>
    </div>
    <v-ons-row style="align-items: center; justify-content: center;">
      <v-ons-col width="260px">
        <div class="b-intro__insurance">
          <router-link to="/osago" class="b-intro__insurance-body">
            <div class="b-intro__insurance-icon">
              <img src="static/img/insurance-pic1.png" alt="">
            </div>
            <div class="b-intro__insurance-title">ОСАГО</div>
          </router-link>
        </div>
      </v-ons-col>
      <v-ons-col width="260px">
        <div class="b-intro__insurance">
          <router-link to="/kasko" class="b-intro__insurance-body">
            <div class="b-intro__insurance-icon">
              <img src="static/img/insurance-pic1.png" alt="">
            </div>
            <div class="b-intro__insurance-title">КАСКО</div>
          </router-link>
        </div>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row style="align-items: center; justify-content: center;">
      <v-ons-col width="260px">
        <div class="b-intro__insurance">
          <router-link to="/health" class="b-intro__insurance-body">
            <div class="b-intro__insurance-icon">
              <img src="static/img/insurance-pic3.png" alt="">
            </div>
            <div class="b-intro__insurance-title">Жизнь и здоровье</div>
          </router-link>
        </div>
      </v-ons-col>
      <v-ons-col width="260px">
        <div class="b-intro__insurance">
          <router-link to="/realty" class="b-intro__insurance-body">
            <div class="b-intro__insurance-icon">
              <img src="static/img/insurance-pic4.png" alt="">
            </div>
            <div class="b-intro__insurance-title">Недвижимость</div>
          </router-link>
        </div>
      </v-ons-col>
    </v-ons-row>
    </div>
  </v-ons-page>
</template>
<style>
.b-intro__insurance {
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 18px;
  width: 240px;
  max-width: 240px;
}

.b-intro__insurance-body {
  box-shadow: 0 0 9px 2px rgba(169, 169, 169, 1);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 41px 20px 34px 20px;
  color: #1b1b1b;
  text-decoration: none;
  display: block;
  text-align: center;
}

.b-intro__insurance-body:hover,
.b-intro__insurance-body:focus {
  color: #42de7f;
  text-decoration: none;
  box-shadow: 0 3px 13px 0 rgba(128, 128, 128, 1);
}

.b-intro__insurance-body:hover .b-intro__insurance-title {
  text-decoration: none;
  text-decoration-color: #42de7f;
  color: #42de7f
}

.b-intro__insurance-body:focus .b-intro__insurance-title {
  text-decoration: none;
  text-decoration-color: #42de7f;
  color: #42de7f
}

.b-intro__insurance-title {
  font-size: 18px;
  font-weight: 300;
  line-height: 17px;
  margin-bottom: 30px;
  color: black;
  text-decoration: none;
}

.b-intro__insurance-icon {
  vertical-align: middle;
  margin-top: 30px;
}
</style>
<script>
export default
{
  name: 'Index',
  props:
  {}
}
</script>