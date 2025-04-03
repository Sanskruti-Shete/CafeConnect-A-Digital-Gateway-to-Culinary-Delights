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
import CurrencyConverter from '../components/CurrencyConvertor'; // Import the currency converter component
import cappuccino from "../images/cappuccino.png";
import americano from "../images1/americano.jpg";
import applepie from "../images1/applepie.jpg";
import bagel from "../images1/bagel.jpg";
import breakfast from "../images1/breakfast.jpg";
import brownie from "../images1/brownie.jpg";
import cake from "../images1/cake.jpg";
import croissant from "../images1/croissant.jpg";
import capu from "../images1/capu.jpg";
import caramel from "../images1/caramel.jpg";
import carrot from "../images1/carrot.jpg";
import chai from "../images1/chai.jpg";
import cheesecake from "../images1/cheesecake.jpg";
import cherry from "../images1/cherry.jpg";
import cider from "../images1/cider.jpg";
import coconut from "../images1/coconut.jpg";
import creme from "../images1/creme.jpg";
import danish from "../images1/danish.jpg";
import eggnog from "../images1/eggnog.jpg";
import espresso from "../images1/espresso.jpg";
import espresso1 from "../images1/espresso1.jpg";
import frappuccino from "../images1/frappuccino.jpg";
import fruit from "../images1/fruit.jpg";
import gingerbread from "../images1/gingerbread.jpg";
import greeksalad from "../images1/greeksalad.jpg";
import greendetox from "../images1/greendetox.jpg";
import greentea from "../images1/greentea.jpg";
import herbal from "../images1/herbal.jpg";
import hotchocolate from "../images1/hotchocolate.jpg";
import icedcoffee from "../images1/icedcoffee.jpg";
import irish from "../images1/irish.jpg";
import latte from "../images1/latte.jpg";
import lassi from "../images1/lassi.jpg";
import lavender from "../images1/lavender.jpg";
import lemonade from "../images1/lemonade.jpg";
import lemontart from "../images1/lemontart.jpg";
import londonfog from "../images1/londonfog.jpg";
import macchiato from "../images1/macchiato.jpg";
import macarons from "../images1/macarons.jpg";
import maple from "../images1/maple.jpg";
import matcha from "../images1/matcha.jpg";
import mocha from "../images1/mocha.jpg";
import muffin from "../images1/muffin.jpg";
import nitro from "../images1/nitro.jpg";
import panini from "../images1/panini.jpg";
import peach from "../images1/peach.jpg";
import passionfruit from "../images1/passionfruit.jpg";
import peppermint from "../images1/peppermint.jpg";
import pumpkin from "../images1/pumpkin.jpg";
import salad from "../images1/salad.jpg";
import sandwich from "../images1/sandwich.jpg";
import smoothie from "../images1/smoothie.jpg";
import strawberry from "../images1/strawberry.jpg";
import spinach from "../images1/spinach.jpg";
import tiramisu from "../images1/tiramisu.jpg";

