import { Hero, Role } from '@prisma/client'

export interface HeroData {
  id: number
  value: Hero
  label: string
  role: Role
}

export const heroData: HeroData[] = [
  { id: 1, value: 'ANA', label: 'Ana', role: 'SUPPORT' },
  { id: 2, value: 'ASHE', label: 'Ashe', role: 'DAMAGE' },
  { id: 3, value: 'BAPTISTE', label: 'Baptiste', role: 'SUPPORT' },
  { id: 4, value: 'BASTION', label: 'Bastion', role: 'DAMAGE' },
  { id: 5, value: 'BRIGITTE', label: 'Brigitte', role: 'SUPPORT' },
  { id: 6, value: 'CASSIDY', label: 'Cassidy', role: 'DAMAGE' },
  { id: 7, value: 'DVA', label: 'D.Va', role: 'TANK' },
  { id: 8, value: 'DOOMFIST', label: 'Doomfist', role: 'DAMAGE' },
  { id: 9, value: 'ECHO', label: 'Echo', role: 'DAMAGE' },
  { id: 10, value: 'GENJI', label: 'Genji', role: 'DAMAGE' },
  { id: 11, value: 'HANZO', label: 'Hanzo', role: 'DAMAGE' },
  { id: 12, value: 'JUNKRAT', label: 'Junkrat', role: 'DAMAGE' },
  { id: 13, value: 'LUCIO', label: 'Lucio', role: 'SUPPORT' },
  { id: 14, value: 'MEI', label: 'Mei', role: 'DAMAGE' },
  { id: 15, value: 'MERCY', label: 'Mercy', role: 'SUPPORT' },
  { id: 16, value: 'MOIRA', label: 'Moira', role: 'SUPPORT' },
  { id: 17, value: 'ORISA', label: 'Orisa', role: 'TANK' },
  { id: 18, value: 'PHARAH', label: 'Pharah', role: 'DAMAGE' },
  { id: 19, value: 'REAPER', label: 'Reaper', role: 'DAMAGE' },
  { id: 20, value: 'REINHARDT', label: 'Reinhardt', role: 'TANK' },
  { id: 21, value: 'ROADHOG', label: 'Roadhog', role: 'TANK' },
  { id: 22, value: 'SIGMA', label: 'Sigma', role: 'TANK' },
  { id: 23, value: 'SOLDIER', label: 'Soldier', role: 'DAMAGE' },
  { id: 24, value: 'SOMBRA', label: 'Sombra', role: 'DAMAGE' },
  { id: 25, value: 'SYMMETRA', label: 'Symmetra', role: 'DAMAGE' },
  { id: 26, value: 'TORBJORN', label: 'Torbjorn', role: 'DAMAGE' },
  { id: 27, value: 'TRACER', label: 'Tracer', role: 'DAMAGE' },
  { id: 28, value: 'WIDOWMAKER', label: 'Widowmaker', role: 'DAMAGE' },
  { id: 29, value: 'WINSTON', label: 'Winston', role: 'TANK' },
  { id: 30, value: 'WRECKING_BALL', label: 'Wrecking Ball', role: 'TANK' },
  { id: 31, value: 'ZARYA', label: 'Zarya', role: 'TANK' },
  { id: 32, value: 'ZENYATTA', label: 'Zenyatta', role: 'SUPPORT' },
]

export const mapData = [
  { id: 1, value: 'BLIZZARD_WORLD', label: 'Blizzard World', type: 'Escort' },
  { id: 2, value: 'BUSAN', label: 'Busan', type: 'Control' },
  { id: 3, value: 'DORADO', label: 'Dorado', type: 'Escort' },
  { id: 4, value: 'EICHENWALDE', label: 'Eichenwalde', type: 'Hybrid' },
  { id: 5, value: 'HANAMURA', label: 'Hanamura', type: 'Assault' },
  { id: 6, value: 'HAVANA', label: 'Havana', type: 'Escort' },
  { id: 7, value: 'HOLLYWOOD', label: 'Hollywood', type: 'Hybrid' },
  { id: 8, value: 'HORIZON_LUNAR_COLONY', label: 'Horizon Lunar Colony', type: 'Assault' },
  { id: 9, value: 'ILLIOS', label: 'Illios', type: 'Control' },
  { id: 10, value: 'JUNKERTOWN', label: 'Junkertown', type: 'Escort' },
  { id: 11, value: 'KINGS_ROW', label: "King's Row", type: 'Hybrid' },
  { id: 12, value: 'LIJIANG_TOWER', label: 'Lijiang Tower', type: 'Control' },
  { id: 13, value: 'NEPAL', label: 'Nepal', type: 'Control' },
  { id: 14, value: 'NUMBANI', label: 'Numbani', type: 'Hybrid' },
  { id: 15, value: 'OASIS', label: 'Oasis', type: 'Control' },
  { id: 16, value: 'PARIS', label: 'Paris', type: 'Assault' },
  { id: 17, value: 'RIALTO', label: 'Rialto', type: 'Escort' },
  { id: 18, value: 'ROUTE_66', label: 'Route 66', type: 'Escort' },
  { id: 19, value: 'TEMPLE_OF_ANUBIS', label: 'Temple of Anubis', type: 'Assault' },
  { id: 20, value: 'VOLSKAYA', label: 'Volskaya', type: 'Assault' },
  { id: 21, value: 'GIBRALTER', label: 'Gibralter', type: 'Escort' },
]
