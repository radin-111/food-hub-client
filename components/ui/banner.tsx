import Image from 'next/image'
import banner from "../../public/banner.jpg"


export default function Banner() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Image 
        src={banner} 
        alt='Banner' 
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in-up">
            Welcome to
            <span className="block text-orange-400">FoodHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Discover delicious meals from local providers
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg">
              Order Now
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full font-semibold transition-all hover:scale-105">
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
