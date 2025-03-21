﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trendy_Bags.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public ICollection<CartItem> Items { get; set;}=new List<CartItem>();
    }
}
