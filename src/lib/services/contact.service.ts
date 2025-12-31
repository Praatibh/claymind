/**
 * Contact Service
 * Handles contact form submissions and FAQ retrieval
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import type { ContactFormData, ContactResponse } from '../types/api';

export interface FAQ {
  question: string;
  answer: string;
}

class ContactService {
  /**
   * Send a contact form message
   */
  async sendMessage(data: ContactFormData): Promise<ContactResponse> {
    try {
      errorLoggingService.addBreadcrumb({
        category: 'contact',
        message: 'Sending contact message',
        level: 'info',
        data: { subject: data.subject },
      });

      const response = await api.sendContactMessage(data);
      return response;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ContactService',
          action: 'sendMessage',
          metadata: { subject: data.subject },
        }
      );
      throw error;
    }
  }

  /**
   * Get frequently asked questions
   */
  async getFAQs(): Promise<FAQ[]> {
    try {
      const faqs = await api.getFAQs();
      return faqs;
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'ContactService',
          action: 'getFAQs',
        }
      );
      throw error;
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();
