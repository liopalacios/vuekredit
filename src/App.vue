<template>
  <div id="app">
    <div id="demo" :class="{'collapsed' : collapsed}">
      <sidebar-menu :menu="menu" :collapsed="collapsed" @collapse="onCollapse" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',

    data() {
      return{
          menu: [
              {
                  href: '/',
                  title: 'Boletas',
                  icon: 'fa fa-user'
              },
              {
                  href: '/casadecambio',
                  title: 'Casa de cambio',
                  icon: 'fa fa-chart-area'
              },
          ],
          collapsed: false
        }

    },
    methods:{
        onCollapse(val) {

            this.collapsed = val
        }
    }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#demo {
  /*padding-left: 350px;*/
}
#demo.collapsed {
  padding-left: 50px;
}
</style>
