function numToChinese(n) {
	/*
	 * if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n) &&
	 * !/^(-[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法"; var unit
	 * ="仟佰拾亿仟佰拾万仟佰拾元角分", str = ""; if(/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) { str =
	 * ""; } else { str = "（负数）"; } n += "00"; var p = n.indexOf('.'); if (p >=
	 * 0) n = n.substring(0, p) + n.substr(p + 1, 2); unit =
	 * unit.substr(unit.length - n.length); for (var i = 0; i < n.length; i++)
	 * str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i); return
	 * str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(
	 * /零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace( /^元零?|零分/g,
	 * "").replace(/元$/g, "元整");
	 */

	var fraction = [ '角', '分' ];
	var digit = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
	var unit = [ [ '元', '万', '亿' ], [ '', '拾', '佰', '仟' ] ];
	var head = n < 0 ? '（负数）' : '';
	n = Math.abs(n);

	var s = '';

	for ( var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i])
				.replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);

	for ( var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for ( var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head
			+ s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/,
					'零元整');
}
/**
 * 自制弹出框弹出
 * @param msg 弹出显示内容
 */
function alertInfo(msg) {
	$(".alert_info").find("span").text(msg);
	$(".alert_info").show();
}
/**
 * 验证num值，查看是否为空或者NAN，然后将其转换为浮点型
 * @param num
 * @returns 浮点型
 */
function checkNumAndParseFloat(num) {
	if (isNaN(num) || num == "" || num == "undefined" || num == "*") {   
		num=0;
	}
	return parseFloat(num);
}
/**
 * 验证num值，查看是否为空或者NAN，然后将其转换为整型
 * @param num
 * @returns 整型
 */
function checkNumAndParseInt(num) {
	if (isNaN(num) || num == "" || num == "undefined" || num == "*") {   
		num=0;
	}
	return parseInt(num);
}
/**
 * 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
 * @param str
 * @param is_global
 * @returns
 */
function trimStr(str,is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g,"");
	if(is_global.toLowerCase()=="g") {
		result = result.replace(/\s/g,"");
	}
    return result;
}
/**
 * 判断是否session过期，如果过期则给予提示并返回到登录页面
 * @param data ajax请求后返回数据，如果session过期返回的数据为：{"sessionoutdate":"true"}
 */
function isSessionOut(data) {
	//判断是否session过期，如果过期则给予提示并返回到登录页面
	if(data=="{\"sessionoutdate\":\"true\"}") {
//		alert("登录超时，请重新登录。");
		location = '../login.html';
	}
}
/**
 * 计算工资个人所得税计算公式
 * **********************************************************
 * 全月应纳税所得额						税率			速算扣除数（元）*
 * 全月应纳税所得额不超过3000元			3%			0			*
 * 全月应纳税所得额超过3000元至12000元		10%			210			*
 * 全月应纳税所得额超过12000元25000元		20%			1410		*
 * 全月应纳税所得额超过25000元至35000元	25%			2660		*
 * 全月应纳税所得额超过35000元至55000元	30%			4410		*
 * 全月应纳税所得额超过55000元至80000元	35%			7160		*
 * 全月应纳税所得额超过80000元			45%			15160		*
 * **********************************************************
 * @param shouldIncometax 全月应纳税所得额
 * @returns {Array} arr[0] 全月应纳税所得额 arr[1] 税率 arr[2] 速算扣除数（元）arr[3]小数税率
 */
function salaryTaxCount(shouldIncometax) {
	var arr = ["", "", "",""];
	if(shouldIncometax > 0) {
		if(shouldIncometax <3000) {
			arr[1] = "3.00%";
			arr[2] = "0.00";
			arr[3] = "0.03";
		} else if(shouldIncometax <12000) {
			arr[1] = "10.00%";
			arr[2] = "210";
			arr[3] = "0.1";
		} else if(shouldIncometax <25000) {
			arr[1] = "20.00%";
			arr[2] = "1410";
			arr[3] = "0.2";
		} else if(shouldIncometax <35000) {
			arr[1] = "25.00%";
			arr[2] = "2660";
			arr[3] = "0.25";
		} else if(shouldIncometax <55000) {
			arr[1] = "30.00%";
			arr[2] = "4410";
			arr[3] = "0.3";
		} else if(shouldIncometax <80000) {
			arr[1] = "35.00%";
			arr[2] = "7160";
			arr[3] = "0.35";
		} else {
			arr[1] = "45.00%";
			arr[2] = "15160";
			arr[3] = "0.45";
		}
		arr[0] = shouldIncometax.toFixed(2);
	} else {
		arr[0] = "0";
		arr[1] = "0.00";
		arr[2] = "0.00";
		arr[3] = "0.00";
	}
	return arr;
}