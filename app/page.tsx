import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import ProductReel from '@/components/ProductReel'
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your data under ai anlysis{" "}
            <span className="text-blue-600">ai dashbo</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Ai Dashbo. Every data on our finance is analized by our
            ai to make pridiction and advice on weakness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Create Project
            </Link>
            <Button variant="ghost">About as &rarr;</Button>
          </div>
        </div>

        {/* <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Brand new'
        /> */}
      </MaxWidthWrapper>
    </>
  );
}
