<template>
  <div class="hello">

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">

          <div class="columns">
            <div class="column">
              <h1 class="title is-clearfix">
                Registro CERTIKREDIT
              </h1>
              <h2 class="subtitle is-clearfix">
                {{cliente.apellidop}} {{cliente.apellidom}} {{cliente.nombre}}
              </h2>
            </div>
            <div class="column">
              <div>
                <span class="is-family-monospace has-text-weight-semibold	is-size-2">
                  {{total}}
                </span>
              </div>
              <span>
                Comprobantes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--<button class="button is-primary is-medium" @click="alert()">Alert (default)</button>-->

    <b-table
            :data="isEmpty ? [] : listboletas"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards"

            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"

            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="comprobanteid"
            @details-open="(row, index) => $toast.open(`Expanded ${row.comprobanteid}`)"
    >

      <template slot-scope="props">
          <b-table-column field="comprobanteid" label="Comprobante" centered>
              {{ props.row.comprobanteid }}
          </b-table-column>
        <b-table-column field="serieid" label="Serie" width="40" numeric>
          {{ props.row.serieid }}
        </b-table-column>

        <b-table-column field="nucontrato" label="Contrato">
          {{ props.row.nucontrato }}
        </b-table-column>

        <b-table-column field="tipopago" label="Tipo">
          {{ props.row.tipopago.detalle }}
        </b-table-column>


        <b-table-column field="fechaimp" label="Fecha" centered>
                    <span class="tag is-success">
                        {{ props.row.fechaimp }}
                    </span>
        </b-table-column>
        <b-table-column field="subtotal" label="Subtotal" centered>
          {{ props.row.subtotal }}
        </b-table-column>
        <b-table-column field="toigv" label="IGV" centered>
          {{ props.row.toigv }}
        </b-table-column>
        <b-table-column field="valortotal" label="Total" centered>
          {{ props.row.valortotal }}
        </b-table-column>
        <b-table-column field="donwload" label="Archivos" centered>
          <b-tooltip
                  :label="props.row.mnsagsunat"
                  multilined>
              <span v-if="props.row.estadomnsag==1">
                <a class="button is-info is-outlined" :href="props.row.linkticket" target="_blank">Donwload</a>
              </span>
          </b-tooltip>


        </b-table-column>


        <!--<b-table-column label="Fecha">
          <b-icon pack="fas"
                  :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
          </b-icon>
        </b-table-column>-->
      </template>
      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="/static/img/placeholder-128x128.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <!--<strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                <small>@{{ props.row.user.first_name }}</small>-->
                <small>{{ props.row.comprobanteid }}</small>
                <br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </div>
          </div>
        </article>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                      icon="emoticon-sad"
                      size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>


  </div>
</template>

<script>
    var moment = require('moment');
    const fechaFilter = function(value) {
        return moment(value).format('YYYY/MM/DD');
    }
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    filters: {
        fecha: fechaFilter,
    },
    data() {

            const data = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
            ]

            return {
                data,
                defaultOpenedDetails: [1],
                listboletas:[],
                cliente:[],
                total:0,
                page: 1,
                id:1,
                perPage:8,
                sortOrder: 'desc',
                onSort:'',
                sortField: 'fechaimp',
                defaultSortOrder: 'desc',
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true
            }
        },
    methods:{
        alert() {
            this.$dialog.alert('Everything looks fine!')
        },
        loadBoletas(){
            var fieldstable = this.id.split('_')

            if(fieldstable.length == 3){
                const params = [
                    `productoid=${fieldstable[0]}`,
                    `contratoid=${fieldstable[1]}`,
                    `monedaid=${fieldstable[2]}`,
                    `pagenumber=${this.page}`,
                    `perpage=${this.perPage}`,
                ].join('&')
                //this.$http.get(`http://200.41.86.242:8015/api/pagosBoletaContratos?`+params)
                this.$http.get(`http://localhost:8015/api/pagosBoletaContratos?`+params)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.listboletas = response.data.notices
                        this.total=response.data.count
                    })
                    .catch(e => {
                        this.listboletas=e
                    })
            }else{
                const params = [
                    `clienteid=${this.id}`,
                    `pagenumber=${this.page}`,
                    `perpage=${this.perPage}`,

                ].join('&')
                if(this.id.length<7){
                    this.$http.get(`http://localhost:8015/api/pagosBoleta?`+params)
                        .then(response => {
                            // JSON responses are automatically parsed.
                            this.listboletas = response.data.notices
                            this.total=response.data.count
                        })
                        .catch(e => {
                            this.listboletas=e
                        })
                }else{
                    this.$http.get(`http://localhost:8015/api/pagosBoletaDni?`+params)
                        .then(response => {
                            // JSON responses are automatically parsed.
                            this.listboletas = response.data.notices
                            this.total=response.data.count
                        })
                        .catch(e => {
                            this.listboletas=e
                        })
                }
            }


        },
        loadclient(){
            this.$http.get(`http://localhost:8015/api/cliente?clienteid=${this.id}`)
                .then(response => {
                    // JSON responses are automatically parsed.

                    this.cliente = response.data
                })
                .catch(e => {
                    this.cliente=e
                })
        },
        onPageChange(page) {

            this.page = page

            this.loadBoletas()
        },
        initValue(){

            const params = [
                    `pagenumber=${this.pagePen}`,
                ].join('&')

                this.$http.get('api/personalxName?'+params).then(response=>{
                    this.lista=response.data.personals
                    this.total = response.data.count

                }).catch(e => {

                })

        },
    },
    mounted(){
        console.log( this.$route.params.id)
        this.id=this.$route.params.id
        var fields = this.id.split('_')
        console.log("TAMAÑO SPLICE")
        console.log(fields.length)
        if(fields.length == 3){
            this.$http.get('http://localhost:8015/api/revisaBoletasContrato?productId='+fields[0]+'&contratoId='+fields[1]+'&monedaId='+fields[2])
                .then(response => {
                    console.log("CAMBIOS")
                    console.log(response)
                    this.loadBoletas()
                    this.loadclient()
                    // Error(response.data)
                }).catch(e => {
                console.log("ERRORES")
                console.log(e)
                this.loadBoletas()
                this.loadclient()

            })
        }else{
            if(this.id.length<7){
                this.$http.get('http://localhost:8015/api/revisaBoleta?clienteid='+this.id)
                    .then(response => {
                        console.log("CAMBIOS")
                        console.log(response)
                        this.loadBoletas()
                        this.loadclient()
                        // Error(response.data)
                    }).catch(e => {
                    console.log("ERRORES")
                    console.log(e)
                    this.loadBoletas()
                    this.loadclient()
                    //this.loadBoletas()
                    //this.loadclient()
                    //  Error(e)
                })
            }else{
                //200.41.86.242
                this.$http.get('http://localhost:8015/api/revisaBoletaDni?clienteid='+this.id)
                    .then(response => {

                        console.log(response)
                        this.loadBoletas()
                        this.loadclient()
                        // Error(response.data)
                    }).catch(e => {
                    console.log("ERRORES")
                    console.log(e)
                    this.loadBoletas()
                    this.loadclient()

                })
            }
        }


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
