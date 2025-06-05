import OGV from './OGV.png'
import shopbag from './shop-bag.png'
import profile from './profile-logo.png'
import poster from './Poster.jpg'
import apple from './apple.jpeg'
import banana from './banana.jpeg'
import bread from './bread.jpeg'
import carrot from './carrot.jpeg'
import cheese from './cheese.jpeg'
import cucumber from './cucumber.jpeg'
import grapes from './grapes.jpeg'
import mango from './mango.jpeg'
import milk from './milk.jpeg'
import onion from './onion.jpeg'
import orange from './orange.jpeg'
import pineapple from './pineapple.jpeg'
import pomegranate from './pomegranate.jpeg'
import potato from './potato.jpeg'
import rice from './rice.jpeg'
import sugar from './sugar.jpeg'
import tomato from './tomato.jpeg'
import wheatflour from './wheatflour.jpeg'
import spinach from './spinach.jpeg'
import capsicum from './capsicum.jpeg'
import adPhoto from './adPhoto.jpg'
import fruits from './fruits.jpg'
import vegetables from './vegetables.jpg'
import dairy from './dairy.jpg'
import groceries from './groceries.jpg'
import aboutPoster from './aboutPoster.jpg'
import organic from './organic.png'
import quality from './quality.png'
import bestPrice from './best-price.png'
import phone from './phone-call.png'
import mail from './email.png'
import location from './location.png'
import mastercard from './mastercard.png'
import visa from './visa.png'
import discover from './discover.png'
import paypal from './paypal.png'

export const assets = {
    OGV,
    shopbag,
    profile,
    poster,
    apple,
    banana,
    bread,
    carrot,
    cheese,
    cucumber,
    grapes,
    mango,
    milk,
    onion,
    orange,
    pineapple,
    pomegranate,
    potato,
    rice,
    sugar,
    tomato,
    wheatflour,
    spinach,
    capsicum,
    adPhoto,
    fruits,
    vegetables,
    dairy,
    groceries,
    aboutPoster,
    organic,
    quality,
    bestPrice,
    phone,
    mail,
    location,
    mastercard,
    visa,
    discover,
    paypal,

}

export const Categories = [
    "Dairy",
    "Fruits",
    "Groceries",
    "Vegetables"

]

