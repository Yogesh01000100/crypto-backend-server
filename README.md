# Crypto Backend Server

## Description
The Crypto Backend Server is a Node.js application using the Express framework, designed to interact with the Ethereum blockchain. It interfaces with third-party APIs like Etherscan to fetch transaction data, which is then stored in a MongoDB database. This allows for efficient retrieval and analysis of blockchain transactions.

## Features
- **Transaction Retrieval**: Fetches and stores transaction details for Ethereum addresses.
- **User Balance and Price Updates**: Regularly updates user balances and fetches the latest Ethereum price in INR, utilizing the CoinGecko API.
- **Scheduled Price Updates**: Implements a cron job updating the Ethereum price regularly.
- **REST API**: Provides endpoints for retrieving transaction data and balance information.

## Deployment
- **Server**: Deployed on AWS EC2 -> [https://blockstrack.cloud/](https://blocktalks.site/)
- **Database**: Hosted on MongoDB Cloud

## Architecture
Below is the architecture diagram of the Server, illustrating the main components and their interactions:

![image](https://github.com/Yogesh01000100/crypto-backend-server/assets/90953665/d903b58c-9e18-4e21-ab09-eb676f2ec256)
