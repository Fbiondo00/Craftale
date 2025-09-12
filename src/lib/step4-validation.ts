// =====================================
// STEP 4 VALIDATION UTILITIES
// =====================================
// Comprehensive validation utilities for Step 4 quote request form
// Using TypeScript with Italian-specific business rules following existing patterns
import type {
  FormValidationError,
  MeetingRequest,
  ProjectDetails,
  QuoteRequest,
  UserData,
} from "@/types/step4-quote-request";

// =====================================
// ITALIAN VALIDATION PATTERNS
// =====================================

const ITALIAN_PHONE_REGEX = /^(\+39|0039)?[\s]?([0-9]{10}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4})$/;
const ITALIAN_VAT_REGEX = /^IT[0-9]{11}$/;
const ITALIAN_POSTAL_CODE_REGEX = /^[0-9]{5}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s']+$/;
const TIME_SLOT_REGEX = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// =====================================
// VALIDATION UTILITY FUNCTIONS
// =====================================

export const validateUserData = (data: Partial<UserData>): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  // First Name validation
  if (!data.firstName?.trim()) {
    errors.push({ field: "firstName", message: "Il nome è obbligatorio" });
  } else if (data.firstName.length < 2) {
    errors.push({ field: "firstName", message: "Il nome deve contenere almeno 2 caratteri" });
  } else if (data.firstName.length > 50) {
    errors.push({ field: "firstName", message: "Il nome non può superare i 50 caratteri" });
  } else if (!NAME_REGEX.test(data.firstName)) {
    errors.push({ field: "firstName", message: "Il nome può contenere solo lettere" });
  }

  // Last Name validation
  if (!data.lastName?.trim()) {
    errors.push({ field: "lastName", message: "Il cognome è obbligatorio" });
  } else if (data.lastName.length < 2) {
    errors.push({ field: "lastName", message: "Il cognome deve contenere almeno 2 caratteri" });
  } else if (data.lastName.length > 50) {
    errors.push({ field: "lastName", message: "Il cognome non può superare i 50 caratteri" });
  } else if (!NAME_REGEX.test(data.lastName)) {
    errors.push({ field: "lastName", message: "Il cognome può contenere solo lettere" });
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "L'email è obbligatoria" });
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push({ field: "email", message: "Formato email non valido" });
  } else if (data.email.length > 100) {
    errors.push({ field: "email", message: "L'email non può superare i 100 caratteri" });
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Il numero di telefono è obbligatorio" });
  } else if (!ITALIAN_PHONE_REGEX.test(data.phone.replace(/\s/g, ""))) {
    errors.push({
      field: "phone",
      message: "Formato telefono italiano non valido (es: +39 123 456 7890)",
    });
  }

  // Company Name validation
  if (!data.companyName?.trim()) {
    errors.push({ field: "companyName", message: "Il nome dell'azienda è obbligatorio" });
  } else if (data.companyName.length < 2) {
    errors.push({
      field: "companyName",
      message: "Il nome dell'azienda deve contenere almeno 2 caratteri",
    });
  } else if (data.companyName.length > 100) {
    errors.push({
      field: "companyName",
      message: "Il nome dell'azienda non può superare i 100 caratteri",
    });
  }

  // Optional VAT validation
  if (data.companyVat && data.companyVat.trim() !== "") {
    if (!ITALIAN_VAT_REGEX.test(data.companyVat)) {
      errors.push({ field: "companyVat", message: "Formato P.IVA non valido (es: IT12345678901)" });
    }
  }

  // Optional address validation
  if (data.companyAddress && data.companyAddress.length > 200) {
    errors.push({
      field: "companyAddress",
      message: "L'indirizzo non può superare i 200 caratteri",
    });
  }

  // Optional city validation
  if (data.companyCity && data.companyCity.length > 50) {
    errors.push({ field: "companyCity", message: "La città non può superare i 50 caratteri" });
  }

  // Optional province validation
  if (data.companyProvince && data.companyProvince.trim() !== "") {
    if (data.companyProvince.length !== 2) {
      errors.push({ field: "companyProvince", message: "La provincia deve essere di 2 caratteri" });
    }
  }

  // Optional postal code validation
  if (data.companyPostalCode && data.companyPostalCode.trim() !== "") {
    if (!ITALIAN_POSTAL_CODE_REGEX.test(data.companyPostalCode)) {
      errors.push({ field: "companyPostalCode", message: "Il CAP deve essere di 5 cifre" });
    }
  }

  // Optional industry validation
  if (data.industry && data.industry.length > 100) {
    errors.push({ field: "industry", message: "Il settore non può superare i 100 caratteri" });
  }

  // Optional website URL validation
  if (data.websiteUrl && data.websiteUrl.trim() !== "") {
    if (!URL_REGEX.test(data.websiteUrl)) {
      errors.push({ field: "websiteUrl", message: "Formato URL non valido" });
    }
  }

  return errors;
};

