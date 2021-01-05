


exports.getPost = async (req, res, next) => { 
     
    res.json({
        posts: [
            {
                title: 'my first post',
                description: 'Tu es sûr de ne pas avoir fait de faute dans ton code en écrivant "mysql" lors de la création de ton instance de PDO ?',
                user: req.user
            },
            {
                title: 'my second post',
                description: 'Ça marche, mais je vois pas quand ou comment l\'espace s\'est glissé... Merci beaucoup !',
                user: req.user
            }

        ]
    }); 
 
} ;