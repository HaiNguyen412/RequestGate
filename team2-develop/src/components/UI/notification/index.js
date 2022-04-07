/** @format */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_NOTI } from '../../../store/constants'
import './index.css'

const Notification = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.handleNotification);
  return (
    <div className="notification-container">
      {notifications?.map((noti) => (
        <div
          className={`notification-item ${noti.notiType}`}
          key={noti.id}
          onClick={() => dispatch({
            type: REMOVE_NOTI,
            payload: noti,
          })}
        >
          {noti.msg}
        </div>
      ))}
    </div>
  )
}

export default Notification
