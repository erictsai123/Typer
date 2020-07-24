import generate from '../app/textGenerator.js'
describe('generator test',()=>{
    test('test stuff',()=>{
        expect(generate(
            ['a','b'],
            {split:":",surround:[['(',')']]}
        ))
        .toEqual('(a): (b): ')
    } )
})