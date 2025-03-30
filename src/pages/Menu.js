import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faShoppingCart, 
  faCheckCircle, 
  faCartPlus, 
  faChevronLeft, 
  faChevronRight, 
  faArrowLeft, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';

import "../styles/Menu.css";
import cappuccino from "../images/cappuccino.jpg";

const Menu = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Refs for carousel scrolling
  const hotDrinksRef = useRef(null);
  const coldDrinksRef = useRef(null);
  const foodRef = useRef(null);
  const seasonalSpecialsRef = useRef(null);
  const dessertsRef = useRef(null);
  const bestsellerRef = useRef(null);

  // Bestseller carousel logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6; // Number of bestseller items

  useEffect(() => {
    // Load cart count from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(savedCart.length);
  }, []);

  const addToCart = (name, price) => {
    // Get existing cart or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to cart
    cart.push({ name, price, quantity: 1 });
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    setCartCount(cart.length);
    
    // Show toast notification
    setToastMessage(`${name} added to cart!`);
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const openCustomizationModal = (name, price) => {
    setCurrentItem({ name, price });
    setShowCustomizationModal(true);
  };

  const closeCustomizationModal = () => {
    setShowCustomizationModal(false);
    setCurrentItem(null);
  };

  const addCustomizedItemToCart = () => {
    // Add customization logic here
    addToCart(currentItem.name, currentItem.price);
    closeCustomizationModal();
  };

  const scroll = (ref, direction) => {
    const container = ref.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevBestsellerSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextBestsellerSlide = () => {
    setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Data for menu items
  const bestsellerItems = [
    {
      name: "Classic Cappuccino",
      description: "Rich espresso topped with silky steamed milk and a perfect layer of foam",
      image: "cappuccino.png",
      price: 2.99
    },
    {
      name: "Caramel Latte",
      description: "Smooth espresso blended with steamed milk and rich caramel syrup",
      image: "latte.jpg",
      price: 2.99
    },
    {
      name: "Double Espresso",
      description: "Intense, full-bodied double shot of our premium roasted coffee",
      image: "espresso.jpg",
      price: 2.99
    },
    {
      name: "Chocolate Mocha",
      description: "Decadent espresso with rich chocolate and topped with whipped cream",
      image: "mocha.jpg",
      price: 2.99
    },
    {
      name: "Americano",
      description: "Classic espresso diluted with hot water for a smooth, bold flavor",
      image: "americano.jpg",
      price: 2.99
    },
    {
      name: "Java Chip Frappe",
      description: "Blended coffee with chocolate chips, topped with whipped cream",
      image: "frappuccino.jpg",
      price: 2.99
    }
  ];

  const hotDrinks = [
    { name: "Espresso", description: "Rich and intense single shot of premium coffee", price: 2.99, image: {cappuccino} },
    { name: "Green Tea", description: "Premium Japanese green tea, perfectly steeped", price: 3.29, image: "greentea.jpg" },
    { name: "Hot Chocolate", description: "Rich chocolate with steamed milk and whipped cream", price: 4.29, image: "hotchocolate.jpg" },
    { name: "Macchiato", description: "Espresso marked with a dollop of foamed milk", price: 3.49, image: "macchiato.jpg" },
    { name: "Chai Latte", description: "Spiced tea blend with steamed milk and honey", price: 4.49, image: "chai.jpg" },
    { name: "Classic Cappuccino", description: "Perfectly balanced espresso with velvety steamed milk", price: 3.79, image: "capu.jpg" },
    { name: "London Fog", description: "Earl Grey tea with vanilla and steamed milk", price: 4.19, image: "londonfog.jpg" },
    { name: "Long Black", description: "Double shot espresso with hot water", price: 3.29, image: "americano.jpg" },
    { name: "Herbal Infusion", description: "Calming blend of chamomile, lavender, and mint", price: 3.49, image: "herbal.jpg" },
    { name: "Matcha Latte", description: "Premium green tea powder with steamed milk", price: 4.79, image: "matcha.jpg" }
  ];

  const coldDrinks = [
    { name: "Iced Coffee", description: "Cold brewed coffee served over ice", price: 3.99, image: "icedcoffee.jpg" },
    { name: "Berry Smoothie", description: "Mixed berries blended with yogurt and honey", price: 5.49, image: "smoothie.jpg" },
    { name: "Fresh Lemonade", description: "Housemade lemonade with fresh mint", price: 3.99, image: "lemonade.jpg" },
    { name: "Peach Iced Tea", description: "Fresh brewed tea with peach flavor", price: 3.79, image: "peach.jpg" },
    { name: "Mango Lassi", description: "Creamy yogurt drink with ripe mango pulp", price: 4.99, image: "lassi.jpg" },
    { name: "Nitro Cold Brew", description: "Smooth cold brew infused with nitrogen", price: 4.49, image: "nitro.jpg" },
    { name: "Green Detox Juice", description: "Fresh blend of kale, apple, and cucumber", price: 5.29, image: "greendetox.jpg" },
    { name: "Fresh Coconut Water", description: "Pure, hydrating coconut water served chilled", price: 3.99, image: "coconut.jpg" },
    { name: "Passion Fruit Cooler", description: "Refreshing tropical blend with passion fruit", price: 4.79, image: "passionfruit.jpg" },
    { name: "Strawberry Refresher", description: "Light, fruity drink with fresh strawberry essence", price: 4.29, image: "strawberry.jpg" }
  ];

  const foodItems = [
    { name: "Butter Croissant", description: "Freshly baked flaky croissant", price: 3.49, image: "croissant.jpg" },
    { name: "Club Sandwich", description: "Triple-decker with turkey, bacon, and avocado", price: 8.99, image: "sandwich.jpg" },
    { name: "Quinoa Salad", description: "Mixed greens with quinoa and grilled chicken", price: 9.99, image: "salad.jpg" },
    { name: "Blueberry Muffin", description: "Fresh baked muffin with real blueberries", price: 3.29, image: "muffin.jpg" },
    { name: "Spinach Feta Quiche", description: "Savory egg tart with spinach and creamy feta cheese", price: 6.99, image: "spinach.jpg" },
    { name: "Smoked Salmon Bagel", description: "Toasted bagel with cream cheese, smoked salmon, and capers", price: 7.49, image: "bagel.jpg" },
    { name: "Breakfast Wrap", description: "Scrambled eggs, bacon, cheese in a warm tortilla", price: 5.99, image: "breakfast.jpg" },
    { name: "Mediterranean Greek Salad", description: "Fresh greens, feta, olives, cucumber, and Greek dressing", price: 8.49, image: "greeksalad.jpg" },
    { name: "Caprese Panini", description: "Grilled sandwich with fresh mozzarella, tomato, and basil", price: 7.99, image: "panini.jpg" },
    { name: "Fruit Danish", description: "Buttery pastry filled with seasonal fruit preserves", price: 3.79, image: "danish.jpg" }
  ];

  const seasonalSpecials = [
    { name: "Pumpkin Spice Latte", description: "Espresso with pumpkin spice syrup, topped with whipped cream", price: 5.49, image: "pumpkin.jpg" },
    { name: "Maple Cinnamon Latte", description: "Rich espresso with maple syrup and cinnamon, topped with foam", price: 4.99, image: "maple.jpg" },
    { name: "Eggnog Latte", description: "Holiday favorite with espresso, steamed eggnog, and nutmeg", price: 5.29, image: "eggnog.jpg" },
    { name: "Gingerbread Latte", description: "Espresso with gingerbread spices and whipped cream", price: 4.99, image: "gingerbread.jpg" },
    { name: "Spiced Apple Cider", description: "Warm apple cider with cinnamon, cloves, and orange zest", price: 4.49, image: "cider.jpg" },
    { name: "Peppermint Mocha", description: "Chocolate espresso with peppermint, topped with candy cane pieces", price: 5.29, image: "peppermint.jpg" },
    { name: "Caramel Brulée Latte", description: "Espresso with caramel brulée sauce and whipped cream", price: 5.49, image: "caramel.jpg" },
    { name: "Cherry Blossom Tea", description: "Seasonal white tea infused with cherry blossom flavors", price: 4.29, image: "cherry.jpg" },
    { name: "Irish Cream Cold Brew", description: "Cold brew with Irish cream flavored foam", price: 4.79, image: "irish.jpg" },
    { name: "Lavender Honey Latte", description: "Espresso with lavender-infused honey and steamed milk", price: 5.19, image: "lavender.jpg" }
  ];

  const desserts = [
    { name: "Chocolate Cake", description: "Rich, moist chocolate cake with ganache frosting", price: 5.99, image: "cake.jpg" },
    { name: "New York Cheesecake", description: "Creamy classic cheesecake with graham cracker crust", price: 6.49, image: "cheesecake.jpg" },
    { name: "Tiramisu", description: "Italian dessert with coffee-soaked ladyfingers and mascarpone", price: 5.99, image: "tiramisu.jpg" },
    { name: "French Macarons", description: "Assorted flavors of delicate almond meringue cookies", price: 4.49, image: "macarons.jpg" },
    { name: "Apple Pie", description: "Warm spiced apple filling in a flaky butter crust", price: 5.49, image: "applepie.jpg" },
    { name: "Fudge Brownie", description: "Dense chocolate brownie with walnuts and fudge chunks", price: 3.99, image: "brownie.jpg" },
    { name: "Lemon Tart", description: "Tangy lemon curd in a sweet shortbread shell", price: 4.79, image: "lemontart.jpg" },
    { name: "Crème Brûlée", description: "Creamy vanilla custard with caramelized sugar top", price: 5.29, image: "creme.jpg" },
    { name: "Carrot Cake", description: "Spiced carrot cake with cream cheese frosting", price: 5.49, image: "carrot.jpg" },
    { name: "Fresh Fruit Tart", description: "Buttery pastry filled with custard and topped with seasonal fruits", price: 5.99, image: "fruit.jpg" }
  ];

  return (
    <div className='menubody'>
    <div className="menupage">
      {/* Navbar */}
      <nav className="navbar1">
        <div className="logo1">CafeConnect</div>
        <div className="navlinks1">
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="#contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/account"><FontAwesomeIcon icon={faUser} /> Account</Link>
        </div>
      </nav>

      {/* Cart counter */}
      <Link to="/cart" className="cartlink">
        <div className="cartcounter">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span id="cartcount">{cartCount}</span> items
        </div>
      </Link>

      {/* Toast notification */}
      <div className={`toast ${showToast ? 'visible' : ''}`} id="toast">
        <FontAwesomeIcon icon={faCheckCircle} />
        <span id="toastmessage">{toastMessage}</span>
      </div>

      {/* Bestsellers Sliding Window */}
      <section className="bestsellers">
        <h2 className="sectiontitle">Bestsellers</h2>
        <div className="container">
          <div className="slide" ref={bestsellerRef} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {bestsellerItems.map((item, index) => (
              <div
                key={index}
                className="item"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="content">
                  <div className="name">{item.name}</div>
                  <div className="description">{item.description}</div>
                  <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="button">
            <button className="prev" style={{ backgroundColor: '#2c1810' }} onClick={prevBestsellerSlide}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button className="next" style={{ backgroundColor: '#2c1810' }} onClick={nextBestsellerSlide}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>

      {/* Hot Drinks section */}
      <section className="menusection">
        <h2 className="sectiontitle">Hot Drinks</h2>
        <div className="menucontainer">
          <div className="menuitems" ref={hotDrinksRef}>
            {hotDrinks.map((item, index) => (
              <div className="menuitem" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="scrollbtn prev" onClick={() => scroll(hotDrinksRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="scrollbtn next" onClick={() => scroll(hotDrinksRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Cold Drinks */}
      <section className="menusection">
        <h2 className="sectiontitle">Cold Drinks</h2>
        <div className="menucontainer">
          <div className="menuitems" ref={coldDrinksRef}>
            {coldDrinks.map((item, index) => (
              <div className="menuitem" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="scrollbtn prev" onClick={() => scroll(coldDrinksRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="scrollbtn next" onClick={() => scroll(coldDrinksRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Food Items */}
      <section className="menusection">
        <h2 className="sectiontitle">Food Items</h2>
        <div className="menucontainer">
          <div className="menuitems" ref={foodRef}>
            {foodItems.map((item, index) => (
              <div className="menuitem" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="srollbtn prev" onClick={() => scroll(foodRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="srollbtn next" onClick={() => scroll(foodRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Season Specials */}
      <section className="menusection">
        <h2 className="sectiontitle">Seasonal Specials</h2>
        <div className="menucontainer">
          <div className="menuitems" ref={seasonalSpecialsRef}>
            {seasonalSpecials.map((item, index) => (
              <div className="menuitem" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="srollbtn prev" onClick={() => scroll(seasonalSpecialsRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="srollbtn next" onClick={() => scroll(seasonalSpecialsRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Desserts Section */}
      <section className="menusection">
        <h2 className="sectiontitle">Desserts</h2>
        <div className="menucontainer">
          <div className="menuitems" ref={dessertsRef}>
            {desserts.map((item, index) => (
              <div className="menuitem" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="srollbtn prev" onClick={() => scroll(dessertsRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="srollbtn next" onClick={() => scroll(dessertsRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footergrid" id="contact">
          <div>
            <h3>About Us</h3>
            <p>Your perfect spot for great coffee and warm conversations.</p>
            <div className="sociallinks">
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link to="/menu" className="quicklinks">Menu</Link><br />
            <Link to="/location" className="quicklinks">Locations</Link><br />
            <Link to="/careers" className="quicklinks">Careers</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p>123 Coffee Street</p>
            <p>contact@cafeconnect.com</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p>&copy; 2025 CafeConnect. All rights reserved.</p>
        </div>
      </footer>

      {/* Customization Modal */}
      {showCustomizationModal && (
        <div id="customizationModal" className="modal">
          <div className="modalcontent">
            <span id="closeCustomizationModal" className="close" onClick={closeCustomizationModal}>&times;</span>
            <h2 id="customizationModalTitle">Customize {currentItem?.name}</h2>
            <div id="customizationOptions">
              {/* Customization options would be dynamically inserted here */}
              <div className="customizationoption">
                <label>Size:</label>
                <select>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              <div className="customizationoption">
                <label>Milk Type:</label>
                <select>
                  <option>Regular</option>
                  <option>Almond</option>
                  <option>Oat</option>
                  <option>Soy</option>
                </select>
              </div>
              <div className="customizationoption">
                <label>Sugar Level:</label>
                <select>
                  <option>Regular</option>
                  <option>Less Sugar</option>
                  <option>No Sugar</option>
                </select>
              </div>
            </div>
            <div className="modalactions">
              <button id="addCustomizedItemToCart" className="btnprimary" onClick={addCustomizedItemToCart}>
                Add to Cart
              </button>
              <button onClick={closeCustomizationModal} className="btnsecondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Menu;