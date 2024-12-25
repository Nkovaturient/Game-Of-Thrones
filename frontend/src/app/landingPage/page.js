"use client";

import Background from "@/components/Background";
import About from "./About";
import Header from "./Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";
import SplashScreen from "./SplashScreen";
import { useState } from "react";
import SlidingSection from "@/components/SlidingSection";
import Carousel from "./Carousel";



export default function LandingPage() {

  const[isSplashComplete ,setIsSplashComplete]=useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
    {/* Render splash screen or the main content */}
    {!isSplashComplete ? (
      <SplashScreen onComplete={() => setIsSplashComplete(true)} />
    ) : (
      <>
        <Background />
        <main className="relative z-10">
          <Header />
          {/* <About /> */}
          <Carousel />
 
      <SlidingSection
        id="emilia"
        title="Who is Emilia Clarke?"
        description="Emilia Clarke is best known for her role as Daenerys Targaryen in Game of Thrones. Her portrayal of the Mother of Dragons captured hearts worldwide, showcasing a mix of strength, vulnerability, and determination."
        imgSrc="/dt.jpg"
        slideDirection="left"
        imgPos={"left"}
      />

      <SlidingSection
        id="daenerys"
        title="Daenerys Targaryen"
        description={`<i>"I spent my life in foreign lands. So many men have tried to kill me, I don't remember all their names. I have been sold like a broodmare. I've been chained and betrayed, raped and defiled. Do you know what kept me standing through all those years in exile? Faith. Not in any gods. Not in myths and legends. In myself. In Daenerys Targaryen. The world hadn't seen a dragon in centuries until my children were born. The Dothraki hadn't crossed the sea. Any sea. They did for me. I was born to rule the Seven Kingdoms, and I will."</i> Daenerys Targaryen, also known as Khaleesi and the Mother of Dragons, is a character of unparalleled strength and resolve. Her journey to reclaim her family's throne was marked by resilience, compassion, and an unyielding belief in justice.`}
        imgSrc="/e3.jpg"
        slideDirection="right"
        imgPos={"right"}
      />
      <SlidingSection 
      id={"GOT"}
      imgSrc={"/throne.jpg"}
      slideDirection={"top"}
      imgPos={"left"}
      title={"The Game Itself: An Emotional Rollercoaster."}
      description={"Love political intrigue? Check. Obsessed with dragons? Double-check. Ready for heartbreak? Triple-check. The series weaves grandiose battles with deeply personal moments, often catching viewers off-guard. The “Red Wedding” and “Battle of the Bastards” are events that haunt you long after the credits roll."}
      />
      <SlidingSection
      title={"Vibes and Feels: The Throne Room Drama "}
      imgPos={"right"}
      imgSrc={"/word.jpg"}
      slideDirection={"right"}
      description={"GoT isn’t your average medieval saga—it’s a mood. Imagine a Shakespearean tragedy in HD, served with modern grit and the occasional head-splitting battle scene. The show’s dark and sultry ambiance contrasts sharply with moments of pure, fantastical awe (hello, dragons and direwolves!). GoT’s storytelling plays on dualities: beauty and violence, loyalty and treachery, power and vulnerability. It asks viewers the ultimate question: how far would you go to win?"}
       />
       <SlidingSection
       imgPos={"left"}
       imgSrc={"/mod.jpg"}
       slideDirection={"left"}
       title={"The Settings: Where Blood Meets Beauty"}
       description={" Winterfell: Home of the Stark family, it’s cold, brooding, and has “keep your coat on” vibes. It’s as much a fortress as a metaphor for resilience. King’s Landing: Think Renaissance-era Venice meets political backstabbing central. The seat of power, where the Iron Throne sits, is gilded with treachery and drama. The Wall and Beyond: The Night’s Watch guards the icy expanse against the ancient threat of White Walkers. Picture a giant frosty barricade, minus the hot chocolate. Essos: A land of rich cultures, vast deserts, and exotic cities like Qarth and Meereen, it's the perfect backdrop for one fiery Targaryen queen. Dragonstone: The ancestral seat of House Targaryen, where dragons once thrived. Expect cliffs, blackened halls, and enough fire metaphors to fill a tome."}
        />
        <ScrollTop />
        <Chatbot />
        </main>
        
      </>
    )}
  </div>
  );
}
