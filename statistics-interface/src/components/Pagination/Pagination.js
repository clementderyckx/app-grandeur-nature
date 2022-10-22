import React from 'react';
import './Pagination.css';

export default function Pagination ({perPage, total, actualPage, fetchFunction}) {
const pages = Math.round(total / perPage);
const elements = [];
for(let i = 1; i <= pages; i++) {
    const activeClass = (actualPage === i) ? 'active' : '';
    elements.push(
    <div className={`pagination-element ${activeClass}`} onClick={() => fetchFunction(i)} key={`pagination-link-${i}`}>
        <span className='pagination-link'>{i}</span>
    </div>
    )
}
return (
    <div className="pagination">
    {elements.map(element => element)}
    </div>
)
}