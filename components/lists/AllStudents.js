import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentListItem from "./StudentListItem";

class AllStudents extends React.Component {

    state = {
        students: [],
        pageIndex: 0
    }

    componentDidMount() {
        this.getAllStudents().then(res => {
            console.log(res.status)
        });
    }

    getAllStudents = async () => {

        console.log('inside getAllStudents')
        return await axios.get('http://localhost:8081/api/students', {
            params: {
                page: this.state.pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        }).then(res => {
            this.setState({
                students: res.data.content,
                pageIndex: 0
            });
        }).catch(err => console.log("Error ", err));
    };

    updateAndFetch = async (students, updatedIndex) => {
        //event.preventDefault();
        //to update the index in state
        //const updatedState =
        this.setState({
            students,
            pageIndex: updatedIndex
        })
        return this.getAllStudents();
    }

    render() {

        const students = this.state.students?.map((student) => (
                <StudentListItem key={student.id} student={student} router={this.router}/>
        ));

        return (
            <div>
                <h1>All Students</h1>
                <div>
                    <ul className="list-group list-group-flush">
                        {students}
                    </ul>
                </div>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.students, this.state.pageIndex - 1)}>Previous
                </button>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.students, this.state.pageIndex + 1)}>Next Page
                </button>

            </div>);
    }

}

export default AllStudents;