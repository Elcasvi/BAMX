using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Backend.Services;

public class Hash
{
    private readonly int saltSize = 128 / 8;
    private readonly int keySize = 256/8;
    private readonly int iterations = 100000;
    private readonly HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA256;
    private const char delimiter= ';';
    

    public Hash()
    {
        
    }

    public string HashPassword(string password)
    {
        var salt=RandomNumberGenerator.GetBytes(saltSize);
       
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            iterations,
            hashAlgorithm,
            keySize);

        return string.Join(delimiter, Convert.ToBase64String(salt).Replace('/','7'), Convert.ToBase64String(hash).Replace('/', '7'));
    }

    public bool Verify(string inputPassword, string passwordHash)
    {
        var elements = passwordHash.Split(delimiter);
        var salt = Convert.FromBase64String(elements[0]);
        var hash = Convert.FromBase64String(elements[1]);

        var hashInput = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, iterations, hashAlgorithm, keySize);
        string hashInputStr=Convert.ToBase64String(hashInput).Replace('/', '7');

        return CryptographicOperations.FixedTimeEquals(hash, Convert.FromBase64String(hashInputStr));
    }
}