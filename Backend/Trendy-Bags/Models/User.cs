using System.ComponentModel.DataAnnotations;

namespace Trendy_Bags.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email{ get; set; }
        [Required]
        public string Password{ get; set; }
        [Required]
        public string Role { get; set; } = "user";//Can be admin or customer

        public ICollection<Cart>? Carts { get; set; }
        public ICollection<Order>? Orders{ get; set; }
    }
}
