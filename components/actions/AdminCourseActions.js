import {Popconfirm} from "antd";

const AdminCourseActions = ({course, onDelete}) => {

    return (
        <div className="policy-package-actions">
            <Popconfirm
                title={"Delete this Course?"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(course.id)}
            >
                <a href="#">Delete</a>
            </Popconfirm>

            <style jsx global>{`
        .policy-package-actions * {
          padding: 8px 0;
        }
        
        .policy-package-actions a {
          margin-right: 1rem;
        }

        .policy-package-actions a:hover {
          color: var(--dark-blue-color);
        }
      `}</style>
        </div>
    );
};

export default AdminCourseActions;
