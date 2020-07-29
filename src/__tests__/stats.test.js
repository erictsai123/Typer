import Stats from '../app/Stats.js'
describe('test functions',()=>{
    let stat = new Stats()
    test('word per min',()=>{
        let wpm = Date.now()-1000
        expect(Math.ceil(stat.wordPerMinute(wpm,9,10))).toEqual(60)
    })
    test('word per min - 0',()=>{
        expect(stat.wordPerMinute(0,1,0)).toEqual('')
    })
    test('efficiency = 0',()=>{
        expect(stat.efficiency(0,0)).toEqual('')
    })
    test('efficiency = 0',()=>{
        expect(stat.efficiency(5,5)).toEqual(100)
    })
    test('efficiency = .6',()=>{
        expect(stat.efficiency(5,3)).toEqual(60)
    })
    test('progress',()=>{
        expect(stat.progress(3,5)).toEqual(60)
    })
})