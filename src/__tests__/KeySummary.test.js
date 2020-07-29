import errorSummery from '../functions/errorSummery.js'
describe('testing summary',()=>{
    test('string to dic',()=>{
        
        let s = errorSummery('abbccc')
        
        expect(s[2].y).toBeCloseTo(1)
        expect(s[1].y).toBeCloseTo(2)
        expect(s[0].y).toBeCloseTo(3)
        
    })
})