export const validateProjectDetails = (data: Partial<ProjectDetails>): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  // Restaurant type validation
  if (!data.restaurantType?.trim()) {
    errors.push({ field: "restaurantType", message: "Il tipo di ristorante è obbligatorio" });
  }

  // Timeline validation
  if (!data.timeline) {
    errors.push({ field: "timeline", message: "Seleziona una tempistica valida" });
  } else if (!["asap", "flexible", "specific_date"].includes(data.timeline)) {
    errors.push({ field: "timeline", message: "Seleziona una tempistica valida" });
  }

  // Specific deadline validation (when timeline is specific_date)
  if (data.timeline === "specific_date") {
    if (!data.specificDeadline?.trim()) {
      errors.push({
        field: "specificDeadline",
        message: "La data specifica è obbligatoria quando selezionata",
      });
    } else {
      try {
        const deadline = new Date(data.specificDeadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (deadline < today) {
          errors.push({ field: "specificDeadline", message: "La data non può essere nel passato" });
        }
      } catch {
        errors.push({ field: "specificDeadline", message: "Formato data non valido" });
      }
    }
  }

  // Budget flexibility validation
  if (!data.budgetFlexibility?.trim()) {
    errors.push({ field: "budgetFlexibility", message: "Seleziona la flessibilità del budget" });
  }

  return errors;
};

export const validateMeetingRequest = (data: Partial<MeetingRequest>): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  // Meeting type validation
  if (!data.meetingType) {
    errors.push({ field: "meetingType", message: "Seleziona un tipo di incontro valido" });
  } else if (!["online", "in_person"].includes(data.meetingType)) {
    errors.push({ field: "meetingType", message: "Seleziona un tipo di incontro valido" });
  }

  // Preferred slots validation
  if (!data.preferredSlots || data.preferredSlots.length === 0) {
    errors.push({ field: "preferredSlots", message: "Seleziona almeno uno slot preferito" });
  } else if (data.preferredSlots.length > 3) {
    errors.push({
      field: "preferredSlots",
      message: "Puoi selezionare al massimo 3 slot preferiti",
    });
  } else {
    data.preferredSlots.forEach((slot, index) => {
      // Date validation
      if (!DATE_REGEX.test(slot.date)) {
        errors.push({
          field: `preferredSlots.${index}.date`,
          message: "Formato data non valido (YYYY-MM-DD)",
        });
      } else {
        try {
          const selectedDate = new Date(slot.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            errors.push({
              field: `preferredSlots.${index}.date`,
              message: "La data non può essere nel passato",
            });
          }
        } catch {
          errors.push({
            field: `preferredSlots.${index}.date`,
            message: "Data non valida",
          });
        }
      }

      // Time slot validation
      if (!TIME_SLOT_REGEX.test(slot.timeSlot)) {
        errors.push({
          field: `preferredSlots.${index}.timeSlot`,
          message: "Formato orario non valido (HH:MM-HH:MM)",
        });
      }

      // Preference order validation
      if (!Number.isInteger(slot.preferenceOrder) || slot.preferenceOrder < 1 || slot.preferenceOrder > 3) {
        errors.push({
          field: `preferredSlots.${index}.preferenceOrder`,
          message: "L'ordine di preferenza deve essere tra 1 e 3",
        });
      }
    });
  }

  // Estimated duration validation
  if (!data.estimatedDuration) {
    errors.push({ field: "estimatedDuration", message: "La durata stimata è obbligatoria" });
  } else if (!Number.isInteger(data.estimatedDuration) || data.estimatedDuration < 30 || data.estimatedDuration > 180) {
    errors.push({
      field: "estimatedDuration",
      message: "La durata deve essere tra 30 e 180 minuti",
    });
  }

  // Optional special requests validation
  if (data.specialRequests && data.specialRequests.length > 500) {
    errors.push({
      field: "specialRequests",
      message: "Le richieste speciali non possono superare i 500 caratteri",
    });
  }

  return errors;
};

