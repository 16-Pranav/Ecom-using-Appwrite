import envConfig from "../env-config/envConfig";
import { database } from "./appwrite";
import { ID } from "appwrite";

const db = {};

const collections = [
  {
    dbId: envConfig.appwriteDatabaseId,
    id: envConfig.appwriteProductsCollectionId,
    name: "products",
  },
  {
    dbId: envConfig.appwriteDatabaseId,
    id: envConfig.appwriteUsersCollectionId,
    name: "users",
  },
  {
    dbId: envConfig.appwriteDatabaseId,
    id: envConfig.appwriteOrdersCollectionId,
    name: "orders",
  },
  {
    dbId: envConfig.appwriteDatabaseId,
    id: envConfig.appwriteAddressId,
    name: "address",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      database.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      database.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => database.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => database.listDocuments(col.dbId, col.id, queries),
    get: (id) => database.getDocument(col.dbId, col.id, id),
  };
});

export default db;
