; (function () {

    window.$ = window.jQuery = jQuery;
    // 全局使用

    // new一个实例对象给jq, 就可以用$(seclect)
    function jQuery(seclect) {
        return new Init(seclect);
    }

    //    里面写选择器的数组值,再取出来
    function Init(seclect) {

        // 为什么大家都是数组,为什么还要提取出来,再赋值回去
        // 原生的js的原型对象跟jq是不同的,jq的数组变成的原型是__propt__是nodelist(数组)不是object(对象)
        // 所以应该重新新创一个数组对象,因为this本来就是对象所以直接用对象[索引]进行赋值
        // 创建对象之后他的__prop__就是object了
        // 后来有感觉是下面设置方法也有影响 init.prototype.css,这个是给new的有这个方法,数组他不可能有这个方法,因为要
        // 对象

        // 给一个变量包含选择器
        let dom = document.querySelectorAll(seclect);
        console.log(dom);
        // 遍历数组,做成属性名为0的数组
        for (let i = 0; i < dom.length; i++) {

            this[i] = dom[i]

        }
        this.length = dom.length;

    }



    // 给每个数组设置样式

    // 给实例对象创建方法
    /**
 * jq的css方法，有两个功能
 *    设置css样式
 *      jq对象.css(属性名,属性值)
 *    获取css样式
 *      jq对象.css(属性名)
 * 
 *  */
    // 1.是带px的不加,不带的就加px   111
    // 2.数字的获取
    // 把要带单位的属性和不带单位的属性区分开

    Init.prototype.css = function (shuxingming, zhi) {
        // 判断第二个参数有么有传进来

        if (zhi == undefined) {

            return window.getComputedStyle(this[0])[shuxingming]
            // this[0]相当于input:last-children 精准到数组的某个元素.,相当于数组只有一个元素,用索引[0]
            // 来使用,外面使用input:last-children获取伪数组的某一个,再里面数组相当于只有一个元素了
            //$('input:last-children')就算拿到一个他也是伪数组
            // querySelectorAll('input:last-children')js原生的也是得到一个数组


        } else {


            let isvvv = ['width', 'height', 'left', 'right'];

            for (let i = 0; i < this.length; i++) {


                // 判断是否是是其他属性 先创建数据再判断
                if (isvvv.indexOf(shuxingming) !== -1) {

                    // 实现带px就就不加px,不带 
                    if (zhi.toString().indexOf('px') === -1) {

                        this[i].style[shuxingming] = zhi + 'px';
                        // console.log(this)
                    } else {
                        // this[i].style[shuxingming] = zhi;
                        this[i].style[shuxingming] = zhi;
                    }


                } else {
                    this[i].style[shuxingming] = zhi;
                }








            }
            // 最后返回this，用于实现链式编程
            return this;
        }

    }


    // 封装遍历数组

    Init.prototype.each = function (callback) {
        for (let i = 0; i < this.length; i++) {
            // 在遍历里面的逻辑是不确定的 - 传回调函数进来
            callback(i, this[i]);


        }
    }

    // 实现addClass功能
    /**
     *  jq里面的addClass
     *    jq对象.addClass(类名)
     * 
     * 
     * Init.prototype.addClass = function (className)
  */

    Init.prototype.addClass = function (className) {

        this.each(function (i, e) {

            e.classList.add(className);
        })





        return this;


    }
    Init.prototype.removeClass = function (className) {

        this.each(function (i, e) {

            e.classList.remove(className);
        })





        return this;


    }
    Init.prototype.toggleClass = function (className) {

        this.each(function (i, e) {

            e.classList.toggle(className);
        })

        return this;


    }
























})();