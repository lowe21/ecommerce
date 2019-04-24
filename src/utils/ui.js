import Help from './help'
import { $Toast, $Message } from '../components/base'
export default {
    loading (content = '加载中') {
        $Toast({
            content: content,
            type: 'loading',
            duration: 0
        })
    },
    loaded () {
        setTimeout(() => {
            $Toast.hide()
        }, 0)
    },
    async refresh (callback) {
        this.loading()
        if (Help.isFunction(callback)) {
            await callback()
        }
        this.loaded()
        wx.stopPullDownRefresh()
    },
    msgSuccess (content) {
        $Message({
            content: content,
            type: 'success'
        })
    },
    msgError (content) {
        $Message({
            content: content,
            type: 'error'
        })
    },
    switchTabBar (tabBar) {
        let page = ''
        switch (tabBar) {
            case 'homepage':
                page = 'index'
                break
            case 'goods':
                page = 'goods/list'
                break
            case 'shoppingcart':
                page = 'shopping-cart'
                break
            case 'mine':
                page = 'mine/ucenter'
                break
        }
        let url = Help.pageUrl(page)
        if (url) {
            let that = this
            wx.reLaunch({
                url: url,
                fail: function () {
                    that.msgError('页面切换失败')
                }
            })
        } else {
            this.msgError('页面切换失败')
        }
    },
    redirect (page, params = {}) {
        let url = Help.pageUrl(page, params)
        if (url) {
            let that = this
            wx.redirectTo({
                url: url,
                fail: function () {
                    that.msgError('页面跳转失败')
                }
            })
        } else {
            this.msgError('页面跳转失败')
        }
    },
    navigateTo (page, params = {}) {
        let url = Help.pageUrl(page, params)
        if (url) {
            let that = this
            wx.navigateTo({
                url: url,
                fail: function () {
                    that.msgError('页面跳转失败')
                }
            })
        } else {
            this.msgError('页面跳转失败')
        }
    },
    navigateBack () {
        let that = this
        wx.navigateTo({
            delta: 1,
            fail: function () {
                that.msgError('页面跳转失败')
            }
        })
    }
}
