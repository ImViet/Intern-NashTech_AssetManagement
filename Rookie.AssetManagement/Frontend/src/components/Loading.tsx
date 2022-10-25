import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => (
    <div className='position-relative w-100'>
        <div className='position-absolute' style={{ top: 50, left: 50 }}>
            <Spinner animation="border" variant="danger" />
        </div>
    </div>
);

export default Loading;
