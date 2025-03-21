using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trendy_Bags.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        [Required]
        public float TotalPrice { get; set; }
        public string Status { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }

        public ICollection<OrderItem > Items { get; set; }=new List<OrderItem>();

    }
}
