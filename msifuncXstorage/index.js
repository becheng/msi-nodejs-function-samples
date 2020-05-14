const azureStorage = require('azure-storage');
const STORAGE_BLOB_URI = process.env['STORAGE_BLOB_URI'];
const msRestAzure = require('ms-rest-azure');

// return the storage credentials
function getStorageCredentials(){
    return msRestAzure.loginWithAppServiceMSI({resource: 'https://storage.azure.com/'});
}

// promisify the credentials.getToken method
// TODO: look into the ms-rest-nodeauth sdk (https://github.com/Azure/ms-rest-nodeauth) and its
// getToken() method which return an auth accesstoken directly 
async function getTokenResponse(credentials){
    return new Promise((resolve, reject) => {
        credentials.getToken((err, resp) => {
            if(err) {
                reject(err);
            } else {
                resolve({ message: 'Retrieved token', tokenResponse: resp});
            }
        });
    });
}

// return an access token given the credentials
async function getToken(credentials){
    const aReturn = await getTokenResponse(credentials);
    return aReturn.tokenResponse.accessToken;
}

// return a TokenCredential object given the token
function getTokenCreds(token){
    return new azureStorage.TokenCredential(token); 
}

// return the blob service given the tokenCredentials
function getStorageBlob(tokenCreds){
    return azureStorage.createBlobServiceWithTokenCredential(STORAGE_BLOB_URI, tokenCreds);
}

// promisify the blobService.listContainerSegmenthed method
async function listContainers(blobService){
    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} containers`, containers: data.entries });
            }
        });
    });
}

module.exports = async function (context, req) {
    context.log('Accessing storage blob using MSI');
    try {
        
        const creds = await getStorageCredentials();
        context.log('creds='+creds.msiApiVersion);
        
        const token = await getToken(creds);
        context.log('token='+ token);
        
        const tokenCreds = await getTokenCreds(token);
        context.log('tokenCreds='+ tokenCreds);
        
        const blobService = await getStorageBlob(tokenCreds);
        
        const containerList = await listContainers(blobService);
        context.log(containerList.message);
        
    } catch(error) {
      context.log('erorr='+error);
    }
};