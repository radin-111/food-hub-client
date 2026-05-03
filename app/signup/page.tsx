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
            
            <div className="text-center space-y-4 animate-fade-in-up animation-delay-600">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                By signing up you agree to our{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
              </p>
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
