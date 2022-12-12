import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'

import { BiMailSend } from 'react-icons/bi'
import './ProfilePage.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)
  const [image, setImage] = useState('')

  const handleUpdateUserpic = async (e) => {
    console.log(user)
    e.preventDefault()
    const cloudName = process.env.CD_CLOUD_NAME || 'dzediojcr'
    const preset = process.env.CD_PRESET || 'tasky_images'

    const formData = new FormData()

    if (image.length < 0) {
      formData.append('file', image)
      formData.append('upload_preset', preset)
      formData.append('cloud_name', cloudName)

      try {
        // upload new pic to CD
        const cdUrl = 'https://api.cloudinary.com/v1_1/dzediojcr/image/upload'
        const { data } = await axios.post(cdUrl, formData)

        // set new Pic
        setImage(data.url)

        try {
          // Update User model
          const body = { userpic: image, userId: user._id }
          const res = await apiService.updateUser(body)

          console.log('USER ID: ', user._id)
          console.log('response to localhost: ', res)

          // if (res.status === 200) {
          setImage('')
          navigate('/profile')
          // }
        } catch (err) {
          console.error(err.message)
        }
      } catch (err) {
        console.warn(err.message)
      }
    } else {
      alert('empty')
    }
  }

  const { _id, username, name, email, userpic } = user

  return (
    <div className="flex justify-center px-6  py-6">
      {/* <UserCard
        {...user}
        setImage={setImage}
        handleUpdateUserpic={handleUpdateUserpic}
      /> */}
      <section className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="flex items-center justify-center -mx-10">
            <div className="mt-12 flex lg:mt-0 flex-col items-center w-1/2 mx-10">
              <img
                className="object-cover mx-auto rounded-full block shrink-0 w-96 h-96 sm:w-64 sm:h-64"
                src={userpic}
                alt={name}
              />

              <div className="mt-6 space-y-8 md:mt-8 items-center">
                <p className="flex items-start -mx-2">
                  <BiMailSend size={24} />
                  <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    {email}
                  </span>
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 lg:mx-10">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize dark:text-white lg:text-4xl">
                Edit profile
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Is here everything ok?
              </p>

              <form className="mt-12">
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder={name || ''}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder={email || ''}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>

                <div className="flex-1 px-2 mt-4 ">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-white
      hover:file:bg-blue-300
    "
                  />
                </div>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const UserCard = ({ name, email, userpic, setImage, handleUpdateUserpic }) => (
  <section className="min-h-screen bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
      <div className="flex items-center justify-center -mx-10">
        <div className="mt-12 flex lg:mt-0 flex-col items-center w-1/2 mx-10">
          <img
            className="object-cover mx-auto rounded-full block shrink-0 w-96 h-96 sm:w-64 sm:h-64"
            src={userpic}
            alt={name}
          />

          <div className="mt-6 space-y-8 md:mt-8 items-center">
            <p className="flex items-start -mx-2">
              <BiMailSend size={24} />
              <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                {email}
              </span>
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 lg:mx-10">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize dark:text-white lg:text-4xl">
            Let's plan!
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            What is on today?
          </p>

          <form className="mt-12">
            <div className="-mx-2 md:items-center md:flex">
              <div className="flex-1 px-2">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder={name || ''}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="flex-1 px-2 mt-4 md:mt-0">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder={email || ''}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>

            <div className="flex-1 px-2 mt-4 ">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-white
      hover:file:bg-blue-300
    "
              />
            </div>

            <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
)

// const UserCard = ({ name, email, userpic, setImage, handleUpdateUserpic }) => (
//   <div className="card w-96 bg-base-100 shadow-md">
//     <figure>
//       <img src={userpic} alt={name} />
//     </figure>
//     <div className="card-body">
//       <h2 className="card-title">{name}</h2>
//       <p>{email}</p>
//       <div className="card-actions">
//         <form onSubmit={handleUpdateUserpic}>
//           <input
//             type="file"
//             className="file-input file-input-ghost w-full file-input-sm max-w-xs"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <button type="submit" className="btn">
//             Update
//           </button>
//         </form>
//       </div>
//       {/* <div className="card-actions justify-end">
//         <div className="badge badge-outline">Fashion</div>
//         <div className="badge badge-outline">Products</div>
//       </div> */}
//     </div>
//   </div>
// )
