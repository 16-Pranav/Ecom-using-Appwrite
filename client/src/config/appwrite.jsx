import { Account, Client, Databases } from 'appwrite';
import envConfig from '../env-config/envConfig';

const client  = new Client()
    .setEndpoint(envConfig.appwriteUrl) // Your API Endpoint
    .setProject(envConfig.appwriteProjectId);


const account = new Account(client);

const database = new Databases(client);

export { client, account, database };