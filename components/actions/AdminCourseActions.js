import {Popconfirm} from "antd";

const AdminCourseActions = ({course, onDelete}) => {

    return (
        <div className="actions">
            <Popconfirm
                title={"Delete this Course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(course.id)}
            >
                <a>Delete</a>
            </Popconfirm>
            <style jsx global>{`
        .actions * {
          padding: 8px 0;
        }
        .actions a {
          margin-right: 1rem;
        }

        .a:hover {
          color: purple;
        }
      `}</style>
        </div>
    );
};

export default AdminCourseActions;
