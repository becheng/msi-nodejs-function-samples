# Managed System Identity x Azure Functions x Node.js

Sample funcation apps using node.js accessing azure resources such as keyvalut and storage using a managed service identity.

## Instructions
1. Clone repo
2. Run `npm install` on local directory 
3. Create Azure Function App, e.g. 'MyMSIFunctionApp'
4. Enable MSI on 'MyMSIFunctionApp'; Goto 'Platform features' > 'Identity' > set System Assigned to 'On' 
5. Create Azure KeyVault, e.g. 'MyKeyVault' with a key/value entry with a secret key of 'MySecret'
6. Add 'MyMSIFunctionApp' managed service idenity to the keyvault's Access Poliy and provide 'Get' access to Secrets 
7. Create Azure Storage Account, e.g. 'mystorageacount'
8. Add 'MyMSIFunctionApp' managed service idenity to 'mystorageacount'' as Role Assignment with the appropriate role, e.g. 'Storage Blob Data Reader'
9. Update the function app code with the correct keyvault and storage urls
10. Deploy to Azure function app and test
