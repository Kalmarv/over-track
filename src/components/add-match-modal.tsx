import { Button, Radio, Modal, Text, Checkbox, Input } from '@nextui-org/react'
import { GameResult, Hero, Map, MapType, Role } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'

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
  }

  return (
    <>
      <Button auto className="mx-2" onClick={handler}>
        Add Match
      </Button>
      <Modal closeButton aria-labelledby="modal-title" open={modalVisible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Match to {battleAcc}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            label="Game Result"
            orientation="horizontal"
            value={matchResult}
            onChange={setMatchResult}
          >
            <Radio value="WIN">Win</Radio>
            <Radio value="LOSE">Loss</Radio>
            <Radio value="DRAW">Draw</Radio>
          </Radio.Group>
          <Radio.Group label="Role" orientation="horizontal" value={role} onChange={setRole}>
            <Radio value="TANK">Tank</Radio>
            <Radio value="DAMAGE">Damage</Radio>
            <Radio value="SUPPORT">Healer</Radio>
          </Radio.Group>
          <Checkbox.Group label="Heroes Played" value={heroes} onChange={setHeroes}>
            <Checkbox value="ANA">Ana</Checkbox>
            <Checkbox value="ASHE">Ashe</Checkbox>
            <Checkbox value="BAPTISTE">Baptiste</Checkbox>
            <Checkbox value="BASTION">Bastion</Checkbox>
            <Checkbox value="BRIGITTE">Brigitte</Checkbox>
            <Checkbox value="CASSIDY">Cassidy</Checkbox>
            <Checkbox value="DVA">D.Va</Checkbox>
            <Checkbox value="DOOMFIST">Doomfist</Checkbox>
            <Checkbox value="ECHO">Echo</Checkbox>
            <Checkbox value="GENJI">Genji</Checkbox>
            <Checkbox value="HANZO">Hanzo</Checkbox>
            <Checkbox value="JUNKRAT">Junkrat</Checkbox>
            <Checkbox value="LUCIO">Lucio</Checkbox>
            <Checkbox value="MEI">Mei</Checkbox>
            <Checkbox value="MERCY">Mercy</Checkbox>
            <Checkbox value="MOIRA">Moira</Checkbox>
            <Checkbox value="ORISA">Orisa</Checkbox>
            <Checkbox value="PHARAH">Pharah</Checkbox>
            <Checkbox value="REAPER">Reaper</Checkbox>
            <Checkbox value="REINHARDT">Reinhardt</Checkbox>
            <Checkbox value="ROADHOG">Roadhog</Checkbox>
            <Checkbox value="SIGMA">Sigma</Checkbox>
            <Checkbox value="SOLDIER">Soldier</Checkbox>
            <Checkbox value="SOMBRA">Sombra</Checkbox>
            <Checkbox value="SYMMETRA">Symmetra</Checkbox>
            <Checkbox value="TORBJORN">Torbjorn</Checkbox>
            <Checkbox value="TRACER">Tracer</Checkbox>
            <Checkbox value="WIDOWMAKER">Widowmaker</Checkbox>
            <Checkbox value="WINSTON">Winston</Checkbox>
            <Checkbox value="WRECKING_BALL">Wrecking Ball</Checkbox>
            <Checkbox value="ZARYA">Zarya</Checkbox>
            <Checkbox value="ZENYATTA">Zenyatta</Checkbox>
          </Checkbox.Group>
          <Radio.Group label="Map Type" value={mapType} onChange={setMapType}>
            <Radio value="Assault">Assault</Radio>
            <Radio value="Escort">Escort</Radio>
            <Radio value="Control">Control</Radio>
            <Radio value="Hybrid">Hybrid</Radio>
          </Radio.Group>
          <Radio.Group label="Map" value={map} onChange={setMap}>
            <Radio value="BLIZZARD_WORLD">Blizzard World</Radio>
            <Radio value="BUSAN">Busan</Radio>
            <Radio value="DORADO">Dorado</Radio>
            <Radio value="EICHENWALDE">Eichenwalde</Radio>
            <Radio value="HANAMURA">Hanamura</Radio>
            <Radio value="HAVANA">Havana</Radio>
            <Radio value="HOLLYWOOD">Hollywood</Radio>
            <Radio value="HORIZON_LUNAR_COLONY">Horizon Lunar Colony</Radio>
            <Radio value="ILLIOS">Illios</Radio>
            <Radio value="JUNKERTOWN">JunkerTown</Radio>
            <Radio value="KINGS_ROW">King's Row</Radio>
            <Radio value="LIJIANG_TOWER">Lijiang Tower</Radio>
            <Radio value="NEPAL">Nepal</Radio>
            <Radio value="NUMBANI">Numbani</Radio>
            <Radio value="OASIS">Oasis</Radio>
            <Radio value="PARIS">Paris</Radio>
            <Radio value="RIALTO">Rialto</Radio>
            <Radio value="ROUTE_66">Route 66</Radio>
            <Radio value="TEMPLE_OF_ANUBIS">Temple of Anubis</Radio>
            <Radio value="VOLSKAYA">Volskaya</Radio>
            <Radio value="GIBRALTER">Gibralter</Radio>
          </Radio.Group>
          <Input label="Date" type="date" onChange={(e) => setDate(new Date(e.target.value))} />
          <Button onClick={submitMatch}>Add Match</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddMatchModal
