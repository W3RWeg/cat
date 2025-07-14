# 猫咪销售管理系统 (Cat Sales Management System)

一个专业的猫舍销售管理系统，帮助猫舍管理客户、知识库、团队和售后服务，提供完整的销售流程和财务管理支持。

![猫咪销售管理系统](https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg)

## 🌟 功能特点

### 🔐 多角色权限管理
- **管理员**：完整的系统访问权限，用户管理，系统设置，收支明细管理
- **销售员**：客户管理、知识库访问、公告查看、销售业绩查看
- **售后专员**：售后服务管理、客户回访、健康咨询、公告查看

### 👥 客户管理
- 详细的客户信息记录（联系方式、地址、职业等）
- 支持零售客户和分期客户两种类型
- 客户标签分类管理
- 客户文件上传和管理（图片、视频、聊天记录）
- 分期客户还款状态跟踪和逾期提醒
- 完整的客户详情查看和编辑功能

### 📊 数据分析仪表盘
- 实时客户统计和营收数据
- 销售趋势图表（最近6个月）
- 客户城市分布圆饼图
- 品种销售分布分析
- 付款方式统计
- 逾期付款提醒（管理员专用）

### 📚 知识库
- 分类管理的问答系统
- 支持图片和标签
- 浏览量统计
- 权限控制（用户只能编辑自己创建的内容，管理员可编辑所有内容）
- 智能搜索和分类筛选

### 🛠️ 售后服务
- 电话回访记录
- 健康咨询管理
- 上门服务安排
- 投诉处理
- 客户反馈管理
- 服务模板和检查清单
- 客户满意度评分

### 📢 公告管理
- 系统公告发布
- 按角色可见性设置（所有人、仅销售员、仅售后专员）
- 公告优先级管理（普通、重要、紧急）
- 公告横幅展示和轮播

### 💰 收支明细
- 月度收支记录管理
- 销售收入和其他收入统计
- 支出项目和报销管理
- 数据导出功能
- 净收入计算
- 可视化财务报表

### 📋 分期打款记录
- 分期客户合同管理
- 还款进度跟踪
- 逾期状态监控
- 签约方式记录
- e签宝合同状态

### ⚙️ 系统设置
- 登录验证码管理
- 安全策略配置
- 用户权限管理
- 团队管理
- 营业时间设置

## 🚀 技术栈

- **前端框架**：React 18 + TypeScript
- **样式框架**：Tailwind CSS
- **状态管理**：React Context API
- **图标库**：Lucide React
- **图表库**：Recharts
- **数据存储**：本地存储 (LocalStorage) + 模拟数据
- **构建工具**：Vite
- **代码规范**：ESLint + TypeScript

## 📋 快速开始

### 前提条件

- Node.js 18+ 和 npm
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/yourusername/cat-sales-management.git
cd cat-sales-management
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**

打开浏览器访问 `http://localhost:5173`

### 🔑 测试账户

系统默认创建以下测试账户（密码均为 `password123`）：

- **管理员**：admin / password123
- **销售员**：sales1 / password123 (需要验证码)
- **售后专员**：aftersales1 / password123 (需要验证码)

> 注意：非管理员用户登录需要验证码，可由管理员在系统设置中生成。

## 📁 项目结构

