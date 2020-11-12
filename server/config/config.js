'use strict';

let mongo_dbName = '';

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
    mongo_dbName = process.env.DB_NAME_DEV;
} else {
    mongo_dbName = process.env.DB_NAME_PROD;
}

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',
    mongo_dbUser: process.env.DB_USER,
    mongo_dbPassword: process.env.DB_PASSWORD,
    mongo_dbName,
    mongo_dbCluster: process.env.DB_CLUSTER,
    get dbUrl() {
        return `mongodb+srv://${this.mongo_dbUser}:${this.mongo_dbPassword}@${this.mongo_dbCluster}.mongodb.net/${this.mongo_dbName}?retryWrites=true&w=majority`
    },
};
