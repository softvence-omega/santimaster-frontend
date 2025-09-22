import { useState } from "react";

const OpenGeneApplicationForm = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#FAFAFA] rounded-sm w-full sm:w-11/12 md:w-5/6 lg:w-fit py-30 md:py-40 lg:py-40">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Choose Your Role
      </h1>

      {/*-------------- Role Selection----------------- */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
        {/* ----------Researcher-- */}
        <div className="flex flex-col hover:bg-[#DDE9E5] items-center gap-3 w-[158px] p-6 rounded-lg bg-[#F5F5F7]">
          {/* Rounded icon inside container */}
          <div className="flex justify-center  items-center w-10 h-10 rounded-full bg-[#1D6953] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M16 9C16 5.87533 13.3475 3.33333 10.087 3.33333H8.34783C8.34645 2.92107 8.21198 2.51931 7.96288 2.18319C7.71378 1.84707 7.36225 1.59305 6.95652 1.456V0.666667C6.95652 0.489856 6.88323 0.320286 6.75277 0.195262C6.62231 0.0702379 6.44537 0 6.26087 0C6.07637 0 5.89943 0.0702379 5.76897 0.195262C5.63851 0.320286 5.56522 0.489856 5.56522 0.666667V1.456C5.15949 1.59305 4.80796 1.84707 4.55886 2.18319C4.30976 2.51931 4.17529 2.92107 4.17391 3.33333V8.66667C4.17391 8.84348 4.2472 9.01305 4.37767 9.13807C4.50813 9.2631 4.68507 9.33333 4.86957 9.33333H7.65217C7.83667 9.33333 8.01361 9.2631 8.14407 9.13807C8.27453 9.01305 8.34783 8.84348 8.34783 8.66667V4.66667H10.087C12.5802 4.66667 14.6087 6.61067 14.6087 9C14.6087 11.3893 12.5802 13.3333 10.087 13.3333H6.95652V12H9.73913C9.92363 12 10.1006 11.9298 10.231 11.8047C10.3615 11.6797 10.4348 11.5101 10.4348 11.3333C10.4348 11.1565 10.3615 10.987 10.231 10.8619C10.1006 10.7369 9.92363 10.6667 9.73913 10.6667H2.78261C2.59811 10.6667 2.42117 10.7369 2.29071 10.8619C2.16025 10.987 2.08696 11.1565 2.08696 11.3333C2.08696 11.5101 2.16025 11.6797 2.29071 11.8047C2.42117 11.9298 2.59811 12 2.78261 12H5.56522V13.3333H0.695652C0.511154 13.3333 0.334212 13.4036 0.203752 13.5286C0.0732917 13.6536 0 13.8232 0 14C0 14.1768 0.0732917 14.3464 0.203752 14.4714C0.334212 14.5964 0.511154 14.6667 0.695652 14.6667H1.3913V15.3333C1.3913 15.5101 1.4646 15.6797 1.59506 15.8047C1.72552 15.9298 1.90246 16 2.08696 16C2.27146 16 2.4484 15.9298 2.57886 15.8047C2.70932 15.6797 2.78261 15.5101 2.78261 15.3333V14.6667H9.73913V15.3333C9.73913 15.5101 9.81242 15.6797 9.94288 15.8047C10.0733 15.9298 10.2503 16 10.4348 16C10.6193 16 10.7962 15.9298 10.9267 15.8047C11.0571 15.6797 11.1304 15.5101 11.1304 15.3333V14.5727C13.8943 14.098 16 11.7827 16 9Z"
                fill="#F5F5F7"
              />
            </svg>
          </div>

          <button className="px-4 py-2  font-medium">Researcher</button>
        </div>

        <div className="flex flex-col items-center hover:bg-[#DDE9E5] gap-3 w-[158px] p-6 rounded-lg bg-[#F5F5F7]">
          {/* Rounded icon inside container */}
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#1D6953] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
            >
              <path
                d="M8.5168 9.5C5.8696 9.5 3.7168 7.36963 3.7168 4.75C3.7168 2.13038 5.8704 0 8.5168 0C11.1632 0 13.3168 2.13038 13.3168 4.75C13.3168 7.36963 11.164 9.5 8.5168 9.5ZM10.1 14.3957V11.0833H6.0832V14.4693C6.5592 14.7432 6.8832 15.2483 6.8832 15.8333C6.8832 16.2533 6.71463 16.656 6.41457 16.9529C6.11451 17.2499 5.70755 17.4167 5.2832 17.4167C4.85885 17.4167 4.45189 17.2499 4.15183 16.9529C3.85177 16.656 3.6832 16.2533 3.6832 15.8333C3.6832 15.2491 4.0072 14.744 4.4832 14.4693V11.0849C3.42585 11.0904 2.4136 11.5094 1.66735 12.2507C0.92111 12.992 0.501465 13.9953 0.5 15.0417V19H8.5V16.625C8.5 15.5943 9.1712 14.7234 10.1 14.3957ZM12.5 11.0833H11.7V14.3957C12.6288 14.7234 13.3 15.5943 13.3 16.625V19H16.5V15.0417C16.5 12.859 14.7056 11.0833 12.5 11.0833ZM10.9 15.8333C10.6878 15.8333 10.4843 15.9167 10.3343 16.0652C10.1843 16.2137 10.1 16.415 10.1 16.625V19H11.7V16.625C11.7 16.415 11.6157 16.2137 11.4657 16.0652C11.3157 15.9167 11.1122 15.8333 10.9 15.8333Z"
                fill="#F5F5F7"
              />
            </svg>
          </div>

          {/* Button */}
          <button className="px-4 py-2  font-medium">Clinician</button>
        </div>
        {/* ---engineer */}

        <div className="flex flex-col items-center hover:bg-[#DDE9E5]  gap-3 w-[158px] p-6 rounded-lg bg-[#F5F5F7]">
          {/* Rounded icon inside container */}
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#1D6953] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_196_373)">
                <path
                  d="M3.33464 4.00029C3.33464 3.82348 3.40487 3.65391 3.5299 3.52889C3.65492 3.40386 3.82449 3.33363 4.0013 3.33363H4.01664C4.09573 2.48035 4.47071 1.68159 5.07666 1.07565C5.6826 0.469702 6.48136 0.0947205 7.33464 0.015625V2.00029C7.33464 2.1771 7.40487 2.34667 7.5299 2.4717C7.65492 2.59672 7.82449 2.66696 8.0013 2.66696C8.17811 2.66696 8.34768 2.59672 8.47271 2.4717C8.59773 2.34667 8.66797 2.1771 8.66797 2.00029V0.015625C9.5212 0.0948458 10.3199 0.469868 10.9258 1.07579C11.5317 1.68171 11.9067 2.4804 11.986 3.33363H12.0013C12.1781 3.33363 12.3477 3.40386 12.4727 3.52889C12.5977 3.65391 12.668 3.82348 12.668 4.00029C12.668 4.1771 12.5977 4.34667 12.4727 4.4717C12.3477 4.59672 12.1781 4.66696 12.0013 4.66696H4.0013C3.82449 4.66696 3.65492 4.59672 3.5299 4.4717C3.40487 4.34667 3.33464 4.1771 3.33464 4.00029ZM12.8546 10.0596L10.8573 10.5516C10.243 10.6636 9.68744 10.9875 9.28748 11.467C8.88752 11.9465 8.66851 12.5512 8.66864 13.1756V15.3283C8.66864 15.505 8.73878 15.6745 8.86366 15.7995C8.98854 15.9245 9.15794 15.9948 9.33464 15.995L14.6653 16.0003C14.7529 16.0004 14.8397 15.9832 14.9206 15.9497C15.0016 15.9163 15.0752 15.8672 15.1371 15.8053C15.1991 15.7434 15.2483 15.6698 15.2818 15.5889C15.3154 15.508 15.3326 15.4212 15.3326 15.3336V12.0016C15.3328 11.6983 15.2639 11.3989 15.1311 11.1261C14.9984 10.8533 14.8053 10.6143 14.5666 10.4272C14.3278 10.24 14.0496 10.1097 13.753 10.046C13.4564 9.98235 13.1492 9.987 12.8546 10.0596ZM5.14397 10.5516L3.14664 10.0596C2.85206 9.98701 2.54483 9.98237 2.2482 10.046C1.95157 10.1097 1.67331 10.24 1.4345 10.4272C1.19568 10.6143 1.00256 10.8533 0.869755 11.126C0.736953 11.3988 0.66795 11.6982 0.667969 12.0016V15.3276C0.667969 15.5044 0.738207 15.674 0.863231 15.799C0.988255 15.9241 1.15782 15.9943 1.33464 15.9943H6.6653C6.84211 15.9943 7.01168 15.9241 7.13671 15.799C7.26173 15.674 7.33197 15.5044 7.33197 15.3276V13.1756C7.33209 12.5512 7.11309 11.9465 6.71313 11.467C6.31316 10.9875 5.75761 10.6636 5.1433 10.5516H5.14397ZM12.0013 6.00029H4.0013C4.0533 8.16096 5.82797 10.0003 8.0013 10.0003C10.2086 10.003 12.0046 8.19563 12.0013 6.00029Z"
                  fill="#F5F5F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_196_373">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Button */}
          <button className="px-4 py-2   font-medium">Engineer</button>
        </div>
        {/* ---------review--- */}

        <div className="flex flex-col items-center hover:bg-[#DDE9E5] gap-3 w-[158px] p-6 rounded-lg bg-[#F5F5F7]">
          {/* Rounded icon inside container */}
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#1D6953] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_196_382)">
                <path
                  d="M15.2133 11.5146C14.7873 11.8933 14.3773 12.258 13.964 12.6093C14.144 13.2366 14.2946 13.864 14.414 14.49C14.464 14.7513 14.364 15.0186 14.1546 15.1826C14.0518 15.2632 13.9287 15.3138 13.7989 15.3286C13.669 15.3434 13.5377 15.322 13.4193 15.2666C12.8183 14.9893 12.2334 14.6784 11.6673 14.3353C11.132 14.6613 10.5566 14.97 9.91532 15.2666C9.79696 15.3217 9.6657 15.3429 9.53601 15.3281C9.40633 15.3133 9.28326 15.2629 9.18038 15.1826C9.0775 15.1023 8.9988 14.9951 8.95297 14.8729C8.90714 14.7506 8.89595 14.6181 8.92065 14.49C9.03998 13.864 9.19065 13.2366 9.37065 12.6093C8.95034 12.2489 8.53387 11.8839 8.12132 11.5146C8.01914 11.4245 7.94517 11.3067 7.90827 11.1755C7.87138 11.0443 7.87313 10.9052 7.91333 10.775C7.95352 10.6448 8.03044 10.529 8.13486 10.4414C8.23928 10.3538 8.36675 10.2982 8.50198 10.2813C9.14398 10.1986 9.71532 10.1373 10.2506 10.0973C10.4873 9.52664 10.7486 8.9573 11.0333 8.3913C11.1546 8.15197 11.4 7.98197 11.6673 8.00197C11.9346 7.98264 12.18 8.15197 12.3013 8.3913C12.586 8.9573 12.8473 9.52664 13.084 10.0973C13.62 10.1373 14.1906 10.1986 14.8326 10.2813C14.9677 10.2985 15.095 10.3542 15.1992 10.4418C15.3035 10.5294 15.3802 10.6452 15.4204 10.7753C15.4606 10.9054 15.4624 11.0443 15.4257 11.1754C15.3889 11.3066 15.3152 11.4243 15.2133 11.5146ZM10.3293 4.33464C10.3293 1.8333 9.16398 0.667969 6.66265 0.667969C4.16132 0.667969 2.99598 1.8333 2.99598 4.33464C2.99598 6.83597 4.16132 8.0013 6.66265 8.0013C9.16398 8.0013 10.3293 6.83597 10.3293 4.33464ZM7.61132 14.2386C7.68465 13.8526 7.76998 13.4613 7.86732 13.07C7.65998 12.8873 7.44798 12.7 7.23665 12.512C6.944 12.2511 6.73225 11.9118 6.6265 11.5343C6.52075 11.1568 6.52543 10.7569 6.63998 10.382C6.76912 9.97212 7.02378 9.61322 7.36798 9.35597C7.13315 9.34162 6.89792 9.33451 6.66265 9.33464C2.90398 9.2873 1.08865 11.152 0.996649 14.6326C0.992985 14.7229 1.00748 14.813 1.03928 14.8975C1.07108 14.9821 1.11954 15.0594 1.18178 15.1248C1.24402 15.1903 1.31877 15.2426 1.4016 15.2787C1.48443 15.3147 1.57366 15.3337 1.66398 15.3346H7.70132C7.57156 14.9844 7.54043 14.6053 7.61132 14.2386Z"
                  fill="#F5F5F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_196_382">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.332031)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Button */}
          <button className="px-4 py-2  font-medium">Reviewer</button>
        </div>

        {/* -----doner-- */}
        <div className="flex flex-col items-center hover:bg-[#DDE9E5] gap-3 w-[158px] p-6 rounded-lg bg-[#F5F5F7]">
          {/* Rounded icon inside container */}
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#1D6953] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_196_389)">
                <path
                  d="M6.472 8.366C6.3101 8.21654 6.11684 8.10516 5.90636 8.03999C5.69588 7.97482 5.47349 7.95751 5.25546 7.98934C5.03743 8.02116 4.82927 8.10131 4.6462 8.22392C4.46312 8.34653 4.30976 8.5085 4.19733 8.698C3.872 9.238 3.964 9.93467 4.36067 10.424L5.55267 11.96C5.60633 12.0292 5.64585 12.1082 5.66897 12.1927C5.69208 12.2771 5.69834 12.3653 5.68738 12.4521C5.67642 12.539 5.64847 12.6228 5.60511 12.6989C5.56175 12.7749 5.50383 12.8417 5.43467 12.8953C5.3655 12.949 5.28645 12.9885 5.20201 13.0116C5.11758 13.0347 5.02942 13.041 4.94256 13.03C4.76715 13.0079 4.60772 12.917 4.49933 12.7773L3.30733 11.2413C2.55933 10.3193 2.45067 9.01133 3.05533 8.00933C3.13749 7.87572 3.23046 7.74907 3.33333 7.63067V3.73467C3.33333 2.86267 2.706 2.06867 1.83867 1.98133C1.60652 1.95725 1.37189 1.98219 1.15 2.05454C0.928097 2.1269 0.723868 2.24505 0.550536 2.40135C0.377203 2.55765 0.238631 2.74861 0.143794 2.96187C0.0489562 3.17513 -3.25136e-05 3.40594 1.61899e-08 3.63933L1.61899e-08 10.6707C1.61899e-08 12.0933 0.568667 13.4573 1.57933 14.4593L2.774 15.6427C3.02067 15.8713 3.344 15.998 3.68067 15.998H8.66667C8.84348 15.998 9.01305 15.9278 9.13807 15.8027C9.2631 15.6777 9.33333 15.5081 9.33333 15.3313V12.7847C9.33331 12.2387 9.22151 11.6985 9.00481 11.1973C8.78812 10.6962 8.47112 10.2447 8.07333 9.87067L6.472 8.36533V8.366ZM14.1613 1.98267C13.294 2.06933 12.6667 2.864 12.6667 3.736V7.632C12.7673 7.75 12.862 7.874 12.9447 8.01067C13.5487 9.01267 13.4407 10.3207 12.6927 11.2427L10.6673 13.2587V15.3333C10.6673 15.568 10.6193 15.7907 10.5447 16H12.3207C12.6569 16.0001 12.9807 15.8732 13.2273 15.6447L14.4207 14.4633C14.9215 13.9674 15.3191 13.3771 15.5904 12.7266C15.8617 12.076 16.0014 11.3782 16.0013 10.6733V3.64067C16.0014 3.40727 15.9524 3.17647 15.8575 2.96321C15.7627 2.74995 15.6241 2.55898 15.4508 2.40268C15.2775 2.24638 15.0732 2.12823 14.8513 2.05588C14.6294 1.98352 14.3948 1.95858 14.1627 1.98267H14.1613ZM11.8027 8.69867C11.6902 8.50917 11.5369 8.34719 11.3538 8.22458C11.1707 8.10197 10.9626 8.02183 10.7445 7.99C10.5265 7.95818 10.3041 7.97549 10.0936 8.04066C9.88316 8.10583 9.6899 8.21721 9.528 8.36667L8.97333 8.888L8.98667 8.90067C9.74039 9.61573 10.2693 10.535 10.5087 11.546L11.6387 10.4247C12.0353 9.93533 12.1273 9.238 11.802 8.69867H11.8027ZM11.3353 1.83333C11.3353 3.27533 9.45533 5.06733 8.51867 5.81867C8.37205 5.93606 8.18982 6.00002 8.002 6.00002C7.81418 6.00002 7.63195 5.93606 7.48533 5.81867C6.54867 5.06667 4.66867 3.27533 4.66867 1.83333C4.64746 1.36943 4.81095 0.916035 5.12333 0.572419C5.43571 0.228803 5.87152 0.0229729 6.33533 0C6.79915 0.0229729 7.23496 0.228803 7.54734 0.572419C7.85972 0.916035 8.0232 1.36943 8.002 1.83333C7.9808 1.36943 8.14428 0.916035 8.45666 0.572419C8.76904 0.228803 9.20485 0.0229729 9.66867 0C10.1325 0.0229729 10.5683 0.228803 10.8807 0.572419C11.1931 0.916035 11.3565 1.36943 11.3353 1.83333Z"
                  fill="#F5F5F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_196_389">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Button */}
          <button className="px-4 py-2  font-medium">Doner</button>
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Ayesha Rahman"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium [#1C1C1E] mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@institution.edu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            Affiliation / Organization
          </label>
          <input
            type="text"
            placeholder="Department of Genetics - XYZ University"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            ORCID / Researcher ID
          </label>
          <input
            type="text"
            placeholder="0000-0002-1825-0097"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional but recommended for researchers, clinicians, and reviewer
            roles
          </p>
        </div>
      </div>

      {/* Professional Background */}
      <h2 className="text-xl font-bold mb-4">Professional Background</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Short Bio
        </label>
        <textarea
          placeholder="Summarize your background in 2-3 sentences."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-500 characters required</span>
          <span>0/500</span>
        </div>
      </div>

      {/* Motivation / Why Join */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Motivation / Why Join
        </label>
        <textarea
          placeholder="Why do you want to join Open Gene? (250-800 chars)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-800 characters required</span>
          <span>0/800</span>
        </div>
      </div>

      {/* Relevant Experience / Expertise */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Relevant Experience / Expertise
        </label>
        <input
          type="text"
          placeholder="e.g., CRISPR, mRNA, CAR-T, bioinformatics"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional but recommended - separate tags with commas
        </p>
      </div>

      {/*--------------- Documents & Links */}
      <h2 className="text-xl font-bold mb-4">Documents & Links</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          CV / Resume Upload
        </label>

        {/* File Upload Box */}
        <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-md text-center relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="text-gray-500 cursor-pointer">
            Drop your CV here or{" "}
            <span className="text-[#4A7BFF]">browse file</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            PDF, DOC, DOCX. Max 10 MB
          </div>
        </div>

        {/* Show uploaded file name */}
        {fileName && (
          <p className="text-sm text-green-600 mt-2 font-medium">
            Uploaded: {fileName}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-1">
          Required for Reviewer role, optional for others
        </p>
      </div>

      {/* ----------link-------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Scholar
          </label>
          <input
            type="url"
            placeholder="https://scholar.google.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Website
          </label>
          <input
            type="url"
            placeholder="https://yoursite.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability / Estimated Weekly Time
        </label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Select your availability</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Optional - helps us understand your commitment level
        </p>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />I confirm that
          I agree to the Privacy Policy and consent to store my application data
          for review purposes.
        </label>
      </div>

      {/* reCAPTCHA */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />
          I'm not a robot
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center cursor-pointer">
        <button className="px-6 py-3 bg-[#17AA80] text-white font-medium rounded-md hover:bg-green-600">
          Submit Application
        </button>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting, you agree to our Terms and Privacy Policy
      </p>
    </div>
  );
};

export default OpenGeneApplicationForm;
