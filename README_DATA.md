# 猫咪销售管理系统 - 数据结构说明文档

本文档详细说明了猫咪销售管理系统中使用的所有数据字段、数据关系和业务逻辑，为系统维护和功能扩展提供完整的数据架构参考。

## 📋 目录

- [系统概览](#系统概览)
- [核心数据类型](#核心数据类型)
- [业务数据类型](#业务数据类型)
- [数据存储方案](#数据存储方案)
- [业务逻辑说明](#业务逻辑说明)
- [权限控制机制](#权限控制机制)
- [数据验证规则](#数据验证规则)
- [性能优化建议](#性能优化建议)

## 系统概览

猫咪销售管理系统是一个基于React + TypeScript的前端应用，使用本地存储(LocalStorage)进行数据持久化。系统支持多角色权限管理，包含完整的客户管理、售后服务、知识库和财务管理功能。

### 技术架构
- **前端框架**: React 18 + TypeScript
- **状态管理**: React Context API
- **数据存储**: LocalStorage + 模拟数据
- **UI框架**: Tailwind CSS
- **图表库**: Recharts
- **图标库**: Lucide React

## 核心数据类型

### 1. User - 用户管理

用户认证和权限管理的核心类型。

```typescript
interface User {
  id: string;                    // 用户唯一标识符
  username: string;              // 登录用户名，唯一
  email: string;                 // 用户邮箱
  role: 'admin' | 'sales' | 'after_sales'; // 用户角色
  name: string;                  // 用户真实姓名
  isActive: boolean;             // 用户状态，true=激活，false=禁用
  createdAt: string;             // 创建时间
  teamId?: string;               // 所属团队ID（可选）
}
```

**角色权限说明：**
- `admin`: 管理员，拥有所有权限
- `sales`: 销售员，可管理客户和查看业绩
- `after_sales`: 售后专员，专注售后服务管理

### 2. Team - 团队管理

销售团队组织结构管理。

```typescript
interface Team {
  id: string;                    // 团队唯一标识符
  name: string;                  // 团队名称
  description?: string;          // 团队描述
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
}
```

### 3. Customer - 客户信息

客户信息管理的核心类型，支持零售和分期两种客户类型。

```typescript
interface Customer {
  // 基础信息
  id: string;                    // 客户唯一标识符
  name: string;                  // 客户姓名
  gender: 'male' | 'female';     // 性别
  phone: string;                 // 电话号码
  wechat: string;                // 微信号
  address: string;               // 地址
  occupation: string;            // 职业
  tags: string[];                // 客户标签数组
  notes: string;                 // 备注信息
  createdAt: string;             // 创建时间
  assignedSales: string;         // 分配的销售员
  
  // 客户类型
  customerType?: 'retail' | 'installment'; // 客户类型
  
  // 零售客户特有字段
  orderDate?: string;            // 订单日期
  salesPerson?: string;          // 销售员
  catName?: string;              // 猫咪姓名
  catBirthday?: string;          // 猫咪生日
  isMallMember?: boolean;        // 是否商城会员
  catBreed?: string;             // 猫咪品种
  catGender?: 'male' | 'female'; // 猫咪性别
  supplyChain?: string;          // 供应链
  supplyChainDeposit?: number;   // 供应链定金
  totalAmount?: number;          // 全款额度
  paymentMethod?: 'full_payment' | 'shipping_balance' | 'cash_on_delivery'; // 付款方式
  customerDeposit?: number;      // 客户定金
  depositDestination?: string;   // 定金去向
  shippingDate?: string;         // 发货时间
  shippingVideoUrl?: string;     // 发货视频URL
  balance?: number;              // 尾款
  balancePaid?: boolean;         // 尾款是否补齐
  balanceConfirmMethod?: string; // 尾款确认方式
  sellingPrice?: number;         // 卖价
  cost?: number;                 // 成本
  shippingFee?: number;          // 运费
  profit?: number;               // 利润
  profitRate?: number;           // 利润率
  
  // 分期客户特有字段
  contractName?: string;         // 签约姓名
  relationship?: string;         // 关系
  isInGroup?: boolean;           // 是否拉群
  repaymentDate?: string;        // 还款时间
  installmentPeriod?: string;    // 分期时间范围
  catCost?: number;              // 猫咪成本
  collectionAmount?: number;     // 收款额度
  fundsDestination?: string;     // 款项去向
  installmentAmount?: number;    // 分期金额
  installmentCount?: number;     // 分期数
  signingMethod?: string;        // 签约方式
  isFirstPaymentManual?: boolean; // 第一期是否手动转
  hasESignContract?: boolean;    // e签宝合同
  contractTotalPrice?: number;   // 合约总价
  mallGrossProfit?: number;      // 商城毛利
  grossProfit?: number;          // 毛利润
  monthlyProfit?: number;        // 月毛利
  breakEvenPeriod?: number;      // 回本期
  
  // 关联数据
  installmentPayments?: InstallmentPayment[]; // 分期还款记录
  files: CustomerFile[];         // 客户文件
  orders: Order[];               // 订单记录
}
```

### 4. CustomerFile - 客户文件

存储客户相关的文件信息。

```typescript
interface CustomerFile {
  id: string;                    // 文件唯一标识符
  name: string;                  // 文件名称
  type: 'image' | 'video' | 'document'; // 文件类型
  url: string;                   // 文件存储URL
  description?: string;          // 文件描述
  uploadedAt: string;            // 上传时间
}
```

### 5. Product - 产品信息

猫咪产品信息管理。

```typescript
interface Product {
  id: string;                    // 产品唯一标识符
  name: string;                  // 产品名称
  breed: string;                 // 猫咪品种
  age: string;                   // 年龄
  gender: 'male' | 'female';     // 性别
  price: number;                 // 价格
  description: string;           // 产品描述
  images: string[];              // 图片URL数组
  videos: string[];              // 视频URL数组
  quarantineVideos: QuarantineVideo[]; // 检疫视频
  isAvailable: boolean;          // 是否可售
  features: string[];            // 特色功能数组
}

interface QuarantineVideo {
  id: string;                    // 视频唯一标识符
  url: string;                   // 视频URL
  title: string;                 // 视频标题
  description: string;           // 视频描述
  recordedDate: string;          // 录制日期
  duration?: number;             // 视频时长（秒）
  fileSize?: number;             // 文件大小（字节）
  veterinarian?: string;         // 检疫兽医
  quarantineStatus: 'healthy' | 'under_observation' | 'treated' | 'cleared'; // 检疫状态
  uploadedAt: string;            // 上传时间
}
```

## 业务数据类型

### 6. Order - 订单管理

订单信息和状态管理。

```typescript
interface Order {
  id: string;                    // 订单唯一标识符
  customerId: string;            // 关联客户ID
  orderNumber: string;           // 订单编号，唯一
  amount: number;                // 订单金额
  paymentMethod: 'full' | 'installment'; // 付款方式
  status: 'pending_payment' | 'paid' | 'pending_shipment' | 'shipped' | 'completed' | 'cancelled'; // 订单状态
  orderDate: string;             // 订单日期
  salesPerson: string;           // 销售员
  installmentPlan?: InstallmentPlan; // 分期付款计划（可选）
  products: OrderProduct[];      // 订单产品列表
}

interface OrderProduct {
  id: string;                    // 产品ID
  name: string;                  // 产品名称
  breed: string;                 // 品种
  price: number;                 // 价格
  quantity: number;              // 数量
  image: string;                 // 产品图片
}

interface InstallmentPlan {
  totalInstallments: number;     // 总分期数
  installmentAmount: number;     // 分期金额
  paidInstallments: number;      // 已付分期数
  nextPaymentDate: string;       // 下次付款日期
  payments: Payment[];           // 付款记录
}

interface Payment {
  id: string;                    // 付款记录ID
  installmentNumber: number;     // 分期期数
  amount: number;                // 付款金额
  dueDate: string;               // 到期日期
  paidDate?: string;             // 实际付款日期
  status: 'pending' | 'paid' | 'overdue'; // 付款状态
}
```

### 7. InstallmentPayment - 分期还款记录

分期客户的还款状态跟踪。

```typescript
interface InstallmentPayment {
  id: string;                    // 还款记录ID
  installmentNumber: number;     // 分期期数
  amount: number;                // 还款金额
  dueDate: string;               // 到期日期
  paidDate?: string;             // 实际还款日期
  status: 'pending' | 'paid' | 'overdue'; // 还款状态
  isPaid: boolean;               // 是否已付款
  isOverdue: boolean;            // 是否逾期
  overdueCount?: number;         // 逾期次数
  notes?: string;                // 备注信息
}

interface PaymentStatus {
  status: 'normal' | 'reminder' | 'overdue'; // 还款状态
  overdueCount?: number;         // 逾期次数
  nextDueDate?: string;          // 下次到期日期
  message: string;               // 状态描述
}
```

### 8. KnowledgeBase - 知识库

知识库问答管理系统。

```typescript
interface KnowledgeBase {
  id: string;                    // 知识库条目ID
  question: string;              // 问题标题
  answer: string;                // 答案内容
  category: string;              // 分类
  tags: string[];                // 标签数组
  images?: string[];             // 相关图片URL数组
  viewCount: number;             // 浏览次数
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
  createdBy?: string;            // 创建者用户ID
}
```

### 9. AfterSalesRecord - 售后服务记录

售后服务管理和跟踪。

```typescript
interface AfterSalesRecord {
  id: string;                    // 服务记录ID
  orderId: string;               // 关联订单ID
  customerId: string;            // 关联客户ID
  type: 'phone_visit' | 'health_consultation' | 'home_service' | 'complaint' | 'feedback' | 'maintenance'; // 服务类型
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'; // 服务状态
  priority: 'low' | 'medium' | 'high' | 'urgent'; // 优先级
  title: string;                 // 服务标题
  description: string;           // 问题描述
  solution?: string;             // 解决方案
  assignedTo: string;            // 负责人
  createdBy: string;             // 创建者
  scheduledDate?: string;        // 预约时间
  completedDate?: string;        // 完成时间
  customerSatisfaction?: number; // 客户满意度（1-5星）
  followUpRequired: boolean;     // 是否需要后续跟进
  followUpDate?: string;         // 跟进日期
  attachments: string[];         // 附件URL数组
  tags: string[];                // 标签
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
}

interface ServiceTemplate {
  id: string;                    // 模板ID
  name: string;                  // 模板名称
  type: AfterSalesRecord['type']; // 服务类型
  description: string;           // 模板描述
  defaultPriority: AfterSalesRecord['priority']; // 默认优先级
  estimatedDuration: number;     // 预计处理时间（分钟）
  checklist: string[];           // 检查清单
  isActive: boolean;             // 是否启用
}
```

### 10. Announcement - 公告管理

系统公告发布和管理。

```typescript
interface Announcement {
  id: string;                    // 公告ID
  title: string;                 // 公告标题
  content: string;               // 公告内容
  visible_to: 'sales' | 'after_sales' | 'all'; // 可见对象
  priority: 'normal' | 'important' | 'urgent'; // 优先级
  created_by: string;            // 创建者ID
  created_at: string;            // 创建时间
  updated_at: string;            // 更新时间
}
```

### 11. SalesPerformance - 销售业绩

销售业绩统计和排名。

```typescript
interface SalesPerformance {
  date: string;                  // 统计日期
  salesId: string;               // 销售员ID
  salesName: string;             // 销售员姓名
  teamId?: string;               // 团队ID
  teamName?: string;             // 团队名称
  traffic: number;               // 客流量
  orders: number;                // 订单数
  revenue: number;               // 营收金额
}
```

### 12. AttendanceRecord - 考勤记录

员工考勤管理。

```typescript
interface AttendanceRecord {
  id: string;                    // 考勤记录ID
  userId: string;                // 用户ID
  date: string;                  // 考勤日期
  checkInTime?: string;          // 签到时间
  checkOutTime?: string;         // 签退时间
  status: 'present' | 'absent' | 'late' | 'early_leave'; // 考勤状态
  notes?: string;                // 备注
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
}

interface BusinessHours {
  workStartTime: string;         // 上班时间，格式: "09:00"
  workEndTime: string;           // 下班时间，格式: "18:00"
  lateThreshold: number;         // 迟到容忍时间（分钟）
  earlyLeaveThreshold: number;   // 早退容忍时间（分钟）
  workDays: number[];            // 工作日，0=周日，1=周一...6=周六
}
```

## 数据存储方案

### LocalStorage 存储结构

系统使用LocalStorage进行数据持久化，存储键名规范：

```typescript
const STORAGE_KEYS = {
  CUSTOMERS: 'cat_system_customers',        // 客户数据
  ORDERS: 'cat_system_orders',              // 订单数据
  PRODUCTS: 'cat_system_products',          // 产品数据
  KNOWLEDGE: 'cat_system_knowledge',        // 知识库数据
  ATTENDANCE: 'cat_system_attendance',      // 考勤数据
  USERS: 'cat_system_users',                // 用户数据
  ANNOUNCEMENTS: 'cat_system_announcements', // 公告数据
  AFTER_SALES: 'cat_system_after_sales',    // 售后记录
  SETTINGS: 'cat_system_settings'           // 系统设置
};
```

### 数据管理工具类

```typescript
class LocalStorageManager {
  // 通用存储方法
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T | null;
  removeItem(key: string): void;
  clear(): void;
  generateId(): string;
}
```

## 业务逻辑说明

### 1. 用户权限控制

**角色权限矩阵：**

| 功能模块 | 管理员 | 销售员 | 售后专员 |
|---------|--------|--------|----------|
| 用户管理 | ✅ | ❌ | ❌ |
| 客户管理 | ✅ | ✅ | ✅ (只读) |
| 订单管理 | ✅ | ✅ | ❌ |
| 产品管理 | ✅ | ❌ | ❌ |
| 知识库 | ✅ (全部) | ✅ (自己的) | ✅ (自己的) |
| 公告管理 | ✅ | ❌ | ❌ |
| 售后服务 | ✅ | ❌ | ✅ |
| 收支明细 | ✅ | ❌ | ❌ |
| 系统设置 | ✅ | ❌ | ❌ |
| 销售业绩 | ✅ | ✅ (查看) | ❌ |

### 2. 客户类型业务逻辑

**零售客户特点：**
- 一次性付款或发货补尾款
- 重点关注猫咪信息和交付流程
- 财务计算：利润 = 卖价 - 成本 - 运费
- 利润率 = (利润 / 卖价) × 100%

**分期客户特点：**
- 分期付款管理和跟踪
- 逾期提醒和催款机制
- 合同管理和签约状态
- 财务计算：月毛利、回本期等复杂计算

### 3. 逾期提醒逻辑

```typescript
// 逾期状态计算逻辑
const calculatePaymentStatus = (customer: Customer): PaymentStatus => {
  if (customer.customerType !== 'installment' || !customer.installmentPayments) {
    return { status: 'normal', message: '正常' };
  }

  const today = new Date();
  
  // 检查逾期付款
  const overduePayments = customer.installmentPayments.filter(payment => {
    if (payment.isPaid) return false;
    const dueDate = new Date(payment.dueDate);
    return dueDate < today;
  });

  if (overduePayments.length > 0) {
    return {
      status: 'overdue',
      overdueCount: overduePayments.length,
      message: `逾期 ${overduePayments.length} 期`
    };
  }

  // 检查3天内到期的付款
  const upcomingPayments = customer.installmentPayments.filter(payment => {
    if (payment.isPaid) return false;
    const dueDate = new Date(payment.dueDate);
    const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    return dueDate >= today && dueDate <= threeDaysLater;
  });

  if (upcomingPayments.length > 0) {
    return {
      status: 'reminder',
      nextDueDate: upcomingPayments[0].dueDate,
      message: '待催款'
    };
  }

  return { status: 'normal', message: '还款正常' };
};
```

### 4. 知识库权限逻辑

- 所有用户可以查看知识库
- 用户只能编辑自己创建的条目（通过 `createdBy` 字段控制）
- 管理员可以编辑所有条目
- 浏览量自动统计和更新

### 5. 公告可见性逻辑

```typescript
// 公告可见性过滤逻辑
const filterAnnouncementsByRole = (announcements: Announcement[], userRole: string) => {
  return announcements.filter(announcement => 
    announcement.visible_to === 'all' || 
    announcement.visible_to === userRole ||
    userRole === 'admin'
  );
};
```

## 权限控制机制

### 1. 登录验证码系统

```typescript
interface SystemSettings {
  requireVerificationCode: boolean;    // 是否需要验证码
  currentVerificationCode: string;     // 当前验证码
  codeGeneratedAt: Date | null;        // 验证码生成时间
  codeValidUntil: Date | null;         // 验证码有效期
}

// 验证码验证逻辑
const isVerificationCodeValid = (code: string, settings: SystemSettings): boolean => {
  if (!settings.currentVerificationCode || !settings.codeValidUntil) {
    return false;
  }
  
  const now = new Date();
  return code === settings.currentVerificationCode && now <= settings.codeValidUntil;
};
```

### 2. 组件级权限控制

```typescript
// 权限检查Hook
const usePermission = (requiredRole: string[]) => {
  const { user } = useAuth();
  return user && requiredRole.includes(user.role);
};

// 使用示例
const SettingsView = () => {
  const hasPermission = usePermission(['admin']);
  
  if (!hasPermission) {
    return <AccessDenied />;
  }
  
  return <SettingsContent />;
};
```

## 数据验证规则

### 1. 客户数据验证

```typescript
const customerValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  phone: {
    required: true,
    pattern: /^1[3-9]\d{9}$/  // 中国手机号格式
  },
  email: {
    format: 'email'
  },
  customerType: {
    enum: ['retail', 'installment']
  }
};
```

### 2. 分期付款验证

```typescript
const installmentValidation = {
  installmentAmount: {
    required: true,
    min: 0,
    type: 'number'
  },
  installmentCount: {
    required: true,
    min: 1,
    max: 36,
    type: 'integer'
  },
  dueDate: {
    required: true,
    format: 'date',
    futureDate: true
  }
};
```

### 3. 知识库验证

```typescript
const knowledgeValidation = {
  question: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  answer: {
    required: true,
    minLength: 10
  },
  category: {
    required: true,
    enum: ['选购指南', '健康护理', '饲养技巧', '品种介绍', '常见问题', '售后服务']
  }
};
```

## 性能优化建议

### 1. 数据缓存策略

```typescript
// 内存缓存管理
class DataCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttl: number = 300000) { // 默认5分钟
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  
  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
}
```

### 2. 数据分页和虚拟滚动

```typescript
// 分页配置
const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  VIRTUAL_SCROLL_THRESHOLD: 1000  // 超过1000条记录启用虚拟滚动
};

// 数据分页Hook
const usePagination = <T>(data: T[], pageSize: number = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);
  
  return {
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};
```

### 3. 搜索和过滤优化

```typescript
// 防抖搜索Hook
const useDebounceSearch = (searchTerm: string, delay: number = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [searchTerm, delay]);
  
  return debouncedTerm;
};

// 多字段搜索
const searchCustomers = (customers: Customer[], searchTerm: string) => {
  if (!searchTerm) return customers;
  
  const term = searchTerm.toLowerCase();
  return customers.filter(customer => 
    customer.name.toLowerCase().includes(term) ||
    customer.phone.includes(term) ||
    customer.wechat?.toLowerCase().includes(term) ||
    customer.address?.toLowerCase().includes(term) ||
    customer.tags.some(tag => tag.toLowerCase().includes(term))
  );
};
```

### 4. LocalStorage 优化

```typescript
// 数据压缩存储
const compressData = (data: any): string => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Data compression failed:', error);
    return '';
  }
};

// 批量操作优化
const batchUpdateCustomers = (updates: Array<{ id: string; data: Partial<Customer> }>) => {
  const customers = storage.getItem<Customer[]>(STORAGE_KEYS.CUSTOMERS) || [];
  
  const updatedCustomers = customers.map(customer => {
    const update = updates.find(u => u.id === customer.id);
    return update ? { ...customer, ...update.data } : customer;
  });
  
  storage.setItem(STORAGE_KEYS.CUSTOMERS, updatedCustomers);
};
```

## 数据迁移和版本控制

### 1. 数据版本管理

```typescript
interface DataVersion {
  version: string;
  migratedAt: string;
  changes: string[];
}

const DATA_VERSION = '1.0.0';

// 数据迁移检查
const checkDataMigration = () => {
  const currentVersion = storage.getItem<string>('data_version');
  
  if (!currentVersion || currentVersion !== DATA_VERSION) {
    performDataMigration(currentVersion, DATA_VERSION);
    storage.setItem('data_version', DATA_VERSION);
  }
};
```

### 2. 数据备份和恢复

```typescript
// 数据导出
const exportAllData = () => {
  const allData = {
    customers: storage.getItem(STORAGE_KEYS.CUSTOMERS),
    orders: storage.getItem(STORAGE_KEYS.ORDERS),
    products: storage.getItem(STORAGE_KEYS.PRODUCTS),
    knowledge: storage.getItem(STORAGE_KEYS.KNOWLEDGE),
    announcements: storage.getItem(STORAGE_KEYS.ANNOUNCEMENTS),
    exportedAt: new Date().toISOString(),
    version: DATA_VERSION
  };
  
  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `cat_system_backup_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

// 数据导入
const importData = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      
      // 验证数据格式
      if (validateImportData(data)) {
        // 备份当前数据
        const backup = exportAllData();
        
        // 导入新数据
        Object.keys(STORAGE_KEYS).forEach(key => {
          if (data[key.toLowerCase()]) {
            storage.setItem(STORAGE_KEYS[key as keyof typeof STORAGE_KEYS], data[key.toLowerCase()]);
          }
        });
        
        alert('数据导入成功！');
        window.location.reload();
      } else {
        alert('数据格式不正确！');
      }
    } catch (error) {
      alert('数据导入失败：' + error.message);
    }
  };
  reader.readAsText(file);
};
```

---

本文档为猫咪销售管理系统的完整数据结构说明，建议开发人员在进行功能扩展和维护时参照此文档，确保数据一致性和系统稳定性。