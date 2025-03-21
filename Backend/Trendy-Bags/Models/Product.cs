using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trendy_Bags.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public string ImageURL { get; set; }
       /* [Required]
        public int UserId { get; set; }*/

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
        /*[ForeignKey("UserId")]
        public User? User { get; set; }*/
    }
}
