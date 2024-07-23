import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Il nome deve essere di almeno 2 caratteri")
        .max(50, "Il nome deve essere di al massimo 50 caratteri"),
    email: z.string().email("Indirizzo email non valido"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Numero di telefono non valido"),
});

export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, "Il nome deve essere di almeno 2 caratteri")
        .max(50, "Il nome deve essere di al massimo 50 caratteri"),
    email: z.string().email("Indirizzo email non valido"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Numero di telefono non valido"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Uomo", "Donna", "Altro"]),
    address: z
        .string()
        .min(5, "L'indirizzo deve essere di almeno 5 caratteri")
        .max(500, "L'indirizzo deve essere di al massimo 500 caratteri"),
    occupation: z
        .string()
        .min(2, "Occupazione deve essere di almeno 2 caratteri")
        .max(500, "Occupazione deve essere di al massimo 500 caratteri"),
    emergencyContactName: z
        .string()
        .min(2, "Il nome del contatto di emergenza deve essere di almeno 2 caratteri")
        .max(50, "Il nome del contatto di emergenza deve essere di al massimo 50 caratteri"),
    emergencyContactNumber: z
        .string()
        .refine(
            (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
            "Numero di telefono del contatto di emergenza non valido"
        ),
    primaryPhysician: z.string().min(2, "Seleziona almeno un medico"),
    insuranceProvider: z
        .string()
        .min(2, "Il nome dell'assicurazione deve essere di almeno 2 caratteri")
        .max(50, "Il nome dell'assicurazione deve essere di al massimo 50 caratteri"),
    insurancePolicyNumber: z
        .string()
        .min(2, "Il numero di polizza deve essere di almeno 2 caratteri")
        .max(50, "Il numero di polizza deve essere di al massimo 50 caratteri"),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "Devi acconsentire al trattamento per procedere",
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "Devi acconsentire alla divulgazione per procedere",
        }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "Devi acconsentire alla privacy per procedere",
        }),
});

export const CreateAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Seleziona almeno un medico"),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, "Il motivo deve essere di almeno 2 caratteri")
        .max(500, "Il motivo deve essere di al massimo 500 caratteri"),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Seleziona almeno un medico"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Seleziona almeno un medico"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Il motivo deve essere di almeno 2 caratteri")
        .max(500, "Il motivo deve essere di al massimo 500 caratteri"),
});

export function getAppointmentSchema(type: string) {
    switch (type) {
        case "create":
            return CreateAppointmentSchema;
        case "cancel":
            return CancelAppointmentSchema;
        default:
            return ScheduleAppointmentSchema;
    }
}