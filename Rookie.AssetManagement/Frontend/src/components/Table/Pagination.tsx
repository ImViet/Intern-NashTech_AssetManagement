import React from 'react';

export type PageType = {
    currentPage?: number;
    totalPage?: number;
    handleChange: (page: number) => void;
}
const Pagination: React.FC<PageType> = ({ currentPage = 1, totalPage = 1, handleChange }) => {
    const prePageStyle = currentPage !== 1 ? 'pagination__link' : 'pagination__link link-disable';
    const nextPageStyle = currentPage + 1 <= totalPage ? 'pagination__link' : 'pagination__link link-disable';
    const pageStyle = (page: number) => {
        if (page === currentPage) return 'pagination__link link-active';
        return 'pagination__link';
    };
    const onPrev = (e) => {
        e.preventDefault();
        if (currentPage !== 1) {
            handleChange(currentPage - 1);
        }
    };
    const onNext = (e) => {
        e.preventDefault();
        if (currentPage + 1 <= totalPage) {
            handleChange(currentPage + 1);
        }
    };
    const onPageNumber = (e, page: number) => {
        e.preventDefault();
        handleChange(page);
    };
    const midPaging = (lowPage, highPage) => {
        lowPage += 1
        lowPage >= 3 ? lowPage = lowPage - 1 : lowPage;
        highPage > totalPage ? highPage = totalPage : highPage;
        return (
            [...Array(highPage).keys()].map(i => (
                (i + lowPage <= highPage) ?
                    <li className="intro-x">
                        <a onClick={e => onPageNumber(e, i + lowPage)} className={pageStyle(i + lowPage)}
                        >
                            {i + lowPage}
                        </a>
                    </li> : (<></>)
            ))
        )
    }
    const createPageOne = (page) => {
        if (page >= 2) {
            return <>
                <li className="no page-item intro-x"><a className="pagination__link" onClick={e => onPageNumber(e, 1)} >1</a></li>
                {createEllipsis(page)}
            </>
        }
        return;
    }
    const createEllipsis = (page) => {
        if (page > 3) {
            return <li className="out-of-range intro-x"><a className="pagination__link" onClick={e => onPageNumber(e, page - 2)}>...</a></li>
        }
    }
    const createPageEnd = (pages, page) => {
        if (page < pages - 1) {
            return <>
                {createEllipsisEnd(pages, page)}
                <li className="out-of-range intro-x"><a className="pagination__link" onClick={e => onPageNumber(e, totalPage)}>{totalPage}</a></li>
            </>
        }
    }
    const createEllipsisEnd = (pages, page) => {
        if (page < pages - 2) {
            return <li className="out-of-range intro-x"><a className="pagination__link" onClick={e => onPageNumber(e, page + 2)}>...</a></li>
        }
    }
    const createPagination = (pages, page) => {
        console.log(pages, page)
        let pageCutLow = page - 1;
        let pageCutHigh = page + 1;
        page === 1 ? pageCutHigh += 2 : (page === 2 ? pageCutHigh += 1 : pageCutHigh)
        page === pages ? pageCutLow -= 2 : (page === pages - 1 ? pageCutLow -= 1 : pageCutLow)
        return (
            <>
                {createPageOne(page)}
                {midPaging(pageCutLow, pageCutHigh)}
                {createPageEnd(pages, page)}
            </>
        )
    }
    return (
        <div className="w-100 d-flex align-items-center mt-3">
            <ul className="pagination">
                <li className="intro-x">
                    <a onClick={onPrev} className={prePageStyle}>
                        Previous
                    </a>
                </li>
                <div id="pagination">
                    <ul>
                        {
                            totalPage < 6 ? (
                                [...Array(totalPage).keys()].map(i => (
                                    <li key={i} className="intro-x"><a className={pageStyle(i + 1)} onClick={e => onPageNumber(e, i + 1)}> {i + 1}</a></li>
                                ))
                            ) : (
                                createPagination(totalPage, currentPage)
                            )
                        }
                    </ul>
                </div>
                <li className="intro-x">
                    <a onClick={onNext} className={nextPageStyle}>Next</a>
                </li>
            </ul>
        </div>
    );
};
export default Pagination;