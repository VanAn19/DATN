import { ProductCardType } from '@/types/product';
import { Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Meta } = Card;

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const ProductCard: React.FC<ProductCardType> = ({ _id, name, thumbnail, price, sale, sellingPrice, category, slug }) => { 
  return (
    <Link href={`/products/${slug}`} passHref>
      <Card
        key={_id}
        hoverable
        cover={
          <div className="relative">
            <Image 
              alt={name} 
              src={thumbnail} 
              width={300.4} 
              height={300.4} 
              className="object-cover rounded-lg ml-025" 
            />
            {sale > 0 && (
              <div className="bg-red-300 text-white font-bold px-2 py-1 text-xs rounded-full absolute top-2 left-2">
                UP TO {sale}%
              </div>
            )}
          </div>
        }
      >
        <Meta
          title={name}
          description={
            <div className='flex'>
              <p className="text-lg font-bold mr-2">{VND.format(sellingPrice)}</p>
              <p className="text-base line-through font-bold">{VND.format(price)}</p>
            </div>
          }
        />
      </Card>
    </Link>
  )
}

export default ProductCard