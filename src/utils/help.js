export default {
    isString (string) {
        return typeof string === 'string' && string.constructor === String
    },
    isNumber (number) {
        return typeof number === 'number' && number.constructor === Number
    },
    isDate (date) {
        return typeof date === 'object' && date.constructor === Date
    },
    isArray (array) {
        return typeof array === 'object' && array.constructor === Array
    },
    isObject (object) {
        return typeof object === 'object' && object.constructor === Object
    },
    isFunction (fun) {
        return typeof fun === 'function' && fun.constructor === Function
    },
    isEmpty (value) {
        if (value === undefined || value === null) {
            return true
        }
        if (this.isString(value) && !value.replace(/^\s+|\s+$/gm, '')) {
            return true
        }
        if (this.isArray(value) && !value.length) {
            return true
        }
        if (this.isObject(value) && !Object.keys(value).length) {
            return true
        }
        return false
    },
    trim (string, character) {
        if (this.isEmpty(string)) {
            return ''
        } else {
            string = string.toString()
        }
        let reg = null
        if (character) {
            reg = new RegExp('^\\' + character + '+|\\' + character + '+$', 'gm')
        } else {
            reg = /^\s+|\s+$/gm
        }
        return string.replace(reg, '')
    },
    pageUrl (page, params = {}) {
        page = this.isString(page) ? this.trim(page) : ''
        if (!page) {
            return ''
        }
        if (this.isObject(params) && Object.keys(params).length) {
            let tempArray = []
            for (let key in params) {
                tempArray.push(this.trim(key) + '=' + this.trim(params[key]))
            }
            params = tempArray.join('&')
        } else if (this.isString(params)) {
            params = this.trim(params)
        } else {
            params = ''
        }
        return '/pages/' + page + '/main' + (params ? '?' + params : '')
    }
}
