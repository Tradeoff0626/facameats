const { Router } = require('express');
const router = Router()

router.use('/admin', require('./admin'));
router.use('/accounts', require('./accounts'));     //계정 컨트롤러 추가
router.use('/auth', require('./auth'));             //계정 인증 컨트롤러 추가
router.use('/chat', require('./chat'));             //채팅 컨트롤러 추가
router.use('/', require('./home'));                 //홈 화면 컨트롤러 추가

module.exports = router;