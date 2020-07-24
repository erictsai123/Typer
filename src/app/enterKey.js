const default_data = { index: 0, arr: [], last_char: true,error:'',prompt:''}
const enterKey = (key, type) =>{
  return { type: type, key: key };
};
const update = (data = default_data,event) => {
  let correction, correct, allButLast, lastElement,value;
  switch (event.type) {
    case "enter key":
       correct = data.prompt[data.index] == event.key || (data.prompt[data.index] == String.fromCharCode(0x2423) && event.key == ' ')
       correction = correct? '': data.prompt[data.index];
      if (data.arr.length==0){
        return Object.assign({}, data, {
            last_char: correct,
            index: data.index+1,
            arr: [{ correctness: correct, value: data.prompt[data.index],correction:correction }],
            error: data.error+correction
          });
      }
      
      if(correct != data.last_char){
        return Object.assign({}, data, {
            last_char: correct,
            index: data.index+1,
            arr: [...data.arr, { correctness: correct, value: data.prompt[data.index],correction:correction }],
            error: data.error+correction
          });
      }

       [allButLast, lastElement] = [
            data.arr.slice(0, -1),
            data.arr[data.arr.length-1]
          ];
      lastElement.value += data.prompt[data.index];
      lastElement.correction += correction;
          return Object.assign({}, data, {
            index: data.index+1,
            arr: allButLast.concat(lastElement),
            error: data.error+correction
          });
      
    case "backtrack":
      if(data.index<2){
        return Object.assign({},data,{ index: 0, arr: [], last_char: true,error:''})
      }
        allButLast = data.arr.slice(0, -1)
        lastElement = data.arr[data.arr.length-1]
       
      if(lastElement.value.length>1){
        lastElement.value = lastElement.value.slice(0,-1)
        lastElement.correction = lastElement.correction.slice(0,-1)
        return Object.assign({}, data, {
            index: data.index-1,
            arr: allButLast.concat(lastElement)
          });
      }
      return Object.assign({},data,
              {index:data.index-1,
               arr:data.arr.slice(0,-1),
               last_char:data.arr[data.arr.length-2].correctness
               }
              )
    case 'reset':
      return Object.assign({},data,{ index: 0, arr: [], last_char: true,error:''})
    case 'refresh':
      return Object.assign({},data,{index: 0, arr: [], last_char: true,prompt:event.key})
    default:
      return Object.assign({},data)
  }
};

export {enterKey, update};