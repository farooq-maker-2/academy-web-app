import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TeacherListItem from "../TeacherListItem";

class AllTeachers extends React.Component {

    state = {
        teachers: [],
        pageIndex: 0
    }

    componentDidMount() {
        this.getAllTeachers().then(res => {
            const teachers = res.data.content
            this.setState({
                teachers
            });
        }).catch(err => console.log("Error ", err));
    }

    getAllTeachers = async () => {
        await axios.get('http://localhost:8081/api/teachers', {
            params: {
                page: this.state.pageIndex
            },
            headers: {
                AUTHORIZATION: 'Bearer ' + Cookies.get('access_token')
            }
        });
    };

    updateAndFetch = async (teachers, updatedIndex) => {
        const updatedState = {
            teachers,
            pageIndex: updatedIndex
        }
        await this.setState(updatedState)
    }

    render() {

        const teachers = this.state.teachers?.map((teacher) => (
            <TeacherListItem key={teacher.id} teacher={teacher} router={this.router}/>
        ));

        return (
            <div>
                <h1>All Teachers</h1>

                <div>
                    <ul className="list-group list-group-flush">
                        {teachers}
                    </ul>
                </div>

                {/*<div className="position-relative bottom-0 end-50">*/}
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.teachers, this.state.pageIndex - 1)}>Previous
                </button>
                <button className="btn btn-primary"
                        onClick={() => this.updateAndFetch(this.state.teachers, this.state.pageIndex + 1)}>Next Page
                </button>
                {/*</div>*/}

            </div>);
    }

}

export default AllTeachers;