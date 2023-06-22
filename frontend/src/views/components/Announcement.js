import React from 'react'

const Announcement = ({announcement}) => {
  return (
    <article className='rounded-md bg-gray-800 px-2 py-5 my-2'>
        <p>{announcement.admin.name}, {announcement.admin.title}</p>
        <p>{announcement.title}</p>
    </article>
  )
}

export default Announcement;