export const productsData = [
    {
        "_id": "1",
        "name": "Apple",
        "category": "Fruits",
        "price": 120,
        "quantity": "1 kg",
        "image": apple,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and juicy apples sourced from organic farms. Perfect for a healthy snack or making delicious apple pies.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in fiber and antioxidants.</li><li>Boosts immunity and heart health.</li><li>Great for weight management.</li></ol>",
        "speciality": "Organic, juicy apples perfect for snacks and baking."
    },
    {
        "_id": "2",
        "name": "Tomato",
        "category": "Vegetables",
        "price": 50,
        "quantity": "1 kg",
        "image": tomato,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Green Harvest",
            "email": "greenharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Ripe and fresh tomatoes perfect for cooking and salads.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in vitamins and minerals.</li><li>Good for skin and eye health.</li><li>Enhances taste in various dishes.</li></ol>",
        "speciality": "Fresh, ripe tomatoes ideal for salads and cooking."
    },
    {
        "_id": "3",
        "name": "Rice",
        "category": "Groceries",
        "price": 80,
        "quantity": "5 kg",
        "image": rice,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Premium quality rice, ideal for daily consumption.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in carbohydrates for energy.</li><li>Easy to cook and digest.</li><li>Perfect for a variety of dishes.</li></ol>",
        "speciality": "Premium quality rice for daily meals and dishes."
    },
    {
        "_id": "4",
        "name": "Banana",
        "category": "Fruits",
        "price": 40,
        "quantity": "1 dozen",
        "image": banana,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Tropical Harvest",
            "email": "tropicalharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and nutritious bananas, great for breakfast and snacks.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in potassium and vitamins.</li><li>Boosts energy and digestion.</li><li>Good for heart health.</li></ol>",
        "speciality": "Sweet, nutritious bananas perfect for breakfast."
    },
    {
        "_id": "5",
        "name": "Carrot",
        "category": "Vegetables",
        "price": 60,
        "quantity": "1 kg",
        "image": carrot,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Farms",
            "email": "organicfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Crunchy and fresh carrots, perfect for salads and cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in beta-carotene and fiber.</li><li>Improves vision and skin health.</li><li>Boosts immunity and digestion.</li></ol>",
        "speciality": "Crunchy, fresh carrots great for salads and cooking."
    },
    {
        "_id": "6",
        "name": "Milk",
        "category": "Dairy",
        "price": 50,
        "quantity": "1 liter",
        "image": milk,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Dairy Fresh",
            "email": "dairyfresh@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and pure milk, sourced from organic farms.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in calcium and protein.</li><li>Strengthens bones and muscles.</li><li>Essential for overall growth.</li></ol>",
        "speciality": "Pure, organic milk for strong bones and muscles."
    },
    {
        "_id": "7",
        "name": "Potato",
        "category": "Vegetables",
        "price": 30,
        "quantity": "1 kg",
        "image": potato,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Green Harvest",
            "email": "greenharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Versatile and nutritious potatoes, ideal for various dishes.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in carbohydrates and vitamins.</li><li>Good for energy and digestion.</li><li>Easy to cook and store.</li></ol>",
        "speciality": "Versatile potatoes perfect for any dish."
    },
    {
        "_id": "8",
        "name": "Orange",
        "category": "Fruits",
        "price": 90,
        "quantity": "1 kg",
        "image": orange,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Juicy and sweet oranges, packed with vitamin C.</p><h2><strong>Benefits</strong></h2><ol><li>Boosts immunity and skin health.</li><li>Rich in antioxidants.</li><li>Great for hydration.</li></ol>",
        "speciality": "Juicy oranges packed with vitamin C."
    },
    {
        "_id": "9",
        "name": "Wheat Flour",
        "category": "Groceries",
        "price": 40,
        "quantity": "2 kg",
        "image": wheatflour,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>High-quality wheat flour for baking and cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in fiber and nutrients.</li><li>Good for digestion and energy.</li><li>Versatile for various recipes.</li></ol>",
        "speciality": "High-quality flour for baking and cooking."
    },
    {
        "_id": "10",
        "name": "Spinach",
        "category": "Vegetables",
        "price": 25,
        "quantity": "500 g",
        "image": spinach,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Farms",
            "email": "organicfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and leafy spinach, perfect for salads and cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in iron and vitamins.</li><li>Good for bone and skin health.</li><li>Boosts immunity and energy.</li></ol>",
        "speciality": "Fresh spinach rich in iron and vitamins."
    },
    {
        "_id": "11",
        "name": "Grapes",
        "category": "Fruits",
        "price": 150,
        "quantity": "1 kg",
        "image": grapes,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and juicy grapes, perfect for snacking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in antioxidants and vitamins.</li><li>Good for heart health.</li><li>Hydrating and refreshing.</li></ol>",
        "speciality": "Sweet grapes perfect for snacking."
    },
    {
        "_id": "12",
        "name": "Onion",
        "category": "Vegetables",
        "price": 20,
        "quantity": "1 kg",
        "image": onion,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Green Harvest",
            "email": "greenharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and pungent onions, essential for cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in antioxidants and vitamins.</li><li>Good for heart health and immunity.</li><li>Enhances flavor in dishes.</li></ol>",
        "speciality": "Fresh onions essential for flavorful cooking."
    },
    {
        "_id": "13",
        "name": "Sugar",
        "category": "Groceries",
        "price": 45,
        "quantity": "1 kg",
        "image": sugar,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Pure and natural sugar for daily use.</p><h2><strong>Benefits</strong></h2><ol><li>Provides quick energy.</li><li>Essential for baking and cooking.</li><li>Perfect for sweetening beverages.</li></ol>",
        "speciality": "Pure sugar for baking and sweetening."
    },
    {
        "_id": "14",
        "name": "Pineapple",
        "category": "Fruits",
        "price": 80,
        "quantity": "1 piece",
        "image": pineapple,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Tropical Harvest",
            "email": "tropicalharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and tangy pineapple, great for snacks and desserts.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in vitamins and enzymes.</li><li>Good for digestion and immunity.</li><li>Hydrating and refreshing.</li></ol>",
        "speciality": "Sweet pineapple perfect for snacks and desserts."
    },
    {
        "_id": "15",
        "name": "Cucumber",
        "category": "Vegetables",
        "price": 30,
        "quantity": "1 kg",
        "image": cucumber,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Farms",
            "email": "organicfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and crunchy cucumbers, perfect for salads.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in water and vitamins.</li><li>Good for hydration and skin health.</li><li>Low in calories.</li></ol>",
        "speciality": "Crunchy cucumbers ideal for salads."
    },
    {
        "_id": "16",
        "name": "Bread",
        "category": "Groceries",
        "price": 35,
        "quantity": "1 loaf",
        "image": bread,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and soft bread, ideal for breakfast and snacks.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in carbohydrates and fiber.</li><li>Good for energy and digestion.</li><li>Versatile for various recipes.</li></ol>",
        "speciality": "Soft bread perfect for breakfast and snacks."
    },
    {
        "_id": "17",
        "name": "Mango",
        "category": "Fruits",
        "price": 200,
        "quantity": "1 kg",
        "image": mango,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Tropical Harvest",
            "email": "tropicalharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and juicy mangoes, perfect for summer.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in vitamins and antioxidants.</li><li>Good for skin and immunity.</li><li>Delicious and refreshing.</li></ol>",
        "speciality": "Juicy mangoes, a summer delight."
    },
    {
        "_id": "18",
        "name": "Capsicum",
        "category": "Vegetables",
        "price": 70,
        "quantity": "1 kg",
        "image": capsicum,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Green Harvest",
            "email": "greenharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and colorful capsicums, great for cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in vitamins and antioxidants.</li><li>Good for skin and immunity.</li><li>Enhances flavor in dishes.</li></ol>",
        "speciality": "Colorful capsicums perfect for cooking."
    },
    {
        "_id": "19",
        "name": "Cheese",
        "category": "Dairy",
        "price": 120,
        "quantity": "500 g",
        "image": cheese,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Dairy Fresh",
            "email": "dairyfresh@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and creamy cheese, perfect for snacks and cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in calcium and protein.</li><li>Good for bones and muscles.</li><li>Versatile for various recipes.</li></ol>",
        "speciality": "Creamy cheese ideal for snacks and cooking."
    },
    {
        "_id": "20",
        "name": "Pomegranate",
        "category": "Fruits",
        "price": 180,
        "quantity": "1 kg",
        "image": pomegranate,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Juicy and nutritious pomegranates, great for health.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in antioxidants and vitamins.</li><li>Good for heart health and immunity.</li><li>Delicious and refreshing.</li></ol>",
        "speciality": "Nutritious pomegranates for health and taste."
    }
];