const Menu = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Currency conversion states
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('$');

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

  // Update prices based on selected currency
  const updatePrices = (currency, rate, symbol) => {
    setCurrentCurrency(currency);
    setCurrencyRate(rate);
    setCurrencySymbol(symbol || '$');
  };

  const addToCart = (name, price) => {
    // Convert price to current currency before adding to cart
    const convertedPrice = price * currencyRate;
    
    // Get existing cart or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to cart with currency info
    cart.push({ 
      name, 
      price: convertedPrice, 
      quantity: 1,
      currency: currentCurrency,
      symbol: currencySymbol
    });
    
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
      image: cappuccino,
      price: 2.99
    },
    {
      name: "Caramel Latte",
      description: "Smooth espresso blended with steamed milk and rich caramel syrup",
      image: latte,
      price: 2.99
    },
    {
      name: "Double Espresso",
      description: "Intense, full-bodied double shot of our premium roasted coffee",
      image: espresso,
      price: 2.99
    },
    {
      name: "Chocolate Mocha",
      description: "Decadent espresso with rich chocolate and topped with whipped cream",
      image: mocha,
      price: 2.99
    },
    {
      name: "Americano",
      description: "Classic espresso diluted with hot water for a smooth, bold flavor",
      image: americano,
      price: 2.99
    },
    {
      name: "Java Chip Frappe",
      description: "Blended coffee with chocolate chips, topped with whipped cream",
      image: frappuccino,
      price: 2.99
    }
  ];

  const hotDrinks = [
    { name: "Espresso", description: "Rich and intense single shot of premium coffee", price: 2.99, image: espresso1 },
    { name: "Green Tea", description: "Premium Japanese green tea, perfectly steeped", price: 3.29, image: greentea },
    { name: "Hot Chocolate", description: "Rich chocolate with steamed milk and whipped cream", price: 4.29, image: hotchocolate },
    { name: "Macchiato", description: "Espresso marked with a dollop of foamed milk", price: 3.49, image: macchiato },
    { name: "Chai Latte", description: "Spiced tea blend with steamed milk and honey", price: 4.49, image: chai },
    { name: "Classic Cappuccino", description: "Perfectly balanced espresso with velvety steamed milk", price: 3.79, image: capu },
    { name: "London Fog", description: "Earl Grey tea with vanilla and steamed milk", price: 4.19, image: londonfog },
    { name: "Long Black", description: "Double shot espresso with hot water", price: 3.29, image: americano },
    { name: "Herbal Infusion", description: "Calming blend of chamomile, lavender, and mint", price: 3.49, image: herbal },
    { name: "Matcha Latte", description: "Premium green tea powder with steamed milk", price: 4.79, image: matcha }
  ];

  const coldDrinks = [
    { name: "Iced Coffee", description: "Cold brewed coffee served over ice", price: 3.99, image: icedcoffee },
    { name: "Berry Smoothie", description: "Mixed berries blended with yogurt and honey", price: 5.49, image: smoothie },
    { name: "Fresh Lemonade", description: "Housemade lemonade with fresh mint", price: 3.99, image: lemonade },
    { name: "Peach Iced Tea", description: "Fresh brewed tea with peach flavor", price: 3.79, image: peach },
    { name: "Mango Lassi", description: "Creamy yogurt drink with ripe mango pulp", price: 4.99, image: lassi },
    { name: "Nitro Cold Brew", description: "Smooth cold brew infused with nitrogen", price: 4.49, image: nitro },
    { name: "Green Detox Juice", description: "Fresh blend of kale, apple, and cucumber", price: 5.29, image: greendetox },
    { name: "Fresh Coconut Water", description: "Pure, hydrating coconut water served chilled", price: 3.99, image: coconut },
    { name: "Passion Fruit Cooler", description: "Refreshing tropical blend with passion fruit", price: 4.79, image: passionfruit },
    { name: "Strawberry Refresher", description: "Light, fruity drink with fresh strawberry essence", price: 4.29, image: strawberry }
  ];

  const foodItems = [
    { name: "Butter Croissant", description: "Freshly baked flaky croissant", price: 3.49, image: croissant },
    { name: "Club Sandwich", description: "Triple-decker with turkey, bacon, and avocado", price: 8.99, image: sandwich },
    { name: "Quinoa Salad", description: "Mixed greens with quinoa and grilled chicken", price: 9.99, image: salad },
    { name: "Blueberry Muffin", description: "Fresh baked muffin with real blueberries", price: 3.29, image: muffin },
    { name: "Spinach Feta Quiche", description: "Savory egg tart with spinach and creamy feta cheese", price: 6.99, image: spinach },
    { name: "Smoked Salmon Bagel", description: "Toasted bagel with cream cheese, smoked salmon, and capers", price: 7.49, image: bagel },
    { name: "Breakfast Wrap", description: "Scrambled eggs, bacon, cheese in a warm tortilla", price: 5.99, image: breakfast },
    { name: "Mediterranean Greek Salad", description: "Fresh greens, feta, olives, cucumber, and Greek dressing", price: 8.49, image: greeksalad },
    { name: "Caprese Panini", description: "Grilled sandwich with fresh mozzarella, tomato, and basil", price: 7.99, image: panini },
    { name: "Fruit Danish", description: "Buttery pastry filled with seasonal fruit preserves", price: 3.79, image: danish }
  ];

  const seasonalSpecials = [
    { name: "Pumpkin Spice Latte", description: "Espresso with pumpkin spice syrup, topped with whipped cream", price: 5.49, image: pumpkin },
    { name: "Maple Cinnamon Latte", description: "Rich espresso with maple syrup and cinnamon, topped with foam", price: 4.99, image: maple },
    { name: "Eggnog Latte", description: "Holiday favorite with espresso, steamed eggnog, and nutmeg", price: 5.29, image: eggnog },
    { name: "Gingerbread Latte", description: "Espresso with gingerbread spices and whipped cream", price: 4.99, image: gingerbread },
    { name: "Spiced Apple Cider", description: "Warm apple cider with cinnamon, cloves, and orange zest", price: 4.49, image: cider },
    { name: "Peppermint Mocha", description: "Chocolate espresso with peppermint, topped with candy cane pieces", price: 5.29, image: peppermint },
    { name: "Caramel Brulée Latte", description: "Espresso with caramel brulée sauce and whipped cream", price: 5.49, image:caramel },
    { name: "Cherry Blossom Tea", description: "Seasonal white tea infused with cherry blossom flavors", price: 4.29, image: cherry },
    { name: "Irish Cream Cold Brew", description: "Cold brew with Irish cream flavored foam", price: 4.79, image: irish },
    { name: "Lavender Honey Latte", description: "Espresso with lavender-infused honey and steamed milk", price: 5.19, image: lavender }
  ];

  const desserts = [
    { name: "Chocolate Cake", description: "Rich, moist chocolate cake with ganache frosting", price: 5.99, image: cake },
    { name: "New York Cheesecake", description: "Creamy classic cheesecake with graham cracker crust", price: 6.49, image: cheesecake },
    { name: "Tiramisu", description: "Italian dessert with coffee-soaked ladyfingers and mascarpone", price: 5.99, image: tiramisu },
    { name: "French Macarons", description: "Assorted flavors of delicate almond meringue cookies", price: 4.49, image: macarons },
    { name: "Apple Pie", description: "Warm spiced apple filling in a flaky butter crust", price: 5.49, image: applepie },
    { name: "Fudge Brownie", description: "Dense chocolate brownie with walnuts and fudge chunks", price: 3.99, image: brownie },
    { name: "Lemon Tart", description: "Tangy lemon curd in a sweet shortbread shell", price: 4.79, image: lemontart },
    { name: "Crème Brûlée", description: "Creamy vanilla custard with caramelized sugar top", price: 5.29, image: creme },
    { name: "Carrot Cake", description: "Spiced carrot cake with cream cheese frosting", price: 5.49, image: carrot },
    { name: "Fresh Fruit Tart", description: "Buttery pastry filled with custard and topped with seasonal fruits", price: 5.99, image: fruit }
  ];

  return (
    <div className='menubody'>
    <div className="menupage">
      {/* Navbar */}
      <nav className="navbar1">
        <div className="logo1">CafeConnect</div>
        <div className="navlinks1">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/about">About</a>
            <a href="#contact">Contact</a>
            <a href="/login">Login</a>
        </div>
      </nav>

      {/* Currency Converter Component */}
      <CurrencyConverter updatePrices={updatePrices} />

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

      {/* Currency indicator */}
      <div style={{
        position: 'fixed',
        left: '20px',
        top: '100px',
        zIndex: 1000,
        background: '#2c1810',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        Prices in: {currentCurrency}
      </div>

      {/* Bestsellers Sliding Window */}
      <section className="bestsellers">
        <h2 className="sectiontitle1">Bestsellers</h2>
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
                  <div className="price" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>
                    {currencySymbol}{(item.price * currencyRate).toFixed(2)}
                  </div>
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
      <section className="menusection1">
        <h2 className="sectiontitle1">Hot Drinks</h2>
        <div className="menucontainer1">
          <div className="menuitems1" ref={hotDrinksRef}>
            {hotDrinks.map((item, index) => (
              <div className="menuitem1" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{currencySymbol}{(item.price * currencyRate).toFixed(2)}</div>
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
      <section className="menusection1">
        <h2 className="sectiontitle1">Cold Drinks</h2>
        <div className="menucontainer1">
          <div className="menuitems1" ref={coldDrinksRef}>
            {coldDrinks.map((item, index) => (
              <div className="menuitem1" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{currencySymbol}{(item.price * currencyRate).toFixed(2)}</div>
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
      <section className="menusection1">
        <h2 className="sectiontitle1">Food Items</h2>
        <div className="menucontainer1">
          <div className="menuitems1" ref={foodRef}>
            {foodItems.map((item, index) => (
              <div className="menuitem1" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{currencySymbol}{(item.price * currencyRate).toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="scrollbtn prev" onClick={() => scroll(foodRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="scrollbtn next" onClick={() => scroll(foodRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Season Specials */}
      <section className="menusection1">
        <h2 className="sectiontitle1">Seasonal Specials</h2>
        <div className="menucontainer1">
          <div className="menuitems1" ref={seasonalSpecialsRef}>
            {seasonalSpecials.map((item, index) => (
              <div className="menuitem1" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{currencySymbol}{(item.price * currencyRate).toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="scrollbtn prev" onClick={() => scroll(seasonalSpecialsRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="scrollbtn next" onClick={() => scroll(seasonalSpecialsRef, 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      {/* Desserts Section */}
      <section className="menusection1">
        <h2 className="sectiontitle1">Desserts</h2>
        <div className="menucontainer1">
          <div className="menuitems1" ref={dessertsRef}>
            {desserts.map((item, index) => (
              <div className="menuitem1" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{currencySymbol}{(item.price * currencyRate).toFixed(2)}</div>
                <button className="addtocart" onClick={() => addToCart(item.name, item.price)}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="scrollbtn prev" onClick={() => scroll(dessertsRef, 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="scrollbtn next" onClick={() => scroll(dessertsRef, 'right')}>
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