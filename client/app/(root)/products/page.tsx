'use client'

import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { Input, Pagination, Select } from 'antd';
import ProductCard from '@/components/ProductCard';
import { Category, Product } from '@/types';
import { filterProductByCategory, getListSearchProduct, getProductsList } from '@/api/product';
import { getListCategory } from '@/api/category';
import { SortAscendingOutlined, SortDescendingOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

const { Option } = Select;

const ProductsPage = () => {
  const [sort, setSort] = useState<string | null>('default');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [productsPerPage] = useState<number>(20);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await getProductsList();
        setProducts(res);
        setOriginalProducts(res);
      } catch (err) {
        console.error("Failed to fetch products in products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await getListCategory();
        if (res.status === 200) {
          setCategories(res.metadata);
        }
      } catch (err) {
        console.error("Failed to fetch products in products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, [])

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      console.warn("Vui lòng nhập từ khóa tìm kiếm!");
      return;
    }
    setLoading(true);
    try {
      const res = await getListSearchProduct(searchValue);
      setProducts(res.metadata);
      setOriginalProducts(res.metadata);
    } catch (error) {
      console.error("Error during search product: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        setLoading(true);
        try {
          const res = await getListSearchProduct(value);
          setProducts(res.metadata);
          setOriginalProducts(res.metadata);
        } catch (error) {
          console.error("Error during search product: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getProductsList();
        setProducts(res);
        setOriginalProducts(res);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleFilterCategory = async (category: string) => {
    setLoading(true);
    try {
      if (category === 'all') {
        const res = await getProductsList();
        setProducts(res);
      } else {
        const res = await filterProductByCategory({ category });
        if (res.status === 200) {
          setProducts(res.metadata);
        }
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error during filter products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    let sortedProducts = [...products];
    if (value === 'price-asc') {
      sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice); 
    } else if (value === 'price-desc') {
      sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice); 
    } else if (value === 'sale-max') {
      sortedProducts.sort((a, b) => b.sale - a.sale); 
    } else {
      sortedProducts = [...originalProducts];
    }
    setProducts(sortedProducts);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-[80%] container mx-auto mb-8">
      <div className='mt-8 font-extrabold text-center'>TẤT CẢ SẢN PHẨM</div>
      <div className='mt-8'>
        <Input 
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder='Tìm kiếm sản phẩm' 
          prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
          className='custom-input'
        />
      </div>
      <div className="flex justify-between items-center mt-8 mb-8">
        <div>
          <Select placeholder="Phân loại" className='w-40' onChange={handleFilterCategory}>
            <Option value="all">Tất cả</Option>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <Select
            defaultValue="default"
            onChange={handleSortChange}
            className="w-48"
          >
            <Option value="default">Default</Option>
            <Option value="price-asc"><SortAscendingOutlined /> Giá Tăng Dần</Option>
            <Option value="price-desc"><SortDescendingOutlined /> Giá Giảm Dần</Option>
            <Option value="sale-max"><CaretUpOutlined /> Khuyến mại nhiều nhất</Option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            sale={product.sale}
            sellingPrice={product.sellingPrice}
            category={product.category}
            slug={product.slug}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={products.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default ProductsPage