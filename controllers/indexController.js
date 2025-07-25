function indexParse(req , res) {
    res.render('index' , { user : req.user});
}

module.exports =  { indexParse };