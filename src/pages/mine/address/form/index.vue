<template>
    <view>
        <i-cell-group>
            <i-input type="text" title="收货人" :value="consignee" maxlength="20" placeholder="名字" id="consignee" @change="changeInput"></i-input>
            <i-input type="number" title="联系电话" :value="mobile" maxlength="11" placeholder="11位手机号" id="mobile" @change="changeInput"></i-input>
            <i-address-picker title="选择地区" :defaultValue="address" :currentValue="address" map="true" id="address" @change="changeAddress" @choose="chooseAddress"></i-address-picker>
            <i-input type="textarea" title="详细地址" :value="detail" maxlength="50" placeholder="街道门牌信息(最多50字)" id="detail" @change="changeInput"></i-input>
            <i-input type="number" title="邮政编码" :value="postcode" maxlength="6" placeholder="邮政编码" id="postcode" @change="changeInput"></i-input>
            <i-cell>
                <i-button type="primary" size="small" long="true" shape="circle" :loading="loading" @click="saveAdress">完成</i-button>
            </i-cell>
        </i-cell-group>
        <i-message id="message"></i-message>
        <i-toast id="toast"></i-toast>
    </view>
</template>

<script>
import Help from '../../../../utils/help'
import Ui from '../../../../utils/ui'
import Map from '../../../../service/map'
export default {
    defaultData () {
        return {
            consignee: '',
            mobile: '',
            address: [],
            detail: '',
            location: '',
            adcode: '',
            postcode: '',
            loading: false
        }
    },
    data () {
        return this.$options.defaultData()
    },
    methods: {
        changeInput (event) {
            this[event.mp.target.id] = event.mp.detail.detail.value
        },
        changeAddress (event) {
            let detail = event.mp.detail.detail
            let address = detail.value
            if (!Help.isEmpty(this.address) && this.address.join('') !== address.join('')) {
                this.address = address
                this.detail = ''
            }
            this.adcode = detail.code[3]
            this.postcode = detail.postcode
        },
        async chooseAddress (event) {
            let detail = event.mp.detail
            if (detail.state) {
                if (detail.data) {
                    let result = await Map.getInfo(detail.data.location)
                    if (result.state) {
                        this.address = result.data.address
                        this.detail = detail.data.address.replace(new RegExp('^\\' + result.data.address.join('')), '') + detail.data.name
                        this.location = detail.data.location
                        this.adcode = result.data.adcode
                        this.postcode = ''
                    } else {
                        Ui.msgError(result.msg)
                    }
                }
            } else {
                Ui.msgError(detail.msg)
            }
        },
        async saveAdress () {
            this.loading = true
            this.address = ['吉林省', '长春市', '二道区']
        }
    },
    onUnload () {
        Object.assign(this.$data, this.$options.defaultData())
    }
}
</script>
