import { useEffect, useRef } from 'react'

import '../../styles/moncy/Cursor.css'



export default function Cursor() {

  const cursorRef = useRef(null)



  useEffect(() => {

    if (window.matchMedia('(pointer: coarse)').matches) return



    let hover = false

    const cursor = cursorRef.current

    if (!cursor) return



    const mousePos = { x: 0, y: 0 }

    const cursorPos = { x: 0, y: 0 }



    const onMove = (e) => {

      mousePos.x = e.clientX

      mousePos.y = e.clientY

    }



    document.addEventListener('mousemove', onMove, { passive: true })



    let rafId

    const loop = () => {

      if (!hover) {

        cursorPos.x += (mousePos.x - cursorPos.x) / 6

        cursorPos.y += (mousePos.y - cursorPos.y) / 6

        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`

      }

      rafId = requestAnimationFrame(loop)

    }

    rafId = requestAnimationFrame(loop)



    const cleanups = []

    document.querySelectorAll('[data-cursor]').forEach((item) => {

      const onOver = (e) => {

        const target = e.currentTarget

        const rect = target.getBoundingClientRect()



        if (target.dataset.cursor === 'icons') {

          cursor.classList.add('cursor-icons')

          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`

          cursor.style.setProperty('--cursorH', `${rect.height}px`)

          hover = true

        }

        if (target.dataset.cursor === 'disable') {

          cursor.classList.add('cursor-disable')

        }

      }

      const onOut = () => {

        cursor.classList.remove('cursor-disable', 'cursor-icons')

        hover = false

      }

      item.addEventListener('mouseover', onOver)

      item.addEventListener('mouseout', onOut)

      cleanups.push(() => {

        item.removeEventListener('mouseover', onOver)

        item.removeEventListener('mouseout', onOut)

      })

    })



    return () => {

      cancelAnimationFrame(rafId)

      document.removeEventListener('mousemove', onMove)

      cleanups.forEach((fn) => fn())

    }

  }, [])



  return <div className="cursor-main" ref={cursorRef} />

}

