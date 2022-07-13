const router = require('express').Router();

router.get('/', (req,res)=>{
    return res.render('page', {error : 'something went wrong'});
});

module.exports = router;
