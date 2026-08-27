import * as THREE from 'three'

import { RGBELoader } from 'three-stdlib'

import { gsap } from 'gsap'



export default function setLighting(scene) {

  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0)

  directionalLight.position.set(-0.47, -0.32, -1)

  scene.add(directionalLight)



  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3)

  pointLight.position.set(3, 12, 4)

  scene.add(pointLight)



  new RGBELoader()

    .setPath('/models/')

    .load('char_enviorment.hdr', (texture) => {

      texture.mapping = THREE.EquirectangularReflectionMapping

      scene.environment = texture

      scene.environmentIntensity = 0

      scene.environmentRotation.set(5.76, 85.85, 1)

    })



  function setPointLight(screenLight) {

    if (screenLight?.material?.opacity > 0.9) {

      pointLight.intensity = screenLight.material.emissiveIntensity * 20

    } else {

      pointLight.intensity = 0

    }

  }



  function turnOnLights() {

    gsap.to(scene, { environmentIntensity: 0.64, duration: 0.85, ease: 'power2.inOut' })

    gsap.to(directionalLight, { intensity: 1, duration: 0.85, ease: 'power2.inOut' })

    gsap.to('.character-rim', { y: '55%', opacity: 1, delay: 0.03, duration: 0.85 })

  }



  return { setPointLight, turnOnLights }

}

