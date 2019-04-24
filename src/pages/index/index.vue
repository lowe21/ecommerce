<template>
    <view>
        <i-tabs :current="tabs" :color="color" fixed @change="handleTabs">
            <i-tab key="all" title="全部"></i-tab>
            <i-tab key="unpaid" title="待付款"></i-tab>
            <i-tab key="undelivered" title="待发货"></i-tab>
            <i-tab key="unreceived" title="待收货"></i-tab>
            <i-tab key="unevaluate" title="待评价" count="3"></i-tab>
        </i-tabs>
        <view style="margin-top:52px;margin-bottom:60px;position:relative">
            <i-card title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg" @click="handRequest">
                <view slot="content">内容不错</view>
                <view slot="footer">尾部内容</view>
            </i-card>
            <i-card title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg" full @click="handleRedirect('mine/address/list')">
                <view slot="content">内容不错</view>
                <view slot="footer">尾部内容</view>
            </i-card>
            <i-card title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg" i-class="card-demo" full>
                <view slot="content">内容不错</view>
                <view slot="footer">尾部内容</view>
            </i-card>
            <i-spin size="large" v-if="spin" fix></i-spin>
        </view>
        <i-tab-bar :current="tabBar" :color="color" fixed @change="handleTabBar">
            <i-tab-bar-item key="homepage" icon="homepage_fill" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
            <i-tab-bar-item key="goods" icon="commodity" current-icon="commodity" title="商品"></i-tab-bar-item>
            <i-tab-bar-item key="shoppingcart" icon="publishgoods_fill" current-icon="publishgoods_fill" title="购物车" count="9999"></i-tab-bar-item>
            <i-tab-bar-item key="mine" icon="mine_fill" current-icon="mine_fill" title="我的" dot></i-tab-bar-item>
        </i-tab-bar>
        <i-toast id="toast"></i-toast>
        <i-message id="message"></i-message>
    </view>
</template>

<script>
import Ui from '../../utils/ui'
import AreaService from '../../service/area'
export default {
    data () {
        return {
            tabs: 'all',
            tabBar: 'homepage',
            color: '#ed3f14',
            spin: false
        }
    },
    methods: {
        handleTabs (event) {
            this.tabs = event.mp.detail.key
        },
        handleTabBar (event) {
            if (this.tabBar !== event.mp.detail.key) {
                Ui.switchTabBar(event.mp.detail.key)
            }
        },
        async handRequest (event) {
            console.log(this)
            this.spin = true
            let areaList = await AreaService.getListData()
            if (areaList.state) {
                console.log(areaList.data)
            } else {
                Ui.msgError(areaList.msg)
            }
            this.spin = false
        },
        handleRedirect (page) {
            Ui.navigateTo(page)
        }
    },
    async onPullDownRefresh () {
        Ui.loading()
        let areaList = await AreaService.getListData()
        if (areaList.state) {
            console.log(areaList.data)
        } else {
            Ui.msgError(areaList.msg)
        }
        Ui.loaded()
        wx.stopPullDownRefresh()
    }
}
</script>