export const validateCompleteQuoteRequest = (data: Partial<QuoteRequest>): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  // Validate each section
  if (data.userData) {
    errors.push(...validateUserData(data.userData));
  } else {
    errors.push({ field: "userData", message: "I dati utente sono obbligatori" });
  }

  if (data.projectDetails) {
    errors.push(...validateProjectDetails(data.projectDetails));
  } else {
    errors.push({ field: "projectDetails", message: "I dettagli del progetto sono obbligatori" });
  }

  if (data.meetingRequest) {
    errors.push(...validateMeetingRequest(data.meetingRequest));
  } else {
    errors.push({ field: "meetingRequest", message: "La richiesta di incontro è obbligatoria" });
  }

  return errors;
};

// =====================================
// FIELD-SPECIFIC VALIDATION HELPERS
// =====================================

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return ITALIAN_PHONE_REGEX.test(phone.replace(/\s/g, ""));
};

export const validateVAT = (vat: string): boolean => {
  return ITALIAN_VAT_REGEX.test(vat);
};

export const validatePostalCode = (postalCode: string): boolean => {
  return ITALIAN_POSTAL_CODE_REGEX.test(postalCode);
};

export const validateURL = (url: string): boolean => {
  return URL_REGEX.test(url);
};

// =====================================
// BUSINESS VALIDATION HELPERS
// =====================================

export const isBusinessDay = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
};

export const isWithinBusinessHours = (timeSlot: string): boolean => {
  const [startTime] = timeSlot.split("-");
  const [hours] = startTime.split(":").map(Number);
  return hours >= 9 && hours <= 17; // 9 AM to 5 PM
};

export const validateSlotAvailability = (slots: Array<{ date: string; timeSlot: string }>): FormValidationError[] => {
  const errors: FormValidationError[] = [];

  slots.forEach((slot, index) => {
    const date = new Date(slot.date);

    if (!isBusinessDay(date)) {
      errors.push({
        field: `preferredSlots.${index}.date`,
        message: "Puoi selezionare solo giorni lavorativi (Lunedì-Venerdì)",
      });
    }

    if (!isWithinBusinessHours(slot.timeSlot)) {
      errors.push({
        field: `preferredSlots.${index}.timeSlot`,
        message: "Gli slot devono essere negli orari di ufficio (9:00-17:00)",
      });
    }
  });

  return errors;
};

// =====================================
// FORM STEP VALIDATION
// =====================================

export const validateStep = (stepNumber: number, data: Partial<QuoteRequest>): FormValidationError[] => {
  switch (stepNumber) {
    case 1:
      return data.userData ? validateUserData(data.userData) : [];
    case 2:
      return data.projectDetails ? validateProjectDetails(data.projectDetails) : [];
    case 3:
      return data.meetingRequest ? validateMeetingRequest(data.meetingRequest) : [];
    default:
      return [];
  }
};

// =====================================
// FORMATTING UTILITIES
// =====================================

export const formatPrice = (priceInCents: number): string => {
  return `€${(priceInCents / 100).toLocaleString("it-IT")}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPhoneNumber = (phone: string): string => {
  // Format Italian phone number for display
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+39 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
};
