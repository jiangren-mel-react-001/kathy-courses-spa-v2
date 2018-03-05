import React from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap';
import "./course.css"

export default class CourseEdit extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name:'',
            description:'',
            image:'',
            id:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        let courseItem = this.props.location.state.courseItem;
        console.log("in course Edit constructor this.props",   this.props);

        this.setState({
            name: courseItem.name,
            description: courseItem.description,
            image: courseItem.image,
            id:courseItem.id
        });
    }

    handleSubmit(e){
        e.preventDefault();

        // this.props.history.push({pathname:'/courses',
        //     state:{courseItem: this.state}});
        axios.put(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses/${this.state.id}`, {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image
        }).then(()=>{
            console.log("updated successfully");
            this.props.history.push({pathname:"/courses",
            state:{courseItem: this.state}});
        }) // need push history state=courseItem again....
            .catch((err)=>{
            console.log("updated failed...",err);
            throw(err);
        });






       /* this.props.history.push({pathname:'/courses',
            state:{courseItem: this.state}});*/
        console.log("in course Edit handleEdit this.props",   this.props);
        console.log("in course Edit handleEdit this.state",   this.state);
    }

    render(){
        // let courseItem = this.props.location.state.courseItem;


        return (
            <Panel className="courseDetailFrame">
                <form onSubmit={this.handleSubmit} className="courseCreateForm">
                    <div className="courseDetail">
                        <label>Course Name : </label>
                        <input type="text" className="courseNameInput" placeholder={this.state.name} onChange={(e)=>{
                            this.setState({
                                name:e.target.value,
                                description:this.state.description,
                                image:this.state.image
                            });
                        }}/>
                        <br />
                        <label>Course Description : </label>
                        <textarea placeholder={this.state.description} className="courseDesInput"  onChange={(e)=>{
                            this.setState({
                                name:this.state.name,
                                description:e.target.value,
                                image:this.state.image
                            });
                        }}/>
                        <label>Course Image: </label>
                        <input type="text" className="courseImgInput" placeholder={this.state.image}  onChange={(e)=>{
                            this.setState({
                                name:this.state.name,
                                description:this.state.description,
                                image:e.target.value
                            });
                        }}/>
                        <br />
                        <button type="submit" className="btn btn-primary submitBtn">Submit</button>

                        <br />
                    </div>
                </form>
            </Panel>
        );
    }
}
