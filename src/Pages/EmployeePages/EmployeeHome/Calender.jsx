import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calender = () => {
  const [date, setDate] = useState(moment().format());

  const handleOnChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-16">
      

      {/* Achievements Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-5xl titleFont font-bold text-center text-blue-600 mb-6">
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Achievement Card 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                Best Workplace Award
              </h3>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Recognized as the best workplace of the year by XYZ Organization
                for fostering an inclusive and innovative environment.
              </p>
            </div>

            {/* Achievement Card 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                100K Customers Served
              </h3>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Reached a milestone of serving over 100,000 happy customers
                worldwide with exceptional service and products.
              </p>
            </div>

            {/* Achievement Card 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                Innovation Excellence
              </h3>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Awarded for groundbreaking innovations in the tech industry,
                setting new benchmarks for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Calendar Section */}
      <section className="py-8 bg-white shadow-md rounded-lg mx-auto w-full sm:w-3/4 lg:w-1/2">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Select a Date
          </h2>
          <Calendar
            onChange={handleOnChange}
            value={new Date(date)}
            className="mx-auto"
          />
          <p className="text-gray-600 mt-4">
            Selected Date: <span className="font-semibold">{moment(date).format("MMMM Do, YYYY")}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Calender;
