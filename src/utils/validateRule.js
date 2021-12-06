export default class Validate {
  /**
   * 验证电子邮箱格式
   */
  static email(rule, value, callback, message) {
    const regexp =  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证手机格式（手机号效果：1开头3~9后面9位，共11位）
   */
  static phone(rule, value, callback, message) {
    const regexp =  /^1[3456789]\d{9}$/;
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证电话格式（暂不建议用，测试发现有问题）
   */
  static tel(rule, value, callback, message) {
    const regexp = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }

  /**
   * 验证联系方式（固话&手机）（固话效果： 3-4位区号-(区号可不带) 5-8位固话，手机号效果：1开头3~9后面9位，共11位）
   */
  static call(rule, value, callback, message) {
    // const regexp = /(^([0-9]{3,4}\-)?([0-9]{5,8})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/;
    // const regexp1 = /^([0-9]{3,4}\-)?[0-9]{5,8}$/   // 固话，这是老规则需要加区号-；
    const regexp1 = /^[0-9-]{5,15}$/   // 固话 （固话效果：5-15位数字和-组成）
    const regexp2 = /^1[3456789]\d{9}$/            // 手机
    if (regexp1.test(value) || regexp2.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }

  /**
   * 验证传真格式
   */
  static fax(rule, value, callback, message) {
    const regexp = /^(\d{3,4}-)\d{7,8}$/;
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证URL格式
   */
  static url(rule, value, callback, message) {
    const regexp =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证日期格式
   */
  static date(rule, value, callback, message) {
    const regexp = /Invalid|NaN/
    if (!regexp.test(new Date(value).toString())) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证ISO类型的日期格式
   */
  static dateISO(rule, value, callback, message) {
    const regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  /**
   * 验证身份证号码
   */
  static idcard(rule, value, callback, message) {
    const regexp =  /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }

  // =======================================
  
  // 是否选择
  static select (rule, value, callback, message) {
    if ((value&&value.length == 0) || value=="" || value==null) {
      return callback(new Error(message));
    } else {
      return callback();
    }
  }
  // 限制输入字符数量
  static Str20 (rule, value, callback, message) {
    if (value == "") {
      return callback(new Error("请输入"));
    } else if ((value+"").trim() == "") {
      return callback(new Error("不能输入空字符"));
    } else if ((value+"").trim().length > 20) {
      return callback(new Error("不能超过20个字符"));
    } else {
      return callback();
    }
  }
  // 不能为空
  static Str (rule, value, callback, message) {
    if (value == "") {
      return callback(new Error("请输入"));
    } else if ((value+"").trim() == "") {
      return callback(new Error("不能输入空字符"));
    } else {
      return callback();
    }
  }
  // 验证金额格式
  static money (rule, value, callback, message) {
    if (value == "") {
      return callback(new Error("请输入"));
    } else if ((value+"").trim() == "") {
      return callback(new Error("不能输入空字符"));
    } else if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) {
      return callback(new Error("请正确输入"));
    } else {
      return callback();
    }
  }
   /**
   * 验证数值为正整数
   */
  static positiveInt(rule, value, callback, message) {
    const regexp =  /^[1-9]\d*$/
    if (regexp.test(value)) {
      return callback()
    } else {
      return callback(new Error(message));
    }
  }
  // 银行卡号
  static cartNo (rule, value, callback, message) {
    if (value == "") {
      return callback(new Error("请输入"));
    } else if ((value+"").trim() == "") {
      return callback(new Error("不能输入空字符"));
    } else if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
      return callback(new Error("请正确输入"));
    } else {
      return callback();
    }
  }

}