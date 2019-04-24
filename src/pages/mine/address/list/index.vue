<template>
    <view>
        <i-cell-group>
            <i-cell title="姓名" label="省市区，详细地址，18888888888">
                <i-icon type="prompt" size="20" color="#2d8cf0" slot="footer"></i-icon>
            </i-cell>
            <i-cell>
                <i-button type="primary" size="small" long="true" shape="circle" @click="addAdress">新增地址</i-button>
            </i-cell>
        </i-cell-group>
        <i-message id="message"></i-message>
        <i-toast id="toast"></i-toast>
    </view>
</template>

<script>
import Ui from '../../../../utils/ui'
import AreaService from '../../../../service/area'
export default {
    data () {
        return {
            list: {}
        }
    },
    methods: {
        addAdress () {
            Ui.navigateTo('mine/address/form')
        }
    },
    onPullDownRefresh () {
        let that = this
        Ui.refresh(async function () {
            let result = await AreaService.getListData()
            if (result.state) {
                that.list = result.data
            } else {
                Ui.msgError(result.msg)
            }
        })
    }
}
</script>
