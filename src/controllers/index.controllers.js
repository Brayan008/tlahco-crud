const indexCrtl = {};

indexCrtl.renderIndex = (req, res)=>{
    res.render('index')
};

indexCrtl.renderTlahco = (req, res)=>{
    res.render('tlahco')
};

module.exports = indexCrtl;