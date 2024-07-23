import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* Add OTP verification */}

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Logo"
            className="mb-12 h-10 w-fit"
          />

          {patient && (
            <AppointmentForm
              type="create"
              userId={userId}
              patientId={patient.$id}
            />
          )}

          <p className="copyright py-12">
            &copy; 2024 Tutti i diritti riservati. Privacy Policy
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="Registration Image"
        className="side-img max-w-[390px] bg-bottom"
      ></Image>
    </div>
  );
};

export default NewAppointment;
