import React from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap';
import "./course.css"

export default class CourseCreate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courseName:'',
            courseDes:'',
            courseImg:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        axios.post('https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses',{
            name:this.state.courseName,
            description: this.state.courseDes,
            image: this.state.courseImg
        })
            .then(({data})=>{
                    console.log("data from post is", data);
                    this.props.history.push( "/courses");
                })
            .catch((err)=>{throw(err)});

    }

    render(){
        console.log('in courseCreate this.props', this.props);

        return(
            <Panel className="courseCreateFrame">
            <form onSubmit={this.handleSubmit} className="courseCreateForm" >
                <input type="text" placeholder="Course Name" className="courseNameInput" onChange={(e)=>{this.setState({
                    courseName:e.target.value,
                    courseDes:this.state.courseDes,
                    courseImg:this.state.courseImg
                })}}/>
                <br />
                <textarea type="textarea" placeholder="Course Description" className="courseDesInput" onChange={(e)=>{
                    this.setState({
                        courseName:this.state.courseName,
                        courseDes:e.target.value,
                        courseImg:this.state.courseImg
                    })
                }}/>
                <input type="text" placeholder="Course Image Url" className="courseImgInput" onChange={(e)=>{this.setState({
                        courseName:this.state.courseName,
                        courseDes:this.state.courseDes,
                        courseImg:e.target.value
                }
                )}}/>
                <br />
                <button type="submit" className="btn btn-primary submitBtn">Submit</button>
                <br />
            </form>
            </Panel>
        )
    }
}
