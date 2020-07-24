const default_state = {cap:false,num:false,word:10,paran:{
        '< >':false,
        '{ }':false,
        '[ ]':false,
        '" "':false,
        "' '":false,
        '( )':false,
        'all':false
    },spChar:'#$_+=/?;:,.'}
    
export default function setPrompt(state=default_state,action){
    switch(action.type){
        case 'setPrompt':
            return Object.assign({},state,action.payload)
        default: return state
    }
}