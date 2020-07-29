import gen from "../functions/textGenerator.js";
describe('test prompt generator',()=>{
  test('test vanilla on',()=>{
    let res = gen({
    cap: false,
    num: false,
    word: 20,
    paran: {
      "< >": false,
      "{ }": false,
      "[ ]": false,
      '" "': false,
      "' '": false,
      "( )": false,
      all: false,
    },
    spChar: "",
  })
  
    expect(res.split(String.fromCharCode(0x2423)).length).toEqual(20)
  })
  test('test everything on',()=>{
    let res = gen({
    cap: true,
    num: true,
    word: 200,
    paran: {
      "< >": true,
      "{ }": true,
      "[ ]": true,
      '" "': true,
      "' '": true,
      "( )": true,
      all: false,
    },
    spChar: "$%^",
  })
  
    expect(res.split(String.fromCharCode(0x2423)).length).toEqual(200)
    expect(/[0-9]/.test(res)).toEqual(true)
    expect(/[&%^]/.test(res)).toEqual(true)
    expect(/[A-Z]/.test(res)).toEqual(true)
    expect(/<[A-z]+>/.test(res)).toEqual(true)
    expect(/{[A-z]+}/.test(res)).toEqual(true)
    expect(/([A-z]+)/.test(res)).toEqual(true)
    expect(/'[A-z]+'/.test(res)).toEqual(true)
    expect(/"[A-z]+"/.test(res)).toEqual(true)
    expect(/[[A-z]+]/.test(res)).toEqual(true)
  })
})