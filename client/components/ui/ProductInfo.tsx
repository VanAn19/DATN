'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Form, Input, Menu, Modal, notification, Pagination, Skeleton, Spin, Upload, UploadProps } from "antd";
import { SkeletonCustomProduct } from "./slide/CustomSlide";
import Image from 'next/image';
import {
  LoadingOutlined,
  DropboxOutlined,
  MinusOutlined,
  PlusOutlined,
  HeartFilled,
  HeartOutlined,
  SendOutlined,
  PictureOutlined,
  EllipsisOutlined
} from "@ant-design/icons";
import images from '@/public/images';
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "./slide/CustomSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { addToCart } from '@/api/cart';
import { addProductToFavorite, getUserFavorite, removeProductFromFavorite } from '@/api/favorite';
import { checkAvailableLogin, convertUtcTimeToVNTime, getCookie } from '@/utils';
import { useRouter } from 'next/navigation';
import RandomProductSlider from '../RandomProductSlider';
import { FileItem } from '@/types';
import { Comment } from '@/types/comment';
import { deleteImage, uploadImages } from '@/api/upload';
import { deleteCommentById, getCommentByProductId, uploadCommentByUser } from '@/api/comment';

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductInfo(props: { data: any, user: any, isLoading: boolean }) {
  const { data, user, isLoading } = props;
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageChange = async ({ fileList }: any) => {
    setFileList(fileList);
    const files = fileList.map((file: any) => file.originFileObj);
    if (files.length) {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file: any) => {
        formData.append('files', file);
      });
      try {
        const response = await uploadImages(formData);
        const updatedFileList = response.metadata.map((img: any, index: number) => ({
          uid: index.toString(),
          name: `image-${index}`,
          status: 'done',
          publicId: img.publicId,
          url: img.imageUrl,
          thumbUrl: img.thumbUrl,
        }));
        setFileList(updatedFileList);
      } catch (error) {
        console.error("Error during upload images:", error);
      } finally {
        setUploading(false);
      }
    }
  }

  const handleRemove = async (file: any) => {
    try {
      await deleteImage({ publicId: file.publicId });
      const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFileList);
    } catch (error) {
      console.error("Error during delete image:", error);
    }
  };

  const openImageModal = (image: string) => {
    setCurrentImage(image);
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setCurrentImage("");
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { content } = values;
      const images = fileList.map((file) => ({
        publicId: file.publicId,
        imageUrl: file.url || '',
        thumbUrl: file.thumbUrl || ''
      }));
      const res = await uploadCommentByUser({
        product: data._id,
        content,
        images
      });
      if (res.status === 201) {
        form.resetFields();
        setFileList([]);
        setComments((prevComments) => [
          ...prevComments,
          {
            _id: '000000000000000000000000',
            product: data._id,
            content,
            images,
            user: {
              name: user.name,
              avatar: user.avatar
            },
            createdAt: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error('Error during comment:', error);
    } finally {
      setLoading(false);
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComments = comments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const settings = {
    infinite: data?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: data?.images?.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: data?.images?.length > 1 ? <SamplePrevArrow /> : null
  }

  const handleMenuClick = async ({ key, id }: { key: string, id: string }) => {
    if (key === "edit") {
      // ...
    } else if (key === "delete") {
      setLoading(true);
      try {
        const res = await deleteCommentById(id);
        if (res.status === 200) {
          setComments((prevComments) => prevComments.filter((comment) => comment._id !== id));
        }
      } catch (error) {
        console.error("Error during delete comment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }

  const addProductToCart = async () => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
      return;
    }
    setLoading(true);
    try {
      const product = {
        productId: data._id,
        quantity: quantity,
        name: data.name,
        price: data.sellingPrice,
        thumbnail: data.thumbnail
      }
      await addToCart(product);
      notification.success({
        message: 'Success',
        description: 'Đã thêm sản phẩm vào giỏ hàng!',
      });
    } catch (error) {
      console.error("Error during add product to cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchComment = async () => {
      try {
        const res = await getCommentByProductId(data._id);
        if (res.status === 200) {
          setComments(res.metadata);
        }
      } catch (error) {
        console.error("Error during check favorite product: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchComment();
  }, [data._id]);

  console.log(comments);

  useEffect(() => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) return setIsFavorited(false);
    setLoading(true);
    const checkFavorProduct = async () => {
      try {
        const res = await getUserFavorite();
        if (res.status === 200) {
          res.metadata.products.map((product: any) => {
            if (product._id === data._id) {
              setIsFavorited(true);
            } else {
              setIsFavorited(false);
            }
          });
        }
      } catch (error) {
        console.error("Error during check favorite product: ", error);
      } finally {
        setLoading(false);
      }
    }
    checkFavorProduct();
  }, [isFavorited, data._id]);

  const handleFavorite = async () => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
      return;
    }
    setLoading(true);
    try {
      if (isFavorited) {
        const res = await removeProductFromFavorite(data._id);
        if (res.status === 200) {
          setIsFavorited(false);
        }
      } else {
        const res = await addProductToFavorite(data._id);
        if (res.status === 200) {
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error("Error during handle favorite product: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row w-full h-full mt-[100px] gap-8 px-4 mb-4">
        <div className="xl:w-[50%] w-full h-full flex flex-col items-center justify-center gap-8">
          {isLoading ? (
            <SkeletonCustomProduct>
              <Skeleton.Image
                className="skeleton-image h-[100%] flex items-center justify-center"
                active={true}
                style={{ width: "300px !important" }}
              />
            </SkeletonCustomProduct>
          ) : (
            <Slider {...settings} className="w-full relative">
              {data?.images?.map((img: { imageUrl: string }, index: number) => (
                // <div key={index} className="w-full flex items-center justify-center">
                <div key={index} className="slider-container w-full h-full">
                  <Image
                    className="slider-image"
                    src={img.imageUrl}
                    alt={`product-image-${index}`}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                </div>
              ))}
            </Slider>
          )}

          <div className="flex items-center w-[100%] justify-around">
            {isLoading ? (
              <Skeleton.Input active />
            ) : (
              <div className="flex items-center gap-2 ml-8">
                <span className="text-sm ml-10">Chia sẻ:</span>
                <a href="/">
                  <Image
                    src={images.facebookLogo}
                    alt='Facebook'
                    width={25}
                    height={25}
                  />
                </a>
                <a href="/">
                  <Image
                    src={images.messengerLogo}
                    alt='Messenger'
                    width={25}
                    height={25}
                  />
                </a>
                <a href="/">
                  <Image
                    src={images.twitterLogo}
                    alt='Twitter'
                    width={25}
                    height={25}
                  />
                </a>
              </div>
            )}
            {isLoading ? (
              <Skeleton.Input active />
            ) : (
              <div className="flex items-center justify-center gap-1 pl-1 w-[250px] border-l-2">
                {isFavorited ? (
                  <HeartFilled className='cursor-pointer' style={{ fontSize: '25px' }} onClick={handleFavorite} />
                ) : (
                  <HeartOutlined className='cursor-pointer' style={{ fontSize: '25px' }} onClick={handleFavorite} />
                )}
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-5">
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
            <div className="flex gap-5">
              <Skeleton.Input active />
              <Skeleton.Input active />
            </div>
          </div>
        ) : (
          <div className="flex xl:w-1/2 w-full h-full flex-col justify-between gap-5 pr-5">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{data?.name}</h1>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-3xl text-red-500">
                {VND.format(data?.sellingPrice)}
              </div>
              <div className="text-2xl text-gray-500 line-through">
                {VND.format(data?.price)}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="blinking-dot"></span>
              <div className=''>Còn Hàng</div>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="mr-5">Vận Chuyển</span>
              <Image
                src={images.freeShip}
                alt='FreeShip'
                width={30}
                height={30}
              />
              <div className=''>Miễn phí vận chuyển</div>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="mr-5">Chính Sách Đổi Trả</span>
              <DropboxOutlined style={{ fontSize: '16px' }} />
              <div className=''>Đổi trả trong 7 ngày</div>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className='mr-5'>Số lượng</span>
              <button onClick={decreaseQuantity} className="p-1 border rounded">
                <MinusOutlined />
              </button>
              <span className="mx-2">{quantity}</span>
              <button onClick={increaseQuantity} className="p-1 border rounded">
                <PlusOutlined />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                style={{
                  backgroundColor: "black",
                  color: "rgb(254, 240, 138)",
                  cursor: "pointer",
                  width: "100%",
                  height: '50px',
                  paddingTop: "11.5px",
                  paddingBottom: "11.5px",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                disabled={loading}
                onClick={addProductToCart}
              >
                {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "rgb(254, 240, 138)" }} spin />} /> : 'Thêm vào giỏ hàng'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='w-[90%] mx-auto overflow-hidden border-t border-gray-300'>
        <p className="text-xl font-bold p-4">Mô tả sản phẩm</p>
        <div className="flex items-center gap-3">
          <div className='' style={{ letterSpacing: '0.2px', lineHeight: '1.4' }}>{data?.description}</div>
        </div>
      </div>

      <div className="w-[90%] mx-auto border-t border-gray-300">
        <p className="text-xl font-bold p-4">Đánh giá sản phẩm</p>

        {paginatedComments.length > 0 ? paginatedComments.map((comment: any) => (
          <div key={comment._id} className="p-4 bg-white shadow-md rounded-lg border mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar src={comment.user?.avatar || images.logo} size={40} />
                <div>
                  <p className="font-semibold">{comment.user?.name}</p>
                  <p className="text-gray-500 text-sm">{convertUtcTimeToVNTime(comment.createdAt)}</p>
                </div>
              </div>
              {getCookie("user")?._id === comment.user && (
                <div>
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={(info) => handleMenuClick({ key: info.key, id: comment._id })}
                        items={[
                          { label: "Sửa", key: "edit" },
                          { label: "Xóa", key: "delete" },
                        ]}
                      />
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <EllipsisOutlined className="text-lg cursor-pointer" />
                  </Dropdown>
                </div>
              )}
            </div>
            <div className="mt-2 text-gray-700">
              <p>{comment.content}</p>
            </div>
            {comment.images.length > 0 && (
              <div className="flex mt-2 gap-2">
                {comment.images.map((image: any, index: any) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => openImageModal(image.imageUrl)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`Product Image ${index + 1}`}
                      width={120}
                      height={120}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )) : (
          <div>Chưa có bình luận. Hãy là người đầu tiên đánh giá sản phẩm</div>
        )}

        {Math.ceil(comments.length / itemsPerPage) > 1 && (
          <div key={1} className="mt-4">
            <Pagination
              className='justify-center items-center'
              current={currentPage}
              pageSize={itemsPerPage}
              total={comments.length}
              onChange={handlePageChange}
            />
          </div>
        )}

        {checkAvailableLogin() && (
          <div className="w-full px-4 rounded-md flex items-start mt-2">
            <Image
              src={user?.avatar || images.logo}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="relative flex-grow ml-4">
              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name="content"
                >
                  <Input.TextArea
                    placeholder={`Comment as ${user.name}`}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    maxLength={500}
                    className="p-2 rounded-md border-gray-300 w-full overflow-y-auto"
                    style={{ paddingBottom: "3rem" }}
                  />
                </Form.Item>
                <div className="absolute inset-x-0 bottom-5 flex justify-between items-center px-4">
                  <Upload
                    fileList={fileList}
                    onRemove={handleRemove}
                    onChange={handleImageChange}
                    beforeUpload={() => false}
                    multiple
                  >
                    <PictureOutlined className="text-gray-500 text-xl cursor-pointer hover:text-blue-600" />
                  </Upload>
                  <Button type='link' htmlType='submit' loading={uploading || loading} className='mb-2'>
                    <SendOutlined className="text-gray-500 text-lg cursor-pointer hover:text-blue-600" />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>

      <div className='w-[90%] mx-auto mb-10 overflow-hidden border-t border-gray-300'>
        <div className='flex justify-center'>
          <RandomProductSlider />
        </div>
      </div>

      <Modal
        open={isImageModalVisible}
        onCancel={closeImageModal}
        footer={null}
        centered
      >
        <Image
          src={currentImage}
          alt="Full size image"
          width={600}
          height={600}
        />
      </Modal>
    </>
  )
}