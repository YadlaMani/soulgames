"use client";
import React from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const GamePage = () => {
  const router = useRouter();

  const handlePlay = () => {
    router.push("/dice");
  };

  const handleContribute = () => {
    window.open("https://github.com/YadlaMani/soulgames", "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-4 gap-8">
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none relative w-full max-w-sm shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <CardHeader className="justify-center py-4 bg-blue-500 text-white rounded-t-lg">
          <h2 className="text-xl font-semibold">Dice & Nice</h2>
        </CardHeader>

        <iframe
          src="https://lottie.host/embed/78c986fc-8a95-4e99-8187-7f70348f4110/3EV9XnIy9D.json"
          width="100%"
          height="300px"
          className="rounded-b-lg"
          allowFullScreen
        ></iframe>

        <CardFooter className="flex justify-center bg-blue-100 backdrop-blur-lg py-4 absolute bottom-0 w-full rounded-b-lg shadow-md z-10">
          <Button
            className="text-sm text-white bg-blue-500 hover:bg-blue-600 transition-transform duration-300 ease-in-out hover:scale-110"
            variant="flat"
            color="primary"
            radius="lg"
            size="md"
            onClick={handlePlay}
          >
            Play
          </Button>
        </CardFooter>
      </Card>

      <Card
        isFooterBlurred
        radius="lg"
        className="border-none relative w-full max-w-sm shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <CardHeader className="justify-center py-4 bg-green-500 text-white rounded-t-lg">
          <h2 className="text-xl font-semibold">More Games Coming Soon!</h2>
        </CardHeader>

        <div className="h-[300px] flex items-center justify-center bg-green-100">
          <p className="text-lg text-green-700 text-center px-4">
            We're working on exciting new games. Stay tuned!
          </p>
        </div>

        <CardFooter className="flex justify-center bg-green-100 backdrop-blur-lg py-4 absolute bottom-0 w-full rounded-b-lg shadow-md z-10">
          <Button
            className="text-sm text-white bg-green-500 hover:bg-green-600 transition-transform duration-300 ease-in-out hover:scale-110"
            variant="flat"
            color="primary"
            radius="lg"
            size="md"
            onClick={handleContribute}
          >
            Contribute a Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GamePage;
