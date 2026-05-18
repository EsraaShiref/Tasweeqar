import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

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

  private SERVICE_ID = 'YOUR_SERVICE_ID';      // ← حطها هنا
  private TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // ← حطها هنا
  private PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // ← حطها هنا

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
        console.log('✅ Email sent successfully');
      })
      .catch((error) => {
        console.error('❌ Email failed:', error);
        throw error;
      });
  }
}