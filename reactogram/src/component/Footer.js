import React from 'react'

function Footer() {
  return ( 
     <div className='container-fluid ' style={{fontFamily:'Poppins'}}>
        <div className='row py-4 bg-info text-white'>
            <div className='col text-center d-flex flex-column'>
                <h4>Quick Links</h4>
                <a href='#' className='p-2 text-white'>About us</a>
                <a href='#' className='p-2 text-white'>Our Posts</a>
                <a href='#' className='p-2 text-white'>Our Team</a>
                <a href='#' className='p-2 text-white'>Contact us</a>
            </div>
            <div className='col text-center d-flex flex-column'>
                <h4>Newsletter</h4>
                <input className='m-3 p-2' type='text' placeholder='Subscribe to the newsletter'></input>
                <button className='btn btn-warning m-3 p-2'>Subscribe</button>
            </div>
            <div className='col text-center d-flex flex-column' >
                <h4>Contact Adrress</h4>
                <a href='#' style={{textDecoration:'none'}} className='p-2 text-white'>26 Huston Street</a>
                <a href='#' style={{textDecoration:'none'}} className='p-2 text-white'>Newton City</a>
                <a href='#' style={{textDecoration:'none'}} className='p-2 text-white'>Random State-756767</a>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
