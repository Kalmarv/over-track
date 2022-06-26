import { Hero, Role } from '@prisma/client'

interface HeroData {
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
