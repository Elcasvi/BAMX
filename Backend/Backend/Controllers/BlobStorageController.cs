using Backend.Models.Dtos;
using Backend.Models.Helper;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class BlobStorageController:ControllerBase
    {
        private readonly BlobStorageService _blobStorageService;
        public BlobStorageController(BlobStorageService blobStorageService)
        {
            _blobStorageService = blobStorageService;
        }

        [HttpPost("{userId}")]
        public IActionResult UploadFile(int userId,[FromForm]FileModel fileModel)
        {
            return Ok(_blobStorageService.AddBlobContent(userId, fileModel));    
        }

        [HttpGet("{userId}/{fileName}")]
        public async Task<IActionResult> DownloadFile(int userId,string fileName)
        {
            var imageFileStream=_blobStorageService.Get(userId, fileName);
            string fileType = "jpg";
            if(fileName.Contains("png"))
            {
                fileType = "png";
            }
            return File(imageFileStream,$"image/{fileType}");
        }


        [HttpDelete("{userId}/{fileName}")]
        public IActionResult DeleteFile(int userId, string fileName)
        {
            return Ok(_blobStorageService.DeleteBlob(userId, fileName));
        }
        
        [HttpDelete("{userId}")]
        public IActionResult DeleteContainer(int userId)
        {
            return Ok(_blobStorageService.DeleteContainer(userId));
        }
        
    }
}
