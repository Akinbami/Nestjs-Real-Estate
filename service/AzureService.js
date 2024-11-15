// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const fs = require('fs');
const multer = require('multer');

/* 
 Setup: Enter your storage account name and shared key in main()
*/

const { BlobServiceClient, StorageSharedKeyCredential, newPipeline } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv").config();

const containerName = 'profilepictures';
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
// const getStream = require('into-stream');
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const getBlobName = originalName => {
    // Use a random number to generate a unique file name, 
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
  };
  

const AZ = {
  async uploadFile(filename, filebuffer) {
    // Create Blob Service Client from Account connection string or SAS connection string
    // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
    // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
    const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "DefaultEndpointsProtocol=https;AccountName=thepodliving;AccountKey=vaexFsPpCf/vpSZnErg6vUp9xfcELVUQKmdoC3bR8AoRDtR+rSDznennFwdPxiDnNGTDyKGmQN6q/gmKmr8B4Q==;EndpointSuffix=core.windows.net";
    // Note - Account connection string can only be used in node.
    const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);

    const blobName = getBlobName(filename);
    // const stream = getStream(filebuffer);
    const stream = fs.createReadStream(filebuffer);

    const containerClient = blobServiceClient.getContainerClient(containerName);;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      const res = await blockBlobClient.uploadStream(stream,
        uploadOptions.bufferSize, uploadOptions.maxBuffers,
        { blobHTTPHeaders: { blobContentType: "application/png" } });
      return {'success': true, message: 'File uploaded to Azure Blob storage.', url: blockBlobClient.url };
    } catch (err) {
      return {'error': true,  message: err.message };
    }

    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  }

  // Create a container
//   const containerName = `newcontainer${new Date().getTime()}`;
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   const createContainerResponse = await containerClient.create();
//   console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

//   // Delete container
//   await containerClient.delete();

//   console.log("deleted container");
}

// main().catch((err) => {
//   console.error("Error running sample:", err.message);
// });

module.exports = AZ;