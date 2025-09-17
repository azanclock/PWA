import React from 'react'
import loadingImage from '../images/loading.png'
export default function Loading() {
    return (
        <div id='loadingDiv'>
            <div className='d-flex h-100 justify-content-center align-items-center'>
                <div>
                    <img src={loadingImage} className="img-fluid" />
                </div>
            </div>
        </div>
    )
}
