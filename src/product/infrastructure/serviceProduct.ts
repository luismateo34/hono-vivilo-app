import { ProductDatabase } from "./database";
import { AdapterProduct } from "src/product/application/driverAdapter/adapter";


const database = new ProductDatabase();
export const ProductAdapter = new AdapterProduct(database);
export { type Product, ErrorProduct, type createProduct, Category } from "src/product/domain/product";
