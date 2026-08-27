import '../../styles/moncy/Work.css'

export default function WorkImage({ image, alt, video }) {
  return (
    <div className="work-image">
      <div className="work-image-in">
        <img src={image} alt={alt} loading="lazy" />
        {video && <video src={video} muted loop playsInline />}
      </div>
    </div>
  )
}
