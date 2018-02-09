/**
 * Created by Kathy on 5/02/2018.
 */
import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import './course.css';
import {Panel} from 'react-bootstrap';

export default class CoursesContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courses:[]
        }
        this.handleDel = this.handleDel.bind(this);

    }

    componentWillMount(){
    axios.get('https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses')
        .then((res)=>{
            console.log(res);
            this.setState(()=>{
              return({courses:res.data})
            });
        })
        .catch((error)=>{throw(error)});
    }
    handleDel(delItem){
        console.log('in delete', delItem);
        this.setState({courses:this.state.courses.filter((item,index)=>(item.id !== delItem.id))},
            ()=>{
            axios.delete(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses/${delItem.id}`).
            then(()=>{
                console.log('delete successfully from server');
                this.props.history.push( "/courses");}).
            catch((error)=>{throw(error)});
            });
    }
    render(){
        console.log("data is ", this.state.courses);
        return(
            <Panel className="courseFrame">
                <h3 className="titleStyle"> All The Courses </h3>
                <Panel.Body>
                {this.state.courses.map((item,index)=>{
                    return(
                        <div key={item.id} className="col-sm-6 col-lg-3 courseTab">
                            <h5 > Class :  {item.name} </h5>
                            <img  className="courseImage" src={item.image}/>
                            <h5> Class Description: </h5>
                            <p> {item.description} </p>
                            <Link to={{pathname:`/course/detail/${item.id}`, state:{courseItem: item}}
                                       } className="btn btn-primary courseEditBtn"  >Detail</Link>
                            <button onClick={()=>this.handleDel(item)} className="btn btn-danger courseDelBtn">Delete</button>
                        </div>
                    )
                })}

                    <Link to="/course/create" className="btn btn-primary addCourseBtn">Add A New Course</Link>
                </Panel.Body>
            </Panel>

        )
    }
}