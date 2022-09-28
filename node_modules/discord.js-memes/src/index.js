const Discord = require("discord.js")
const etotal = require("../functions/total")
const famous = require("../functions/famous")
const cinema = require("../functions/cinema")
const english = require("../functions/english")
const all = require("../functions/allmemes")
const efamous = require("../functions/efamous")


class sMeme {
    constructor(_type){
        
       
    }
   

        
    
    setType(_type){
        
        switch(_type){
            case 1: {
                return etotal()
            }
            break;
            case 2:{
                return famous()
            }
            break;
            case 3: {
                return cinema()
            }
            break;
            
        }

        if(_type && _type !== 1&&2&&3){
            throw new Error(`[DISCORD.JS-MEMES] INVALID TYPE OF MEME WAS PROVIDED: You provide an invalid type of meme. Reading(${_type})`)
        }

        if(!_type){
            throw new Error("[DISCORD.JS-MEMES] NO TYPE OF MEME WAS PROVIDED: You did not provide a type of meme")
        }

        
       
      
        

       

            
    
}
}


class eMeme{
    constructor(_type){
        
    }

    setType(_type){
    
        
      switch(_type){
          case 1:{
              return english()
          }
          break;
          case 2: {
              return efamous()
          }
          break;
     
      }

      
      if(_type && _type !== 1&&2){
        throw new Error(`[DISCORD.JS-MEMES] INVALID TYPE OF MEME WAS PROVIDED: You provide an invalid type of meme. Reading(${_type})`)
      }
      if(!_type){
        throw new Error("[DISCORD.JS-MEMES] NO TYPE OF MEME WAS PROVIDED: You did not provide a type of meme")
      }
      
        }
}









module.exports = {
    sMeme,
    eMeme,
    all

    
}

