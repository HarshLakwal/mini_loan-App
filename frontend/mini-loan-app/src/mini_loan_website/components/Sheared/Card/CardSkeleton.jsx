import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import style from './card.module.css'

import React from 'react'

const CardSkeleton = ({ cards }) => {
  return (
    Array(cards).fill(0).map(item => (
      <div className={style.card_skeleton}>
        <div className={style.skeleton_img}>
          <Skeleton width={100} height={100} />
        </div>
        <div className={style.skeleton_info}>
          <Skeleton count={2} width={100} height={10} />
        </div>
      </div>
    ))
  )
}

export default CardSkeleton