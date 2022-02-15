import React from "react";

function Pagination(props) {
    return (
            <footer className="position-relative bg-dark text-lg-center w-auto">
                {/*<div className="mb-lg-4"></div>*/}
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