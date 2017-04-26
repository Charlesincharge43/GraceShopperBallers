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
    title: 'Lebron James',
    description: 'jersey for cavs bandwagon fans',
    price: 199,
    inventory: 100,
    imageUrl: 'https://cavs-staging-cavaiersholdings.netdna-ssl.com/content/images/thumbs/0020957_23-lebron-james-2nd-alt-swingman-jersey_415.jpeg',
    category_id: 1,
  },
  {
    title: 'Russel Westbrook',
    description: 'tripledouble machineee',
    price: 159,
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

  {
    title: 'Michael Jordan',
    description: 'blah blah blah this product is awesome, spend money.',
    price:199,
    inventory: 10,
    imageUrl: 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_1191000/ff_1191816_xl.jpg&w=340',
    category_id: 1,
  },

  {
    title: 'Allen Iverson',
    description: 'blah blah blah this product is awesome, spend money',
    price:129,
    inventory: 10,
    imageUrl: 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_384000/FF_384730_xl.jpg&w=340',
    category_id: 1,
  },
  {
    title: 'Steph Curry',
    description: 'blah blah blah this product is awesome, spend money',
    price:199,
    inventory: 10,
    imageUrl: 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_714000/ff_714312_xl.jpg&w=340',
    category_id: 1,
  },
  {
    title: 'Derrick Rose',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_384000/FF_384730_xl.jpg&w=340',
    category_id: 1,
  },
  {
    title: 'KD 9\'s',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://images.champssports.com/is/image/EBFL2/47504416_fr_sc7?hei=1500&wid=1500',
    category_id: 2,
  },
  {
    title: 'Oladipo\'s',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://ballershoesdb.com/wp-content/uploads/2017/01/Jordan-Extra.Fly_.jpg',
    category_id: 2,
  },
  {
    title: 'Bron Bron\'s',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://lh3.googleusercontent.com/-y5GlJVpiGHk/VYJmKUxFhzI/AAAAAAAEgBc/2pZC4prZoMY/s600/nike-zoom-soldier-9-gr-sprite-3-05.jpg',
    category_id: 2,
  },
    {
    title: 'Lakers World Championship Ring \'10',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://cdn3.volusion.com/nsknt.fmgpw/v/vspfiles/photos/RNBA2000LAKERS-2.jpg',
    category_id: 3,
  },
    {
    title: 'Signed Jordan Poster (picture included)',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://cdn.sportsmemorabilia.com/sports-product-image/jordan-michael-auto-gatorade-16x20-photo-1325-t193160-500.jpg',
    category_id: 3,
  },
  {
    title: 'Signed Durant Jersey',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41ZarJ1IZuL.jpg',
    category_id: 3,
  },
    {
    title: 'Kevin McHale',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/564x/a7/71/90/a7719019ad5771d700b53d0873202438.jpg',
    category_id: 4,
  },
    {
    title: 'Patrick Ewing',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_1785000/ff_1785898_xl.jpg&w=340',
    category_id: 4,
  },
    {
    title: 'Emeka Okafor',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/05/c1/49/05c149afde79f458f6d889af87784fa4.jpg',
    category_id: 4,
  },
    {
    title: 'Warrior\'s Poster',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://theinspirationgrid.com/wp-content/uploads/2013/05/Caroline-Blanchet-NBA-Posters-05.jpg',
    category_id: 5,
  },
  {
    title: 'Beastbrook',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/32124c32980711.569ba68e320ef.png',
    category_id: 5,
  },
  {
    title: 'Vince Carter',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://certifiedathlete.com/wp-content/uploads/2014/01/hi-res-72562075_crop_650x440.jpg',
    category_id: 5,
  },
  {
    title: 'Rockets vs. Thunder Game 6',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://www.houstontoyotacenter.com/assets/img/TC15full_OKC.jpg',
    category_id: 6,
  },
  {
    title: 'Grizzlies vs. Spurs Game 5',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://www.getmoresports.com/wp-content/uploads/2015/12/Memphis%20GrizzliesvsSan%20Antonio%20Spurs.jpg',
    category_id: 6,
  },
  {
    title: 'Bulls vs. Celtics Game 5',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'http://i.cdn.turner.com/drp/nba/bulls/sites/default/files/styles/hi_res_full_width/public/1617_preview_celtics_1200x698.jpg?itok=s8ep65YP',
    category_id: 6,
  },
  {
    title: 'Raptor\'s vs. Bucks Game 6',
    description: 'blah blah blah this product is awesome, spend money',
    price:600,
    inventory: 10,
    imageUrl: 'https://i.ytimg.com/vi/ktSl6leT5cE/maxresdefault.jpg',
    category_id: 6,
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
    name: 'Memorabilia',
    imageUrl: 'http://cdn.sportsmemorabilia.com/sports-product-image/1354-t1748799-340.jpg',
  },
  {
    name: 'Bobble Heads',
    imageUrl: 'http://4.bp.blogspot.com/-n7KE2VAEaiw/TawfM3ojziI/AAAAAAAAGrc/kk_QheeARgU/s1600/blog.naver.com__box05.jpg',
  },
  {
    name: 'Posters',
    imageUrl: 'https://d13yacurqjgara.cloudfront.net/users/38043/screenshots/2225066/nba_logos_complete_dribbble.png',
  },
  {
    name: 'Tickets',
    imageUrl: 'https://viamediatv.com/wp-content/uploads/2017/04/nba-playoffs-pic.jpg',
  }
]


// const orders = [
//   {
//     status: 'complete',
//     user_id: 1,
//   },
// ]

const reviewsbyAlex = [
  {
    product_id: 1,
    comments: "It's okay.  Too small.  Why doesn't this site let you buy different sizes?",
    rating: 2,
  },
]

const reviewsbyNish = [
  {
    product_id: 1,
    comments: "CAVS ARE THE BEST.  JUST LIKE THIS JERSEY",
    rating: 5,
  },
]

const reviewsbyCharles = [
  {
    product_id: 3,
    comments: "Jeremy Lin is the best bakstball player in the world.  I don't care what the stats say.",
    rating: 5,
  },
  {
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
        // console.log('************************************************')
        return Promise.map(products, function(product){
          return db.Product.create(product);
        })
      })
      // .then( () => {
      //   return Promise.map(orders, function(order){
      //     return db.Order.create(order);
      //   })
      // })
      .then( (products) => {
        return Promise.map(users, function (user) {
          return db.User.create(user);
        })
      })
      // .then( (users)=>{
      //     reviewsbyAlex[0].user_id=users[2].id
      //     db.Review.create()
      //   // return Promise.map(reviewsbyNish, function(review){
      //   //   review.user_id=users[0].id
      //   //   review.
      //   //   console.log(review)
      //   //   return db.Review.create(review);
      //   //   })
      //   // .then( ()=>{
      //   //   return Promise.map(reviewsbyCharles, function(review){
      //   //   review.user_id=users[1].id
      //   //   console.log(review)
      //   //   return db.Review.create(review);
      //   //   })
      //   // })
      //   // .then( ()=>{
      //   //
      //   //   return Promise.map(reviewsbyAlex, function(review){
      //   //   review.user_id=users[2].id
      //   //   console.log(review)
      //   //   return db.Review.create(review);
      //   //   })
      //   // })
      // })

    }
}
