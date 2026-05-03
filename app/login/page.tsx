import Image from "next/image";
import logo from "../../public/image (3).jpg";
import { LoginForm } from "@/components/modules/authentication/login-form";
import Link from "next/link";
import ThreeBackground from "@/components/ui/three-background";
import D3Chart, { DataPoint } from "@/components/ui/d3-chart";

export default function LoginPage() {
  // Sample data for D3 visualization
  const chartData: DataPoint[] = [
    { name: "Mon", value: 45 },
    { name: "Tue", value: 38 },
    { name: "Wed", value: 52 },
    { name: "Thu", value: 41 },
    { name: "Fri", value: 65 },
    { name: "Sat", value: 58 },
    { name: "Sun", value: 72 },
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
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>
            
            <div className="animate-fade-in-up animation-delay-400">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative hidden lg:block bg-gradient-to-br from-orange-50 to-red-50">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text animate-fade-in-up">
                Delicious Analytics
              </h2>
              <p className="text-muted-foreground animate-fade-in-up animation-delay-200">
                Track your food journey with beautiful insights
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-semibold mb-4 text-center">Weekly Orders</h3>
              <D3Chart data={chartData} type="line" width={350} height={200} />
            </div>
            
            <div className="grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-600">
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-orange-500">2.5K</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-green-500">4.8</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-500">98%</div>
                <div className="text-sm text-muted-foreground">Happy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
