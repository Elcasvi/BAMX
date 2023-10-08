using Xunit;
using Backend;
using Backend.Models.Interfaces;

namespace BAMXTesting
{
    public class UserLoginTest:IDisposable
    {
        private readonly IUserRepository _userRepository;
        public UserLoginTest(IUserRepository userRepository)
        {
           _userRepository = userRepository;
        }

        public void Dispose()
        {
            
        }

        [Fact]
        public void Test1()
        {

        }
    }
}