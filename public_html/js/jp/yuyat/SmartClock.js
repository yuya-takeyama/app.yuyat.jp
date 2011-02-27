var jp = jp || {};
jp.yuyat = jp.yuyat || {};
jp.yuyat.SmartClock = {};

/**
 * 時刻通知オブジェクト.
 *
 * 監視者に対して時刻の通知を行う.
 */
jp.yuyat.SmartClock.TimeProvider = (function () {
  var _observers = [],
      _date,
      add_observer,
      notify,
      get_time,
      _interval_id,
      _prev_sec;

  /**
   * 監視者オブジェクトの追加.
   *
   * @param  {Object} 時刻の更新通知を受け取るオブジェクト.
   * @return {void}
   */
  add_observer = function (observer) {
    _observers.push(observer);
  };

  /**
   * 監視者に更新通知を行う.
   *
   * @return {void}
   */
  notify = function () {
    for (var i in _observers) {
      _observers[i].update(this);
    }
  };

  /**
   * 現在時刻を取得する.
   *
   * @return {Date}
   */
  get_time = function () {
    return _date;
  };

  /**
   * 最新の時刻を取得し, 監視者への通知を行う.
   *
   * @return {void}
   */
  reload = function () {
    _date = new Date;
    var _cur_sec = _date.getSeconds();
    if (_cur_sec !== _prev_sec) {
      this.notify();
    }
    _prev_sec = _cur_sec;
  };

  /**
   * 時刻の自動更新を開始する.
   *
   * @param  {Number} 更新間隔. (msec)
   * @return {void}
   */
  start = function (interval) {
    var that = this;
    interval = interval || 1000;
    _interval_id = window.setInterval(function () {
      that.reload();
    }, interval);
  };

  /**
   * 時刻の自動更新を停止する.
   *
   * @return {void}
   */
  stop = function () {
    window.clearInterval(_interval_id);
  };

  return {
    add_observer : add_observer,
    notify       : notify,
    get_time     : get_time,
    reload       : reload,
    start        : start,
    stop         : stop
  };
})();
