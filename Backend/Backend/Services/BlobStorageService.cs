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


        public string AddBlobContent(int userId, FileModel fileModel)
        {
            
            User user = _userRepository.Get(userId);//I get the user object from my db
            string loggedInUser = user.Name.ToLower()+user.Id.ToString();//I create a name for its particular container in azure

            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);//I acces its conttainer in azure
            containerClient.CreateIfNotExists(PublicAccessType.Blob);//If the conteiner addressed to its particular name does nott exists, I create a new one


            string newBlobName = $"{Guid.NewGuid().ToString()}.jpg";//I create a name for the file to upload
            containerClient.UploadBlob(newBlobName, fileModel.file.OpenReadStream());//I upload tthe file

            string url=GetUrl(loggedInUser,newBlobName);//I get the url of the file uploaded
            return url;
        }

        public string GetUrl(string loggedInUser, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);//I get the specific file I want with its name
            var blobUrl = blobInstance.Uri.AbsoluteUri;
            return blobUrl.ToString();
        }

        public Stream Get(int userId, string fileName)
        {
            //string loggedInUser = _userRepository.Get(userId).Name;
            string loggedInUser = "carlos";
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);
            var blobUrl = blobInstance.Uri.AbsoluteUri;


            var downloadContent = blobInstance.Download();
            return downloadContent.Value.Content;
        }
        
        public int DeleteBlob(int userId,string fileName)
        {
            //string loggedInUser = _userRepository.Get(userId).Name;
            string loggedInUser = "carlos";
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            var blobInstance = containerClient.GetBlobClient(fileName);


            var deletedContent = blobInstance.Delete();
            return deletedContent.Status;
        }

        public int DeleteContainer(int userId)
        {
            //string loggedInUser = _userRepository.Get(userId).Name;
            string loggedInUser = "test";
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            
            var deletedContainer=containerClient.Delete();
            return deletedContainer.Status;
        }
    }
}
