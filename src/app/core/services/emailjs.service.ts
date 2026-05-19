import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environments';

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly SERVICE_ID = environment.emailjs.serviceId;
  private readonly TEMPLATE_ID = environment.emailjs.templateId;
  private readonly PUBLIC_KEY = environment.emailjs.publicKey;

  sendContactEmail(formData: ContactForm): Promise<void> {
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone: formData.phone || 'غير محدد',
      message: formData.message,
    };

    return emailjs
      .send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(() => {
        // success — no console output in production
      })
      .catch((error) => {
        throw error;
      });
  }
}