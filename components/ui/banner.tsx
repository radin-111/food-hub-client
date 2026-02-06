import Image from 'next/image'
import banner from "../../public/banner.jpg"


export default function Banner() {
  return (
    <Image src={banner} alt='Banner' width={2000} height={500} />
  )
}
