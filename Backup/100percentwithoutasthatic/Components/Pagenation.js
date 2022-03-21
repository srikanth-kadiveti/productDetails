import React from "react";
import ReactPaginate from 'react-paginate';


const Pagenation=(props)=>{
    return(
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={props.pageCount}
        onPageChange={props.changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    )
};

export default Pagenation;