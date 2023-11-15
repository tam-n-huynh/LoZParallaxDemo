import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import HorizontalScroll from './components/HorizontalScroll';
/* Images */
import totkBkg from './images/totk-bkg.jpg';
import islands from './images/islands.png';
import clouds from './images/clouds.png';
import totkLogo from './images/totk-logo.png';
import korokForest from './images/korok-forest.png';
import linkOnIsland from './images/link-on-island.png';
import mastersword from './images/mastersword.png';
import pedestal from './images/pedestal.png';
import zonaiBkg from './images/zonai-bkg.png';
import transitionCloud from './images/transitionCloud.png';
import caveBackground from './images/caveBackground.png';
import linkFalling from './images/linkFalling.png';
import zeldaFalling from './images/zeldaFalling.png';

import mem1 from './images/memories/mem1.png';
import mem2 from './images/memories/mem2.png';
import mem3 from './images/memories/mem3.png';
import mem4 from './images/memories/mem4.png';
import mem5 from './images/memories/mem5.png';
import mem6 from './images/memories/mem6.png';
import mem7 from './images/memories/mem7.png';
import mem8 from './images/memories/mem8.png';

const images1 = [mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8];

const App = () =>  {
  const [animationState, setAnimationState] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  
  const { ref: mainRef, inView: mainVisible} = useInView({
    triggerOnce: true,
  });

  const { ref: endRef, inView: endVisible} = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const totkBkgRef = useRef(null);
  const islandRef = useRef(null);
  const cloudRef = useRef(null);
  const totkLogoRef = useRef(null);
  const linkOnIslandRef = useRef(null);

  useEffect(() => {
    setIsComponentMounted(true); // Set the component as mounted after rendering
  }, []);


  useEffect(() => {  
    if (animationState == false) {
      return
    }
    
    const parallax_el = document.querySelectorAll(".parallax");
    
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const relativeX = e.clientX - centerX;
      const relativeY = e.clientY - centerY;
      console.log(relativeX);
      console.log(relativeY);

      parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotation = el.dataset.rotation;
        
        let isInLeft = parseFloat(getComputedStyle(el).left) < (window.innerWidth / 2) ? 1 : -1;
        let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * speedz;

        let rotateDegree = (relativeX / (window.innerWidth / 2)) * rotation;
        
        el.style.transform = `
          translateX(calc(-50% + ${relativeX * speedx}px))
          translateY(calc(-50% + ${relativeY * speedy}px))
          perspective(2300px) translateZ(${zValue}px)
          rotateY(${rotateDegree}deg)
          `
      })

    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animationState]);

  const runAnimation = () => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        defaults: { ease: 'power1.out' },
        onComplete: () => {
          resolve();
        },
      });
  
      tl.fromTo(
        totkBkgRef.current,
        { top: 'calc(100%)' },
        { top: 'calc(50% - 300px)', duration: 2 },
        0
      );
  
      tl.fromTo(
        cloudRef.current,
        { top: '180vh' },
        { top: 'calc(50% + 120px)', duration: 2 },
        0
      );
  
      tl.fromTo(
        islandRef.current,
        { top: '200vh' },
        { top: 'calc(50% + 50px)', duration: 2 },
        0
      );
  
      tl.fromTo(
        linkOnIslandRef.current,
        { top: '200vh' },
        { top: 'calc(50% - 100px)', duration: 2 },
        0
      );
  
      tl.fromTo(
        totkLogoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3 },
        2
      );
    })
  }

  useEffect(() => {
    console.log('totkBkgRef:', totkBkgRef.current);
    console.log('cloudRef:', cloudRef.current);
    console.log('islandRef:',islandRef.current);
    console.log('linkRef:',linkOnIslandRef.current);
    console.log('logoRef:',totkLogoRef.current);

    const allRefsAreAvailable =
    totkBkgRef.current &&
    cloudRef.current &&
    islandRef.current &&
    linkOnIslandRef.current &&
    totkLogoRef.current;

    if (allRefsAreAvailable) {
      runAnimation().then(() => {
        setAnimationState(true);
      })
    }
  }, [isComponentMounted, totkBkgRef, cloudRef, islandRef, linkOnIslandRef, totkLogoRef]);

  return (
    <div className="App" ref={mainRef}>
      <Parallax pages={3.5}>

        <ParallaxLayer 
          offset={2.5}
          style={{
            backgroundImage: `url(${korokForest})`,
            backgroundSize: 'cover',
            width: '100vw',
          }}
        />

        <ParallaxLayer offset={2.5} speed={-0.8} stick={{start: 2.5}}>
          <img src={mastersword} class="mastersword"/>
        </ParallaxLayer>

        <ParallaxLayer offset={0}>
          <section className='main-section'>
            <img src={totkBkg} data-speedx="0.1" data-speedy="0.075" data-speedz="0.1" data-rotation="2" class="parallax totk-bkg" ref={totkBkgRef}/>
            <img src={islands} data-speedx="0.1" data-speedy="0.075" data-speedz="0.02" data-rotation="2" class="parallax islands" ref={islandRef}/>
            <img src={linkOnIsland} data-speedx="0.1" data-speedy="0.075" data-speedz="0.1" data-rotation="5" class="parallax linkOnIsland" ref={linkOnIslandRef}/>
            <img src={clouds} data-speedx="0.05" data-speedy="0.05" data-speedz="0.1" data-rotation="8" class="parallax clouds" ref={cloudRef}/>
            <img src={totkLogo} data-speedx="0.02" data-speedy="0.05" data-speedz="0.1" data-rotation="8" class="parallax totk-logo" ref={totkLogoRef}/>
          </section>
        </ParallaxLayer>

        <ParallaxLayer 
          offset={1}
          style={{
            backgroundImage: `url(${caveBackground})`,
            backgroundSize: "cover",
            height: "220vh",
          }}
          factor={4}
          speed= {1}
          class="caveBackground"
        />

        <ParallaxLayer offset={0.75} speed={1} factor={1}>
          <img src={transitionCloud} className="transitionCloud"/>
        </ParallaxLayer>
        
        <ParallaxLayer offset={1.2} speed={0.5}>
          <img src={linkFalling} class="linkFalling"/>
        </ParallaxLayer>

        <ParallaxLayer offset={1.8} speed={0.1}>
          <img src={zeldaFalling} class="zeldaFalling"/>
        </ParallaxLayer>
        
        <ParallaxLayer offset={2.9}>
          <img src={pedestal} className="pedestal"/>
        </ParallaxLayer>

        <ParallaxLayer offset={2.2} speed={1} factor={2}
          style={{
            backgroundImage: `url(${zonaiBkg})`,
            backgroundSize: "cover",
            overflow: "hidden",
            height: "80vh",
            bottom: '0',
            backgroundPosition: 'bottom',
          }}
        >
          <div className="transition2">
            <HorizontalScroll images={images1} left={true} className="scroller"/>
            <HorizontalScroll images={images1} left={false} className="scroller"/>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.8} speed={0.3}>
          <h1 className={endVisible ? "thank-you show" : "thank-you"} ref={endRef}>Thank You</h1>
        </ParallaxLayer>
      </Parallax>
      
    </div>
  );
}

export default App;
