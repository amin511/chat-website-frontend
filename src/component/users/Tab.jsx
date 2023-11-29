import React, { useState } from 'react'
import { SettingIcon } from '../../IconsSvg'
import { UserIcon } from '../../IconsSvg'
import { useDispatch, useSelector } from 'react-redux'
import { ENDPOINTS } from '../../utils/axios'
import { filterUsersOnline, searchUsers } from '../../app-redux/features/users/usersSlice'
import { ContactEmergency, OnlinePrediction } from '@mui/icons-material'
const Tab = () => {

    const { userImage, name } = useSelector((store) => store.user.user);
    const dispatch = useDispatch();
    const tabFilter = [
        {
            id: 1,
            title: "All",
        },
        {
            id: 2,
            title: "Online"
        }

    ]
    const [TabSelected, setTabSelected] = useState({ title: "All" })

    return (
        <>
            <main className='border-2 border-primary-300 bg-white max-w-[800px]   w-[90%] mx-auto mt-10 rounded-3xl p-4'>
                <header className=' flex mx-auto max-w-lg items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        {
                            userImage ? <img className=' border-primary-300 w-16 h-16 rounded-full object-cover' src={`${userImage}`} />
                                :
                                <UserIcon className={"border border-primary-300 rounded-full w-16 h-16"} />
                        }
                        <h1 className="userName text-2xl lg:max-w-[300px]  overflow-hidden  text-ellipsis  ">{name}</h1>

                    </div>
                    {<SettingIcon className={"w-8 h-8"} />}
                </header>

                <section className='mt-5'>
                    <input
                        onChange={(e) => dispatch(searchUsers(e.target.value))}
                        placeholder='Search...'
                        className='border px-5 placeholder:font-AnekLatin text-[20px] text-neutral-900 font-AnekLatin font-[300]  placeholder:text-primary-300  font-AnekLatin  font-[200] border-primary-300 w-full rounded-full p-2 outline-none  ' type='search' />
                </section>
                <section className='flex justify-evenly mt-6'>
                    {
                        tabFilter.map((element) =>
                            <button
                                key={element.id}
                                className={
                                    `px-4 py-1 text-[20px] font-Georgia font-[500] rounded-xl  ${element.title === TabSelected.title && 'filter  text-Tertiary-500  text-[18px] font-[700] font-Georgia '}`
                                }
                                onClick={() => {
                                    setTabSelected({ title: element.title })
                                    if (element.title === "Online") {

                                        dispatch(filterUsersOnline());
                                    }
                                    if (element.title === "All") {
                                        dispatch(searchUsers(""))
                                    }
                                }}>
                                {element.title}
                            </button>
                        )
                    }
                </section>
            </main>
        </>

    )
}

export default Tab

