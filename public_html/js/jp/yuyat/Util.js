var jp = jp || {};
jp.yuyat = jp.yuyat || {};
jp.yuyat.Util = {};

jp.yuyat.Util.Number = (function () {
  var zerofill;

  zerofill = function (num, len) {
    len = len || 4;
    num = num.toString();
    while (num.length < len) {
      num = '0' + num;
    }
    return num;
  };

  return {
    zerofill : zerofill
  };
})();
