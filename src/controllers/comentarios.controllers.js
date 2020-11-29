const { Router } = require("express");

const comenCtrl = {};
const Comentario = require('../models/Comentarios');

comenCtrl.renderComentForm = (req, res) =>{
    res.render('comments/new-comment')
};

comenCtrl.createNewComent = async (req, res)=>{
    const {title, description} = req.body;
    const newComent = new Comentario({title, description});
    newComent.idUser = req.user.id;
    newComent.user = req.user.name;
    await newComent.save();
    req.flash('success_cmt', 'Comentario publicado exitosamente');
    res.redirect('/tlahcos')
};

comenCtrl.renderComents = async (req, res)=>{
    const coments = await Comentario.find({idUser: req.user.id}).sort({createdAt: 'desc'});
    res.render('comments/all-comments', {coments});
};

comenCtrl.renderComent = async (req, res)=>{
    const coments = await Comentario.find();
    res.render('../views/tlahco', {coments});
};

comenCtrl.renderEditForm = async (req, res)=>{
    const coment = await Comentario.findById(req.params.id);
    if(coment.idUser != req.user.id){
        req.flash('error_msg', 'Error no ahutorizado');
        return res.redirect('/tlahco');

    }
    res.render('comments/edit-comment', { coment });
};

comenCtrl.updateComent = async (req, res)=>{
    const {title, description} = req.body;
    await Comentario.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_cmt', 'Comentario actualizado satisfactoriamente')
    res.redirect('/tlahcos');
}

comenCtrl.deleteComent = async (req, res)=>{
    await Comentario.findByIdAndDelete(req.params.id); //Se colocal el await porque es u  metodo asincrono
    req.flash('success_cmt', 'Comentario eliminado satisfactoriamente')
    res.redirect('/tlahcos')
}

module.exports = comenCtrl;