export const dealItems = [
    {
        "_id": "1",
        "name": "Banana",
        "category": "Fruits",
        "price": 40,
        "discountedPrice": 28,
        "quantity": "1 dozen",
        "image": banana,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Tropical Harvest",
            "email": "tropicalharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and nutritious bananas, great for breakfast and snacks.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in potassium and vitamins.</li><li>Boosts energy and digestion.</li><li>Good for heart health.</li></ol>",
        "speciality": "Sweet, nutritious bananas perfect for breakfast.",
    },
    {
        "_id": "2",
        "name": "Potato",
        "category": "Vegetables",
        "price": 30,
        "discountedPrice": 20,
        "quantity": "1 kg",
        "image": potato,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Green Harvest",
            "email": "greenharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Versatile and nutritious potatoes, ideal for various dishes.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in carbohydrates and vitamins.</li><li>Good for energy and digestion.</li><li>Easy to cook and store.</li></ol>",
        "speciality": "Versatile potatoes perfect for any dish.",
    },
    {
        "_id": "3",
        "name": "Grapes",
        "category": "Fruits",
        "price": 150,
        "discountedPrice": 120,
        "quantity": "1 kg",
        "image": grapes,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and juicy grapes, perfect for snacking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in antioxidants and vitamins.</li><li>Good for heart health.</li><li>Hydrating and refreshing.</li></ol>",
        "speciality": "Sweet grapes perfect for snacking.",
    },
    {
        "_id": "4",
        "name": "Pineapple",
        "category": "Fruits",
        "price": 80,
        "discountedPrice": 60,
        "quantity": "1 piece",
        "image": pineapple,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Tropical Harvest",
            "email": "tropicalharvest@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Sweet and tangy pineapple, great for snacks and desserts.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in vitamins and enzymes.</li><li>Good for digestion and immunity.</li><li>Hydrating and refreshing.</li></ol>",
        "speciality": "Sweet pineapple perfect for snacks and desserts.",
    },
    {
        "_id": "5",
        "name": "Bread",
        "category": "Groceries",
        "price": 35,
        "discountedPrice": 25,
        "quantity": "1 loaf",
        "image": bread,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and soft bread, ideal for breakfast and snacks.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in carbohydrates and fiber.</li><li>Good for energy and digestion.</li><li>Versatile for various recipes.</li></ol>",
        "speciality": "Soft bread perfect for breakfast and snacks.",
    },
    {
        "_id": "6",
        "name": "Cheese",
        "category": "Dairy",
        "price": 120,
        "discountedPrice": 90,
        "quantity": "500 g",
        "image": cheese,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Dairy Fresh",
            "email": "dairyfresh@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and creamy cheese, perfect for snacks and cooking.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in calcium and protein.</li><li>Good for bones and muscles.</li><li>Versatile for various recipes.</li></ol>",
        "speciality": "Creamy cheese ideal for snacks and cooking.",
    },
    {
        "_id": "7",
        "name": "Apple",
        "category": "Fruits",
        "price": 120,
        "discountedPrice": 90,
        "quantity": "1 kg",
        "image": apple,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Fresh Farms",
            "email": "freshfarms@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Fresh and juicy apples sourced from organic farms. Perfect for a healthy snack or making delicious apple pies.</p><h2><strong>Benefits</strong></h2><ol><li>Rich in fiber and antioxidants.</li><li>Boosts immunity and heart health.</li><li>Great for weight management.</li></ol>",
        "speciality": "Organic, juicy apples perfect for snacks and baking.",
    },
    {
        "_id": "8",
        "name": "Sugar",
        "category": "Groceries",
        "price": 45,
        "discountedPrice": 30,
        "quantity": "1 kg",
        "image": sugar,
        "supplier": {
            "_id": "670e4d25ca9fda8f1bf359b9",
            "name": "Organic Staples",
            "email": "organicstaples@demo.com",
            "image": "supplier_icon"
        },
        "description": "<p>Pure and natural sugar for daily use.</p><h2><strong>Benefits</strong></h2><ol><li>Provides quick energy.</li><li>Essential for baking and cooking.</li><li>Perfect for sweetening beverages.</li></ol>",
        "speciality": "Pure sugar for baking and sweetening.",
    },
]