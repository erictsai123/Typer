import Stats from '../app/Stats.js'
describe('test functions',()=>{
    let stat = new Stats()
    test('word per min',()=>{
        let wpm = Date.now()-1000
        expect(Math.ceil(stat.wordPerMinute(wpm,1))).toEqual(60)
    })
    test('word per min - 0',()=>{
        expect(stat.wordPerMinute(100,0)).toEqual(0)
    })
    test('efficiency = 0',()=>{
        expect(stat.efficiency(0,0)).toEqual('')
    })
    test('efficiency = 0',()=>{
        expect(stat.efficiency(5,5)).toEqual('100%')
    })
})