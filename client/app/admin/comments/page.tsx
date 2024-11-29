'use client'

import { deleteCommentById, getAllCommentByAdmin } from '@/api/comment';
import { Comment } from '@/types/comment';
import { Button, Card, notification, Table } from 'antd'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

const AdminComment = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveComment = async (productId: string) => {
    setLoading(true);
    try {
      const res = await deleteCommentById(productId);
      if (res.status === 200) {
        notification.success({
          message: 'Xóa bình luận thành công!',
        });
        const updatedProducts = await getAllCommentByAdmin();
        setComments(updatedProducts.metadata);
      }
    } catch (error) {
      console.error("Error during remove product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await getAllCommentByAdmin();
        if (res.status === 200) {
          setComments(res.metadata);
        }
      } catch (error) {
        console.error("Error during fetch all comments: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const columns = [
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (_: any, comment: any) => (
        <div>
          {comment.content}
        </div>
      ),
    },
    // {
    //   title: 'Ảnh',
    //   dataIndex: 'images',
    //   key: 'images',
    //   render: (_: any, comment: any) => (
    //     <Image
    //       src={comment?.images[0]?.thumbUrl}
    //       alt={comment.content}
    //       width={100}
    //       height={100}
    //     />
    //   ),
    // },
    {
      title: 'Người đăng',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
        <span>
          {user.name}
        </span>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (product: any) => (
        <span>
          {product.name}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (comment: any) => (
        <div className='flex flex-col space-y-2 text-blue-500 text-center'>
          <Button type='link' onClick={() => handleRemoveComment(comment._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div className='p-4'>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Tất cả bình luận</span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={comments}
          loading={loading}
          rowKey={(comment: any) => comment._id}
          pagination={{ pageSize: 10 }}
          className='custom-table-header border rounded-lg'
          bordered
        />
      </Card>
    </div>
  )
}

export default AdminComment