import KeySummary from '../app/KeySummary.js'
describe('testing summary',()=>{
    test('string to dic',()=>{
        
        let s = new KeySummary().summary('abbccc')
        
        expect(s[2].y).toBeCloseTo(16.666)
        expect(s[1].y).toBeCloseTo(33.333)
        expect(s[0].y).toBeCloseTo(50)
        
    })
})