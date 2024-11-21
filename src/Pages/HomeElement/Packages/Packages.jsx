import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const Packages = () => {
  return (
    <div className="max-w-7xl py-16 mx-auto bg-white px-2">
      <h1 className="dark1 text-6xl px-2 titleFont font-semibold">Our Packages</h1>
      <p className="text-sm lg:text-base font-medium px-3 dark2 text-justify py-2">
      As an HR Manager, you can choose from three tailored packages, each designed to support different team sizes. Select the option that best fits the number of employees you manage to unlock tools and resources that streamline your HR processes and enhance team engagement.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* card 1 */}
        <div className="card bg-[#e6e6e6]">
          <figure className="bg-[#FEBF00]">
            <h2 className="flex items-center gap-3 dark1 font-extrabold"><MdPeopleAlt className="text-6xl"/><span className="text-[175px] text- titleFont">5</span></h2>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">
            $5
              <div className="badge badge-secondary">Starter Plan</div>
            </h2>
            <p className="dark2 font-medium text-lg">Maximum 5 employees, $5</p>
            <div className="card-actions justify-end">
            <Link to='/hr-register'><div className="badge badge-outline">Join</div></Link>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className="card bg-[#e6e6e6]">
          <figure className="bg-[#FEBF00]">
            <h2 className="flex items-center gap-3 dark1 font-extrabold"><MdPeopleAlt className="text-6xl"/><span className="text-[175px] text- titleFont">10</span></h2>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">
            $8
              <div className="badge badge-secondary">Growth Plan</div>
            </h2>
            <p className="dark2 font-medium text-lg">Maximum 10 employees, $8</p>
            <div className="card-actions justify-end">
            <Link to='/hr-register'><div className="badge badge-outline">Join</div></Link>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className="card bg-[#e6e6e6]">
          <figure className="bg-[#FEBF00]">
            <h2 className="flex items-center gap-3 dark1 font-extrabold"><MdPeopleAlt className="text-6xl"/><span className="text-[175px] text- titleFont">20</span></h2>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl">
            $15
              <div className="badge badge-secondary">Enterprise Plan</div>
            </h2>
            <p className="dark2 font-medium text-lg"> Maximum 20 employees, $15</p>
            <div className="card-actions justify-end">
              <Link to='/hr-register'><div className="badge badge-outline">Join</div></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
