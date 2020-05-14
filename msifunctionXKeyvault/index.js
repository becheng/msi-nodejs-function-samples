const msRestAzure = require('ms-rest-azure');
const KeyVault = require('azure-keyvault');
const KEY_VAULT_URI = process.env['KEY_VAULT_URI'];

function getKeyVaultCredentials(){
    return msRestAzure.loginWithAppServiceMSI({resource: "https://vault.azure.net"});
}

function getKeyVaultSecret(credentials) {
    let keyVaultClient = new KeyVault.KeyVaultClient(credentials);
    return keyVaultClient.getSecret(KEY_VAULT_URI, 'MySecret', "");
}

module.exports = async function (context, req) {
    context.log('Accessing keyvault using MSI');            
    try {
        const creds = await getKeyVaultCredentials();
        const secret = await getKeyVaultSecret(creds);
        context.log(`Secret is "${secret.value}"`);
    } catch(error) {
      context.log('erorr='+error);
    }
};