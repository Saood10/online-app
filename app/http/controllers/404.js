
function npController(){
    return{
        index(req,res){
            res.status(404).send('404')
        }
    }
}

module.exports = npController