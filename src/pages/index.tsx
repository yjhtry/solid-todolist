import type { RouteSectionProps } from '@solidjs/router'
import type { Component } from 'solid-js'
import { TheNav } from '../components/TheNav'

const Home: Component<RouteSectionProps> = (props) => {
  return (
    <>
      <TheNav />
      {props.children}
    </>
  )
}

export default Home
