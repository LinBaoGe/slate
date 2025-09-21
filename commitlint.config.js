// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'auth', // 登录/注册/鉴权
        'menu', // 菜单管理
        'order', // 订单逻辑
        'restaurant', // 餐厅管理
        'cart', // 购物车
        'ui', // 前端组件
        'api', // Next.js API
        'db', // 数据库 & RLS
        'config', // 配置
      ],
    ],
    // 默认要求 scope 必填
    'scope-empty': [2, 'never'],
    // 对于特定 type 放宽 scope 要求
    'type-case': [0], // 不限制大小写
    'subject-case': [0], // 不限制 subject 大小写
  },
  // 自定义规则（允许部分 type 不写 scope）
  ignores: [
    (message) => {
      const allowedNoScopeTypes = [
        'chore',
        'style',
        'test',
        'build',
        'ci',
        'revert',
      ];
      const match = message.match(/^(\w+)(\(.+\))?:/);
      if (!match) return false;
      const type = match[1];
      const hasScope = !!match[2];
      return allowedNoScopeTypes.includes(type) && !hasScope;
    },
  ],
};
