const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//////////
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

///linking associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

///
sequelize
  .sync()
  .then((result) => {
    return User.FindById(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Makda',
        email: 'test@test.com',
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })

  .catch((err) => {
    // console.log(err);
    //
  });
