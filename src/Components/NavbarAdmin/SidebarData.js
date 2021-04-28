import React from 'react';
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'


export const SidebarData = [
    {
        title: 'Admin',
        path: '/admin',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Quản lý người dùng ',
        path: '/admin/user',
        icon: <AiIcons.AiOutlineUser />,
        className: 'nav-text'
    },
    {
        title: 'Quản lý phim ',
        path: '/admin/movie',
        icon: <BiIcons.BiFilm />,
        className: 'nav-text'
    },
    {
        title: 'Quản lý lịch chiếu',
        path: '/admin/showtime',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    }
]

