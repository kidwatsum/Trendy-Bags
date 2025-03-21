using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Trendy_Bags.Context;
using Trendy_Bags.Models;

namespace Trendy_Bags.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartsController(AppDbContext context)
        {
            _context = context;
        }

        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            // Get logged-in user ID from the JWT token
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            // Get cart for the logged-in user
            var cart = await _context.Carts
                                     .Where(c => c.UserId == userId)
                                     .Include(c => c.Items)
                                     .ThenInclude(ci => ci.Product)  
                                     .FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            // Returns the cart items 
            var cartItems = cart.Items.Select(ci => new
            {
                ci.Product.Name,
                ci.Product.ImageURL,
                ci.Product.Description,
                ci.Product.Price,
                ci.Quantity,
                ci.ProductId
                ci.Id
            }).ToList();

            return Ok(cartItems);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

       
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

       
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCart request)
        {
            // Gets logged in user
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            // Checks if user already has a cart
            var cart = await _context.Carts.Include(c => c.Items)
                                           .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                // If no cart exists for  user, create a new cart
                cart = new Cart { UserId = userId, Items = new List<CartItem>() };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            // Check if the item already exists in the cart
            var cartItem = cart.Items.FirstOrDefault(ci => ci.ProductId == request.ProductId);

            if (cartItem != null)
            {
                // If it exists, update the quantity
                cartItem.Quantity += request.Quantity;
            }
            else
            {
                // If not, add a new item to the cart
                cart.Items.Add(new CartItem { ProductId = request.ProductId, Quantity = request.Quantity });
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok();  
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound("Cart item not found");
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(); 
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
