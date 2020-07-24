import {enterStat, statUpdater} from '../app/statUpdater.js'
describe('testing stats-start end, rest',()=>{
    test('payload',()=>{
        let action = enterStat('start','1')
        expect(enterStat('start','1')).toEqual({type:'start',payload:'1'})

    })
    
    test('start',()=>{
        let data = {timeStart:0,timeEnd:0,numSpace:0,keyCounter:0,correctKey:0}
        let action = enterStat('start','1')
        expect(statUpdater(data,action).timeStart).toBeGreaterThan(0)

    })
    test('end',()=>{
        let data = {timeStart:0,timeEnd:0,numSpace:0,keyCounter:0,correctKey:0}
        let action = enterStat('end','1')
        expect(statUpdater(data,action).timeEnd).toBeGreaterThan(0)

    })
    test('reset',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:0,timeEnd:0,numSpace:0,keyCounter:0,correctKey:0}
        let action = enterStat('reset','1')
        expect(statUpdater(data,action)).toEqual(result)
    })
})
describe('testing stats-key',()=>{
    test('enter key - correct',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:3,correctKey:4}
        let action = enterStat('key',1)
        expect(statUpdater(data,action)).toEqual(result)
    })
    test('enter key - incorrect',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:3,correctKey:3}
        let action = enterStat('key',0)
        expect(statUpdater(data,action)).toEqual(result)
    })
    test('enter key - space correct',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:234,timeEnd:123,numSpace:2,keyCounter:3,correctKey:4}
        let action = enterStat('space',1)
        expect(statUpdater(data,action)).toEqual(result)
    })
    test('enter key - space incorrect',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:3,correctKey:3}
        let action = enterStat('space',0)
        expect(statUpdater(data,action)).toEqual(result)
    })
})
describe('testing stats-backspace',()=>{
    test('backspace last correct -non space',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:3}
        let result = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:3,correctKey:2}
        let action = enterStat('backtrackstat',[1,'','a'])
        expect(statUpdater(data,action)).toEqual(result)
    })
    test('backspace last correct - space',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:2}
        let result = {timeStart:234,timeEnd:123,numSpace:0,keyCounter:3,correctKey:1}
        let action = enterStat('backtrackstat',[1,'',' '])
        expect(statUpdater(data,action)).toEqual(result)
    })
    test('backspace last incorrect',()=>{
        let data = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:2,correctKey:2}
        let result = {timeStart:234,timeEnd:123,numSpace:1,keyCounter:3,correctKey:2}
        let action = enterStat('backtrackstat',[1,'a',' '])
        expect(statUpdater(data,action)).toEqual(result)
    })
})