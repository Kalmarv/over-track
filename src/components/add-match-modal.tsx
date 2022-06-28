import { Button, Checkbox, Input, Modal, Radio, Text } from '@nextui-org/react'
import { GameResult, Hero, Map, MapType, Role } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { heroData } from '../constants'
import { trpc } from '../utils/trpc'
import HeroProfile from './hero-profile'

const AddMatchModal = () => {
  const router = useRouter()
  const { battleAcc } = router.query
  const [modalVisible, setModalVisible] = useState(false)
  const handler = () => setModalVisible(true)
  const closeHandler = () => setModalVisible(false)
  const { invalidateQueries } = trpc.useContext()
  const createMatch = trpc.useMutation('create-quick-match', {
    onSuccess: () => invalidateQueries('quick-match'),
  })
  const battleAccountID = trpc.useQuery(['battle-account-id', { name: battleAcc as string }])

  const [matchResult, setMatchResult] = useState('')
  const [role, setRole] = useState('')
  const [heroes, setHeroes] = useState<string[]>([])
  const [map, setMap] = useState('')
  const [mapType, setMapType] = useState('')
  const [date, setDate] = useState<Date>()

  const submitMatch = async () => {
    createMatch.mutate({
      battleAccountID: battleAccountID.data!.id,
      hero: [...heroes] as Hero[],
      map: map as Map,
      mapType: mapType as MapType,
      playedAt: date as Date,
      result: matchResult as GameResult,
      role: role as Role,
    })
    setModalVisible(false)
    setMatchResult('')
    setRole('')
    setHeroes([])
    setMap('')
    setMapType('')
    setDate(new Date())
  }

  return (
    <>
      <Button auto className='mx-2' onClick={handler}>
        Add Match
      </Button>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={modalVisible}
        onClose={closeHandler}
        width='600px'>
        <Modal.Header>
          <Text id='modal-title' size={18}>
            Add Match to {battleAcc}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            label='Game Result'
            orientation='horizontal'
            value={matchResult}
            onChange={setMatchResult}>
            <Radio value='WIN'>Win</Radio>
            <Radio value='LOSE'>Loss</Radio>
            <Radio value='DRAW'>Draw</Radio>
          </Radio.Group>
          <Radio.Group
            label='Role'
            orientation='horizontal'
            value={role}
            onChange={(v) => {
              setRole(v)
              setHeroes([])
            }}>
            <Radio value='TANK'>Tank</Radio>
            <Radio value='DAMAGE'>Damage</Radio>
            <Radio value='SUPPORT'>Healer</Radio>
          </Radio.Group>
          <Checkbox.Group label='Heroes Played' value={heroes} onChange={setHeroes}>
            <div className='flex flex-wrap'>
              {heroData
                .filter((hero) => hero.role === role)
                .map((hero) => (
                  <div className='w-1/2 my-2'>
                    <HeroProfile key={hero.value} heroValue={hero.value} checked={true} />
                  </div>
                ))}
            </div>
          </Checkbox.Group>
          <Radio.Group label='Map Type' value={mapType} onChange={setMapType}>
            <Radio value='Assault'>Assault</Radio>
            <Radio value='Escort'>Escort</Radio>
            <Radio value='Control'>Control</Radio>
            <Radio value='Hybrid'>Hybrid</Radio>
          </Radio.Group>
          <Radio.Group label='Map' value={map} onChange={setMap}>
            <Radio value='BLIZZARD_WORLD'>Blizzard World</Radio>
            <Radio value='BUSAN'>Busan</Radio>
            <Radio value='DORADO'>Dorado</Radio>
            <Radio value='EICHENWALDE'>Eichenwalde</Radio>
            <Radio value='HANAMURA'>Hanamura</Radio>
            <Radio value='HAVANA'>Havana</Radio>
            <Radio value='HOLLYWOOD'>Hollywood</Radio>
            <Radio value='HORIZON_LUNAR_COLONY'>Horizon Lunar Colony</Radio>
            <Radio value='ILLIOS'>Illios</Radio>
            <Radio value='JUNKERTOWN'>JunkerTown</Radio>
            <Radio value='KINGS_ROW'>King's Row</Radio>
            <Radio value='LIJIANG_TOWER'>Lijiang Tower</Radio>
            <Radio value='NEPAL'>Nepal</Radio>
            <Radio value='NUMBANI'>Numbani</Radio>
            <Radio value='OASIS'>Oasis</Radio>
            <Radio value='PARIS'>Paris</Radio>
            <Radio value='RIALTO'>Rialto</Radio>
            <Radio value='ROUTE_66'>Route 66</Radio>
            <Radio value='TEMPLE_OF_ANUBIS'>Temple of Anubis</Radio>
            <Radio value='VOLSKAYA'>Volskaya</Radio>
            <Radio value='GIBRALTER'>Gibralter</Radio>
          </Radio.Group>
          <Input label='Date' type='date' onChange={(e) => setDate(new Date(e.target.value))} />
          <Button onClick={submitMatch}>Add Match</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddMatchModal
