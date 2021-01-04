
exports.get404 = (req, res, next) => {
    console.log('Page Not Found !')
    res.status(404).send('<h1> Page Not Found !</h1>');
} ;