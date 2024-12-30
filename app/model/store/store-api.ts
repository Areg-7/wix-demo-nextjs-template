// import { PLACEHOLDER_IMAGE, ALL_ITEMS_ID } from '@/app/constants';
// import {createClient, OAuthStrategy} from 'wix/sdk'
// import { collections, products } from 'wix/stores'
// import Cookies from "js-cookie"
// import { WIX_REFRESG_TOKEN } from '@/app/constants'

// interface CollectionFilters {
//   limit?: number;
//   exclude?: string;
// }

// interface ProductsFilters {
//   limit?: number;
//   slug?: string;
//   collectionId?: string;
// }

// export type ProductOption = products.ProductOption

// export type Variant = products.Variant 

// export type Product = products.Product

// export type Collection = collection.Collection

// const wixClient = createClient({
//   modules: {
//     collections,
//     products,
//   },
//   auth: OAuthStrategy({
//     clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
//     tokens: {
//       refreshToken: JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}"),
//       accessToken: { value: "", expiresAt:0 }
//     }
//   })
// })

// export const getProduct = async (productId: string) => {
//   return wixClient.products.getProduct(producId)
// }

// export const queryCollections = async ({
//   limit,
//   exclude,
// }:CollectionFilters = {}) => {
//   let query = wixClient.collections.queryCollections();

//   if (limit) {
//     query = query.(limit)
//   }

//   if (exclude) {
//     query = query.ne("name", [exclude])
//   }

//   const { items } = await query.find()
//   return items
// }


// export const queryProducts = async ({
//   slug,
//   limit,
//   collectionId,
// }: ProductsFilters = {}) => {
//   let query = wixClient.porducts.queryProducts()

//   if (collectionId) {
//     query = query.eq("collectonIds", collectionId)
//   }

//   const { items } = await query.find()
//   return items
// }
// // })
import { PLACEHOLDER_IMAGE, ALL_ITEMS_ID } from '@/app/constants';
import { createClient, OAuthStrategy } from '@wix/sdk';

import { collections, products } from '@wix/stores';
import Cookies from 'js-cookie';
import { WIX_REFRESH_TOKEN } from '@/app/constants';

interface CollectionFilters {
  limit?: number;
  exclude?: string;
}

interface ProductsFilters {
  limit?: number;
  slug?: string;
  collectionId?: string;
}

export type ProductOption = products.ProductOption;

export type Variant = products.Variant;

export type Product = products.Product;

export type Collection = collections.Collection;

const refreshToken = Cookies.get(WIX_REFRESH_TOKEN);
const wixClient = createClient({
  modules: {
    collections,
    products,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken: refreshToken ? JSON.parse(refreshToken) : undefined,
      accessToken: { value: '', expiresAt: 0 },
    },
  }),
});

export const getProduct = async (productId: string) => {
  try {
    return await wixClient.products.getProduct(productId);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const queryCollections = async ({
  limit,
  exclude,
}: CollectionFilters = {}) => {
  try {
    let query = wixClient.collections.queryCollections();

    if (limit) {
      query = query.limit(limit);
    }

    if (exclude) {
      query = query.ne('name', exclude);
    }

    const { items } = await query.find();
    return items;
  } catch (error) {
    console.error('Error querying collections:', error);
    throw error;
  }
};

export const queryProducts = async ({
  slug,
  limit,
  collectionId,
}: ProductsFilters = {}) => {
  try {
    let query = wixClient.products.queryProducts();

    if (slug) {
      query = query.eq('slug', slug);
    }

    if (collectionId) {
      query = query.eq('collectionIds', collectionId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { items } = await query.find();
    return items;
  } catch (error) {
    console.error('Error querying products:', error);
    throw error;
  }
};

