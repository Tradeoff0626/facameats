const models = require('../../models');

exports.get_shops = async ( _ , res ) => {

    try{

        const shops = await models.Shops.findAll();

        res.render( 'admin/shops.html' , { shops });

    }catch(e){

    }

}

exports.get_shops_write = ( _ , res ) => {
  res.render( 'admin/form.html' );
}

exports.post_shops_write = async (req,res) => {

    try{

		await models.Shops.create(req.body);
        res.redirect('/admin/shops');

    }catch(e){
        console.log(e);
    }
};

exports.get_shops_detail = async(req, res) => {

    try{

	//const shop = await models.Shops.findByPk(req.params.id);      //Shops 정보만 조회
    const shop = await models.Shops.findOne( {                      //ShopsMenu도 같이 조회
        where : {
            id : req.params.id
        },
        include : [                                                 
            'Menu'                                                  //Shops.js의 Shops.associate()에서 as 로 설정한 값. 템플릿에서 'shop.Menu'로 접근 가능.
        ]
    })

      res.render('admin/detail.html', { shop });  

    }catch(e){
        console.log(e)
    }


}


exports.get_shops_edit = async(req, res) => {

    try{

        const shop = await models.Shops.findByPk(req.params.id);
        res.render('admin/form.html', { shop });  

    }catch(e){

    }


}

exports.post_shops_edit = async(req, res) => {

    try{

        await models.Shops.update(
            req.body , 
            { 
                where : { id: req.params.id } 
            }
        );
        res.redirect('/admin/shops/detail/' + req.params.id );

    }catch(e){

    }

}

exports.get_shops_delete = async(req, res) => {

    try{

        await models.Shops.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/shops');

    }catch(e){

    }

}


//상점(Shops)의 메뉴(ShopsMenu) 추가
exports.add_menu = async(req, res) => {

    try {

        const shop = await models.Shops.findByPk(req.params.id);
        await shop.createMenu(req.body);                       //shopMenu의 Menu는 Shops.js의 Shops.associate()에서 as로 설정한 값. 
        res.redirect('/admin/shops/detail/' + req.params.id);
        
    } catch (e) {
        console.log(e);
    }

}


//상점(Shops)의 메뉴(ShopsMenu) 삭제
exports.remove_menu = async(req, res) => {

    try {

        await models.ShopsMenu.destroy({
            where : {
                id : req.params.menu_id
            }
        });

        res.redirect('/admin/shops/detail/' + req.params.shop_id);

    } catch (e) {
        console.log(e);
    }
}

