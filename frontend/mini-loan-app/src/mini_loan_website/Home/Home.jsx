import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import UserNavbar from '../components/Sheared/Navbar/UserNavbar';
const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <UserNavbar />
      <div style={{
        backgroundImage: `url("https://t3.ftcdn.net/jpg/04/51/92/62/360_F_451926218_vPCzAhlBrpZj7mISxuDjpR6aqQJF9Fi1.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '92vh',
        filter: 'brightness(70%)',
      }} className='flex justify-center items-center'>
        <div>
          <h1 className='text-center flex justify-center items-center text-[7vw] xl:text-[3vw]'>Empower Your Dreams with Our Tailored Loan Solutions</h1>
        </div>
      </div>
    </>
  )
}

export default Home