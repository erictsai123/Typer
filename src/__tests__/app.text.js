import React from 'react';
import ReactDOM from 'react-dom';
import {App, AppConnector} from '../app/App.js';
import {render, cleanup,screen, fireEvent} from '@testing-library/react'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux'
import {enterKey, update} from '../app/enterKey.js'
import {enterStat, statUpdater} from '../app/statUpdater.js'
import * as ReduxThunk from 'redux-thunk'






describe('Test App',()=>{
    
    const combineReducer = Redux.combineReducers({update,statUpdater})
    const store = Redux.createStore(combineReducer);
    //set promopt for test
    store.dispatch({type:'set',prompt:'abc d'})

    const ConnectContainer = ReactRedux.connect(
            (state) => ({ data: state }),
            (dispatch) => ({
            enterKey: (key,type) => dispatch(enterKey(key,type)),
            enterStat:(type,payload) =>dispatch(enterStat(type,payload))
         })
    )(App);
        
    const Test = () => {
      return (
        <ReactRedux.Provider store={store}>
          <ConnectContainer />
        </ReactRedux.Provider>
      );
    };
    
    beforeEach(()=>{render(<Test/>)})
    
    test('does the app render',()=>{
        
        screen.getByTestId('resetButton')
        screen.getByTestId('refreshButton')
        screen.getByTestId('inputBox')
        screen.getByText(/word/i)
        screen.getByText(/efficiency/i)
        //screen.debug()
        //screen.getByTestId('inputBox')
        
    })
    
    test('check Input event - enter key',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'a'})
        screen.getByTestId('0-1true')
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'b'})
        screen.getByTestId('0-2true')
    })
    test('check Input event - enter garbage',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:16})
    })
    test('check Input event - enter space',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'c'})
        screen.getByTestId('0-3true')
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:32})
        screen.getByTestId('0-4true')
        screen.getByText(/100/)
        screen.getByText(/per minute:\s[^0]/i)
    })
    test('check Input event - delete',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        screen.getByText(/per minute:\s[0]/i)
    })
    test('check Input event - end',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:32})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'d'})
        const eff = screen.getByTestId('efficiencyid').textContent
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'d'})
        expect(screen.getByTestId('efficiencyid').textContent).toEqual(eff)
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'d'})
        screen.getByTestId('0-5true')
        expect(screen.getByTestId('efficiencyid').textContent).toEqual(eff)
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'d'})
        expect(screen.getByTestId('efficiencyid').textContent).not.toMatch(eff)
    })
    
    test('check Input event - start',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{keyCode:8})
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'a'})
        screen.getByText(/efficiency.*100.*/i)
    })
    
    test('check Input event - incorrect',()=>{
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'a'})
        screen.getByTestId('1-1false')
    })
    test('reset',()=>{
        fireEvent.click(screen.getByTestId('resetButton'))
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'a'})
        screen.getByText(/efficiency.*100.*/i)
    })
    
    test('refresh',()=>{
        let txt = screen.getByTestId('promptbox').textContent
        fireEvent.click(screen.getByTestId('refreshButton'))
        expect(screen.getByTestId('promptbox').textContent).not.toEqual(txt)
    })
    
    
    test('check Input event - ',()=>{
        
    })
    test('check Input event - ',()=>{
        
    })
})


describe('Actual App',()=>{
    test('Is my shit hooked up',()=>{
        render(<AppConnector />)
        screen.getByTestId('inputBox')
        expect(screen.getByTestId('inputBox').textContent).toEqual('')

        screen.getByText(/efficiency/i)
        
        //screen.debug()
        //screen.getByTestId('inputBox')
        
        fireEvent.keyDown(screen.getByTestId('inputBox'),{key:'a'})
        screen.getByText(/word.*0/i)
        screen.getByTestId(/0-1/)
        
        
    })
    
})