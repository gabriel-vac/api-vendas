/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // one product can be relate to many registers from orders products
  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
