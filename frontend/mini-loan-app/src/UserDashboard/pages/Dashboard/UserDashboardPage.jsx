import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../redux/authSlice'
import { token } from '../../../../serverURL'
import UserLoanPage from '../user/UserLoanPage'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Sheared/Navbar'

const UserDashboardPage = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)
  console.log(token)
  useEffect(() => {
    if(!token){
      window.location.reload()
    }
    dispatch(getProfile(token ))
  }, [])

  return (
    <>

      <div class="flex-grow text-gray-800">
        <Navbar />
        <main class="p-6 sm:p-10 h-[90vh] space-y-6">
          <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6">
              <h1 class="text-4xl font-semibold mb-2">Dashboard</h1>
            </div>
          </div>
          <section class="grid md:grid-cols-2 xl:grid-cols-2  gap-6">
            <div class="flex justify-center items-center p-8 bg-white shadow rounded-lg">

              <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div >
                <span class="block text-2xl font-bold">{user?.creditScore}</span>
                <span class="block text-gray-500">Credit Score</span>
              </div>
            </div>



            {/* <div class="flex items-center p-8 bg-white shadow rounded-lg">
              <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div>
                <span class="inline-block text-2xl font-bold">9</span>

                <span class="block text-gray-500">Pending Loans</span>
              </div>
            </div> */}
            {/* <div class="flex items-center p-8 bg-white shadow rounded-lg">
              <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                <svg class="w-6 h-6 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                  <path d="M18.972.863a.913.913 0 0 0-.041-.207.956.956 0 0 0-.107-.19 1.01 1.01 0 0 0-.065-.116c-.008-.01-.02-.013-.028-.022a1.008 1.008 0 0 0-.174-.137 1.085 1.085 0 0 0-.141-.095 1.051 1.051 0 0 0-.171-.047.985.985 0 0 0-.207-.041C18.025.007 18.014 0 18 0h-3.207a1 1 0 1 0 0 2h.5l-4.552 3.9-3.5-.874a1 1 0 0 0-.867.189l-5 4a1 1 0 0 0 1.25 1.562L7.238 7.09l3.52.88a1 1 0 0 0 .892-.211L17 3.173v1.034a1 1 0 0 0 2 0V1a.9.9 0 0 0-.028-.137ZM13.5 9a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm.24 4.591a3.112 3.112 0 0 1 1.935 1.374 2.036 2.036 0 0 1 .234 1.584 2.255 2.255 0 0 1-1.374 1.469.982.982 0 0 1-1.953.09 2.943 2.943 0 0 1-1.475-.92 1 1 0 0 1 1.536-1.283.953.953 0 0 0 .507.29.778.778 0 0 0 .831-.18 1.108 1.108 0 0 0-.714-.481 3.105 3.105 0 0 1-1.934-1.374 2.042 2.042 0 0 1-.233-1.584 2.264 2.264 0 0 1 1.45-1.493v-.03a1 1 0 0 1 2 0c.517.159.98.457 1.337.862a1.002 1.002 0 1 1-1.524 1.3.962.962 0 0 0-.507-.286.775.775 0 0 0-.829.18 1.113 1.113 0 0 0 .713.482ZM6 20a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1Zm-4 0a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1Z" />
                </svg>
              </div>
              <div>
                <span class="block text-2xl font-bold">1</span>
                <span class="block text-gray-500">Paid Loan</span>
              </div>
            </div> */}
            <Link to="/request-loan">
              <div class="flex justify-center items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                  <svg class="w-6 h-6 text-red-500 dark:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                    <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                  </svg>
                </div>
                <div>
                  <span class="block text-2xl font-bold"></span>
                  <span class="block text-gray-500">Request For Loan</span>
                </div>
              </div>
            </Link>
          </section>
          <UserLoanPage />
        </main>

      </div>

    </>
  )
}

export default UserDashboardPage