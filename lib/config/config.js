module.exports = {
	port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
   'mongodb://marlon:marlon@ds061641.mongolab.com:61641/healthapp'
   //'mongodb://localhost/test'
}