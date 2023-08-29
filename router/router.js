let express = require('express');
let router = express.Router();
let controller = require("../controller/controller");


router.post('/', function(req, res) {
    controller.insertcatintoDB(req, res);
});

router.get('/', (req, res) => {
    controller.getcatfromDB(req, res);
});

module.exports = router; 
