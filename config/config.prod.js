/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {};
  exports.mysql = {
    // 单数据库信息配置
  client: {
    // host
    host: '192.168.0.97',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '928864229LPF!',
    // 数据库名
    database: 'eggdb',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  }
  const localIP = ip.address();
  const domainWhiteList = [];
  [7001, 9000, 9001].forEach(port => {
    domainWhiteList.push(`http://localhost:${port}`);
    domainWhiteList.push(`http://127.0.0.1:${port}`);
    domainWhiteList.push(`http://${localIP}:${port}`);
  });

  exports.security = { domainWhiteList };

  return exports;
};
