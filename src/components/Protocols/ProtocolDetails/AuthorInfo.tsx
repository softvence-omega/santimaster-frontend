import { Link } from "react-router-dom";

interface Author {
  fullName: string;
  affiliation: string;
  orcid?: string;
  email: string;
  profileImage?: string;
  bio?: string;
}

interface AuthorInformationProps {
  authors: Author[];
}

export default function AuthorInformation({ authors }: AuthorInformationProps) {
  const author = authors?.[0];
  console.log("the author", author);
  return (
    <div className="py-16">
      {/* Section Title */}
      <div className="mb-60">
        <h2
          className="text-[#0A251D] text-center font-semibold leading-normal
        text-2xl sm:text-3xl md:text-4xl lg:text-[48px] mb-10"
        >
          Author Information
        </h2>
      </div>

      {/* Green background band */}
      <div className="relative flex justify-center bg-[#1D6953] w-full pt-12 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">
          {/* Author Image */}
          <div className="w-[20rem] mt-[-260px] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] rounded-2xl overflow-hidden ">
            <img
              src={author?.profileImage || "/assets/potocals/author.png"}
              alt={`Portrait of ${author?.fullName || "Author"}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author Card */}
          <div className="max-w-xl mt-[-150px] bg-[#E8F0EE] rounded-2xl shadow-lg p-8 lg:p-10 flex flex-col gap-6">
            {/* Name & Info */}
            <div>
              <h3 className="text-2xl font-bold text-[#1C1C1E] mb-2">
                {author?.fullName || "Unknown Author"}
              </h3>
              <p className="text-[#444] font-medium mb-1">
                {author?.affiliation || "Affiliation not provided"}
              </p>
              <p className="text-[#1C1C1E] font-medium">{author?.email}</p>
            </div>

            {/* ORCID + Links */}
            <div className="text-sm space-x-4">
              {author?.orcid && (
                <a
                  href={`https://orcid.org/${author.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A251D] underline hover:text-[#148666]"
                >
                  ORCID: {author.orcid}
                </a>
              )}
              <Link
                to="#"
                className="text-[#0A251D] underline hover:text-[#148666]"
              >
                View Other Protocols
              </Link>
            </div>

            {/* Bio */}
            <p className="text-gray-700 leading-relaxed">
              {author?.bio || "No bio available for this author."}
            </p>

            {/* Contact Button */}
            <div>
              <Link to="/contract">
                <button
                  aria-label={`Contact ${author?.fullName || "Author"}`}
                  className="bg-[#17AA80] hover:bg-[#0F5B46] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
                >
                  {/* Mail Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M23.954 5.54199L15.536 13.96C14.5974 14.8962 13.3257 15.422 12 15.422C10.6743 15.422 9.40263 14.8962 8.464 13.96L0.046 5.54199C0.032 5.69999 0 5.84299 0 5.99999V18C0.0016 19.3256 0.5289 20.5964 1.4662 21.5338C2.4036 22.4711 3.6744 22.9984 5 23H19C20.3256 22.9984 21.5964 22.4711 22.5338 21.5338C23.4711 20.5964 23.9984 19.3256 24 18V5.99999C24 5.84299 23.968 5.69999 23.954 5.54199Z"
                      fill="white"
                    />
                    <path
                      d="M14.1221 12.546L23.2561 3.411C22.8137 2.67732 22.1896 2.07004 21.4441 1.64773C20.6986 1.22542 19.8569 1.00234 19.0001 1H5.00014C4.14336 1.00234 3.30164 1.22542 2.55617 1.64773C1.81069 2.07004 1.18662 2.67732 0.744141 3.411L9.87814 12.546C10.4417 13.1073 11.2047 13.4225 12.0001 13.4225C12.7956 13.4225 13.5586 13.1073 14.1221 12.546Z"
                      fill="white"
                    />
                  </svg>
                  Contact Author
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
