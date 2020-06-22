<template>
    <div id="sidebar-menu" :class="{'collapsed' : isCollapsed}" @mouseleave="mouseLeave">
        <ul class="default-list menu-list">
            <item v-for="(item, index) in menu" :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
        </ul>

        <button class="collapse-btn" @click="toggleCollapse">

        </button>

    </div>
</template>

<script>
    import Item from './items/Item'
    import SubItem from './items/SubItem'

    export default {
        name: "SidebarMenu",
        components:{
            Item,
            SubItem
        },
        comments:{

        },
        props: {
            menu: {
                type: Array,
                required: true
            },
            collapsed: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isCollapsed: true,
                mobileItem: null,
                mobileItemPos: 0
            }
        },
        created() {
            this.$on('mouseEnterItem', (val) => {
                this.mobileItem = val.item
                this.mobileItemPos = val.pos
            })
        },
        methods: {
            mouseLeave() {
                this.mobileItem = null
            },
            toggleCollapse() {
                this.isCollapsed = !this.isCollapsed
                this.$emit('collapse', this.isCollapsed)
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/main';
</style>
