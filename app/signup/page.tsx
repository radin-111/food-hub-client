import logo from "../../public/image (3).jpg";
import burger from "../../public/burger.avif"
import { SignupForm } from "@/components/modules/authentication/signup-form"
import Link from "next/link"
import Image from "next/image"
import ThreeBackground from "@/components/ui/three-background";
import D3Chart, { DataPoint } from "@/components/ui/d3-chart";

export default function SignupPage() {
  // Sample data for D3 visualization
  const chartData: DataPoint[] = [
    { name: "Pizza", value: 35 },
    { name: "Burger", value: 28 },
    { name: "Sushi", value: 22 },
    { name: "Pasta", value: 18 },
    { name: "Salad", value: 15 },
  ];

  return (
    <div className="grid min-h-svh lg:grid-cols-2 relative overflow-hidden">
      <ThreeBackground />
      
      <div className="flex flex-col gap-4 p-6 md:p-10 relative z-10">
        <Link href={'/'}>
          <div className="flex justify-center items-center gap-2 md:justify-start group animate-fade-in-up">
            <div className="relative">
              <Image 
                width={50} 
                src={logo} 
                alt="logo" 
                className="rounded-full transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <p className="text-2xl font-bold gradient-text">FoodHub</p>
          </div>
        </Link>
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-6">
            <div className="text-center space-y-2 animate-fade-in-up animation-delay-200">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-muted-foreground">Join our food community</p>
            </div>
            
            <div className="animate-fade-in-up animation-delay-400">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative hidden lg:block bg-gradient-to-br from-red-50 to-orange-50">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text animate-fade-in-up">
                Join Food Lovers
              </h2>
              <p className="text-muted-foreground animate-fade-in-up animation-delay-200">
                Discover amazing dishes from local providers
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-semibold mb-4 text-center">Popular Categories</h3>
              <D3Chart data={chartData} type="pie" width={300} height={200} />
            </div>
            
            <div className="space-y-4 animate-fade-in-up animation-delay-600">
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold">Free Registration</div>
                    <div className="text-sm text-muted-foreground">No hidden fees</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold">Exclusive Deals</div>
                    <div className="text-sm text-muted-foreground">Member-only discounts</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold">Fast Support</div>
                    <div className="text-sm text-muted-foreground">24/7 customer service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
