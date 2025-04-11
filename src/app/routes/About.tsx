import { ChevronLeft, Info, User } from "lucide-react";
import { NavLink } from "react-router";

export default function About() {
  return (
    <div>
      <div className="mt-5 ml-5">
        <NavLink to={"/"}>
          <ChevronLeft size={50}/>
        </NavLink>
      </div>
      <div className="flex flex-col p-6 h-full">
        <div className="flex items-center gap-4 mb-6">
          <User color="black" size={100} />
          <p className="text-lg font-medium">
            Prototyp aplikacji Fit App stworzona przez 3 dzielnych wojowników
            codzienności:
          </p>
        </div>

        <div className="flex flex-col ml-16 mb-8 text-lg font-semibold">
          <p>Kacper Satora</p>
          <p>Marta Styczeń</p>
          <p>Mikołaj Suchan</p>
        </div>

        <div className="flex items-start gap-4">
          <Info color="black" size={175} />
          <div className="text-lg">
            <p>
              Fit App to aplikacja stworzona jako kompan codziennego zdrowego
              życia, możliwość dodawania spożycia (wody, jedzenia) oraz ćwiczeń.
            </p>
            <p className="mt-4">
              Na podstawie danych aplikacja pokazuje dzienne statystyki.
            </p>
            <p className="mt-4">
              Można wybrać spośród dostępnych planów żywieniowych lub
              skomponować własny.
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
