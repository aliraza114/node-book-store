exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie')
    .split(';')[0].trim().split('=')[1]
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    User.findById('')
    .then(user => {
        req.session.isLoggedIn = true
        req.session.user = user 
        req.session.save(err =>{
            
            res.redirect('/')
        })
    })
    
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
}