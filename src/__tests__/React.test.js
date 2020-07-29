import React from 'react'
import Home from '../homepage/Home.js'
import { render,screen,fireEvent,container,cleanup,waitForElement} from '@testing-library/react'
import {BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = "http://100.115.92.2:5000"

describe('top level component render',()=>{

  test('all the links work',  ()=>{
    render(<BrowserRouter ><Home /></BrowserRouter>)
    fireEvent.click(screen.getByText('Start Typing'))
    screen.getByText(/Typing Mode/)
    fireEvent.click(screen.getByText('About'))
    screen.getByText('Mission')
    fireEvent.click(screen.getByText('Login'))
    screen.getByText('Account')
    fireEvent.click(screen.getByText('type.io'))
    screen.getByText('Start Typing')
    fireEvent.click(screen.getByText('Lesson'))
    fireEvent.click(screen.getByText(/Basics/))
    screen.getByText(/Typing Mode/)
  })
  test('inputs and settings', ()=>{
    const {container} = render(<BrowserRouter ><Home /></BrowserRouter>)
    fireEvent.click(screen.getByText('Lesson'))
    fireEvent.click(screen.getByText(/Basics/))
    expect(screen.queryByText(/\u2423/)).not.toBeNull()
    
    fireEvent.click(screen.getByText(/Setting/))
    
    fireEvent.change(screen.getByTestId('rangebox'),{target: {value:20}})
    fireEvent.change(screen.getByTestId('spChar'),{target: {value:'%'}})
    fireEvent.click(screen.getByLabelText('Captial Word') )
    fireEvent.click(screen.getByLabelText('Select All'))
    fireEvent.click(screen.getByLabelText("[ ]"))
    fireEvent.click(screen.getByLabelText('Number'))
    fireEvent.click(screen.getByText(/Save Setting/))
    
    fireEvent.keyDown(screen.getByTestId('promptbox'),{key: ';'})
    screen.getByTestId('0-1false')
    screen.getByText(/[0-9][0-9]/)
    screen.getByText(/%[^A-z][A-Z][a-z]/)
    expect(screen.queryByText(/\[[A-z]+\]/)).toBeNull()
    expect(screen.getByText(/\u2423/).innerHTML.match(/\u2423/g).length).toEqual(19)
    
  })
  test('login', async ()=>{
    
    const {container} = render(<BrowserRouter ><Home /></BrowserRouter>)
    fireEvent.click(screen.getByText('Login'))
    

    fireEvent.change(screen.getByTestId('name'),{target: {value:'a'}})
    fireEvent.change(screen.getByTestId('pw'),{target: {value:'a'}})
    fireEvent.click(container.querySelector("[id='login']"))
    await waitForElement(() => screen.getByTestId('time'))
    
    expect(parseFloat(screen.getByTestId('time').innerHTML)).toBeGreaterThan(0)
    expect(parseFloat(screen.getByTestId('word').innerHTML)).toBeGreaterThan(0)
    expect(parseFloat(screen.getByTestId('wpm').innerHTML)).toBeGreaterThan(0)
    expect(parseFloat(screen.getByTestId('eff').innerHTML)).toBeGreaterThan(0)
    expect(screen.queryByText(/No Typos so far/)).toBeNull()
    fireEvent.click(screen.getByText('Profile'))
    fireEvent.click(screen.getByText('Logout'))
    expect(screen.queryByText(/Profile/)).toBeNull()
  })
  
  test('reg', async ()=>{
    const {container} = render(<BrowserRouter ><Home /></BrowserRouter>)
    fireEvent.click(screen.getByText('Login'))
    fireEvent.change(screen.getByTestId('name'),{target: {value:'c'}})
    fireEvent.change(screen.getByTestId('pw'),{target: {value:'c'}})
    fireEvent.click(container.querySelector("[id='reg']"))
    await waitForElement(() => screen.getByText(/Username already exist/))
    fireEvent.change(screen.getByTestId('name'),{target: {value:'d'}})
    fireEvent.change(screen.getByTestId('pw'),{target: {value:'d'}})
    fireEvent.click(container.querySelector("[id='reg']"))
    await waitForElement(() => screen.getByText('Profile'))
    axios.post('/delete',{name:"d"})
  })
  /*
  
  test('reg', async ()=>{
    let res = await axios.post('/login',{name:'a',pw:'a'})
    expect(res.data.name).toEqual('a')
  })
  test('login', async ()=>{
    const {container} = render(<BrowserRouter ><Home /></BrowserRouter>)
    fireEvent.click(screen.getByText('Login'))
    
    fireEvent.change(container.querySelector('input[name="pw"]'),{target: {value:'a'}})
    fireEvent.click(screen.getAllByText('Login')[1])
  })*/
  
})