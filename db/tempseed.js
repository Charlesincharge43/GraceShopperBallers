//DUMMY CURRENTORDER (PURELY FOR REFERENCE TO SEE HOW IT LOOKS LIKE)
// this is not an actual row of orders... rather it's the array of product on orders linked to the order in the table that is incomplete
// (or the array of products that is the value of the session.currentOrder or state.orders.currentPoO)
// let currentOrder=[
//   {price: null, qty: 1, product_id: 3, order_id: null, associatedProduct: {id: 3, title: 'Jeremy Lin Signed basketball', description: 'Signed by the best 3 week flash in the pan wonder in basketball history', price: 1000000, inventory: 2, imageUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1019747.1330898515!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/10682257.jpg'} },//session order will have a null order_id
//   {price: null, qty: 2, product_id: 1, order_id: null, associatedProduct: {id: 1, title: 'Lebrrn', description: 'jersey for cavs bandwagon fans', price: 1, inventory: 100, imageUrl: 'https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg'} }//lebron jersey
// ]

var Promise = require('bluebird');

const users = [
  {
    // id: 1,
    firstName: 'Nishdawg',
    lastName: 'Mehta',
    email: 'nish@nish.com',
    name: 'nish',
    password: '1234',
    created_at: '4-18-2017',
    updated_at: '4-18-2017',
  },
  {
    // id: 2,
    firstName: 'Charliiieeee',
    lastName: 'Long',
    email: 'charles@cool.mil',
    password: '1234',
    created_at: '4-18-2017',
    updated_at: '4-18-2017',
  },
  {
    // id: 3,
    firstName: 'Alex',
    lastName: 'Cherubin',
    email: 'alex@alex.com',
    password: '1234',
    created_at: '4-18-2017',
    updated_at: '4-18-2017',
  },
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@admin.com',
    password: '1234',
    created_at: '4-18-2017',
    updated_at: '4-18-2017',
    isAdmin: true,
  }
]

const products = [
  {
    title: 'Lebrrn',
    description: 'jersey for cavs bandwagon fans',
    price: 1,
    inventory: 100,
    imageUrl: 'https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg',
    category_id: 1,
  },
  {
    title: 'Westbrook Jersey',
    description: 'tripledouble machineee',
    price: 90,
    inventory: 80,
    imageUrl: 'https://images.footballfanatics.com/FFImage/thumb.aspx?i=/productimages/_978000/ff_978909_xl.jpg&w=340',
    category_id: 1,
  },
  {
    title: 'Jeremy Lin Signed basketball',
    description: 'Signed by the best 3 week flash in the pan wonder in basketball history',
    price: 1000000,
    inventory: 2,
    imageUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1019747.1330898515!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/10682257.jpg',
    category_id: 3,
  },
  {
    title: 'Jordan 12 pinnacle gold',
    description: 'buy it.  its made of real gold',
    price:600,
    inventory: 5,
    imageUrl: 'https://dtpmhvbsmffsz.cloudfront.net/posts/2016/12/06/58478fbb99086aafb4046485/m_58478fbb99086aafb4046486.jpg',
    category_id: 2,
  },
  {
    title: 'Curry 2 low chef',
    description: '"yes they may look like gym teacher shoes. but they also impart you with the ability to knock down half court shots as if they were free throws"',
    price:600,
    inventory: 10,
    imageUrl: 'https://images.solecollector.com/complex/image/upload/t_in_content_image/under-armour-chef-curry-sneakers-01_o8ew7s.jpg',
    category_id: 2,
  },
]

const categories = [
  {
    // id: 1,
    name: 'Jerseys',
    imageUrl: 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages%2f_1993000%2fff_1993196_xl.jpg&w=600',
  },
  {
    // id: 2,
    name: 'Shoes',
    imageUrl: 'http://www.air-foamposite-galaxy.com/images/0829/Nike-Air-Max-LeBron-James-11-P.S-ELITE-Gold-Black-Basketball-shoes.jpg',
  },
  {
    // id: 3,
    name: 'memorabilia',
    imageUrl: 'http://cdn.sportsmemorabilia.com/sports-product-image/1354-t1748799-340.jpg',
  },
]


const orders = [
  {
    status: 'complete',
    user_id: 1,
  },
]

const reviews = [
  {
    user_id: 3,
    product_id: 1,
    comments: "It's okay.  Too small.  Why doesn't this site let you buy different sizes?",
    rating: 2,
  },
  {
    user_id: 1,
    product_id: 1,
    comments: "CAVS ARE THE BEST.  JUST LIKE THIS JERSEY",
    rating: 5,
  },
  {
    user_id: 2,
    product_id: 3,
    comments: "Jeremy Lin is the best bakstball player in the world.  I don't care what the stats say.",
    rating: 5,
  },
  {
    user_id: 2,
    product_id: 5,
    comments: "Very stylish",
    rating: 4,
  },
]


module.exports={
  seed:   function (db) {

      return Promise.map(categories, function (category) {
        return db.Category.create(category);
      })
      .then( () => {
        return Promise.map(users, function (user) {
          return db.User.create(user);
        })
      })
      .then( () => {
        return Promise.map(products, function(product){
          return db.Product.create(product);
        })
      })
      .then( () => {
        return Promise.map(orders, function(order){
          return db.Order.create(order);
        })
      })
      .then( ()=>{
        return Promise.map(reviews, function(review){
          return db.Review.create(review);
        })
      })

    }
}
