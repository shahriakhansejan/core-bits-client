import { VscDebugBreakpointLog } from "react-icons/vsc";


const Tab = () => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab dark1 font-medium"
        aria-label="Our_Mission"
      />
      <div role="tabpanel" className="tab-content">
        <div className="font-medium text-sm dark2">
          <p className="text-justify my-3">
          Our mission is to foster collaboration, enabling HR teams to manage products efficiently. With the right tools, we help create a culture of engagement and productivity, becoming a trusted partner in your growth.
          </p>
          <ul className="pl-5">
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Foster collaboration among HR professionals and employees.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Support the development of a positive workplace culture.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Provide innovative tools that enhance productivity.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Build lasting partnerships with organizations to drive success.
            </li>
          </ul>
        </div>
      </div>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab dark1 font-medium"
        aria-label="We_Offered"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content">
      <div className="font-medium text-sm dark2">
          <p className="text-justify my-3">
          We provide tools that empower HR professionals to manage resources effectively,ensuring employees have what needed.Our platform enhances communication and transparency,supporting HR leaders in driving success.
          </p>
          <ul className="pl-5">
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Comprehensive product management and tracking features.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Efficient communication tools for real-time updates.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Data analytics to monitor product usage and employee feedback.
            </li>
            <li className="flex items-center gap-2">
              <VscDebugBreakpointLog className="text-lg text-green-600" />
              Dedicated customer support to assist with any inquiries.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Tab;
