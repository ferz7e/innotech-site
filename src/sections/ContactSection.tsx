import { LuArrowRight, LuFacebook, LuInstagram, LuMail } from "react-icons/lu";
import { useForm, type SubmitHandler, type RegisterOptions } from "react-hook-form";
import IconButton from "../components/shared/IconButton";
import SectionHeading from "../components/shared/SectionHeading";

/**
 * Define la estructura de datos para el formulario de contacto.
 */
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

/**
 * Reglas de validación centralizadas para mantener el JSX limpio.
 */
const VALIDATION_RULES: Record<keyof ContactFormValues, RegisterOptions<ContactFormValues>> = {
  name: {
    required: "Requerido",
    minLength: { value: 2, message: "Mínimo 2 caracteres" },
  },
  email: {
    required: "Requerido",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email inválido",
    },
  },
  message: {
    required: "Requerido",
    minLength: { value: 10, message: "Mínimo 10 caracteres" },
  },
};

/**
 * ContactSection - Componente de sección de contacto.
 * * Presenta una cabecera informativa, enlaces a redes sociales y un formulario
 * validado utilizando react-hook-form.
 */
const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  /**
   * Manejador de envío del formulario.
   * @param data - Datos validados del formulario.
   */
  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    // Lógica de envío aquí (e.g., llamar a una API)
    console.log("Form submitted:", data);
  };

  return (
    <section className="flex items-center justify-center bg-[linear-gradient(to_bottom,var(--bg-muted)_0%,var(--bg-muted)_40%,transparent_100%)] px-4 py-24">
      <div className="mx-auto grid w-full max-w-[800px] grid-cols-1 items-center justify-center gap-8 rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 lg:grid-cols-2">
        {/* Lado Izquierdo: Información y Redes */}
        <div className="rounded-xl p-4">
          <SectionHeading
            align="start"
            title="Hablemos de tu proyecto"
            subtitle="Contanos qué necesitás y te respondemos con una propuesta técnica clara y adaptada a tu operación."
          />

          <div className="mt-4 flex items-center gap-2">
            <IconButton icon={<LuInstagram className="h-4 w-4" aria-hidden="true" />} label="Instagram" />
            <IconButton icon={<LuMail className="h-4 w-4" aria-hidden="true" />} label="Gmail" />
            <IconButton icon={<LuFacebook className="h-4 w-4" aria-hidden="true" />} label="Facebook" />
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="rounded-lg border border-[var(--line)] bg-[var(--bg-muted-accent)] p-4">
          <SectionHeading align="center" title="Contáctanos" />

          <form className="mt-4 rounded-xl p-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {/* Campo: Nombre */}
              <FormField id="name" label="Nombre y Apellido" error={errors.name?.message}>
                <input
                  id="name"
                  type="text"
                  className="w-full border-b border-[var(--line)] bg-transparent pb-2 text-xs text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-1)]"
                  aria-invalid={!!errors.name}
                  {...register("name", VALIDATION_RULES.name)}
                />
              </FormField>

              {/* Campo: Email */}
              <FormField id="email" label="Email" error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  className="w-full border-b border-[var(--line)] bg-transparent pb-2 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-1)]"
                  aria-invalid={!!errors.email}
                  {...register("email", VALIDATION_RULES.email)}
                />
              </FormField>

              {/* Campo: Mensaje */}
              <FormField id="message" label="Mensaje" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full resize-none rounded-md border border-[var(--line)] bg-transparent p-3 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-1)]"
                  aria-invalid={!!errors.message}
                  {...register("message", VALIDATION_RULES.message)}
                />
              </FormField>

              {/* Botón de Envío */}
              <div className="flex justify-center md:col-span-2">
                <button
                  type="submit"
                  className="group inline-flex cursor-pointer items-center rounded-[4px] border border-[var(--accent-1)] bg-[var(--accent-1)] px-4 py-2 text-sm transition hover:brightness-110">
                  <span className="text-[var(--dark-text)]">Enviar</span>
                  <span className="ml-0 max-w-0 overflow-hidden opacity-0 transition-all group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
                    <LuArrowRight className="h-3.5 w-3.5 text-[var(--dark-text)]" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/**
 * Componente auxiliar para estructurar las etiquetas y mensajes de error de cada campo.
 */
const FormField = ({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-2">
      <label htmlFor={id} className="text-xs text-[var(--text)]">
        {label}
      </label>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
    {children}
  </div>
);

export default ContactSection;
