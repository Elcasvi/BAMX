using Azure.Core;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Helper;
using Backend.Models.Interfaces;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services
{
    public class BlobStorageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IUserRepository _userRepository;

        public BlobStorageService(BlobServiceClient blobServiceClient, IUserRepository userRepository)
        {
            _blobServiceClient = blobServiceClient;
            _userRepository = userRepository;

        }
        public BlobInformation AddBlobContent(int userId, FileModel fileModel)
        {
            // Get the name without extension
            //string nameWithoutExtension = Path.GetFileNameWithoutExtension(fileModel.file.FileName);

            // Get the extension (including the dot)
            string extension = Path.GetExtension(fileModel.file.FileName);
            
            string loggedInUser =GetUserContainerName(userId);
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);//I access its container in azure
            containerClient.CreateIfNotExists(PublicAccessType.Blob);//If the container addressed to its particular name does not exists, I create a new one
            
            //string newBlobName = $"{Guid.NewGuid().ToString()}.jpg";//I create a name for the file to upload
            string newBlobName = $"{Guid.NewGuid().ToString()}{extension}";//I create a name for the file to upload
            containerClient.UploadBlob(newBlobName, fileModel.file.OpenReadStream());//I upload the file

            string url=GetUrl(loggedInUser,newBlobName);//I get the url of the file uploaded
            BlobInformation blobInformation = new BlobInformation()
            {
                Url = url,
                FileName = newBlobName
            };
            return blobInformation;
        }
        public Stream Get(int userId, string fileName)
        {
            
            string loggedInUser = GetUserContainerName(userId);
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);
            var blobUrl = blobInstance.Uri.AbsoluteUri;


            var downloadContent = blobInstance.Download();
            return downloadContent.Value.Content;
        }
        public BlobInformation UpdateBlob(int userId,string fileName,FileModel updatedFileModel)
        {
            BlobInformation urlAndName=AddBlobContent(userId, updatedFileModel);
            int status=DeleteBlob(userId, fileName);
            return urlAndName;
        }
        public int DeleteBlob(int userId,string fileName)
        {
            
            string loggedInUser = GetUserContainerName(userId);
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);


            var deletedContent = blobInstance.Delete();
            return deletedContent.Status;
        }

        public int DeleteContainer(int userId)
        {
            string loggedInUser = GetUserContainerName(userId);
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            
            var deletedContainer=containerClient.Delete();
            return deletedContainer.Status;
        }
        
        private string GetUrl(string loggedInUser, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);//I get the specific file I want with its name
            var blobUrl = blobInstance.Uri.AbsoluteUri;
            return blobUrl;
        }
        private String GetUserContainerName(int userId)
        {
            User user = _userRepository.Get(userId);//I get the user object from my db
            string loggedInUser = user.Name.ToLower()+user.Id.ToString();//I create a name for its particular container in azure
            return loggedInUser;
        }
    }
}
