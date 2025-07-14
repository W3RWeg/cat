import React, { useState, useEffect } from 'react';
import { Plus, Edit, Save, X, Calendar, Users, CreditCard, FileCheck, MessageSquare, Clock } from 'lucide-react';
import { useCustomers } from '../../hooks/useDatabase';
import CustomerDetail from '../Customers/CustomerDetail';
import { Customer } from '../../types';

interface InstallmentRecord {
  id: string;
  orderDate: string;
  department: string;
  salesPerson: string;
  contractName: string;
  isOverdue: boolean;
  isInGroup: boolean;
  signingMethod: string;
  notes: string;
  installmentAmount: number;
  installmentCount: number;
  hasESignContract: boolean;
  isFirstPaymentManual: boolean;
  repaymentDate: string;
  monthlyPaymentDate: string; // 新增每月还款日期字段
  contractPeriod: string;
  paymentStatus: boolean[]; // 根据分期数生成的勾选状态
  createdAt: string;
  updatedAt: string;
}

const InstallmentRecordsView: React.FC = () => {
  const [records, setRecords] = useState<InstallmentRecord[]>([]);
  const { customers = [] } = useCustomers();
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<InstallmentRecord>>({
    orderDate: '',
    department: '',
    salesPerson: '',
    contractName: '',
    isOverdue: false,
    isInGroup: false,
    signingMethod: '',
    notes: '',
    installmentAmount: 0,
    installmentCount: 6,
    hasESignContract: false,
    isFirstPaymentManual: false,
    repaymentDate: '',
    monthlyPaymentDate: '',
    contractPeriod: '',
    paymentStatus: new Array(6).fill(false)
  });

  // 模拟初始数据
  useEffect(() => {
    const mockData: InstallmentRecord[] = [
      {
        id: '1',
        orderDate: '2024-01-15',
        department: '销售一部',
        salesPerson: 'Alice Chen',
        contractName: '张小美',
        isOverdue: false,
        isInGroup: true,
        signingMethod: '线上签约',
        notes: '客户信用良好，按时还款',
        installmentAmount: 2000,
        installmentCount: 6,
        hasESignContract: true,
        isFirstPaymentManual: false,
        repaymentDate: '2024-02-15',
        monthlyPaymentDate: '每月15日',
        contractPeriod: '2024年1月-2024年6月',
        paymentStatus: [true, true, false, false, false, false],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        orderDate: '2024-02-01',
        department: '销售二部',
        salesPerson: 'Bob Wang',
        contractName: '李先生',
        isOverdue: true,
        isInGroup: false,
        signingMethod: '线下签约',
        notes: '第三期逾期，需要催款',
        installmentAmount: 1500,
        installmentCount: 12,
        hasESignContract: false,
        isFirstPaymentManual: true,
        repaymentDate: '2024-03-01',
        monthlyPaymentDate: '每月1日',
        contractPeriod: '2024年2月-2025年1月',
        paymentStatus: [true, true, false, false, false, false, false, false, false, false, false, false],
        createdAt: '2024-02-01',
        updatedAt: '2024-02-01'
      }
    ];
    setRecords(mockData);
  }, []);

  const handleAddRecord = () => {
    if (!newRecord.contractName || !newRecord.salesPerson) {
      alert('请填写必填字段');
      return;
    }

    const record: InstallmentRecord = {
      id: Date.now().toString(),
      orderDate: newRecord.orderDate || '',
      department: newRecord.department || '',
      salesPerson: newRecord.salesPerson || '',
      contractName: newRecord.contractName || '',
      isOverdue: newRecord.isOverdue || false,
      isInGroup: newRecord.isInGroup || false,
      signingMethod: newRecord.signingMethod || '',
      notes: newRecord.notes || '',
      installmentAmount: newRecord.installmentAmount || 0,
      installmentCount: newRecord.installmentCount || 6,
      hasESignContract: newRecord.hasESignContract || false,
      isFirstPaymentManual: newRecord.isFirstPaymentManual || false,
      repaymentDate: newRecord.repaymentDate || '',
      monthlyPaymentDate: newRecord.monthlyPaymentDate || '',
      contractPeriod: newRecord.contractPeriod || '',
      paymentStatus: newRecord.paymentStatus || new Array(newRecord.installmentCount || 6).fill(false),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRecords([...records, record]);
    setNewRecord({
      orderDate: '',
      department: '',
      salesPerson: '',
      contractName: '',
      isOverdue: false,
      isInGroup: false,
      signingMethod: '',
      notes: '',
      installmentAmount: 0,
      installmentCount: 6,
      hasESignContract: false,
      isFirstPaymentManual: false,
      repaymentDate: '',
      monthlyPaymentDate: '',
      contractPeriod: '',
      paymentStatus: new Array(6).fill(false)
    });
    setShowAddModal(false);
  };

  const handleEditRecord = (recordId: string) => {
    setEditingRecord(recordId);
  };

  const handleSaveRecord = (recordId: string) => {
    setEditingRecord(null);
    // 这里可以添加保存到数据库的逻辑
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  const handleFieldChange = (recordId: string, field: keyof InstallmentRecord, value: any) => {
    setRecords(records.map(record => {
      if (record.id === recordId) {
        const updatedRecord = { ...record, [field]: value };
        
        // 如果修改了分期数，重新生成勾选框状态
        if (field === 'installmentCount') {
          updatedRecord.paymentStatus = new Array(value).fill(false);
        }
        
        return updatedRecord;
      }
      return record;
    }));
  };

  const handlePaymentStatusChange = (recordId: string, index: number, checked: boolean) => {
    setRecords(records.map(record => {
      if (record.id === recordId) {
        const newPaymentStatus = [...record.paymentStatus];
        newPaymentStatus[index] = checked;
        return { ...record, paymentStatus: newPaymentStatus };
      }
      return record;
    }));
  };

  const handleInstallmentCountChange = (count: number) => {
    setNewRecord({
      ...newRecord,
      installmentCount: count,
      monthlyPaymentDate: '',
      paymentStatus: new Array(count).fill(false)
    });
  };

  // 处理签约姓名点击事件
  const handleContractNameClick = (contractName: string) => {
    // 根据签约姓名查找对应的客户
    const customer = customers.find(c => 
      c.name === contractName || 
      c.contractName === contractName
    );
    
    if (customer) {
      setSelectedCustomer(customer);
      setShowCustomerDetail(true);
    } else {
      // 如果找不到客户，提示用户
      alert(`未找到签约姓名为"${contractName}"的客户信息`);
    }
  };

  // 添加文件到客户的函数（CustomerDetail组件需要）
  const handleAddCustomerFile = async (customerId: string, fileData: any) => {
    // 这里可以添加文件上传逻辑
    console.log('添加客户文件:', customerId, fileData);
  };

  return (
    <div className="space-y-6">
      {/* 头部操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">分期客户打款记录</h2>
          <p className="text-gray-600 mt-1">管理分期客户的还款记录和合同信息</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增记录
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">总记录数</p>
          <p className="text-2xl font-bold text-gray-800">{records.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">逾期记录</p>
          <p className="text-2xl font-bold text-red-600">
            {records.filter(r => r.isOverdue).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">已签合同</p>
          <p className="text-2xl font-bold text-green-600">
            {records.filter(r => r.hasESignContract).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">拉群客户</p>
          <p className="text-2xl font-bold text-blue-600">
            {records.filter(r => r.isInGroup).length}
          </p>
        </div>
      </div>

      {/* 记录表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">打款记录列表</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">销售员</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">签约姓名</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分期信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">每月还款日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">还款进度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <input
                        type="date"
                        value={record.orderDate}
                        onChange={(e) => handleFieldChange(record.id, 'orderDate', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {new Date(record.orderDate).toLocaleDateString('zh-CN')}
                      </span>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <input
                        type="text"
                        value={record.department}
                        onChange={(e) => handleFieldChange(record.id, 'department', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{record.department}</span>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <input
                        type="text"
                        value={record.salesPerson}
                        onChange={(e) => handleFieldChange(record.id, 'salesPerson', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{record.salesPerson}</span>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <input
                        type="text"
                        value={record.contractName}
                        onChange={(e) => handleFieldChange(record.id, 'contractName', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <button
                        onClick={() => handleContractNameClick(record.contractName)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                        title="点击查看客户详情"
                      >
                        {record.contractName}
                      </button>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {editingRecord === record.id ? (
                        <div className="space-y-1">
                          <label className="flex items-center text-xs">
                            <input
                              type="checkbox"
                              checked={record.isOverdue}
                              onChange={(e) => handleFieldChange(record.id, 'isOverdue', e.target.checked)}
                              className="mr-1"
                            />
                            逾期
                          </label>
                          <label className="flex items-center text-xs">
                            <input
                              type="checkbox"
                              checked={record.isInGroup}
                              onChange={(e) => handleFieldChange(record.id, 'isInGroup', e.target.checked)}
                              className="mr-1"
                            />
                            拉群
                          </label>
                          <label className="flex items-center text-xs">
                            <input
                              type="checkbox"
                              checked={record.hasESignContract}
                              onChange={(e) => handleFieldChange(record.id, 'hasESignContract', e.target.checked)}
                              className="mr-1"
                            />
                            e签宝
                          </label>
                          <label className="flex items-center text-xs">
                            <input
                              type="checkbox"
                              checked={record.isFirstPaymentManual}
                              onChange={(e) => handleFieldChange(record.id, 'isFirstPaymentManual', e.target.checked)}
                              className="mr-1"
                            />
                            手动转
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {record.isOverdue && (
                            <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">逾期</span>
                          )}
                          {record.isInGroup && (
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">已拉群</span>
                          )}
                          {record.hasESignContract && (
                            <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">已签约</span>
                          )}
                          {record.isFirstPaymentManual && (
                            <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full">手动转</span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <div className="space-y-1">
                        <input
                          type="number"
                          value={record.installmentAmount}
                          onChange={(e) => handleFieldChange(record.id, 'installmentAmount', parseFloat(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="分期金额"
                        />
                        <br />
                        <input
                          type="number"
                          min="1"
                          max="36"
                          value={record.installmentCount}
                          onChange={(e) => handleFieldChange(record.id, 'installmentCount', parseInt(e.target.value) || 6)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="分期数"
                        />
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">¥{record.installmentAmount.toLocaleString()}</div>
                        <div className="text-gray-500">{record.installmentCount}期</div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <input
                        type="text"
                        value={record.monthlyPaymentDate}
                        onChange={(e) => handleFieldChange(record.id, 'monthlyPaymentDate', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="例如：每月15日"
                      />
                    ) : (
                      <div className="text-sm">
                        <div className="text-gray-900">{record.monthlyPaymentDate || '-'}</div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4">
                    {editingRecord === record.id ? (
                      <div>
                        <div className="grid grid-cols-6 gap-1 max-w-xs">
                          {record.paymentStatus.map((paid, index) => (
                            <label key={index} className="flex items-center justify-center bg-white p-1 border border-gray-200 rounded">
                              <input
                                type="checkbox"
                                checked={paid}
                                onChange={(e) => handlePaymentStatusChange(record.id, index, e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="ml-1 text-xs text-gray-600">{index + 1}</span>
                            </label>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          已付: {record.paymentStatus.filter(p => p).length}/{record.installmentCount}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-6 gap-1 max-w-xs">
                          {record.paymentStatus.map((paid, index) => (
                            <label key={index} className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={paid}
                                onChange={(e) => handlePaymentStatusChange(record.id, index, e.target.checked)}
                                className="w-4 h-4"
                                title={`第${index + 1}期`}
                              />
                              <span className="ml-1 text-xs text-gray-600">{index + 1}</span>
                            </label>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          已付: {record.paymentStatus.filter(p => p).length}/{record.installmentCount}
                        </div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-4 py-4 whitespace-nowrap">
                    {editingRecord === record.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveRecord(record.id)}
                          className="text-green-600 hover:text-green-900"
                          title="保存"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                          title="取消"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditRecord(record.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新增记录模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">新增分期记录</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">订单日期 *</label>
                  <input
                    type="date"
                    value={newRecord.orderDate}
                    onChange={(e) => setNewRecord({ ...newRecord, orderDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">部门</label>
                  <input
                    type="text"
                    value={newRecord.department}
                    onChange={(e) => setNewRecord({ ...newRecord, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入部门名称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">销售员 *</label>
                  <input
                    type="text"
                    value={newRecord.salesPerson}
                    onChange={(e) => setNewRecord({ ...newRecord, salesPerson: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入销售员姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">签约姓名 *</label>
                  <input
                    type="text"
                    value={newRecord.contractName}
                    onChange={(e) => setNewRecord({ ...newRecord, contractName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入签约人姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分期金额</label>
                  <input
                    type="number"
                    value={newRecord.installmentAmount}
                    onChange={(e) => setNewRecord({ ...newRecord, installmentAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入分期金额"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分期数</label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={newRecord.installmentCount}
                    onChange={(e) => handleInstallmentCountChange(parseInt(e.target.value) || 6)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入分期数（1-36期）"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">还款时间</label>
                  <input
                    type="date"
                    value={newRecord.repaymentDate}
                    onChange={(e) => setNewRecord({ ...newRecord, repaymentDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">每月还款日期</label>
                  <input
                    type="text"
                    value={newRecord.monthlyPaymentDate}
                    onChange={(e) => setNewRecord({ ...newRecord, monthlyPaymentDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="例如：每月15日"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">签约方式</label>
                  <input
                    type="text"
                    value={newRecord.signingMethod}
                    onChange={(e) => setNewRecord({ ...newRecord, signingMethod: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入签约方式"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">合约时间</label>
                <input
                  type="text"
                  value={newRecord.contractPeriod}
                  onChange={(e) => setNewRecord({ ...newRecord, contractPeriod: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例如：2024年1月-2024年12月"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">备注信息</label>
                <textarea
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="请输入备注信息"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRecord.isOverdue}
                    onChange={(e) => setNewRecord({ ...newRecord, isOverdue: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">逾期</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRecord.isInGroup}
                    onChange={(e) => setNewRecord({ ...newRecord, isInGroup: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">是否拉群</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRecord.hasESignContract}
                    onChange={(e) => setNewRecord({ ...newRecord, hasESignContract: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">e签宝合同</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newRecord.isFirstPaymentManual}
                    onChange={(e) => setNewRecord({ ...newRecord, isFirstPaymentManual: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">第一期手动转</span>
                </label>
              </div>

              {/* 还款进度预览 */}
              {newRecord.installmentCount && newRecord.installmentCount > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    还款进度预览（共{newRecord.installmentCount}期）
                  </label>
                  <div className="grid grid-cols-6 gap-2 p-4 bg-gray-50 rounded-lg">
                    {Array.from({ length: newRecord.installmentCount }, (_, index) => (
                      <div key={index} className="flex items-center justify-center p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">第{index + 1}期</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddRecord}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                保存记录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 客户详情模态框 */}
      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => {
            setShowCustomerDetail(false);
            setSelectedCustomer(null);
          }}
          onAddFile={handleAddCustomerFile}
        />
      )}
    </div>
  );
};

export default InstallmentRecordsView;