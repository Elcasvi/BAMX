using Backend.Models.Dtos;
using Backend.Models.Entities;
using BAMXTesting.Brokers;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tynamix.ObjectFiller;

namespace BAMXTesting.Apis.Users
{
    [Collection(nameof(ApiTestCollection))]
    public class UserApiTest
    {
        private readonly BAMXApiBroker BAMXApiBroker;
        public UserApiTest(BAMXApiBroker BAMXApiBroker) =>
            this.BAMXApiBroker = BAMXApiBroker;

        private UserDto createRandomUser() =>
            new Filler<UserDto>().Create();

        [Fact]
        public async Task shouldPostUser()
        {
            //given
            UserDto randomUser = createRandomUser();
            UserDto inputUser = randomUser;
            UserDto expectedUser = inputUser;

            //when
            var user = await this.BAMXApiBroker.PostUser(inputUser);
            UserDto actualUser = new UserDto()
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                Gender = user.Gender,
                Rating = user.Rating,
                ProfilePictureUrl = user.ProfilePictureUrl,
                NameOfProfilePicture = user.NameOfProfilePicture
            };

            //then
            actualUser.Name.Should().BeEquivalentTo(expectedUser.Name);
            User deletedUser=await this.BAMXApiBroker.DeletetUserById(user.Id);
            Console.WriteLine(deletedUser);
        }
    }
}
