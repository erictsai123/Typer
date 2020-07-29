import processData from '../functions/processData.js'
describe('processs data',()=>{
  test('process data',()=>{
    let data = [{
          username: 'test',
          duration:1,
          corrKey: 1,
          keyCounter: 1,
          length: 1,
          incorrectKeys: 'a',
          wpm: 50,
          eff: 73,
        },{
          username: 'test',
          duration:
            1,
          corrKey: 1,
          keyCounter: 1,
          length: 1,
          incorrectKeys: 'b',
          wpm: 60,
          eff: 84,
        },{
          username: 'test',
          duration:
            58,
          corrKey: 3,
          keyCounter: 1,
          length: 1,
          incorrectKeys: 'c',
          wpm: 70,
          eff: 96,
        },{
          username: 'test',
          duration:
            0,
          corrKey: 0,
          keyCounter: 1,
          length: 1,
          incorrectKeys: '',
          wpm: 62,
          eff: 86,
        }]
    expect(processData(data)).toEqual({ ttlWord:1, ttlTime:1, med_wpm:61, med_eff:85, err: 'abc'})
  })
})