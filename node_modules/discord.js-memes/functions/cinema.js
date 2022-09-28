function cinema(){
    let pmemes = [
        "http://cdn2.upsocl.com/wp-content/uploads/2017/10/1590f80982a9ebeba212575f6b611cc8.jpg",
        "https://ep01.epimg.net/verne/imagenes/2020/09/08/articulo/1599564224_241757_1599576767_sumario_normal.jpg",
        "https://www.lacasadeel.net/wp-content/uploads/2021/09/meme-de-Spider-Man.jpg",
        "https://pbs.twimg.com/media/Clfb62KUYAAtVTU.jpg",
        "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2020/01/destacada-memes-momentos-de-peli%CC%81cula-en-tu-vida.jpg",
        "https://www.soy502.com/sites/default/files/styles/mobile_full_node/public/2018/Dic/28/dvhlkw3vsaekaxx.jpg",
        "https://us.cdn.eltribuno.com/102019/1570720806895.jpg",
        "https://www.sdpnoticias.com/resizer/FxYQMKsOyd0JHBvdEM85MOtKQc8=/440x248/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sdpnoticias/B7JKSUHIDJECVFWCZH65VQHBPA.png",
        "https://as01.epimg.net/epik/imagenes/2018/03/05/portada/1520256687_631390_1520256766_noticia_normal.jpg",
        "http://images7.memedroid.com/images/UPLOADED572/60271a1036eda.jpeg",
        "https://images3.memedroid.com/images/UPLOADED317/6212106801d1c.jpeg",
        "https://images7.memedroid.com/images/UPLOADED663/620182867eb21.jpeg",
        "https://images3.memedroid.com/images/UPLOADED12/61fc0b381d0b2.jpeg",
        "https://images7.memedroid.com/images/UPLOADED482/61f77f838cb15.jpeg",
        "https://images7.memedroid.com/images/UPLOADED670/61f2f1acbbd87.jpeg",
        "https://images3.memedroid.com/images/UPLOADED741/61e36c6e5bed9.jpeg"
        
        
    ]
    return pmemes[Math.floor(Math.random() * pmemes.length)]
}

module.exports = cinema