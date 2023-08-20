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
        public IActionResult AddFile(int userId,[FromForm]FileModel fileModel)
        {
            return Ok(_blobStorageService.AddBlobContent(userId, fileModel));    
        }

        [HttpGet("{userId}/{fileName}")]
        public async Task<IActionResult> GetFile(int userId,string fileName)
        {
            var imageFileStream=_blobStorageService.Get(userId, fileName);
            string fileType = "jpg";
            if(fileName.Contains("png"))
            {
                fileType = "png";
            }
            return File(imageFileStream,$"image/{fileType}");
        }

        /*
        [HttpGet("url/{userId}/{fileName}")]
        public IActionResult GetUrl(int userId, string fileName)
        {
            var imageFileStream = _blobStorageService.GetUrl(userId, fileName);
            return Ok(imageFileStream);
        }
        */
    }
}
