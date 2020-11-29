const {Router} = require('express')
const router = Router()

const {renderComentForm, 
    createNewComent, 
    renderComent,
    renderComents,
    renderEditForm, 
    updateComent, 
    deleteComent
} = require('../controllers/comentarios.controllers');

const {isAuthenticated}=require('../helpers/auth')

//New notes
router.get('/tlahco/add', isAuthenticated, renderComentForm);

router.post('/tlahco/nuevo-comentario', isAuthenticated, createNewComent);

//Get All notes
router.get('/tlahcos', isAuthenticated, renderComents)//Para ver mis notas
router.get('/tlahco', renderComent)//Para ver todas las notas

//Edit Notes
router.get('/tlahco/edit/:id', isAuthenticated, renderEditForm)

router.put('/tlahco/edit/:id', isAuthenticated, updateComent)

//Eliminar comentarios
router.delete('/tlahco/delete/:id', isAuthenticated, deleteComent)

module.exports = router