Component({
  externalClasses: ['i-class'],

  properties: {
    title: {
      type: String
    },
    disabled: {
      type: Boolean,
      value: false
    },
    label: {
      type: String,
      value: '请选择'
    },
    defaultValue: {
      type: Array,
      value: []
    },
    currentValue: {
      type: Array,
      value: [],
      observer(value) {
        !!Array.prototype.toString.call(value) && this.setData({
          value: value,
          _currentValue: value.join(' ', '')
        })
      }
    },
    customItem: {
      type: String
    },
    right: {
      type: Boolean,
      value: false
    },
    error: {
      type: Boolean,
      value: false
    },
    map: {
      type: Boolean,
      value: false
    }
  },

  data: {
    value: [],
    _currentValue: '请选择'
  },

  methods: {
    handleChange(event) {
      console.log(event)
      const { value: currentValue } = event.detail;
      this.setData({
        value: currentValue,
        _currentValue: currentValue.join(' ', '')
      });
      this.triggerEvent('change', event);
    },
    handleCancel(event) {
      this.triggerEvent('cancel', event);
    },
    handleChoose() {
      const that = this;
      wx.chooseLocation({
        complete: function(res) {
          let result = {
            state: false,
            code: '',
            msg: '',
            data: null
          };
          if (res.errMsg === 'chooseLocation:ok') {
            result.state = true;
            result.code = 'CHOOSE_LOCATION_SUCCESS';
            result.msg = '选择位置成功';
            result.data = {
              name: res.name,
              address: res.address,
              location: res.latitude + ',' + res.longitude
            };
          } else if (res.errMsg === 'chooseLocation:fail cancel') {
            result.state = true;
            result.code = 'CHOOSE_LOCATION_CANCEL';
            result.msg = '选择位置取消';
          } else {
            result.state = false;
            result.code = 'CHOOSE_LOCATION_FAIL';
            result.msg = '选择位置失败';
          }
          that.triggerEvent('choose', result);
        }
      });
    }
  },

  ready: function () {
    const { defaultValue } = this.data;
    if (!!Array.prototype.toString.call(defaultValue)) {
      this.setData({
        value: defaultValue,
        _currentValue: defaultValue.join(' ', '')
      });
    }
  }
});