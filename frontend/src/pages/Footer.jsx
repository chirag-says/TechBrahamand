import React from "react";
import { ArrowUpRight, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

  const links = {
    Services: [
      { name: "Software as a Service (SaaS)", path: "/services" },
      { name: "Platform as a Service (PaaS)", path: "/services" },
      { name: "Infrastructure as a Service (IaaS)", path: "/services" },
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Contact", path: "/contact" },
    ],
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />


      {/* MAIN */}
      <div className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-8
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-12
          gap-10 sm:gap-12 lg:gap-16
        ">

          {/* BRAND */}
          <div className="
            md:col-span-2
            lg:col-span-5
            text-center md:text-left
          ">

            <div className="
              text-xl sm:text-2xl
              font-bold tracking-tight
              mb-3 sm:mb-4
            ">
              TECHBRAHMAND
            </div>

            <p className="
              text-gray-400
              text-sm sm:text-base
              leading-relaxed
              mb-6 sm:mb-8
              max-w-sm
              mx-auto md:mx-0
            ">
              An AI-first engineering house bridging operations with execution, enabling enterprises to scale and evolve.
            </p>


            {/* SOCIAL */}
            <div className="
              flex justify-center md:justify-start
              gap-3 sm:gap-4
            ">

              {[Twitter, Linkedin].map((Icon, i) => (

                <button
                  key={i}
                  className="
                    p-2.5 sm:p-3
                    rounded-lg
                    border border-white/10
                    text-gray-400
                    hover:text-white
                    hover:border-white
                    hover:bg-white/5
                    transition
                  "
                >

                  <Icon size={16} />

                </button>

              ))}

            </div>

          </div>



          {/* LINKS */}
          <div className="
            md:col-span-2
            lg:col-span-7
            grid grid-cols-2
            gap-8 sm:gap-10 lg:gap-12
            text-center sm:text-left
          ">

            {Object.entries(links).map(([title, items]) => (

              <div key={title}>

                <div className="
                  font-semibold
                  text-white
                  text-sm sm:text-base
                  mb-4 sm:mb-5
                ">
                  {title}
                </div>

                <ul className="space-y-2 sm:space-y-3">

                  {items.map(item => (

                    <li key={item.name}>

                      <Link
                        to={item.path}
                        className="
                          group flex items-center
                          justify-center sm:justify-start
                          gap-2
                          text-gray-400
                          text-sm sm:text-base
                          hover:text-white
                          transition
                        "
                      >

                        {item.name}

                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition"
                        />

                      </Link>

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* BOTTOM */}
      <div className="border-t border-white/10">

        <div className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-4 sm:py-6
          flex flex-col md:flex-row
          justify-between items-center
          gap-3 sm:gap-4
          text-center md:text-left
        ">

          <div className="
            text-xs sm:text-sm
            text-gray-500
            md:pl-[380px] lg:pl-[420px]
          ">
            © {new Date().getFullYear()} TechBrahmand. All rights reserved.
          </div>

          <div className="
            flex flex-wrap justify-center md:justify-end
            gap-4 sm:gap-6
            text-xs sm:text-sm
            text-gray-500
          ">

            <span className="text-gray-600">
              India 🇮🇳
            </span>

          </div>

        </div>

      </div>


      {/* glow */}
      <div className="
        absolute bottom-0 left-1/2 -translate-x-1/2
        w-[250px] sm:w-[350px] lg:w-[500px]
        h-[120px] sm:h-[160px] lg:h-[200px]
        bg-white/5 blur-[80px] sm:blur-[100px] lg:blur-[120px]
      " />

    </footer>
  );
}