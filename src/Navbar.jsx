import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
//! Thats how to use svg, as a fucking component, so if u wanna use svg like in the image - u have to use different way
import Logo from './logo.svg'

const Navbar = () => {
  //state for the burger bascially
  const [showLinks,setShowLinks] = useState(false) 
  //get wrapper container for the links
  const linksContainerRef = useRef(null)
  //get links themself
  const linksRef = useRef(null)
  //Effect that will work when state changes
  //so we get links themself height and then adjust this height to the wrapper container
  /*
  ! Why we use 2 refs, why to use a wrapper - exactly to make a toggling functionality, but lets describe approaches that we can use
  *1 we just make a cond rendering like {showLinks && <div>...} - it rly works but show us no transitions/animations
  *2 as w/ js - toggle activating class(class that adds height to wrapper container) - rly works, goes w/ animation/transition
  but little thing - if w/ time we will have more links - theres no place for them in the hardcoded css
  !Final approach - using refs make dynamic height changing based on actual links height
  ? so wrapper by def - 0, but our links cotainer have populated links and already have a height, just because its within a wrapper - it doesnt show
  thats why we toggling height of links to its wrapper - to be shown
  *also check the comment in scss file about some css aspects 
  */
  useEffect(() => {
    //here we just use common DOM method
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    //and here for toggling functionality we use condition if true - show links w/ height
    //else height of the wrapper is need to be 0px
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  },[showLinks])

  //notice 
  //1 button just toggling our state
  //2 both links and social media coming from data file and we just populating them w/map
  //!Why we just dont hardcode links/socials, Heres the thing, what if our links/socials are also used in like sidebar or footer,
  //so if we add another link/social we need to make these changes eveerywhere
  //!But, we just make a file w/ arrays that describes our links/socials and everywhere else we just populating them w/map or we populate them w/map 
  //!in the file into some exporting fragment or smth, and then if theres some changes in links/social we just make thoose changes in the file
  //and these changes will show up everywhere
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Logo />
          <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>
            <FaBars/>
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map(link => {
              const {id,url,text} = link
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map(socialLink => {
            const {id,url,icon} = socialLink
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
