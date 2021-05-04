import React from 'react'
import { useRecoilState } from 'recoil'

import { favouriteStationsAtom } from '../atoms'
import Card from './Card'
import { Text } from './Themed'

const FavouriteStationsCard: React.FC = () => {
  const [favouriteStations, setFavouriteStations] = useRecoilState(favouriteStationsAtom)

  return (
    <Card>
      <Text>Favourite stations</Text>

      {favouriteStations.length === 0 ? <Text>No stations favourited</Text> : favouriteStations}
    </Card>
  )
}

export default FavouriteStationsCard
