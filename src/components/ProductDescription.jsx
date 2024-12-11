import React from 'react';
import { Modal, Button } from 'antd';

const ProductDescription = ({ product, isOpen, onClose }) => {
  if (!product) return null;
    
  return (
    <Modal
      title={product.name}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" danger onClick={onClose}>
          Закрыть
        </Button>,
      ]}
    >
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Описание:</strong> {product.description}</p>
      {product.activeIngredients && (
        <p>
          <strong>Активные ингредиенты:</strong> {product.activeIngredients}
        </p>
      )}
      {product.aplicableCrops && (
        <p>
          <strong>Применимые культуры:</strong> {product.aplicableCrops.join(', ')}
        </p>
      )}
    </Modal>
  );
};

export default ProductDescription;