import Link from "next/link";
import React from "react";

const imageBackground =
  "https://images.pexels.com/photos/18588276/pexels-photo-18588276/free-photo-of-dark-interior-of-a-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const HomePage = () => {
  return (
    <>
      <div
        className="container mx-auto px-4 h-screen flex items-center flex-col justify-center w-full"
        style={{
          backgroundImage: `url(${imageBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          opacity: 0.9,
        }}
      >
        <h1 className="text-3xl font-bold text-center text-primary flex gap-2">
          Reto UpperEat by {" "}
          <span className="typing-wrapper">
            <span className="typing-effect pr-7">Marcos Ortega</span>
          </span>
        </h1>

        <div className="flex justify-center mt-8 ">
          <Link href="/reservations">
            <button
              className="custom_button animate-bounce 
            bg-primary hover:bg-muted text-white font-semibold  rounded-lg  hover:animate-none
            "
            >
              Ir al reto
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
