import { addStock, getStock } from '@/api/inventory';
import { Product } from '@/types';
import { Button, Form, InputNumber, Modal, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react'

interface AddProductInventoryProps {
  onClose: () => void;
  onAddSuccess: () => void;
}

const AddProductInventory: React.FC<AddProductInventoryProps> = ({ onClose, onAddSuccess }) => {
  const [form] = Form.useForm();
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await getStock();
        if (res.status === 200) {
          setStocks(res.metadata);
          const productsList = res.metadata.map((stock: any) => ({
            _id: stock.productId._id,
            name: stock.productId.name,
          }));
          setProducts(productsList);
        }
      } catch (error) {
        console.error("Error during fetch stock: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const { productId, stock } = values;
      const res = await addStock({ 
        productId,
        stock
      }); 
      if (res.status === 200) {
        notification.success({
          message: 'Thành công',
          description: 'Sản phẩm đã được thêm vào kho.',
        });
        form.resetFields();
        onClose();
        onAddSuccess();
      }
    } catch (error) {
      console.error('Error during add product to inventory:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi khi thêm sản phẩm vào kho.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Tên sản phẩm"
        name="productId"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
      >
        <Select
          value={selectedProduct || ''}
          onChange={(value) => setSelectedProduct(value)}
          placeholder="Chọn sản phẩm"
          loading={loading}
        >
          {products.map((product: Product) => (
            <Select.Option key={product._id} value={product._id}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
        
      <Form.Item
        label="Số lượng tồn kho"
        name="stock"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
      >
        <InputNumber
          min={1}
          placeholder="Nhập số lượng tồn kho"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Thêm sản phẩm
        </Button>
      </div>
    </Form>
  )
}

export default AddProductInventory