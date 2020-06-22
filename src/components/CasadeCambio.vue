<template>
    <div class="house">

        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">

                    <div class="columns">
                        <div class="column">
                            <h1 class="title is-clearfix">
                                CASA DE CAMBIO CERTIKREDIT
                            </h1>
                        </div>
                        <div class="column">
                            <div>
                                <span class="is-family-monospace has-text-weight-semibold	is-size-2">
                                  {{total}}
                                </span>
                            </div>
                            <span>
                                Procesos de hoy
                              </span>
                        </div>
                        <div class="column" v-show="act">
                            <a @click="loadMovimientos" class="button is-primary is-rounded is-small">Actualizar lista</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--<button class="button is-primary is-medium" @click="alert()">Alert (default)</button>-->

        <b-table
                :data="isEmpty ? [] : listcambios"
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
                detail-key="id"
                @details-open="(row, index) => $toast.open(`Expanded ${row.comprobanteid}`)"
        >


            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.idMovimientoCasacambio }}
                </b-table-column>
                <b-table-column field="subtotal" label="Operacion" centered>
                    {{ props.row.operacion }}
                </b-table-column>
                <b-table-column field="nucontrato" label="Caja">
                    {{ props.row.idCaja }}
                </b-table-column>

                <b-table-column field="tipopago" label="Usuario">
                    {{ props.row.numDocu }}
                </b-table-column>

                <b-table-column field="comprobanteid" label="Tipo" centered>
                    {{ props.row.tipoCambio }}
                </b-table-column>
                <b-table-column field="fechaimp" label="Fecha" centered>
                    <span class="tag is-success">
                        {{ props.row.fechaReg }}
                    </span>
                </b-table-column>
                <b-table-column field="toigv" label="Ticket" centered>
                    {{ props.row.nroTicket }}
                </b-table-column>
                <b-table-column field="valortotal" label="Cantidad" centered>
                    {{ props.row.cantidadCambiar }}
                </b-table-column>
                <b-table-column field="cambio" label="Cambio" centered>
                    {{ props.row.clienteRecibe }}
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
                <!--
                <b-table-column field="donwload" label="Archivos" centered>
                    <b-tooltip
                            :label="props.row.mnsagsunat"
                            multilined>
              <span v-if="props.row.estadomnsag==1">
                <a class="button is-info is-outlined" :href="props.row.linkticket" target="_blank">Donwload</a>
              </span>
                    </b-tooltip>


                </b-table-column>
-->

                <!--<b-table-column label="Fecha">
                  <b-icon pack="fas"
                          :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                  </b-icon>
                </b-table-column>-->
            </template>
            <!--
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
                                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                                <small>@{{ props.row.user.first_name }}</small>
                                <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article>
            </template>
            -->
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
        name: "CasadeCambio",

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
                listcambios:[],
                listcambiosdia:[],
                cliente:[],
                total:0,
                page: 1,
                limite:9,
                id:6,
                act:false,
                perPage:9,
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
            loadMovimientos(){
                this.act=false
                this.$http.get('http://localhost:8015/api/revisaCambios?userid='+this.id)
                    .then(response => {
                        this.listcambiosdia=response.data.listcasacambio
                        this.loadBoletas()

                    }).catch(e => {
                    this.loadBoletas()

                })
            },
            alert() {
                this.$dialog.alert('Everything looks fine!')
            },
            loadBoletas(){
                const params = [
                    `userid=`+this.id,
                    `page=`+this.page,
                    `limite=`+this.limite,
                ].join('&')
                this.$http.get(`http://localhost:8015/api/listaCasaCambios?`+params)
                    .then(response => {
                        console.log(response.data)
                        // JSON responses are automatically parsed.
                        this.listcambios = response.data.listcasacambio
                        this.total=response.data.count
                        this.act=true
                    })
                    .catch(e => {
                        this.listcambios=e
                        this.act=true
                    })
            },
            loadclient(){
                //this.$http.get(`http://200.41.86.242:8015/api/cliente?clienteid=004002`)
                this.$http.get(`http://localhost:8015/api/cliente?clienteid=004002`)
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
            //alert(" mnsag " + this.$route.params.id)
            this.loadMovimientos()

        }
    }
</script>

<style scoped>

</style>
