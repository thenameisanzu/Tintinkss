import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import ArtistStory from "@/components/sections/ArtistStory";
import Collection from "@/components/sections/Collection";
import Gallery from "@/components/sections/Gallery";
import Commissions from "@/components/sections/Commissions";
import Visit from "@/components/sections/Visit";
import FAQ from "@/components/sections/FAQ";
import InstagramStrip from "@/components/sections/InstagramStrip";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ArtistStory />
        <Collection />
        <Gallery />
        <Commissions />
        <Visit />
        <FAQ />
        <InstagramStrip />
      </main>
      <Footer />
    </>
  );
}
