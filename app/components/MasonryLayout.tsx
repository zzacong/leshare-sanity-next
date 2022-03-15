import type { Pin as Pintype } from '$lib/types'
import Masonry from 'react-masonry-css'

import { Pin } from '$components'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

export default function MasonryLayout({ pins }: Props) {
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakpointColumnsObj}
    >
      {pins.map(pin => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  )
}

interface Props {
  pins: Pintype[]
}
