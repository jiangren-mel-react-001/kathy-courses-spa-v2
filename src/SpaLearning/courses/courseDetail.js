import React from 'react';
import {Panel,Button} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';


import "./course.css"
import CourseEdit from './courseEdit';

export default class CourseDetail extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let courseDetails = this.props.location.state.courseItem;
        console.log("in detail this.props is ", this.props);
        return(

            <Panel className="courseDetailFrame">
             <div className="courseDetail"><h3>Course :{courseDetails.name}</h3></div>
             <div className="courseDetail"><h3>Description: </h3> <p> {courseDetails.description}</p></div>
             <div className="courseDetail"><h3>Image: </h3><p> {courseDetails.image}</p></div>
                <div className="btnGroup">
                        <Button className="btn btn-primary courseBackBtn" onClick={()=>{
                            this.props.history.push({
                                pathname:`/course/edit/${courseDetails.id}`,
                                state:{courseItem: courseDetails}
                            });
                            return <CourseEdit history={this.props.history} location={this.props.location} />}}>Edit</Button>
                        <Button className="btn btn-primary courseBackBtn" onClick={()=>{this.props.history.push("/courses")}}>Cancel</Button>

                </div>

            </Panel>
        )
    }
}
