import {enterKey,update} from '../reducers/enterKey.js'

describe('action tests - enter key',()=>{
    test("testing creating action",()=>{
        expect(enterKey("50",'stuff')).toEqual({type:'stuff',key:"50"})
        expect(enterKey(0,'stuff')).toEqual({type:'stuff',key:0})
    })
    
    test("testing enter Key - first character true",()=>{
        const action = enterKey("t","enter key")
        const default_array = { error:'',index: 0, arr: [], last_char: true,prompt:"testprompt"}
        const arr = {correctness:true,value:'t',correction:''}
        expect(update(default_array,action))
        .toEqual({error:'', index: 1, arr: [arr], last_char: true,prompt:"testprompt"})
    })
    test("testing enter Key - first character false",()=>{
        const action = enterKey(";","enter key")
        const default_array = {error:'', index: 0, arr: [], last_char: true,prompt:"testprompt"}
        const arr = {correctness:false,value:';',correction:'t'}
        expect(update(default_array,action))
        .toEqual({error:'t', index: 1, arr: [arr], last_char: false,prompt:"testprompt"})
    })
    test("testing enter Key - same as last one, correct",()=>{
        const action = enterKey("e","enter key")
        const arr = {correctness:true,value:'t',correction:''}
        const arr2 = {correctness:true,value:'te',correction:''}
        const data = {error:'', index: 1, arr: [arr], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'', index: 2, arr: [arr2], last_char: true,prompt:"testprompt"})
    })
    test("testing enter Key - same as last one, false",()=>{
        const action = enterKey(";","enter key")
        const arr = {correctness:false,value:';',correction:'t'}
        const arr2 = {correctness:false,value:';;',correction:'te'}
        const data = {error:'t', index: 1, arr: [arr], last_char: false,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'te', index: 2, arr: [arr2], last_char: false,prompt:"testprompt"})
    })
    test("testing diff Key - true,false",()=>{
        const action = enterKey(";","enter key")
        const arr = {correctness:true,value:'t',correction:''}
        const arr2 = {correctness:false,value:';',correction:'e'}
        const data = {error:'', index: 1, arr: [arr], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'e', index: 2, arr: [arr,arr2], last_char: false,prompt:"testprompt"})
    })
    test("testing diff Key - false,true",()=>{
        const action = enterKey("e","enter key")
        const arr = {correctness:false,value:';',correction:'t'}
        const arr2 = {correctness:true,value:'e',correction:''}
        const data = {error:'t', index: 1, arr: [arr], last_char: false,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'t', index: 2, arr: [arr,arr2], last_char: true,prompt:"testprompt"})
    })
})

describe('testing backtrack',()=>{
    test('packtrack when empty',()=>{
        const data = { error:'',index: 0, arr: [], last_char: true,prompt:"testprompt"}
        const action = enterKey("1","backtrack")
        
        expect(update(data,action))
        .toEqual(data)
    })
    test('backtrack when 1 element',()=>{
        const data_default = {error:'', index: 0, arr: [], last_char: true,prompt:"testprompt"}
        const data = {error:'', index: 1, arr: [{some:'stuff'}], last_char: true,prompt:"testprompt"}
        const action = enterKey("1","backtrack")
        
        expect(update(data,action))
        .toEqual(data_default)
    })
    test('backtrack when 2 element, both true',()=>{
        const action = enterKey(";","backtrack")
        const arr = {correctness:true,value:'te',correction:''}
        const arr2 = {correctness:true,value:'t',correction:''}
        const data = {error:'', index: 2, arr: [arr], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'', index: 1, arr: [arr2], last_char: true,prompt:"testprompt"})
    })
    test('backtrack when 2 element, both false',()=>{
        const action = enterKey(";","backtrack")
        const arr = {correctness:false,value:'er',correction:'te'}
        const arr2 = {correctness:false,value:'e',correction:'t'}
        const data = {error:'', index: 2, arr: [arr], last_char: false,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'', index: 1, arr: [arr2], last_char: false,prompt:"testprompt"})
    })
    test('backtrack when 2 element, true false',()=>{
        const action = enterKey(";","backtrack")
        const arr = {correctness:true,value:'t',correction:''}
        const arr2 = {correctness:false,value:'d',correction:'e'}
        const data = {error:'', index: 2, arr: [arr,arr2], last_char: false,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({ error:'', index: 1, arr: [arr], last_char: true,prompt:"testprompt"})
    })
    test('backtrack when 2 element, false true',()=>{
        const action = enterKey(";","backtrack")
        const arr = {correctness:true,value:'e',correction:''}
        const arr2 = {correctness:false,value:'d',correction:'t'}
        const data = {error:'', index: 2, arr: [arr2,arr], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'', index: 1, arr: [arr2], last_char: false,prompt:"testprompt"})
    })
})
describe('reset',()=>{
    test('reset, stuff',()=>{
        const action = enterKey(";","reset")
        const arr = {correctness:true,value:'e',correction:''}
        const arr2 = {correctness:false,value:'d',correction:'t'}
        const data = {error:'', index: 2, arr: [arr2,arr], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({error:'', index: 0, arr: [], last_char: true,prompt:"testprompt"})
    })
    
    test('reset, empty',()=>{
        const action = enterKey(";","reset")
        const data = {error:'', index: 0, arr: [], last_char: true,prompt:"testprompt"}
        expect(update(data,action))
        .toEqual({ error:'',index: 0, arr: [], last_char: true,prompt:"testprompt"})
    })
    test('refresh',()=>{
      const action = enterKey("testprompt1","refresh")
        const data = {error:'afasdf', index: 2, arr: [], last_char: true,prompt:'asdfa'}
        expect(update(data,action))
        .toEqual({ error:'',index: 0, arr: [], last_char: true,prompt:"testprompt1"})
    })
    
    test('default',()=>{
      const action = enterKey("testprompt1","s")
        const data = {error:'afasdf', index: 2, arr: [], last_char: true,prompt:'asdfa'}
        expect(update(data,action))
        .toEqual(data)
    })
})