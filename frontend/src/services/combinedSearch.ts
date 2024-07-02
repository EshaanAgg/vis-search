import products from './products.json';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  rating: number;
  amazonURL: string;
  brand: string;
  type: 'query1' | 'query2' | 'home';
};

export type ResponseData = {
  products: ProductType[];
  brandList: string[];
  priceRange: [number, number];
};

export const getCombinedSearchResults = async (queryText: string): Promise<ResponseData> => {
  const productsList = (products as ProductType[]).filter(
    (p) => p.type === (queryText.toLowerCase().includes('blue') ? 'query2' : 'query1')
  );

  const brandList = Array.from(new Set(productsList.map((product) => product.brand)));
  const minPrice = Math.min(...productsList.map((product) => product.price));
  const maxPrice = Math.max(...productsList.map((product) => product.price));

  const timeout = Math.random() * 2500 + 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: productsList,
        brandList,
        priceRange: [minPrice, maxPrice]
      });
    }, timeout);
  });
};
