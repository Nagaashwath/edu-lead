import React from 'react'

const Pagination =(props)=>{

    const {itemsCount,pageSize,onPageChange,currentPage}=props;

    const pageCount=Math.ceil(itemsCount/pageSize);
   // console.log(pageCount);
    const pages=Array.from({length: pageCount}, (_, i) => i + 1);
    return (<React.Fragment>

        <nav aria-label="Page navigation example">
        <ul className="pagination">
           <li className="page-item">
            <span className="page-link previous" aria-label="Previous" onClick={()=>{if(2<=currentPage){onPageChange(currentPage-1)}}}>
                <span aria-hidden="true">&lt;</span>
            </span>
            </li>
            {pages.map(page=>(<li key={'stud'+page} className={page===currentPage?"page-item active":"page-item"}><span className="page-link" onClick={()=>{onPageChange(page)}}>{page}</span></li>))
            }
            <li className="page-item">
            <span className="page-link next" aria-label="Next" onClick={()=>{if(currentPage<=pages.length-1){onPageChange(currentPage+1)}}}>
                <span aria-hidden="true">&gt;</span>
            </span>
            </li>
        </ul>
        </nav>
    </React.Fragment>);
}

export default Pagination;