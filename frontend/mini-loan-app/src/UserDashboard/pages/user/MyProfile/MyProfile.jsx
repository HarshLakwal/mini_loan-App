import React, { useEffect, useState } from 'react'
// import UserNavbar from '../components/Sheared/Navbar/UserNavbar.jsx'
import style from '../../../../UserGlobal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { FcApproval, FcHighPriority } from 'react-icons/fc'
import ShareCard from '../../../../Dirt_website/Popups/ShareCard.jsx'

const MyProfile = () => {
  const [code, setCode] = useState()
  const user = useSelector((state) => state.user.user);
  const getCode = (code)=> {
      setCode(code)
  }

  return (
    <>
      <div className='w-full py-2.5 overflow-y-auto h-[87vh]' >
        {/* <UserNavbar /> */}
        <h3 className="text-[22px] font-Poppins pb-2 pt-2 ml-[6.6rem]">My Profile</h3>
        <div className={` flex justify-center items-center`}>

          <form className={style.myprofile_form_wrapper}>
            {/* {
              user.verifiedUser ?

                <FcApproval style={{ position: 'absolute', top: '-15px', right: '-15px' }} size={40} /> :
                <FcHighPriority style={{ position: 'absolute', top: '-15px', right: '-15px' }} size={40} />
            } */}

            <div className={`${style.myprofile_input_wrapper} mb-2 md:flex md:justify-between items-end`}>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Name
                </label>
                <input
                  name="seriesName"
                  value={user.name}
                  className={` w-full h-11 px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                  type="text"
                  placeholder="User name"
                  required
                  readOnly
                />
              </div>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Email
                </label>
                <input
                  name="seriesName"
                  value={user.email}
                  className="w-full h-11  px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="User email"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className={`${style.myprofile_input_wrapper} mb-2 md:flex md:justify-between items-end`}>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  My Coins
                </label>
                <input
                  name="myCoin"
                  value={user.myCoin + " " + 'Coins'}
                  className={` w-full h-11 px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                  type="text"
                  placeholder="My coins"
                  required
                  readOnly
                />
              </div>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  My earning coins
                </label>
                <input
                  name="refEarnCoin"
                  value={user.refEarnCoin + " " + 'Coins'}
                  className="w-full h-11  px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder=" My Earn Coin "
                  required
                  readOnly
                />
              </div>
            </div>
            <div className={`${style.myprofile_input_wrapper} mb-2 md:flex md:justify-between items-end`}>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Bank name
                </label>
                <input
                  value={user.bankDetails?.bankName || ''}
                  className="w-full h-11 px-3  py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="User Bank name"
                  required
                  readOnly
                />
              </div>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Account name
                </label>
                <input

                  value={user.bankDetails?.accountNo || ''}
                  className="w-full h-11 px-3  py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="User account name"
                  required
                  readOnly
                />
              </div>
            </div>
            <div className={`${style.myprofile_input_wrapper} mb-2 md:flex md:justify-between items-end`}>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  IFSC code
                </label>
                <input
                  value={user.bankDetails?.IFSC_code || ''}
                  className="w-full h-11  px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="User IFSC code"
                  required
                  readOnly
                />
              </div>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Branch code
                </label>
                <input
                  value={user.bankDetails?.branchCode || ''}
                  className="w-full h-11 px-3  py-2 text-sm leading-tight rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="User Branch name"
                  required
                  readOnly
                />
              </div>
            </div>
            <div className={`${style.myprofile_input_wrapper} mb-2 md:flex md:justify-between items-end`}>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Special code
                </label>
                <input
                  data-toggle="modal"
                  data-target="#ShareCodeCard"
                  value={user.specialCode?.code || ''}
                  className="w-full h-11  px-3 py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Special code"
                  required
                  readOnly
                  onClick={()=> getCode(user.specialCode?.code || '')}
                />
              </div>
              <div className={`${style.myprofile_input} w-5/12 mb-4 md:mr-2 md:mb-0`}>
                <label className="block mb-2 text-sm font-bold text-white">
                  Refferal code
                </label>
                <input
                 data-toggle="modal"
                 data-target="#ShareCodeCard"
                  value={user.normalRefCode?.refCode || ''}
                  className="w-full h-11 px-3   py-2 text-sm leading-tight  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Episode name"
                  required
                  readOnly
                  onClick={()=> getCode(user.normalRefCode?.refCode || '')}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ShareCard code={code}/>
    </>
  )
}

export default MyProfile