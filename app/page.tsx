import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { HealthArticle } from "@/components/health-article";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Heart, ShieldCheck, DollarSign, Briefcase, Plane, Smartphone, Car, Baby, HardHat, Backpack, Lock, Wifi, Server, Zap, Clock, Globe, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48" data-aos="zoom-y-out" data-aos-delay="100">
              <Image
                src="/opentag.png"
                alt="OpenTag Serverless Logo"
                className="rounded-full"
                fill
                sizes="100vw"
                data-aos="zoom-y-out" data-aos-delay="150"
                style={{
                  objectFit: "cover"
                }} 
              />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-red-600 dark:text-red-500 pt-10">
              OpenTag Serverless
            </h1>
            <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-muted-foreground mt-4 font-semibold">
              Medical information indise a QR code <span className="italic">Literally</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default">
                <Link href="/generate">Try it Yourself</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Claims Section */}
      <section className="bg-red-600 dark:bg-red-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Why OpenTag Serverless?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <Heart className="h-16 w-16 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Same goodness of OpenTag</h3>
          <p>Instant access to critical medical information in emergencies, but now with the added benefit of no server dependency (But the amount of data is limited)</p>
        </div>
        <div className="flex flex-col items-center">
          <Lock className="h-16 w-16 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Fully Anonymous</h3>
          <p>Serverless version encodes data directly into the QR code hence no need for any login or ID or any server thus forget about privacy concerns</p>
        </div>
        <div className="flex flex-col items-center">
          <QrCode className="h-16 w-16 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Compact QR Code</h3>
          <p>No big and chunky QR codes, small in size but big in impact can store data you never thought possible in such form factor</p>
        </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <HealthArticle />
      </section>


      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto items-center">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Some of your data, in a QR code</h2>
          </div>
          <div className="relative w-full h-64 sm:h-96 my-12">
            <Image
              src="/sampletag.png"
              alt="OpenTag Serverless Example"
              className="rounded-lg object-contain"
              fill
              sizes="100vw"
            />
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-lg sm:text-xl text-justify mb-4">
              OpenTag Serverless is clever. By encoding your critical medical information directly into a QR code, we've eliminated the need for servers and databases, putting you in control of your data like never before. In emergencies, every second counts. With OpenTag Serverless, your vital information is instantly accessible to medical professionals, potentially making the difference between life and death.
            </p>
            <p className="text-sm sm:text-base text-center mt-4 text-muted-foreground">
              Note: The amount of data that can be stored in the QR code is limited
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Unparalleled Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <Server className="h-12 w-12 text-red-600 dark:text-red-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Zero Server Dependency</h3>
                <p className="text-muted-foreground">Your medical information lives in the QR code, not on vulnerable servers. Absolute data sovereignty.</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <Wifi className="h-12 w-12 text-red-600 dark:text-red-500 mr-4 flex-shrink-0" />
              <div>
              <h3 className="text-xl font-bold mb-2">No Login Required</h3>
              <p className="text-muted-foreground">Generate and access your tags without the need for any login or ID. Complete anonymity and ease of use.</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <DollarSign className="h-12 w-12 text-red-600 dark:text-red-500 mr-4 flex-shrink-0" />
              <div>
              <h3 className="text-xl font-bold mb-2">Unlimited Free Tags</h3>
              <p className="text-muted-foreground">Create as many tags as you need, all for free. No limits, no hidden costs.</p>
              </div>
            </div>
            <div className="flex items-start bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <ShieldCheck className="h-12 w-12 text-red-600 dark:text-red-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">You're in Control</h3>
                <p className="text-muted-foreground">Choose exactly what information to include. Update anytime. Your tag, your rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-600 dark:bg-red-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join the Medical Revolution Today!</h2>
          <p className="text-xl sm:text-2xl mb-8">
            Don't wait for an emergency to wish you had OpenTag Serverless. Create your life-saving QR code now.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-red-600 hover:text-red-700">
            <Link href="/generate">Generate Your Free QR Code</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}