import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './alert.css'
class Modal extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return ReactDOM.createPortal(this.props.children,document.querySelector('#show_alert'))
    }
}
export default class Module extends Component{
    constructor(){
        super()
        this.state={show:false}
    }
    render(){
        return(
            <div>
                <button onClick={()=>this.setState({show:!this.state.show})}>弹出</button>
                {
                    this.state.show?<Modal>
                        <div className="modal_alert">
                            <div className="alert_main"></div>
                        </div>
                    </Modal>:null
                }
            </div>
        )
    }
}
ReactDOM.render(<Module></Module>,document.getElementById('root'))