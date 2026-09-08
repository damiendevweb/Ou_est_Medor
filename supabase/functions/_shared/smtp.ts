// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- Supabase Edge Functions resolve npm: imports at runtime
import nodemailer from 'npm:nodemailer@6.9.14'

type MailOptions = {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

// Lit un secret en essayant plusieurs noms (comme dans les autres fonctions).
const readSecret = (...names: string[]) => {
  for (const name of names) {
    const value = Deno.env.get(name)
    if (value) return value
  }
  return undefined
}

const isConfigured = () => {
  return Boolean(readSecret('SMTP_HOST') && readSecret('SMTP_USER') && readSecret('SMTP_PASS'))
}

const createTransport = () => {
  const host = readSecret('SMTP_HOST') ?? 'ssl0.ovh.net'
  const port = Number(readSecret('SMTP_PORT') ?? '465')
  const secure = readSecret('SMTP_SECURE') !== 'false'

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: readSecret('SMTP_USER')!,
      pass: readSecret('SMTP_PASS')!,
    },
  })
}

// Envoie un email depuis contact@ouestmedor.fr (ou SMTP_FROM configuré).
// Ne lève pas d'erreur : log + renvoie false en cas d'échec (appel best-effort).
const sendMail = async (options: MailOptions) => {
  if (!isConfigured()) {
    console.error('SMTP not configured: missing SMTP_HOST/SMTP_USER/SMTP_PASS secrets')
    return false
  }

  const from = readSecret('SMTP_FROM') ?? readSecret('SMTP_USER')

  try {
    const transport = createTransport()
    const info = await transport.sendMail({
      from: `"Où est Médor ?" <${from}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      ...(options.html ? { html: options.html } : {}),
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    })
    transport.close()
    console.log('Email sent:', info.messageId)
    return true
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Email send failed:', err.message)
    return false
  }
}

export { sendMail }