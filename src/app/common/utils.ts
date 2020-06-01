// 校验数字输入框
export function clearNoNum(obj) {
  obj = obj.toString();
  obj = obj.replace(/[^\d.]/g, ""); // 清除"数字"和"."以外的字符
  obj = obj.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
  obj = obj.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的.
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); // 只允许输入一个小数点
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
  return obj;
}

// 小数点前面最大只能输入N位,默认为10
export function maxNum(val, num: 10) {
  const valueArry = val.split(".");
  let value = valueArry[0];

  valueArry[0] = value.length > num ? value.slice(0, num) : value;
  value = valueArry.join(".");
  return value;
}

// 只能输入整数
export function integerNum(obj) {
  obj = obj.toString();
  obj = obj.replace(/[^\d]/g, ""); // 清除"数字"以外的字符
  obj = obj.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
  return obj;
}

// 人民币小写金额转换为大写
export function digitUppercase(n) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  const head = n < 0 ? "欠" : "";
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[
        Math.floor(
          (Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000)) / 1000
        )
      ] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
}

// 日期格式化
export function zeroFill(s) {
  return s < 10 ? "0" + s : s;
}

export function formatDate(time) {
  time = new Date(time);
  if (time) {
    const y = time.getFullYear().toString();
    const m = (time.getMonth() + 1).toString();
    const d = time.getDate().toString();
    const H = time.getHours().toString();
    const M = time.getMinutes().toString();
    const S = time.getSeconds().toString();

    return (
      y +
      "-" +
      zeroFill(m) +
      "-" +
      zeroFill(d) +
      " " +
      zeroFill(H) +
      ":" +
      zeroFill(M) +
      ":" +
      zeroFill(S)
    );
  } else {
    return time;
  }
}

export function formatDay(time) {
  time = new Date(time);
  if (time) {
    const y = time.getFullYear().toString();
    const m = (time.getMonth() + 1).toString();
    const d = time.getDate().toString();

    return y + "-" + zeroFill(m) + "-" + zeroFill(d);
  } else {
    return time;
  }
}

// 获取Day天后的日期
export function getDay(day) {
  const time = new Date();
  time.setDate(time.getDate() + day);
  const y = time.getFullYear();
  const m = time.getMonth() + 1; // 获取当前月份的日期
  const d = time.getDate();
  return y + "-" + zeroFill(m) + "-" + zeroFill(d);
}

// 获取N个月后的日期
export function month(months: number) {
  const time = new Date();
  time.setDate(time.getDate());
  let y = time.getFullYear();
  let m;
  if (time.getMonth() + months + 1 > 12) {
    y = y + 1;
    m = time.getMonth() + months - 11; // 获取当前月份的日期 d
  } else {
    m = time.getMonth() + months + 1; // 获取当前月份的日期 d
  }
  const d = time.getDate();
  return y + "-" + zeroFill(m) + "-" + zeroFill(d);
}

/**
 * @desc 该方法用于吧时间对数据转化成当天的00:00:00以及23:59:59
 * @param timeArr
 */
export function formatRange(timeArr) {
  if (!timeArr || timeArr.length != 2) {
    return timeArr;
  }
  const startTime = timeArr[0];
  let startTimeFormat;
  const endTime = timeArr[1];
  let endTimeFormat;
  const y = startTime.getFullYear().toString();
  const m = (startTime.getMonth() + 1).toString();
  const d = startTime.getDate().toString();
  startTimeFormat = new Date(`${y}/${m}/${d} 00:00:00`);
  const _y = endTime.getFullYear().toString();
  const _m = (endTime.getMonth() + 1).toString();
  const _d = endTime.getDate().toString();
  endTimeFormat = new Date(`${_y}/${_m}/${_d} 23:59:59`);
  return [startTimeFormat, endTimeFormat];
}
