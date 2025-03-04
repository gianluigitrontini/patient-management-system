import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="Logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <RegisterForm user={user} />

          <p className="copyright py-12">
            &copy; 2024 Tutti i diritti riservati. Privacy Policy
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Registration Image"
        className="side-img max-w-[390px]"
      ></Image>
    </div>
  );
};

export default Register;