```
cat-sales-management/
├── public/                  # 静态资源
├── src/                     # 源代码
│   ├── components/          # React 组件
│   │   ├── AfterSales/      # 售后服务组件
│   │   ├── Announcements/   # 公告管理组件
│   │   ├── Auth/            # 认证相关组件
│   │   ├── Common/          # 通用组件
│   │   ├── Customers/       # 客户管理组件
│   │   ├── Dashboard/       # 仪表盘组件
│   │   ├── Financial/       # 收支明细组件
│   │   ├── InstallmentRecords/ # 分期记录组件
│   │   ├── Knowledge/       # 知识库组件
│   │   ├── Layout/          # 布局组件
│   │   ├── SalesPerformance/# 销售业绩组件
│   │   └── Settings/        # 系统设置组件
│   ├── context/             # React Context
│   ├── hooks/               # 自定义 Hooks
│   ├── lib/                 # 工具库
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   ├── data/                # 模拟数据
│   ├── App.tsx              # 应用入口组件
│   └── main.tsx             # 应用入口文件
├── .env                     # 环境变量
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 🗄️ 数据架构

系统使用本地存储和模拟数据，包含以下主要数据结构：

### 核心数据类型
- **User** - 系统用户和权限管理
- **Customer** - 客户信息（支持零售和分期两种类型）
- **Order** - 订单管理
- **Product** - 产品信息
- **KnowledgeBase** - 知识库问答
- **AfterSalesRecord** - 售后服务记录
- **Announcement** - 系统公告

### 业务数据类型
- **InstallmentPayment** - 分期还款记录
- **CustomerFile** - 客户文件
- **SalesPerformance** - 销售业绩
- **AttendanceRecord** - 考勤记录

## 👥 用户角色和权限

### 🔧 管理员 (Admin)
- 完全的系统访问权限
- 用户管理和权限分配
- 团队创建和管理
- 系统设置和配置
- 数据分析和报表
- 知识库完全管理权限
- 公告发布和管理
- 收支明细管理
- 逾期付款提醒查看

### 💼 销售员 (Sales)
- 客户管理（增删改查）
- 知识库访问（只能编辑自己创建的内容）
- 公告查看（根据可见性设置）
- 销售业绩查看
- 分期记录管理

### 🎧 售后专员 (After Sales)
- 售后服务记录管理
- 电话回访和健康咨询
- 上门服务安排
- 客户反馈处理
- 知识库访问（只能编辑自己创建的内容）
- 公告查看（根据可见性设置）

## 🔒 安全特性

### 登录验证码系统
- 管理员可生成24小时有效的登录验证码
- 非管理员用户登录需要验证码（可配置）
- 验证码自动过期机制

### 权限控制
- 基于角色的访问控制 (RBAC)
- 前端权限验证
- 操作级别的权限检查

### 数据安全
- 本地数据存储
- 用户数据隔离
- 安全的密码验证

## 📊 主要功能模块

### 仪表盘
- 客户数量统计
- 营收数据展示
- 销售趋势图表
- 客户城市分布圆饼图
- 品种销售分布
- 付款方式分析
- 逾期付款提醒（管理员专用）

### 客户管理
- 客户信息录入和编辑
- 零售客户和分期客户分类管理
- 客户文件上传（图片、视频、文档）
- 分期还款状态跟踪
- 客户标签和备注管理
- 客户详情查看

### 知识库
- 问答内容管理
- 分类和标签系统
- 图片支持
- 浏览量统计
- 权限控制编辑

### 售后服务
- 服务记录创建和管理
- 多种服务类型支持
- 优先级和状态管理
- 客户满意度评分
- 后续跟进提醒

### 公告管理
- 公告发布和编辑
- 角色可见性控制
- 优先级设置
- 横幅展示和轮播

### 收支明细
- 月度收支记录
- 销售收入统计
- 支出项目管理
- 报销状态跟踪
- 数据导出功能

### 分期打款记录
- 分期客户合同管理
- 还款进度可视化
- 逾期状态监控
- 签约信息记录

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 部署到静态托管服务

构建完成后，将 `dist` 目录部署到任何静态托管服务：

- **Netlify**: 连接 GitHub 仓库，设置构建命令为 `npm run build`，发布目录为 `dist`
- **Vercel**: 导入项目，自动检测 Vite 配置
- **GitHub Pages**: 使用 GitHub Actions 自动部署
- **其他静态托管**: 上传 `dist` 目录内容

## 🛠️ 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

### 添加新功能

1. 在 `src/types/index.ts` 中定义相关类型
2. 在 `src/hooks/useLocalStorage.ts` 中添加数据操作方法
3. 创建相应的 React 组件
4. 更新路由和权限控制

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Tailwind CSS 进行样式开发
- 组件采用函数式组件 + Hooks
- 保持组件单一职责原则

## 🤝 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有任何问题或建议，请联系：
- 邮箱：admin@catstore.com
- GitHub Issues：[提交问题](https://github.com/yourusername/cat-sales-management/issues)

## 🔄 更新日志

### v1.0.0 (2024-07-01)
- ✨ 完整的客户管理系统
- 📊 数据分析仪表盘
- 🛠️ 售后服务管理
- 📚 知识库系统
- 📢 公告管理
- 💰 收支明细管理
- 📋 分期打款记录
- 🔐 多角色权限控制

---

⭐ 如果这个项目对您有帮助，请给它一个星标！