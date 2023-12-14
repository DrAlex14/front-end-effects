<template>
    <div class="container">
        <div class="area" :style="areaStyle"></div>
        <div class="list">
            <div ref="item" :class="{selected: item.selected}" class="item" v-for="item in list" :key="item.id">{{item.id}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            areaInfo: {
                // startX: 0,
                // startY: 0,
            },
            list: [
                {id: 1, selected: false},
                {id: 2, selected: false},
                {id: 3, selected: false},
                {id: 4, selected: false},
                {id: 5, selected: false},
                {id: 6, selected: false},
                {id: 7, selected: false},
                {id: 8, selected: false},
                {id: 9, selected: false},
                {id: 10, selected: false}
            ]
        }
    },

    methods: {
        getItemDom() {
            const item = this.$refs.item;
            this.list = this.list.map((v, i) => {
                const {left, top, width, height} = item[i].getBoundingClientRect();
                return {...v, left, top, width, height};
            })
        },
        init() {
            window.addEventListener("mousedown", (e) => {
                console.log("mousedown", this.areaInfo);
                this.areaInfo.startX = e.clientX;
                this.areaInfo.startY = e.clientY;
                this.areaInfo.left = e.clientX;
                this.areaInfo.top = e.clientY;
            })
            window.addEventListener("mouseup", (e) => {
                this.areaInfo = {};
                console.log("mouseup", this.areaInfo);
            })
            window.addEventListener("mousemove", (e) => {
                    const { startX, startY } = this.areaInfo;
                    if (!startX) return
                    this.areaInfo.left = Math.min(startX, e.clientX);
                    this.areaInfo.top = Math.min(startY, e.clientY);
                    this.areaInfo.height = Math.abs(e.clientY - startY);
                    this.areaInfo.width = Math.abs(e.clientX - startX);
                    console.log("mousemove", this.areaInfo);

                    this.list.forEach(item => {
                        console.log(item.left, item.top);
                        item.selected = ((item.top >= this.areaInfo.top) && (item.left >= this.areaInfo.left) && (item.left + item.width <= this.areaInfo.left + this.areaInfo.width) && (item.top + item.height <= this.areaInfo.top + this.areaInfo.height)) ? true : false
                    })
            })
        }
    },
    computed: {
        areaStyle() {
            return this.areaInfo.width && {
                width: `${this.areaInfo.width}px`,
                height: `${this.areaInfo.height}px`,
                left: `${this.areaInfo.left}px`,
                top: `${this.areaInfo.top}px`,
                position: 'fixed',
                opacity: '1'
            }
        }
    },
    mounted() {
        this.init();
        this.getItemDom()
    }
}

</script>
<style scoped>
.container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.area {
    background-color: rgba(0, 140, 255, .3);
    border: 1px solid rgb(0, 140, 255);
    /* position: fixed; */
    width: 0;
    height: 0;
    opacity: 0;
}

.list {
    height: 50%;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
}

.list .item {
    width: 80px;
    height: 80px;
    border: 1px solid #fff;
    text-align: center;
    line-height: 80px;
    &.selected {
        background-color: lightgreen;
    }
}
</style>