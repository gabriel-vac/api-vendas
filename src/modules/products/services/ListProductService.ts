import { getCustomRepository } from 'typeorm';
import redisCache from '@shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST'
    );

    if (!products) {
      products = await productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
