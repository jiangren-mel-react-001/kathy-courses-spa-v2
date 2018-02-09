/**
 * Created by Kathy on 5/02/2018.
 */
import React from 'react';
import {Button} from 'react-bootstrap';


export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userName:'',
            passWord:''
        }
    }
    render(){
        return(

                <div >
                    <label style={{marginTop:20+'px'}}>User Name: </label>
                    <input type="text" onChange={(e) => {
                        this.setState({userName: e.target.value, password: this.state.passWord})
                    }}/>
                    <br />

                    <label style={{marginTop:15+'px'}}> PassWord : </label>
                    <input type="password" onChange={(e) => {
                        this.setState({passWord: e.target.value, userName: this.state.userName})
                    }}/>
                    <br />
                    <Button style={{marginTop:15+'px'}} className="btn-primary" onClick={()=>{
                        this.props.onTokenChange(this.state.userName);
                        this.setState((prevState, props)=>(
                            {userName:prevState.userName,
                                passWord:prevState.passWord }
                        ));
                        console.log('in login this.props', this.props);
                        this.props.history.push(this.props.location.state.from.pathname);

                    }}>  OK  </Button>
                </div>

        )
    }
}