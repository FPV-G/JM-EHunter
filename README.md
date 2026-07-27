# JM-EHunter

[ENGLIGSH](README_EN.md) [日本語](README_JP.md)

基于 [EHunter](https://github.com/hanFengSan/eHunter) 的增强版漫画阅读器，完整支持 E-Hentai 和 18comic（禁漫天堂）。

## 预览

<img src="https://raw.githubusercontent.com/FPV-G/JM-EHunter/master/github_image/LS%20(1).png" width="800" />

<img src="https://raw.githubusercontent.com/FPV-G/JM-EHunter/master/github_image/LS%20(2).png" width="800" />

## 新增功能

本分支在原版 EHunter 基础上进行了以下增强：

### 18comic（禁漫天堂）支持
- 完整兼容 18comic 画廊页面
- 自动检测平台并适配主题
- 18comic 使用橙色主题，E-Hentai 站点使用绿色主题

### 动画速率控制
- 可调节翻页动画速度（0.5x 至 2.0x）
- 所有动画模式使用统一的基准时长（0.70秒）
- 可从顶栏实时调整速度

### 动画反向开关
- 同时反转鼠标滚轮和键盘方向键的翻页动画方向
- 位于顶栏动画速度旁边
- 允许用户根据个人习惯自定义动画行为

### 改进的动画行为
- 动画覆盖：连续翻页不再等待前一个动画完成
- 四种动画模式：水平滑动、拟真翻书（3D）、旋转翻页（2D）、垂直滑动
- 键盘和鼠标滚轮控制的物理方向逻辑保持一致

### 界面改进
- 所有界面元素的品牌更新为 "JM-EHUNTER"
- 平台特定的配色主题（18comic 橙色，E-Hentai 绿色）
- 增强的顶栏，可快速访问动画控制

## 继承自原版 EHunter 的功能

- 多种阅读模式（卷轴式和书本式）
- 缩略图视图和快速导航
- 可自定义页面布局（单页/双页）
- 支持 RTL/LTR 阅读方向
- 键盘快捷键和鼠标滚轮导航
- 下载功能
- 多语言支持（中文、英文、日文）

## 安装

这是一个用于 Tampermonkey 或类似浏览器扩展的用户脚本。

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/)
2. 构建项目（见开发部分）
3. 打开 Tampermonkey 管理面板
4. 点击"实用工具"标签，将在[Release](https://github.com/FPV-G/JM-EHunter/releases)下载的 `jmehunter.iife.js` 拖入Tampermonkey窗口
5. 点击"安装"

脚本将自动在 E-Hentai 和 18comic 画廊页面上激活。

## 开发

### 环境要求
- Node.js 14 或更高版本
- npm 或 yarn

### 设置

```bash
npm install
```

### 开发构建

```bash
npm run dev
```

### 生产构建

```bash
npm run build-prod
```

输出文件位于 `dist/jmehunter.iife.js`。

## 使用说明

### 动画速度
在书本模式下，使用顶栏的"动画速度"下拉菜单调整翻页速度：
- 0.5x（慢）
- 0.75x
- 1.0x（默认）
- 1.25x
- 1.5x
- 2.0x（快）

### 动画反向
打开顶栏的"动画反向"开关，可以反转键盘方向键和鼠标滚轮滚动的动画方向。

### 键盘快捷键
- 右方向键：触发从右到左的动画
- 左方向键：触发从左到右的动画
- 上/下方向键：在卷轴模式下翻页
- 其他快捷键：参见设置对话框

## 项目架构

当前项目基于 `Vite + Vue 3 + TypeScript`，核心目标是：
1. 在目标站点页面内注入阅读器 UI
2. 将平台解析逻辑与阅读器渲染逻辑分层，便于扩展和维护

主要目录职责如下：

```
|-JM-EHunter
  |-src
  |  |-main.ts               // 入口：初始化并挂载应用
  |  |-config.ts             // 运行时配置
  |  |-platform/             // 平台层（站点识别、初始化、平台服务工厂）
  |     |-detector.ts        // 域名/环境识别
  |     |-initializer.ts     // 平台初始化流程
  |     |-factory.ts         // 平台服务实例创建
  |     |-eh/                // EH/EXH 平台实现
  |     |-c18/               // 18comic 平台实现
  |     |-base/              // 跨平台基础能力（请求、队列、重试等）
  |
  |-core
  |  |-App.vue               // 阅读器根组件
  |  |-components/           // 视图层：书页模式、卷轴模式、缩略图、工具栏、弹窗等
  |  |-service/              // 业务服务层（相册数据、下载、重试策略）
  |  |-store/                // 状态管理（应用状态、事件、i18n、布局偏好）
  |  |-model/                // 领域模型（布局、跨页、缩略图展开等）
  |  |-utils/                // 工具函数
  |  |-style/                // 全局样式与主题变量
  |
  |-public/                  // 静态资源
  |-dist/                    // 构建产物
  |-specs/                   // 功能设计与方案文档
  |-misc/                    // 说明文档与辅助资料
```

简化调用链路：
`main.ts -> platform 初始化（识别站点 + 创建平台服务）-> core 阅读器挂载 -> 组件渲染与交互 -> service/store 协同完成数据加载与状态更新`

## 技术栈

- Vue 3
- TypeScript
- Vite
- SCSS

## 许可证

MIT License

## 致谢

本项目基于 [EHunter](https://github.com/hanFengSan/eHunter) 开发，由 hanFengSan 创建。特别感谢原作者创造了如此优秀的漫画阅读器。

## 相关链接

- [原版 EHunter](https://github.com/hanFengSan/eHunter)
- [问题反馈](https://github.com/FPV-G/JM-EHunter/issues)

---

**免责声明**：本工具仅供教育和个人使用。请遵守当地法律法规。
