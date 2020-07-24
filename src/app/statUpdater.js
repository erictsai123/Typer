const stats_default = {timeStart:0,timeEnd:0,numSpace:0,keyCounter:0,correctKey:0}

const enterStat = (type,payload=0) =>{
  return {type: type,payload:payload}
}

const statUpdater= (data=stats_default,event) =>{
  let timeStart, timeEnd,numSpace, keyCounter
  switch(event.type){
    case 'start':
      return Object.assign({},data,{timeStart:Date.now()})
    case 'end':
      return Object.assign({},data,{timeEnd:Date.now()})
    case 'key':
      return Object.assign({},data,{keyCounter:data.keyCounter+1,correctKey:data.correctKey+=event.payload})
    case 'space':
      return Object.assign({},data,{numSpace:data.numSpace+=event.payload,correctKey:data.correctKey+=event.payload,keyCounter:data.keyCounter+=1})
    case 'backtrackstat':
      return Object.assign({},data,{
        correctKey:data.correctKey-=event.payload[1]=='',
        numSpace:data.numSpace-=event.payload[1]=='' && event.payload[2] == ' ',
          keyCounter:data.keyCounter+1
      })
    case 'reset':
        return Object.assign({},stats_default)
    case 'refresh':
        return Object.assign({},data,{timeStart:0,timeEnd:0,numSpace:0})
    default:
      return data;
  }
}

export {enterStat, statUpdater}