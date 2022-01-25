import React from "react";

function Pagination(props) {

    return (<div className="position-absolute bottom-0 mb-4">
        <button className="btn btn-primary"
                onClick={() => {
                    if (props.pageIndex > 0) {
                        props.setPageIndex(props.pageIndex - 1)
                    }
                }}>Previous
        </button>
        <button className="btn btn-primary"
                onClick={() => {
                    props.setPageIndex(props.pageIndex + 1)
                }}>Next Page
        </button>
    </div>);

}

export default Pagination;