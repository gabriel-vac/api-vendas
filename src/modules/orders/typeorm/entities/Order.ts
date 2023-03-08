/* eslint-disable import/no-cycle */
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from '../../../customers/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // many orders to one customer
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // one order can be related to many registers from orders products
  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true, // every time I create an order (save), all order products related to this order will be automacally saved on database
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
