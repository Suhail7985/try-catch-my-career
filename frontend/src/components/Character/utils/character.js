import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from 'three-stdlib'
import { setCharTimeline, setAllTimeline } from '../../utils/GsapScroll'
import { decryptFile } from './decrypt'

export default function setCharacter(renderer, scene, camera) {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  loader.setDRACOLoader(dracoLoader)

  const loadCharacter = () => new Promise(async (resolve, reject) => {
    try {
      const encryptedBlob = await decryptFile('/models/character.enc', 'Character3D#@')
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]))

      loader.load(
        blobUrl,
        (gltf) => {
          const character = gltf.scene
          character.traverse((child) => {
            if (child.isMesh) {
              child.frustumCulled = true
            }
          })

          resolve(gltf)

          renderer.compileAsync(character, camera, scene).catch(() => {})
          setCharTimeline(character, camera)
          setAllTimeline()
          character.getObjectByName('footR').position.y = 3.36
          character.getObjectByName('footL').position.y = 3.36
          dracoLoader.dispose()
        },
        undefined,
        (error) => {
          console.error('Error loading GLTF model:', error)
          reject(error)
        }
      )
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })

  return { loadCharacter }
}
