import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { HealthArticle } from "@/components/health-article";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Heart, ShieldCheck, DollarSign, Server, Wifi, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-100 dark:from-background dark:to-gray-900 text-foreground">
      <DotPattern
        className={cn(
          "absolute inset-0 opacity-50 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
        )}
      />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 mb-8" data-aos="zoom-in" data-aos-duration="1000">
              <Image
                src="/opentag.png"
                alt="OpenTag Serverless Logo"
                className="rounded-full shadow-2xl"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover"
                }} 
              />
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-red-600 dark:text-red-500 mb-4" data-aos="fade-up" data-aos-delay="200">
              OpenTag Serverless
            </h1>
            <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-muted-foreground mt-4 font-medium" data-aos="fade-up" data-aos-delay="400">
              Medical information inside a QR code <span className="italic font-semibold">Literally</span>
            </p>
            <div className="mt-10" data-aos="fade-up" data-aos-delay="600">
              <Button asChild size="lg" variant="default" className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/generate">Try it Yourself</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Claims Section */}
      <section className="bg-red-600 dark:bg-red-800 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DotPattern />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16" data-aos="fade-up">Why OpenTag Serverless?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
              <Heart className="h-20 w-20 mb-6 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Same Goodness of OpenTag</h3>
              <p className="text-lg">Instant access to critical medical information in emergencies, but now with no server dependency.</p>
            </div>
            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
              <ShieldCheck className="h-20 w-20 mb-6 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Fully Anonymous</h3>
              <p className="text-lg">Data encoded directly into the QR code. No login, no ID, no server. Privacy concerns? Forgotten.</p>
            </div>
            <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
              <QrCode className="h-20 w-20 mb-6 text-red-200" />
              <h3 className="text-2xl font-bold mb-4">Compact QR Code</h3>
              <p className="text-lg">Small in size, big in impact. Store data you never thought possible in such a compact form.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 flex justify-center bg-white dark:bg-gray-900">
        <HealthArticle />
      </section>

      {/* Sample QR Code Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto items-center">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-aos="fade-up">Your Data, In a QR Code</h2>
            <p className="text-xl text-muted-foreground" data-aos="fade-up" data-aos-delay="200">Compact, portable, and potentially life-saving.</p>
          </div>
          <div className="relative w-full h-96 sm:h-[500px] my-12" data-aos="zoom-in" data-aos-delay="400">
            <Image
              src="/sampletag.png"
              alt="OpenTag Serverless Example"
              className="rounded-lg object-contain"
              fill
              sizes="100vw"
            />
          </div>
          <div className="max-w-4xl mx-auto mt-16">
            <p className="text-lg sm:text-xl text-center mb-6" data-aos="fade-up" data-aos-delay="600">
              OpenTag Serverless encodes your critical medical information directly into a QR code, eliminating the need for servers and databases. You're in control of your data like never before.
            </p>
            <p className="text-base sm:text-lg text-center mt-4 text-muted-foreground" data-aos="fade-up" data-aos-delay="800">
              Note: The amount of data that can be stored in the QR code is limited, but it's enough to save lives.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold" data-aos="fade-up">Unparalleled Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl" data-aos="fade-up" data-aos-delay="200">
              <Server className="h-16 w-16 text-red-600 dark:text-red-500 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Zero Server Dependency</h3>
                <p className="text-lg text-muted-foreground">Your medical information lives in the QR code, not on vulnerable servers. Absolute data sovereignty.</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl" data-aos="fade-up" data-aos-delay="400">
              <Wifi className="h-16 w-16 text-red-600 dark:text-red-500 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">No Login Required</h3>
                <p className="text-lg text-muted-foreground">Generate and access your tags without the need for any login or ID. Complete anonymity and ease of use.</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl" data-aos="fade-up" data-aos-delay="600">
              <DollarSign className="h-16 w-16 text-red-600 dark:text-red-500 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Unlimited Free Tags</h3>
                <p className="text-lg text-muted-foreground">Create as many tags as you need, all for free. No limits, no hidden costs.</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl" data-aos="fade-up" data-aos-delay="800">
              <ShieldCheck className="h-16 w-16 text-red-600 dark:text-red-500 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">You're in Control</h3>
                <p className="text-lg text-muted-foreground">Choose exactly what information to include. Update anytime. Your tag, your rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-red-600 dark:bg-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DotPattern />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8" data-aos="fade-up">Join the Medical Revolution Today!</h2>
          <p className="text-xl sm:text-2xl mb-12" data-aos="fade-up" data-aos-delay="200">
            Don't wait for an emergency to wish you had OpenTag Serverless. Create your life-saving QR code now.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-red-600 hover:text-red-700 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
            <Link href="/generate">Generate Your Free QR Code</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}