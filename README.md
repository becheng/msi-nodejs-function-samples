# Function App using Managed System Assigned Identity Samples

This document provides step by step instructions on configuring an Azure Function App to access Azure Key Valut and Azure Blob Storage using a Managed System Assigned Identity.  This Function App in this sample using Node.js but it's important to note the configuration to apply MSI is applicable regardless what code type is implemented in the Azure Function.  

## Getting started

1. Clone repo.
2. Goto the root folder of the repo and run `npm install`.  
3. In the Azure Portal, create Azure Function App, e.g. "MyMSIFunctionApp".
4. Enable a system assigned managed identity (MSI) on the Function App:   
    -  If on a brand new Function App with no functions deployed yet, go to the *Settings* (on the left nav), and select *Identity*
    -  If on a existing Function App, go to *Platform features* > *Identity* 
5. Under the *System Assigned* tab, set *Status* = **On** and click *Save*.

## Configure MSI to access Key Vault
6. In the Azure Portal, create Azure KeyVault, e.g. 'MyKeyVault' and generate a new *Secret* with a secret key of 'MySecret' and value of your chosing, e.g. "Hello World".
7. Add the Functions App's MSI to the keyvault's access policy: 
   - Go to *Access polices*, 
   - Under *Secret permissions*, check the *Get* checkbox 
   - Under *Select principal*, look up and the select the Function App MSI, e.g. "MyMSIFunctionApp".  
   - Click Add.    

## Configure MSI to access Storage Account (Blob in this case)
8. Create Azure Storage Account, e.g. 'mystorageacount' or just use the storage account that was created for with the Function App for testing.
9.  Within the Storage Account, 
    - Go to *Access control (IAM)*, 
    - Select *Role assignments* tab, click *+ Add*, search for the Funcation App  MSI, e.g. "MyMSIFunctionApp", select *Role* as **Storage Blob Data Reader**. 
    - Click Save

## Update your Function App with the KeyValut and Storage URIs.
10.  Update the function app code with the correct keyvault and storage urls.  If running functions locally, update the *.env* file.  If running in Azure, update the Function App's app settings with the following keys, KEY_VAULT_URI, STORAGE_BLOB_URI.

11. Deploy to the Function App and test!
