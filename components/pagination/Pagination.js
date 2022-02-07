import React from "react";

function Pagination(props) {

//bottom-0 mb-4 position-relative
    //style="background-color: rgba(0, 0, 0, 0.2);"
    return (
        <footer className="bg-dark text-center text-lg-start bottom-50">
            <div className="mb-lg-4"></div>
            <div className="text-center p-3">
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
            </div>
        </footer>

    )
}

export default Pagination;