const express = require('express')
const router = express.Router()

const controller = require('../controllers/RootController.js');

router.get('/list-collections', controller.listCollections)

router.get('/:name/list', controller.list);
router.get('/:name/trash', controller.trash);
router.get('/:name/findID/:_id', controller.findID);

router.post('/:name/insert', controller.insert);
router.patch('/:name/update/:_id', controller.update);
router.put('/:name/replace/:_id', controller.replace);

router.patch('/:name/remove/:_id', controller.remove);
router.patch('/:name/restore/:_id', controller.restore);
router.delete('/:name/destroy/:_id', controller.destroy);

router.post('/:name/insert-list', controller.insert_list);
router.patch('/:name/remove-list', controller.remove_list);
router.patch('/:name/restore-list', controller.restore_list);
router.delete('/:name/destroy-list', controller.destroy_list);
router.delete('/:name/destroy-trash', controller.destroy_trash);
router.delete('/:name/destroy-all', controller.destroy_all);

module.exports = router
