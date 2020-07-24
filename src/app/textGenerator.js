import randomWords from 'random-words'

export default function generate(obj){
    let numArr = obj.num ? Array.from({length: Math.floor(0.3*obj.word)}, () => Math.floor(Math.random() * 100)) : []
    let wordArr = randomWords(Math.floor((1-obj.num*0.3)*obj.word))
    let surroundArr = Object.entries(obj.paran).filter(x=> x[0]!= 'all' && x[1])
    
    if (obj.cap){ wordArr = wordArr.map(x=>x[0].toUpperCase()+ x.slice(1))}
    if(surroundArr.length>0){
        wordArr = wordArr.map(x=>{
            let around = surroundArr[Math.floor(Math.random()*surroundArr.length)][0]
            return around[0] + x +around[2]
        })
    }
    if(obj.spChar.length>0){
        wordArr = wordArr.map(x=>obj.spChar[Math.floor(Math.random()*obj.spChar.length)]+x)
    }
    
    return wordArr.concat(numArr).sort((a,b)=>0.5-Math.random()).join(String.fromCharCode(0x2423))
}