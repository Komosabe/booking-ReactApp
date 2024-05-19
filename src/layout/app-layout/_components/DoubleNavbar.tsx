import { useState } from 'react'
import { Group } from '@mantine/core'
import { Image } from '@mantine/core'
import classes from './DoubleNavbar.module.css'
import { TbUser, TbLogout, TbBook, TbBalloon } from 'react-icons/tb'

const data = [
  { link: '', label: 'Rezerwacje', icon: TbBook },
  { link: '', label: 'Koncerty', icon: TbBalloon },
  { link: '', label: 'Konto', icon: TbUser },
]

export function DoubleNavbar() {
  const [active, setActive] = useState('Billing')

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
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
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
