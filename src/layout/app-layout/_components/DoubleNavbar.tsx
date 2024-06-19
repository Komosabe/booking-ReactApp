import { useState } from 'react'
import { Group } from '@mantine/core'
import { Image } from '@mantine/core'
import classes from './DoubleNavbar.module.css'
import { TbUser, TbLogout, TbBook, TbBalloon, TbBuilding } from 'react-icons/tb'
import { routes } from '../../../misc/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const data = [
  { link: routes['reservations'], label: 'Rezerwacje', icon: TbBook },
  { link: routes['concerts'], label: 'Koncerty', icon: TbBalloon },
  { link: routes['halls'], label: 'Miejsca', icon: TbBuilding },
  // { link: routes['users'], label: 'Konto', icon: TbUser },
]

export function DoubleNavbar() {
  const [active, setActive] = useState('Billing')

  const router = useRouter()

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        router.push(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <Image src="/logo.png" alt="Logo" w={150} />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <TbLogout className={classes.linkIcon} />
          <span>Wylogowanie</span>
        </a>
      </div>
    </nav>
  )
}
